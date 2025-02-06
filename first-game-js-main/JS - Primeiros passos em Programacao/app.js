//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número secreto';
//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10'
let listaNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 0;


function mudaTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensagemInicial(){
    mudaTextoNaTela('h1', 'Jogo do número secreto');
    mudaTextoNaTela('p', 'Escolha um número entre 1 e 100');
}

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    
    if(chute == numeroSecreto){
        mudaTextoNaTela('h1', 'Acertou!!!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        mudaTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else{
        if(chute > numeroSecreto){
            mudaTextoNaTela('p', 'O número é menor.');
        }
        else{
            mudaTextoNaTela('p', 'O número é maior.');
        }
        tentativas ++;
        limparCampo();
    }
}

function gerarNumeroAleatorio(){

    let NumeroEscolhido =  parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeNumerosEscolhidos = listaNumerosSorteados.length;

    if(quantidadeDeNumerosEscolhidos == numeroLimite){
        listaNumerosSorteados = [];
    }

    if(listaNumerosSorteados.includes(NumeroEscolhido)){
        return gerarNumeroAleatorio();
    }
    else{
        listaNumerosSorteados.push(NumeroEscolhido);
        console.log(listaNumerosSorteados);
        return NumeroEscolhido;
    }

}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    exibirMensagemInicial();
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    document.getElementById('reiniciar').setAttribute('disabled', true);
}


