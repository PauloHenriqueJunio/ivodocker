const express = require('express');
const router = express.Router();
const { Item, Categoria, Fabricante } = require('../models');

// Rota para a tela de dados.
router.get('/', async (req, res) => {
    try {
        const dadosDoBanco = await Item.findAll({
            include: [Categoria, Fabricante]
        });
        res.render('dados', {
            titulo: 'Gerenciamento de Dados',
            dadosDoBanco: dadosDoBanco
        });
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        res.status(500).send('Erro ao carregar os dados.');
    }
});

// Rota para o formulário de inclusão.
router.get('/formulario', async (req, res) => {
    res.render('formulario', {
        titulo: 'Cadastrar Novo Item',
        item: null
    });
});

// Rota para o formulário de edição de um item específico.
router.get('/formulario/:id', async (req, res) => {
    let item = null;
    try {
        item = await Item.findByPk(req.params.id, {
            include: [Categoria, Fabricante]
        });
        if (!item) {
            return res.status(404).send('Item não encontrado para edição.');
        }
    } catch (error) {
        console.error('Erro ao buscar item para edição:', error);
        return res.status(500).send('Erro ao carregar item para edição.');
    }
    res.render('formulario', {
        titulo: 'Editar Item',
        item: item
    });
});

// Rota para SALVAR um novo item.
router.post('/salvar-item', async (req, res) => {
    try {
        const { nome, descricao, categoriaId, fabricanteId } = req.body;
        await Item.create({ nome, descricao, categoriaId, fabricanteId });
        console.log('Novo item salvo com sucesso!');
        res.redirect('/dados');
    } catch (error) {
        console.error('Erro ao salvar o item:', error);
        res.status(500).send('Erro ao salvar o item.');
    }
});

// Rota para ATUALIZAR um item que já existe.
router.post('/salvar-item/:id', async (req, res) => {
    try {
        const { nome, descricao, categoriaId, fabricanteId } = req.body;
        const itemId = req.params.id;
        const item = await Item.findByPk(itemId);
        if (item) {
            await item.update({ nome, descricao, categoriaId, fabricanteId });
            console.log(`Item com ID ${itemId} atualizado com sucesso!`);
        } else {
            return res.status(404).send('Item para atualização não encontrado.');
        }
        res.redirect('/dados');
    } catch (error) {
        console.error('Erro ao atualizar o item:', error);
        res.status(500).send('Erro ao atualizar o item.');
    }
});

// Rota para EXCLUIR um item.
router.post('/deletar-item/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const linhasDeletadas = await Item.destroy({
            where: { id: itemId }
        });
        if (linhasDeletadas > 0) {
            console.log(`Item com ID ${itemId} excluído com sucesso!`);
        } else {
            console.log(`Item com ID ${itemId} não encontrado para exclusão.`);
        }
        res.redirect('/dados');
    } catch (error) {
        console.error('Erro ao excluir o item:', error);
        res.status(500).send('Erro ao excluir o item.');
    }
});

module.exports = router;
