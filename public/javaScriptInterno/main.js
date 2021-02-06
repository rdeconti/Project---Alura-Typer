/**
		****************************************************************************
	    Projeto Labora/Alura/Oracle ONE
	    Curso Alura: HTML5 e CSS3
	    Aluna: Rosemeire Deconti
	    Exercício: Página WEB com jogo Alura Typer
	    Data: Novembro/2020
		****************************************************************************
**/

var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".userPhrase");

/** ------------------------------------------------------------------------ **/
/** Inicialização dos campos da tela																				 **/
/** ------------------------------------------------------------------------ **/
$(function() {

    contaPalavrasAplicacao();
		contaCaracteresAplicacao()

    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();

    $("#botao-reiniciar").click(reiniciaJogo);

    atualizaPlacar();

    $("#usuarios").selectize({
        create: true,
        sortField: 'text'
    });

    $(".tooltip").tooltipster({
        trigger: "custom"
    });

});

/** ------------------------------------------------------------------------ **/
/** Atualiza valor de "tempo-digitação" com conteúdo de "tempo" **/
/** ------------------------------------------------------------------------ **/
function atualizaTempoInicial(tempo) {

    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);

}

/** ------------------------------------------------------------------------ **/
/** Conta número de palavras da aplicação  																	 **/
/** ------------------------------------------------------------------------ **/
function contaPalavrasAplicacao() {

    var frase = $(".applicationPhrase").text();
    var numPalavras  = frase.split(" ").length;
    var tamanhoFrase = $("#contador-palavras-aplicacao");
    tamanhoFrase.text(numPalavras);

}

/** ------------------------------------------------------------------------ **/
/** Conta número de caracteres da aplicação  		  													 **/
/** ------------------------------------------------------------------------ **/
function contaCaracteresAplicacao() {

		$("#contador-caracteres-aplicacao").text(0);
		var conteudo = $(".applicationPhrase").text();
		var qtdCaracteres = conteudo.length;
		$("#contador-caracteres-aplicacao").text(qtdCaracteres);

}

/** ------------------------------------------------------------------------ **/
/** Conta número de palavras do usuário   																	 **/
/** ------------------------------------------------------------------------ **/
function contaPalavrasUsuario() {

    var frase = $(".userPhrase").text();
    var numPalavras  = frase.split(" ").length;
    var tamanhoFrase = $("#contador-palavras-usuario");
    tamanhoFrase.text(numPalavras);

}

/** ------------------------------------------------------------------------ **/
/** Inicializa contadores do usuário  																			 **/
/** ------------------------------------------------------------------------ **/
function inicializaContadores() {

		$("#contador-palavras-usuario").text(0);
		$("#contador-caracteres-usuario").text(0);

    campo.on("input", function() {

        var conteudo = campo.val();

				var qtdPalavras = conteudo.split(/\S+/).length - 1;
				$("#contador-palavras-usuario").text(qtdPalavras);

				var qtdCaracteres = conteudo.length;
				$("#contador-caracteres-usuario").text(qtdCaracteres);

    });
}

/** ------------------------------------------------------------------------ **/
/** Inicializa inicializaMarcadores	  																			 **/
/** ------------------------------------------------------------------------ **/
function inicializaMarcadores() {

    campo.on("input", function() {

        var frase = $(".userPhrase").text();
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);

        if (digitado == comparavel) {

            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");

        } else {

            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");

        }

    });
}

/** ------------------------------------------------------------------------ **/
/** Inicializa cronometro - campo "tempo-digitação"													 **/
/** ------------------------------------------------------------------------ **/
function inicializaCronometro() {

    campo.one("focus", function() {

      var tempoRestante = $("#tempo-digitacao").text();

    	var cronometroID = setInterval(function() {

    		tempoRestante--;

    		$("#tempo-digitacao").text(tempoRestante);

    		if (tempoRestante < 1) {
            clearInterval(cronometroID);
            finalizaJogo();
    		}

    	}, 1000);

    });
}

/** ------------------------------------------------------------------------ **/
/** Finaliz o jogo e atualiza o placar quando o tempo acabar  							 **/
/** ------------------------------------------------------------------------ **/
function finalizaJogo() {

    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");
    inserePlacar();

}

/** ------------------------------------------------------------------------ **/
/** Inicializa tela quando usuário clica no "botao-reiniciar								 **/
/** ------------------------------------------------------------------------ **/
function reiniciaJogo() {

    campo.attr("disabled", false);
    campo.val("");

    $("#contador-palavras-usuario").text(0);
    $("#contador-caracteres-usuario").text(0);

    $("#tempo-digitacao").text(tempoInicial);

    inicializaCronometro();

    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");

    atualizaPlacar();

}
