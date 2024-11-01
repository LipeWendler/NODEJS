// Importando bibliotecas
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

// Iniciando EXPRESS e definindo PORTA
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Configuração da Sessão
app.use(
    session({
        secret: '123456',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    })
);


app.use(express.static(path.join(__dirname)));

const user = { username: 'Felipe', password: '123' };

// Página de login
app.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="pt">
      <head>
        <meta charset="UTF-8">
        <title>Login</title>
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <h1>VERIFICAÇÃO <br>DE CREDENCIAIS<br></h1>
        <div class="container">
          <h2>Login</h2>
          <form action="/login" method="POST">
            <input type="text" name="username" placeholder="Usuário" required>
            <input type="password" name="password" placeholder="Senha" required>
            <button type="submit">Entrar</button>
          </form>
        </div>
      </body>
      </html>
    `);
});

// Rota para autenticação
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === user.username && password === user.password) {
        req.session.authenticated = true;
        res.cookie('username', username, { httpOnly: true });
        res.redirect('/protected');
    } else {
        res.send('<p style="text-align: center; color: red;">Credenciais inválidas!<br><a href="/">Tente novamente</a></p>');
    }
});

// Middleware para verificar se o usuário está autenticado
function isAuthenticated(req, res, next) {
    if (req.session.authenticated) {
        next();
    } else {
        res.redirect('/');
    }
}

// Página protegida
app.get('/protected', isAuthenticated, (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="pt">
    <head>
      <meta charset="UTF-8">
      <title>Página Protegida</title>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <div class="container">
        <h2>Bem-vindo à Página Protegida!</h2>
        <p>Somente usuários autenticados podem ver este conteúdo.</p>
        <p><a href="/logout">Logout</a></p>
      </div>
    </body>
    </html>
  `);
});

// Rota para logout
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('username');
        res.redirect('/');
    });
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`URL do servidor: https://localhost:${PORT}`);
});