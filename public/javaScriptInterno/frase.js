/**
		****************************************************************************
	    Projeto Labora/Alura/Oracle ONE
	    Curso Alura: HTML5 e CSS3
	    Aluna: Rosemeire Deconti
	    Exercício: Página WEB com jogo Alura Typer
	    Data: Novembro/2020
		****************************************************************************
**/

/** No click do objeto aciona a função para processamento **/
$("#botao-frase-aleatoria").click(buscaFraseAleatoria);
$("#botao-frase-usuario").click(buscaFraseUsuario);

/** ------------------------------------------------------------------------ **/
/** Busca frase aleatória no Json "frases"																	 **/
/** ------------------------------------------------------------------------ **/
function buscaFraseAleatoria() {

	/** Liga o spinner para indicar que está buscando frase no servidor **/
	$("#spinner").toggle();

    $.get("http://localhost:3000/frases", trocaFraseAleatoria)

		/** Verifica sucesso da busca da frase no servidor **/
    .fail(function(){

			/** Liga mensagem de erro sobre busca no servidor **/
    	$("#erro").toggle();

    	setTimeout(function(){

    		$("#erro").toggle();

    	},1500);

    })

		/** Sempre desliga mensagem de erro sobre busca no servidor **/
    .always(function(){

    	$("#spinner").toggle();

    });
}

/** ------------------------------------------------------------------------ **/
/** Busca frase requisitada pelo usuário no Json "frases"										 **/
/** ------------------------------------------------------------------------ **/
function buscaFraseUsuario() {

		/** Liga o spinner para indicar que está buscando frase no servidor **/
    $("#spinner").toggle();

		/** Obtém o número da frase requisitada no campo "frase-id" **/
    var fraseId = $("#botao-frase-usuario").val();

    //criacao do objeto JS que guarda a id
    var dados = {id : fraseId};

    //passando objecto como segundo parametro
    $.get("http://localhost:3000/frases", dados, trocaFrase)

		/** Verifica sucesso da busca da frase no servidor **/
    .fail(function(){

				/** Liga mensagem de erro sobre busca no servidor **/
        $("#erro").toggle();

        setTimeout(function(){
            $("#erro").toggle();

    },2000);

    })

		/** Sempre desliga mensagem de erro sobre busca no servidor **/
    .always(function(){

        $("#spinner").toggle();

    });
}

/** ------------------------------------------------------------------------ **/
/** Troca a frase no campo "applicationPhrase" com o valor do campo data		 **/
/** ------------------------------------------------------------------------ **/
function trocaFraseAleatoria(data) {

		/** Jquery: atribui a variável "frase" o valor do campo "applicationPhrase" */
    var frase = $(".applicationPhrase");

		/** Gera número aleatório para obter o número da frase - de 0 até 9 **/
    var numeroAleatorio = Math.floor(Math.random() * data.length);

		/** Atualiza o texto da frase no campo "applicationPhrase" **/
    frase.text(data[numeroAleatorio].texto);

		/** Atualiza dados da frase **/
		contaPalavrasAplicacao();
		contaCaracteresAplicacao()

		/** Atualiza o tempo inicial **/
    atualizaTempoInicial(data[numeroAleatorio].tempo);

}

/** ------------------------------------------------------------------------ **/
/** Troca frase da aplicação																								 **/
/** ------------------------------------------------------------------------ **/
function trocaFrase(data) {

		/** Jquery: atribui a variável "frase" o valor do campo "applicationPhrase" */
		var frase = $(".applicationPhrase");

		/** Atualiza o texto da frase no campo "applicationPhrase" **/
    frase.text(data.texto); //cuidado, texto com "o" no final

		/** Atualiza dados da frase **/
		contaPalavrasAplicacao();
		contaCaracteresAplicacao()

		/** Atualiza o tempo inicial **/
    atualizaTempoInicial(data[numeroAleatorio].tempo);

}
