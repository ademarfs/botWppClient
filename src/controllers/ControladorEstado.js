const GerenciadorMensagens = require("../utils/gerenciadorMensagens")
const Constantes = require("../utils/constantes")

class ControladorEstado {
  
  static async limparTimeouts(usuario) {
    clearTimeout(usuario.timeouts.inatividade);
    clearTimeout(usuario.timeouts.encerramento);
    usuario.timeouts = {};
  }
  
  static async encerrarAtendimentoPorInatividade(msg, cliente, usuario) {
    await GerenciadorMensagens.enviarMensagemComAtraso(msg, cliente, Constantes.MENSAGENS.ENCERRAMENTO);
    const gerenciadorUsuarios = new GerenciadorUsuarios();
    gerenciadorUsuarios.removerUsuario(usuario.id);
  }

  static async iniciarTimeoutInatividade(msg, cliente, usuario) {
    if (usuario.estado === Constantes.ESTADOS.ATENDENTE) {
      return
    }
    clearTimeout(usuario.timeouts.inatividade);
    usuario.timeouts.inatividade = setTimeout(async () => {
      await GerenciadorMensagens.enviarMensagemComAtraso(msg, cliente, Constantes.MENSAGENS.INATIVIDADE)
      this.iniciarTimeoutEncerramento(msg, cliente, usuario)
    }, Constantes.DURACAO_TIMEOUT)
  }

  static async iniciarTimeoutEncerramento(msg, cliente, usuario) {
    clearTimeout(usuario.timeouts.encerramento);
    usuario.timeouts.encerramento = setTimeout(async () => {
      await GerenciadorMensagens.enviarMensagemComAtraso(msg, cliente, Constantes.MENSAGENS.ENCERRAMENTO)
      usuario.limparEstado()
    }, Constantes.DURACAO_TIMEOUT_ENCERRAMENTO)
  }

  static async tratarFluxoCliente(msg, cliente, usuario) {
    switch (msg.body) {
      case "1":
        await GerenciadorMensagens.enviarMensagemComAtraso(msg, cliente, "Este é o seu primeiro contato conosco?\n\n1. Sim\n2. Não")
        usuario.estado = Constantes.ESTADOS.ORCAMENTO_CLIENTE
        break
      case "2":
        await GerenciadorMensagens.enviarMensagemComAtraso(msg, cliente, "Favor informar o nome ou CNPJ da sua empresa para continuarmos.")
        usuario.estado = Constantes.ESTADOS.STATUS_ORCAMENTO
        break
      case "3":
        await GerenciadorMensagens.enviarMensagemComAtraso(msg, cliente, "Para tratativa de prazo, favor entrar em contato com o setor Comercial através do telefone: (71) 2106-9511 ou pelo e-mail: comercial@durit.com.br.")
        usuario.estado = Constantes.ESTADOS.PRAZO_CLIENTE
        break
      case "4":
        await GerenciadorMensagens.enviarMensagemComAtraso(msg, cliente, "Faça um breve resumo sobre o assunto e em seguida iremos te atender.")
        usuario.estado = Constantes.ESTADOS.OUTROS_ASSUNTOS_CLIENTE
        break
      default:
        await GerenciadorMensagens.enviarMensagemComAtraso(msg, cliente, "⚠️ Opção inválida! Por favor, selecione uma das opções informadas:\n\n1. Orçamento\n2. Status de orçamento\n3. Prazo de entrega\n4. Outros assuntos")
    }
  }
}

module.exports = ControladorEstado
