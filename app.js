const express = require('express');
const app = express();
const path = require('path');
const sequelize = require('./config/database');
const { Item, Categoria, Fabricante, Usuario } = require('./models');

// Importa os arquivos de rota
const indexRouter = require('./routes/index');
const dadosRouter = require('./routes/dados');

// Configurações do EJS e arquivos estáticos
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Usando os arquivos de rota
app.use('/', indexRouter);
app.use('/dados', dadosRouter); // A rota /dados agora usa o arquivo dados.js
app.use('/formulario', dadosRouter); // E o formulario também

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
