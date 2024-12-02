const Constantes = {
  INTERVALO_DEBOUNCE: 3000, // 3 segundos
  DURACAO_TIMEOUT: 40 * 1000, // 5 minutos
  DURACAO_TIMEOUT_ENCERRAMENTO: 40 * 1000, // 10 minutos
  ATRASO_PADRAO_MENSAGEM: 1500, // 1,5 segundos
  
  NUMEROS_IGNORADOS: [],
  ATENDENTES: [],
  
  ESTADOS: {
    INICIAL: "iniciouAtendimento1",
    MENU_PRINCIPAL: "iniciouAtendimento2",
    CLIENTE: "opcaoCliente",
    ORCAMENTO_CLIENTE: "orcamentoCliente",
    INFORMAR_CNPJ_CLIENTE: "informarCnpjCliente",
    INFORMAR_DADOS_ORCAMENTO: "informarDadosOrcamento",
    STATUS_ORCAMENTO: "statusOrcamento",
    PRAZO_CLIENTE: "prazoCliente",
    OUTROS_ASSUNTOS_CLIENTE: "outrosAssuntosCliente",
    ATENDENTE: "atendente"
  },
  MENSAGENS: {
    FORA_HORARIO:
      "Olá, tudo bem? No momento estamos fora do nosso horário comercial. Retornaremos amanhã a partir de 07:35h com o atendimento.",
    ERRO: "Ocorreu um erro inesperado durante o atendimento. Por favor, tente novamente.",
    MENU_PRINCIPAL:
      "O motivo do seu contato é:\n\n1. Orçamento\n2. Status de orçamento\n3. Prazo de entrega\n4. Outros assuntos",
    INATIVIDADE: "Ainda está aí? Caso não ocorra mais nenhuma interação, encerraremos o atendimento.",
    ENCERRAMENTO:
      "Como não houve resposta, o atendimento foi encerrado. Caso precise de algo mais, por favor, não hesite em nos contatar."
  }
}

module.exports = Constantes
