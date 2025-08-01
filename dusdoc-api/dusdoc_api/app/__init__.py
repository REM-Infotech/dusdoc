import re  # noqa: D104
from os import environ
from pathlib import Path

import quart_flask_patch  # noqa: F401
from flask_mail import Mail
from flask_migrate import Migrate, init, migrate, upgrade
from flask_sqlalchemy import SQLAlchemy
from quart import Quart, Response  # noqa: F401
from quart_cors import cors
from quart_jwt_extended import JWTManager
from quart_socketio import SocketIO
from uvicorn.middleware.proxy_headers import ProxyHeadersMiddleware

from dusdoc_api.app.domain import register_quart

app = Quart(__name__)
jwt = JWTManager(app)
io = SocketIO()
db = SQLAlchemy()
mail = Mail()
migrate_ = Migrate()
mail_ = None
# @app.after_request
# async def allow_origin(response: Response) -> Response:  # noqa: ANN202, D103
#     response.headers["Access-Control-Allow-Origin"] = "*"
#     response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
#     response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
#     response.headers["Access-Control-Allow-Credentials"] = "true"

#     return response


def cors_allowed_origins(orig: str | None = None) -> bool:  # noqa: D103
    return True


async def create_app() -> Quart:  # noqa: D103
    from dusdoc_api.models import init_database

    app.config.from_pyfile(Path(__file__).parent.resolve().joinpath("quartconf.py"))
    async with app.app_context():
        db.init_app(app)
        await io.init_app(app, cors_allowed_origins=cors_allowed_origins)
        await register_quart(app, io)
        await init_database(app)
        global mail_
        mail_ = mail.init_app(app)
        mail_.connect()

        if environ.get("MIGRATE_SQL").lower() == "true":
            migrate_.init_app(app, db)
            if not Path(__file__).cwd().joinpath("migrations").exists():
                init(directory="migrations")

            migrate(directory="migrations", message="Initial migration")
            upgrade(directory="migrations")

    app.asgi_app = ProxyHeadersMiddleware(app.asgi_app)
    return cors(
        app, allow_origin=[re.compile(r"^https?:\/\/.*$")], allow_credentials=True, allow_methods="*", allow_headers="*"
    )
