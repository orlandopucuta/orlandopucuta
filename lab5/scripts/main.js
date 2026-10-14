const passa = document.querySelector("#passa");

passa.addEventListener("mouseover", () => {
    passa.textContent = "Olá!";
});

passa.addEventListener("mouseout", () => {
    passa.textContent = "1. Passa por aqui!";
});


// muda a cor do texto
document.querySelectorAll("button.color").forEach(button => {

    button.onclick = () => {
        document.querySelector("#pinta").style.color =
            button.dataset.color;
    };

});


let cor = 0;

document.querySelector("#escrever").onkeyup = () => {

    cor++;

    if (cor == 1) {
        document.body.style.backgroundColor = "salmon";
    }

    else if (cor == 2) {
        document.body.style.backgroundColor = "dodgerblue";
    }

    else if (cor == 3) {
        document.body.style.backgroundColor = "orange";
    }

    else {
        document.body.style.backgroundColor = "lightgreen";
        cor = 0;
    }

};


// escolha da cor com this
document.querySelector("#cor").onchange = function () {
    document.body.style.backgroundColor = this.value;
};


// contador guardado
if (!localStorage.getItem("contador")) {
    localStorage.setItem("contador", 0);
}

let contador = localStorage.getItem("contador");

document.querySelector("#contador").textContent = contador;


document.querySelector("#incrementar").onclick = () => {

    contador++;

    document.querySelector("#contador").textContent = contador;

    localStorage.setItem("contador", contador);
};


document.querySelector("#decrementar").onclick = () => {

    contador--;

    document.querySelector("#contador").textContent = contador;

    localStorage.setItem("contador", contador);
};


document.querySelector("#reset").onclick = () => {

    contador = 0;

    document.querySelector("#contador").textContent = contador;

    localStorage.setItem("contador", contador);
};


// formulário
document.querySelector("form").onsubmit = () => {

    const nome = document.querySelector("#nome").value;
    const idade = document.querySelector("#idade").value;

    document.querySelector("#mensagem").textContent =
        `Olá, o ${nome} tem ${idade}!`;

    return false;
};


// contador automático
let automaticCounter = 0;

function contarAutomaticamente() {

    automaticCounter++;

    document.querySelector("#automaticCounter").textContent =
        automaticCounter;
}

setInterval(contarAutomaticamente, 1000);


// direção das bolas
document.querySelector("#direcao").onchange = function () {

    document.querySelector("#flex-container").style.flexDirection =
        this.value;
};