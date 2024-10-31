// Importando Express
const express = require('express');

// Importando Cookies e Sessions
const session = require('express-session');
const cookieParser = require('cookie-parser');

// Inicilizando Express
const app = express();

// Chamada da biblioteca Cookies
app.use(cookieParser());

// Chamada da biblioteca Session
app.use(session(
    {
        secret: 'minhaChave', // Cria uma chave para acessar os cookie
        resave: false, // Evita salvar sessões que não foram alteradas
        saveUninitialized: true // Salvar na guia anônima
    }
));

//================================================================
// Dados de Exemplos
const produtos = [
    { id: 1, nome: 'Alface', preco: 2 },
    { id: 2, nome: 'Pashimina', preco: 70 },
    { id: 3, nome: 'Pastel', preco: 6 }
]

// Estrutura Visual Página Produtos
app.get('/produtos', (req, res) => {
    res.send(`

        <h1>Lista de Produtos</h1>
        <ul>
        ${produtos.map(produto =>
        `<li>${produto.nome} - R$ ${produto.preco}
                    <a href="/adicionar/${produto.id}">Adicionar ao Carrinho</a>
                </li>`).join('')
        }
        </ul>

        <a href="/carrinho">Ver Carrinho</a>

    `);
});

// Rota de adicionar produto
app.get('/adicionar/:id', (req, res) => {
    const id = parseInt(req.params.id); // Armazena o ID

    const produto = produtos.find((p) => p.id === id); // Verifica se o produto existe

    if (produto) {
        // Inicializa carrinho vazio se ainda não iniciado
        if (!req.session.carrinho) {
            req.session.carrinho = [];
        }
        // Adiciona o produto ao carrinho
        req.session.carrinho.push(produto);
    }

    res.redirect('/produtos'); // Redireciona para a lista de produtos
});

// Rota do carrinho
app.get('/carrinho', (req, res) => {
    const carrinho = req.session.carrinho || []; // Coleta os produtos adicionados no carrihno ou retorna vazio

    res.send(`

        <h1>Carrinho</h1>
        <ul>
        ${carrinho.map(produto =>
        `<li>${produto.nome} - R$ ${produto.preco}</li>`).join('')
        }
        </ul>

        <a href="/produtos">Continuar Comprando</a>
    `);
})

// Subindo Servidor
app.listen(8080);   