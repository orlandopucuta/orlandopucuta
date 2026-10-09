// Guardamos as referências aos elementos uma única vez.
const contador = document.querySelector("#contador");
const mensagemTema = document.querySelector("#mensagem-tema");
const imagem = document.querySelector("#imagem");
const mensagemImagem = document.querySelector("#mensagem-imagem");
const posicao = document.querySelector("#posicao");
const areaRato = document.querySelector("#area-rato");

let cliques = 0;
let temaEscuro = false;

// Evento: click
function contar() {
    cliques++;
    contador.textContent = cliques;
}

// Evento: dblclick
function mudarTema() {
    temaEscuro = !temaEscuro;

    if (temaEscuro) {
        document.body.style.backgroundColor = "#18213b";
        document.body.style.color = "#ffffff";
        mensagemTema.textContent = "Tema escuro ativado!";
    } else {
        document.body.style.backgroundColor = "#eef2ff";
        document.body.style.color = "#18213b";
        mensagemTema.textContent = "Tema claro ativado!";
    }
}

// Evento: mouseover
function destacarImagem() {
    imagem.style.transform = "scale(1.15) rotate(5deg)";
    imagem.style.boxShadow = "0 8px 20px #5546d966";
    mensagemImagem.textContent = "Olá! O rato está sobre a imagem.";
}

// Evento: mouseout
function restaurarImagem() {
    imagem.style.transform = "scale(1) rotate(0deg)";
    imagem.style.boxShadow = "none";
    mensagemImagem.textContent = "O rato saiu. Até à próxima!";
}

// Evento: mousemove
function mostrarPosicao(evento) {
    const limites = areaRato.getBoundingClientRect();
    const x = Math.round(evento.clientX - limites.left);
    const y = Math.round(evento.clientY - limites.top);

    posicao.textContent = `Posição do rato: X = ${x}, Y = ${y}`;
    areaRato.style.backgroundColor = `hsl(${x % 360}, 75%, 90%)`;
}