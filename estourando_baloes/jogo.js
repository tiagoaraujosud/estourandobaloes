var timerId = null; //variável que armazena a chamada da função timeout


function iniciaJogo(){
	
	var url = window.location.search;

	var nivel_jogo = url.replace("?", "");

	var tempo_segundos = 0;

	if (nivel_jogo == 1) {

		tempo_segundos = 120;
	}

	if (nivel_jogo == 2) {
		tempo_segundos = 60;
	}

	if(nivel_jogo == 3) {
		tempo_segundos = 30;
	}
	
	//inserindo segundos

	document.getElementById('cronometro').innerHTML = tempo_segundos;

	//quantidade de baloes

	var qtde_baloes = 80;

	cria_baloes(qtde_baloes);

	//imprimir baloes inteiros

	document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
	document.getElementById('baloes_estourados').innerHTML = 0;

	contagem_tempo(tempo_segundos);
}

function contagem_tempo(segundos){
	document.getElementById('cronometro').innerHTML = segundos;

	segundos = segundos - 1;

	if (segundos == -1) {
		
		clearTimeout(timerId);// para a função setTimeout
		game_over();
		return false;
	}

	timerId = setTimeout('contagem_tempo('+segundos+')', 1000);
}

function game_over(){
	alert('Fim de Jogo!!!')
}

function cria_baloes(qtde_baloes){

	for (var i = 1; i <= qtde_baloes; i++) {
		
		var balao = document.createElement('img');
		balao.src = 'imagens/balao_azul_pequeno.png';
		balao.style.margin = '10px';
		balao.id = 'b'+i;
		balao.onclick = function(){ estourar(this);};

		document.getElementById('cenario').appendChild(balao);
	}
}

function estourar(e){
	var id_balao = e.id;
	
	document.getElementById(id_balao).setAttribute('onclick', "");
	document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';

	pontuação(-1);
}

function pontuação(acao){
	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
	var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);

	baloes_inteiros = baloes_inteiros + acao;
	baloes_estourados = baloes_estourados - acao;

	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	situacao_jogo(baloes_inteiros);
}

function situacao_jogo(baloes_inteiros){

	if (baloes_inteiros == 0) {
		alert('Parabéns!');
		parar_jogo();
	}
}

function parar_jogo(){
	clearTimeout(timerId);
}