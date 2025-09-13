const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const sequelize = require('./config/database');
const { Post, Categoria, Usuario } = require('./models');

// Configuração do express-session
app.use(session({
    secret: 'segredo-super-seguro',
    resave: false,
    saveUninitialized: false
}));

// Middleware para passar usuário logado para as views
app.use((req, res, next) => {
    res.locals.usuarioLogado = req.session ? req.session.usuarioLogado : null;
    next();
});

// Importa os arquivos de rota
const indexRouter = require('./routes/index');
const dadosRouter = require('./routes/dados');
const authRouter = require('./routes/auth');

// Configurações do EJS e arquivos estáticos
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuração do express-session
app.use(session({
    secret: 'segredo-super-seguro',
    resave: false,
    saveUninitialized: false
}));

// Usando os arquivos de rota
app.use('/', indexRouter);
app.use('/dados', dadosRouter);
app.use('/', authRouter);

// Sincroniza com os bancos de dados e inicia o servidor
sequelize.sync({ force: false })
    .then(() => {
        console.log('Banco de dados sincronizado.');
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Erro ao sincronizar o banco de dados:', err);
    });
