// Importando Express
const express = require('express');

// Importando Cookies e Sessions
const session = require('express-session');
const cookieParser = require('cookie-parser');

// Inicilizando Express
const app = express();

// Definindo a porta para o Express
const port = 3000;

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


const loginUserInfo = [
    { id: 0, username: 'Felipe', password: '123', }
];

//Pagina de login
app.get('/login', (req, res) => {
    res.send(`
        <form onsubmit="doLogin(); return false;">
            <label for="username">Usuário:</label>
            <input type="text" id="username" required><br><br>

            <label for="password">Senha:</label>
            <input type="password" id="password" required><br><br>

            <input type="submit" value="Entrar">
        </form>
    `);
});


// Middleware para Autenticação de usuario
function authenticateUser(req, res, next) {
    const userId = req.cookies.userId;

    if (userId) {
        const user = loginUserInfo.find(u => u.id === parseInt(userId));

        if (user) {
            next();
        }

        else {
            res.clearCookie('userId');
            res.redirect('/login');
        }
    }

    else {
        res.redirect('/login');
    }
}

// Função de logout
function doLogout() {
    res.clearCookie('userId');
    res.redirect('/login');
}

// Rota Protegida
app.get('/home', (req, res) => {
    const userId = req.cookies.userId;

    if (userId) {
        const user = loginUserInfo.find(u => u.id === parseInt(userId));

        if (user) {
            res.send(`
                <h1>QUIET CarClub</h1>
                <p>Olá, ${user.username}!</p>

                <button onClick={doLogout}>Logout</button>
            `);
        }

        else {
            res.clearCookie('userId');
            res.redirect('/login');
        }
    }

    else {
        res.redirect('/login');
    }
});

// Subir Servidor
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}/login`)
});