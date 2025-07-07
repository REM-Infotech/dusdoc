# noqa: D104

import json
from pathlib import Path
from typing import TypedDict
from uuid import uuid4

import aiofiles
from flask_mail import Mail, Message
from flask_sqlalchemy import SQLAlchemy
from jinja2 import Environment, FileSystemLoader
from quart import (
    Blueprint,
    Request,
    Response,
    current_app,
    jsonify,
    make_response,
    request,
    send_file,  # noqa: F401
    send_from_directory,
)
from quart.datastructures import FileStorage
from quart.views import MethodView

admin = Blueprint("admin", __name__, url_prefix="/admin")
environment = Environment(
    loader=FileSystemLoader(Path(__file__).cwd().joinpath("dusdoc_api", "jinja")), autoescape=True
)

temp_path = Path(__file__).cwd().joinpath("dusdoc_api").joinpath("temp")
temp_path.mkdir(exist_ok=True)


class FormAdmissionalDict(TypedDict):  # noqa: D101
    id: int
    submited: bool
    nome: str
    cpf: str
    email: str
    data_nascimento: str
    telefone: str
    endereco: str
    complemento: str
    cidade: str
    cep: str
    estado: str
    genero: str
    corRaca: str  # noqa: N815
    grauEscolaridade: str  # noqa: N815
    estadoCivil: str  # noqa: N815
    numero_residencia: str
    form_registry_id: int


class FileModelDict(TypedDict):  # noqa: D101
    id: int
    filename: str
    secondary_filename: str
    filetype: str
    size: int
    mimetype: int
    mimetype_params: dict
    blob: bytes


@admin.get("/file/funcionario/<int:id_arquivo>")
async def retrive_file_funcionario(id_arquivo: int) -> Response:  # noqa: D103
    from dusdoc_api.models.admissional import FileModel

    db: SQLAlchemy = current_app.extensions["sqlalchemy"]

    query = db.session.query(FileModel).filter(FileModel.id == id_arquivo).first()

    fileobj = FileStorage(
        query.blob,
        filename=query.secondary_filename,
        name=query.filename,
        content_type=query.filetype,
        content_length=query.size if query.size > 0 else len(query.blob),
    )

    file_path = temp_path.joinpath(uuid4().hex)
    file_path.mkdir(exist_ok=True, parents=True)
    file_path = file_path.joinpath(fileobj.filename)
    async with aiofiles.open(file_path, "wb") as f:
        await f.write(query.blob)
    response = await make_response(
        await send_from_directory(
            file_path.parent.resolve(),
            fileobj.filename,
        )
    )

    return response


@admin.route("/data/funcionario/<int:funcionario_id>")
async def retrive_funcionario_form(funcionario_id: int) -> Request:  # noqa: D103
    from dusdoc_api.models.admissional import FileModel, FormAdmissional, RegistryAdmissao

    db: SQLAlchemy = current_app.extensions["sqlalchemy"]

    query = (  # noqa: F841
        db.session.query(RegistryAdmissao)
        .filter(
            RegistryAdmissao.funcionario_id == funcionario_id,
        )
        .first()
    )

    form: FormAdmissional = query.form_registry[-1]

    files: list[FileModel] = form.files

    data_dicted = FormAdmissionalDict(**{
        k: v for k, v in list(form.__dict__.items()) if not str(k).startswith("_") and not k == "files"
    })

    def decode_blob(v: bytes | str, k: str) -> str | bytearray:
        if isinstance(v, bytes):
            v = str(v)

        if k == "filename":
            v = " ".join(val.capitalize() for val in v.split("_"))
            if "certidao" in v.lower():
                v = v.replace("Certidao", "Certidão")
            if len(v.split(" ")) == 1:
                v = v.upper()

        return v

    files_dicted = [
        FileModelDict(**{
            k: decode_blob(v, k) for k, v in list(file.__dict__.items()) if not k.startswith("_") and not k == "blob"
        })
        for file in files
    ]

    return await make_response(jsonify(dados=data_dicted, arquivos=files_dicted))


class Funcionario(TypedDict):  # noqa: D101
    id: str
    nome: str
    email: str
    cpf: str
    codigo: str
    departamento: str
    cargo: str
    empresa: str


class PainelFuncionario(MethodView):  # noqa: D101
    async def post(self) -> None:
        from dusdoc_api.models.users.funcionarios import Funcionarios as Users

        mail: Mail = current_app.extensions["mail"]
        db: SQLAlchemy = current_app.extensions["sqlalchemy"]

        data = await request.data or await request.form or await request.json

        if isinstance(data, bytes):
            data = data.decode()
            if isinstance(data, str):
                data = json.loads(data)

        data = Funcionario(**dict(list(data.items())))

        user = db.session.query(Users).filter(Users.id == data["id"]).first()
        message = "Acesso Liberado! Foi enviado um E-mail com instruções enviado para o funcionário"
        if user.password:
            message = "Senha resetada! Foi enviado um E-mail com instruções enviado para o funcionário"

        senha = uuid4().hex[:4].upper()
        user.senhacrip = senha

        template_file = environment.get_template("password.jinja")
        rendered_template = template_file.render(user_name=user.nome, user_password=senha, empresa=user.empresa)

        mail.send(
            Message(
                subject="Senha de Acesso ao App DusDoc",
                sender=f"Mensagem do Sistema <{current_app.config['MAIL_DEFAULT_SENDER']}>",
                recipients=[user.email],
                html=rendered_template,
            )
        )

        db.session.commit()
        return await make_response(
            jsonify(
                message=message,
            ),
            200,
        )


def registry_endpoint_admin() -> None:  # noqa: D103
    form_admissional = PainelFuncionario.as_view("AdmissionalForm")
    admin.add_url_rule("/acesso_app", view_func=form_admissional)
