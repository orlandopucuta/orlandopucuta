const listaProdutos = document.querySelector("#lista-produtos");
const listaCesto = document.querySelector("#lista-cesto");
const total = document.querySelector("#total");

let cesto = [];

// Recuperar os produtos guardados depois do reload.
const cestoGuardado = localStorage.getItem("cesto-lab7-deisi");

if (cestoGuardado !== null) {
    cesto = JSON.parse(cestoGuardado);
}

function guardarCesto() {
    localStorage.setItem("cesto-lab7-deisi", JSON.stringify(cesto));
}

function criarArtigo(produto) {
    const artigo = document.createElement("article");

    const titulo = document.createElement("h3");
    titulo.textContent = produto.title;

    const imagem = document.createElement("img");
    imagem.src = produto.image;
    imagem.alt = produto.title;

    const preco = document.createElement("p");
    preco.textContent = "Custo total: " + produto.price.toFixed(2) + " €";

    artigo.appendChild(titulo);
    artigo.appendChild(imagem);
    artigo.appendChild(preco);

    return artigo;
}

function mostrarProdutos() {
    listaProdutos.innerHTML = "";

    produtos.forEach(function (produto) {
        const artigo = criarArtigo(produto);

        const descricao = document.createElement("p");
        descricao.className = "descricao";
        descricao.textContent = produto.description;

        const botao = document.createElement("button");
        botao.textContent = "+ Adicionar ao Cesto";

        botao.addEventListener("click", function () {
            cesto.push(produto);
            guardarCesto();
            mostrarCesto();
        });

        artigo.appendChild(descricao);
        artigo.appendChild(botao);
        listaProdutos.appendChild(artigo);
    });
}

function mostrarCesto() {
    listaCesto.innerHTML = "";

    let soma = 0;

    cesto.forEach(function (produto, indice) {
        const artigo = criarArtigo(produto);

        const botao = document.createElement("button");
        botao.textContent = "- Remover do Cesto";

        botao.addEventListener("click", function () {
            // Remove apenas esta unidade do produto.
            cesto.splice(indice, 1);
            guardarCesto();
            mostrarCesto();
        });

        artigo.appendChild(botao);
        listaCesto.appendChild(artigo);

        soma = soma + produto.price;
    });

    total.textContent = soma.toFixed(2);
}

mostrarProdutos();
mostrarCesto();