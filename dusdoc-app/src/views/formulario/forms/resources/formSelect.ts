export default function () {
  const genOpt = [
    { value: null, text: "Selecione", disabled: true },
    { value: "Masculino", text: "Masculino" },
    { value: "Feminino", text: "Feminino" },
  ];

  const corRacaOpt = [
    { value: null, text: "Selecione", disabled: true },
    { value: "Amarela", text: "Amarela" },
    { value: "Pardo", text: "Pardo" },
    { value: "Branca", text: "Branca" },
    { value: "Indigena", text: "Indígena" },
    { value: "Negra", text: "Negra" },
  ];

  const estadoCivilOpt = [
    { value: null, text: "Selecione", disabled: true },
    { value: "Solteiro", text: "Solteiro" },
    { value: "Casado", text: "Casado" },
    { value: "Separado", text: "Separado" },
    { value: "Divorciado", text: "Divorciado" },
    { value: "Viúvo", text: "Viúvo" },
  ];

  const grauEscolarOpt = [
    { value: null, text: "Selecione", disabled: true },
    { value: "Analfabeto", text: "Analfabeto" },
    { value: "Fundamental completo", text: "Fundamental Completo" },
    { value: "Ensino medio incompleto", text: "Ensino médio incompleto" },
    { value: "Ensino medio completo", text: "Ensino médio completo" },
    { value: "Ensino superior incompleto", text: "Ensino superior incompleto" },
    { value: "Ensino superior completo", text: "Ensino superior completo" },
    { value: "Pós-graduação completa", text: "Pós-graduação completa" },
    { value: "Mestrado completo", text: "Mestrado completo" },
    { value: "Doutorado completo", text: "Doutorado completo" },
  ];

  return {
    grauEscolarOpt,
    corRacaOpt,
    genOpt,
    estadoCivilOpt,
  };
}
