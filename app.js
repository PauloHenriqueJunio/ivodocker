const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const sequelize = require('./config/database');
require('./models');
const { Post, Categoria, Usuario } = require('./models');
const logger = require('./config/logger');


app.use(session({
    secret: 'segredo-super-seguro',
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    res.locals.usuarioLogado = req.session ? req.session.usuarioLogado : null;
    next();
});

const indexRouter = require('./routes/index');
const dadosRouter = require('./routes/dados');
const authRouter = require('./routes/auth');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/', indexRouter);
app.use('/dados', dadosRouter);
app.use('/', authRouter);

(async () => {
  const categoriasPadrao = [
    { nome: 'Tecnologia' },
    { nome: 'Educação' },
    { nome: 'Saúde' },
    { nome: 'Esporte' }
  ];
  
  try {
    await Categoria.bulkCreate(categoriasPadrao, {
      ignoreDuplicates: true
    });
    logger.info('Categorias padrão verificadas/criadas com sucesso.');
  } catch (error) {
    logger.error('Erro ao criar categorias padrão:', error);
  }
})();

sequelize.sync({ force: true })
    .then(() => {
        logger.info('Banco de dados sincronizado com sucesso.');

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            logger.info(`Servidor rodando em http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        logger.error('Erro ao sincronizar o banco de dados:', { message: err.message });
    });
