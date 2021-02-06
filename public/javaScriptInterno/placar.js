/**
		****************************************************************************
	    Projeto Labora/Alura/Oracle ONE
	    Curso Alura: HTML5 e CSS3
	    Aluna: Rosemeire Deconti
	    Exercício: Página WEB com jogo Alura Typer
	    Data: Novembro/2020
		****************************************************************************
**/

$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

/** ------------------------------------------------------------------------ **/
/** Obtém placar e exibe na tela																						 **/
/** ------------------------------------------------------------------------ **/
function inserePlacar() {

    var corpoTabela = $(".placar").find("tbody");
    var usuario = $("#usuarios").val();
    var numPalavras = $("#contador-palavras-usuario").text();

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.append(linha);
    $(".placar").slideDown(500);
    scrollPlacar();
}

/** ------------------------------------------------------------------------ **/
/** Faz o scrolling do placar																								 **/
/** ------------------------------------------------------------------------ **/
function scrollPlacar() {
    var posicaoPlacar = $(".placar").offset().top;
    $("body").animate(
    {
        scrollTop: posicaoPlacar + "px"
    }, 1000);
}

/** ------------------------------------------------------------------------ **/
/** Inclui nova linha no placar																							 **/
/** ------------------------------------------------------------------------ **/
function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

/** ------------------------------------------------------------------------ **/
/** Exclui linha do placar																									 **/
/** ------------------------------------------------------------------------ **/
function removeLinha() {

    event.preventDefault();
    var linha = $(this).parent().parent();

    linha.fadeOut(1000);
    setTimeout(function() {
        linha.remove();
    }, 1000);
}

/** ------------------------------------------------------------------------ **/
/** Mostra o placar 																												 **/
/** ------------------------------------------------------------------------ **/
function mostraPlacar() {
    $(".placar").stop().slideToggle(600);
}

/** ------------------------------------------------------------------------ **/
/** Sincroniza placar com o servidor																				 **/
/** ------------------------------------------------------------------------ **/
function sincronizaPlacar(){

    var placar = [];
    var linhas = $("tbody>tr");

    linhas.each(function(){
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();

        var score = {
            usuario: usuario,
            pontos: palavras
        };

        placar.push(score);

        var dados = {
            placar: placar
        };

        $.post("http://localhost:3000/placar", dados , function() {

            console.log("Placar sincronizado com sucesso");
            $(".tooltip").tooltipster("open");

        }).fail(function(){
            $(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sincronizar");

        }).always(function(){ //novo
            setTimeout(function() {
            $(".tooltip").tooltipster("close");

        }, 1200);
});

    });
}

/** ------------------------------------------------------------------------ **/
/** Atualiza placar com dados do JSON placar																 **/
/** ------------------------------------------------------------------------ **/
function atualizaPlacar(){
    $.get("http://localhost:3000/placar",function(data){
        $(data).each(function(){
            var linha = novaLinha(this.usuario, this.pontos);

            linha.find(".botao-remover").click(removeLinha);

            $("tbody").append(linha);
        });
    });
}
