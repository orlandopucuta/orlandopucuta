const listaProdutos = document.querySelector("#lista-produtos");
const listaCesto = document.querySelector("#lista-cesto");
const total = document.querySelector("#total");
const filtroCategoria = document.querySelector("#filtro-categoria");
const ordenarPreco = document.querySelector("#ordenar-preco");
const pesquisaProduto = document.querySelector("#pesquisa-produto");

const formularioCompra = document.querySelector("#form-checkout");
const botaoComprar = document.querySelector("#botao-comprar");
const resultadoCompra = document.querySelector("#resultado-compra");
const estudanteDeisi = document.querySelector("#estudante-deisi");
const cupao = document.querySelector("#cupao");
const nomeCompra = document.querySelector("#nome-compra");

const urlApi = "https://deisishop.pw.deisi.ulusofona.pt";
const chaveCesto = "cesto-lab7-deisi";

let todosOsProdutos = [];
const cesto = JSON.parse(localStorage.getItem(chaveCesto) ?? "[]");

function guardarCesto() {
    localStorage.setItem(chaveCesto, JSON.stringify(cesto));
}

function criarArtigo(produto) {
    const artigo = document.createElement("article");

    const titulo = document.createElement("h3");
    titulo.textContent = produto.title;

    const imagem = document.createElement("img");
    imagem.src = new URL(produto.image, urlApi).href;
    imagem.alt = produto.title;

    const preco = document.createElement("p");
    preco.textContent = "Custo total: " + Number(produto.price).toFixed(2) + " €";

    artigo.append(titulo, imagem, preco);
    return artigo;
}

function mostrarProdutos(produtos) {
    listaProdutos.replaceChildren();

    if (produtos.length === 0) {
        listaProdutos.textContent = "Nenhum produto encontrado.";
        return;
    }

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

        artigo.append(descricao, botao);
        listaProdutos.appendChild(artigo);
    });
}

function mostrarCesto() {
    listaCesto.replaceChildren();
    let soma = 0;

    cesto.forEach(function (produto, indice) {
        const artigo = criarArtigo(produto);

        const botao = document.createElement("button");
        botao.textContent = "- Remover do Cesto";

        botao.addEventListener("click", function () {
            cesto.splice(indice, 1);
            guardarCesto();
            mostrarCesto();
        });

        artigo.appendChild(botao);
        listaCesto.appendChild(artigo);

        soma += Number(produto.price);
    });

    total.textContent = soma.toFixed(2);
}

function atualizarProdutos() {
    const categoria = filtroCategoria.value;
    const pesquisa = pesquisaProduto.value.trim().toLowerCase();

    const produtosVisiveis = todosOsProdutos.filter(function (produto) {
        const correspondeCategoria = categoria === "" || produto.category === categoria;
        const correspondePesquisa = produto.title.toLowerCase().includes(pesquisa);

        return correspondeCategoria && correspondePesquisa;
    });

    if (ordenarPreco.value === "crescente") {
        produtosVisiveis.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (ordenarPreco.value === "decrescente") {
        produtosVisiveis.sort((a, b) => Number(b.price) - Number(a.price));
    }

    mostrarProdutos(produtosVisiveis);
}

async function obterDados(caminho) {
    const resposta = await fetch(urlApi + caminho);

    if (!resposta.ok) {
        throw new Error("Erro HTTP " + resposta.status + " em " + caminho);
    }

    return resposta.json();
}

async function carregarProdutos() {
    try {
        todosOsProdutos = await obterDados("/products");
        atualizarProdutos();
        ordenarPreco.disabled = false;
        pesquisaProduto.disabled = false;
    } catch (erro) {
        listaProdutos.textContent = "Não foi possível carregar os produtos.";
        console.error(erro);
        return;
    }

    try {
        const categorias = await obterDados("/categories");

        categorias.forEach(function (categoria) {
            const opcao = document.createElement("option");
            opcao.value = categoria.name;
            opcao.textContent = categoria.name;
            filtroCategoria.appendChild(opcao);
        });

        filtroCategoria.disabled = false;
    } catch (erro) {
        filtroCategoria.options[0].textContent = "Categorias indisponíveis";
        console.error(erro);
    }
}

async function efetuarCompra(evento) {
    evento.preventDefault();

    if (botaoComprar.disabled) {
        return;
    }

    if (cesto.length === 0) {
        resultadoCompra.textContent = "Adiciona um produto ao cesto antes de comprar.";
        return;
    }

    const dadosCompra = {
        products: cesto.map(produto => produto.id),
        student: estudanteDeisi.checked,
        coupon: cupao.value.trim(),
        name: nomeCompra.value.trim()
    };

    botaoComprar.disabled = true;
    resultadoCompra.textContent = "A calcular o total da compra…";

    try {
        const resposta = await fetch(urlApi + "/buy", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosCompra)
        });

        const dados = await resposta.json().catch(() => null);

        if (!resposta.ok || dados?.error) {
            throw new Error(dados?.error || "Erro HTTP " + resposta.status);
        }

        if (dados?.totalCost == null || !dados.reference) {
            throw new Error("A API devolveu uma resposta incompleta.");
        }

        const valor = String(dados.totalCost).trim();
        const totalFinal = valor.includes("€") ? valor : valor + " €";

        resultadoCompra.textContent =
            `Total final: ${totalFinal} | Referência de pagamento: ${dados.reference}`;
    } catch (erro) {
        resultadoCompra.textContent = "Não foi possível concluir a compra. " + erro.message;
    } finally {
        botaoComprar.disabled = false;
    }
}

filtroCategoria.disabled = true;
ordenarPreco.disabled = true;
pesquisaProduto.disabled = true;

filtroCategoria.addEventListener("change", atualizarProdutos);
ordenarPreco.addEventListener("change", atualizarProdutos);
pesquisaProduto.addEventListener("input", atualizarProdutos);

formularioCompra.addEventListener("submit", efetuarCompra);
botaoComprar.disabled = false;

mostrarCesto();
carregarProdutos();