function enviarMensagemWhatsApp(mensagem) {
  var apiUrl = "http://url.api:8080/message/sendText/instance"; // Substituir pela URL da EvolutionAPI
  var apiKey = "Token"; // Substituir pelo seu Token da API

  var payload = {
    number: "+5571999887766", // Substituir pelo número ou ID do grupo
    options: {
      delay: 1200,
      presence: "composing",
      linkPreview: false,
    },
    textMessage: {
      text: mensagem,
    },
  };

  var options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "apikey": apiKey,
    },
    payload: JSON.stringify(payload),
  };

  var response = UrlFetchApp.fetch(apiUrl, options);
  var responseData = JSON.parse(response.getContentText());

  // Verifica se a mensagem foi enviada com sucesso
  if (responseData.success) {
    Logger.log("Mensagem enviada com sucesso para o WhatsApp via API.");
  } else {
    Logger.log("Erro ao enviar a mensagem para o WhatsApp via API: " + responseData.error);
  }
}

function formatarData(data) {
  var diasDaSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  
  var diaSemana = diasDaSemana[data.getDay()];
  var dia = ("0" + data.getDate()).slice(-2);
  var mes = ("0" + (data.getMonth() + 1)).slice(-2);
  var ano = data.getFullYear();
  
  return diaSemana + " " + dia + "/" + mes + "/" + ano;
}

function resumoDaAta() {
  // Pegar a planilha
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  
  // Pegar a aba específica das respostas
  var aba = planilha.getSheetByName('Respostas ao formulário 1');
  
  // Pegar a última linha
  var ultimaLinha = aba.getLastRow();
  
  // Definir as colunas de interesse
  var colunas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'];
  
  // Armazenar os valores
  var valores = {};
  
  // Pegar os valores pelas colunas
  colunas.forEach(function(coluna) {
    var valor = aba.getRange(coluna + ultimaLinha).getValue();
    valores[coluna] = valor;
  });

  // Converter a data da reunião para o formato BR
  var dataReuniao = new Date(valores['A']);
  var dataFormatada = formatarData(dataReuniao);

  
  // Montar a mensagem de resumo
  var mensagem = "*Resumo da Ata do Grupo Campo Santo de NA*\n";
  
  // Linhas das mensagens necessárias
  mensagem += "*Formato da Reunião*: " + valores['C'] + "\n";
  mensagem += "*Data da Reunião*: " + dataFormatada + "\n";
  mensagem += "*Dia da Reunião*: " + valores['B'] + "\n";
  mensagem += "*Secretário(a)*: " + valores['D'] + "\n";
  mensagem += "*Coordenador(a)*: " + valores['E'] + "\n";
  mensagem += "*Presenças*: " + valores['F'] + "\n";
  mensagem += "*Partilhas*: " + valores['G'] + "\n";
  mensagem += "*Saldo Anterior*: R$ " + valores['O'] + "\n";
  mensagem += "*7ª Tradição*: R$ " + valores['P'] + "\n";
  mensagem += "*Saldo Atual*: R$ " + valores['S'] + "\n";

  // Adicionar as linhas apenas se os valores não forem strings vazias
  if (valores['Q'] !== "") {
    mensagem += "*Total de Despesas*: R$ " + valores['Q'] + "\n";
  }
  if (valores['R'] !== "") {
    mensagem += "*Descrição das Despesas*: " + valores['R'] + "\n";
  }

  if (valores['H'] !== "") {
    mensagem += "*Visita(s)*: " + valores['H'] + "\n";
  }
  if (valores['I'] !== "") {
    mensagem += "*Ingresso(s)*: " + valores['I'] + "\n";
  }
  if (valores['J'] !== "") {
  mensagem += "*Nome(s) do(s) Ingressante(s)*: " + valores['J'] + "\n";
  }
  if (valores['K'] !== "") {
  mensagem += "*Contato(s) do(s) Ingressante(s)*: " + valores['K'] + "\n";
  }
  if (valores['L'] !== "") {
  mensagem += "*Visita Soube Através*: " + valores['L'] + "\n";
  }

  if (valores['M'] !== "") {
    mensagem += "*Conquista(s)*: " + valores['M'] + "\n";
  }
  if (valores['N'] !== "") {
  mensagem += "*Nome(s) da(s) Conquista(s)*: " + valores['N'] + "\n";
  }

  if (valores['U'] !== "") {
  mensagem += "*Título da Temática*: " + valores['U'] + "\n";
  }
  if (valores['V'] !== "") {
  mensagem += "*Partilhador da Temática*: " + valores['V'] + "\n";
  }

  if (valores['T'] !== "") {
  mensagem += "*Eleição de Encargo*: " + valores['T'] + "\n";
  }

  if (valores['X'] !== "") {
  mensagem += "*Observações*: " + valores['X'] + "\n";
  }

  if (valores['W'] !== "") {
  mensagem += "*Informações Adicionais*: " + valores['W'];
  }

  // Exibir log da mensagem montada
  Logger.log(mensagem)
  
  // Enviar a mensagem via WhatsApp (API)
  enviarMensagemWhatsApp(mensagem);
}