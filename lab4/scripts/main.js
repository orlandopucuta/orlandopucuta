const mensagem = document.querySelector("#mensagem");
const textoCor = document.querySelector("#texto-cor");
const escrita = document.querySelector("#escrita");
const corFundo = document.querySelector("#cor-fundo");
const contador = document.querySelector("#contador");
const imagem = document.querySelector("#imagem");
const avisoImagem = document.querySelector("#aviso-imagem");

let cliques = 0;
let indiceCor = 0;
let imagemGrande = false;

const cores = ["yellow", "orange", "pink", "lightblue", "lightgray"];

function agradecer() {
    mensagem.textContent = "1. Obrigado por passares!";
}

function restaurar() {
    mensagem.textContent = "1. Passa por aqui!";
}

function pintar(cor) {
    textoCor.style.color = cor;
}

function mudarCorQuadro() {
    escrita.style.backgroundColor = cores[indiceCor];

    indiceCor++;

    if (indiceCor === cores.length) {
        indiceCor = 0;
    }
}

function mudarFundo() {
    document.body.style.backgroundColor = corFundo.value.trim();
}

function contar() {
    cliques++;
    contador.textContent = cliques;
}

function aumentarImagem() {
    imagemGrande = !imagemGrande;

    if (imagemGrande) {
        imagem.style.width = "160px";
    } else {
        imagem.style.width = "80px";
    }
}

function moverNaImagem() {
    avisoImagem.textContent = "Estás a mover o rato sobre a imagem!";
}