
// A. declaração de variáveis

const nodeInputNumero = document.querySelector('#registar input[type="number"]');

const nodeUlColecao = document.querySelector('#colecao ul');
const nodeUlRepetidos = document.querySelector('#repetidos ul');

const nodeTotal = document.querySelector('#colecao span');
const nodeTotalRepetidos = document.querySelector('#repetidos span');

const colecao = JSON.parse(localStorage.getItem('colecao')) || [];
const repetidos = JSON.parse(localStorage.getItem('repetidos')) || [];


// B. event handlers

function guardaCarta() {
    const numero = Number(nodeInputNumero.value);

    if (!Number.isInteger(numero) || numero < 1) {
        return;
    }

    if (colecao.includes(numero)) {
        repetidos.push(numero);
        repetidos.sort((a, b) => a - b);

        atualizaLista(repetidos, nodeUlRepetidos);

    } else {
        colecao.push(numero);
        colecao.sort((a, b) => a - b);

        atualizaLista(colecao, nodeUlColecao);
    }

    atualizaTotais();
    guardarDados();

    nodeInputNumero.value = '';
    nodeInputNumero.focus();
}


function atualizaLista(lista, elemento) {
    elemento.innerHTML = '';

    lista.forEach(numero => {
        const li = document.createElement('li');

        if (elemento === nodeUlRepetidos) {
            li.innerHTML = `${numero} <button type="button">Eliminar</button>`;
        } else {
            li.textContent = numero;
        }

        elemento.append(li);
    });

    if (elemento === nodeUlRepetidos) {
        const botoes = elemento.querySelectorAll('button');

        botoes.forEach((botao, indice) => {
            botao.addEventListener('click', () => {
                eliminarRepetido(lista[indice]);
            });
        });
    }
}


function eliminarRepetido(numero) {
    const posicao = repetidos.indexOf(numero);

    if (posicao !== -1) {
        repetidos.splice(posicao, 1);
    }

    atualizaLista(repetidos, nodeUlRepetidos);
    atualizaTotais();
    guardarDados();
}


function atualizaTotais() {
    nodeTotal.textContent = colecao.length;
    nodeTotalRepetidos.textContent = repetidos.length;
}


function guardarDados() {
    localStorage.setItem('colecao', JSON.stringify(colecao));
    localStorage.setItem('repetidos', JSON.stringify(repetidos));
}


// C. event listeners

const form = document.querySelector('#registar form');

form.onsubmit = (event) => {
    event.preventDefault();
    guardaCarta();
};


// Carregar as listas quando a página abre

atualizaLista(colecao, nodeUlColecao);
atualizaLista(repetidos, nodeUlRepetidos);

atualizaTotais();
