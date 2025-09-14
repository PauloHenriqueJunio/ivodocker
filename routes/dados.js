const express = require('express');
const router = express.Router();
const { Post, Categoria, Usuario } = require('../models');

// Listar todos os posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [
                { model: Categoria, as: 'Categoria' },
                { model: Usuario, as: 'Usuario' }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.render('dados', {
            titulo: 'Blog - Postagens',
            posts: posts
        });
    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        res.status(500).send('Erro ao carregar os posts.');
    }
});

// Formulário para novo post
router.get('/formulario', async (req, res) => {
    const categorias = await Categoria.findAll();
    const usuarios = await Usuario.findAll();
    res.render('formulario', {
        titulo: 'Novo Post',
        post: null,
        categorias,
        usuarios
    });
});

// Formulário para editar post
router.get('/formulario/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [
                { model: Categoria, as: 'Categoria' },
                { model: Usuario, as: 'Usuario' }
            ]
        });
        if (!post) {
            return res.status(404).send('Post não encontrado para edição.');
        }
    const categorias = await Categoria.findAll();
    const usuarios = await Usuario.findAll();
        res.render('formulario', {
            titulo: 'Editar Post',
            post,
            categorias,
            usuarios
        });
    } catch (error) {
        console.error('Erro ao buscar post para edição:', error);
        res.status(500).send('Erro ao carregar post para edição.');
    }
});

// Criar novo post
router.post('/salvar-post', async (req, res) => {
    try {
        if (!req.session.usuarioLogado || !req.session.usuarioLogado.id) {
            return res.status(403).send('Você precisa estar logado para criar um post.');
        }
            console.log('Dados recebidos no salvar-post:', req.body);
            const { titulo, conteudo, categoriaId } = req.body;
            await Post.create({
                titulo,
                conteudo,
                categoriaId: Number(categoriaId),
                usuarioId: req.session.usuarioLogado.id
            });
        res.redirect('/dados');
    } catch (error) {
        console.error('Erro ao salvar o post:', error);
        res.status(500).send('Erro ao salvar o post.');
    }
});

// Atualizar post
router.post('/editar-post/:id', async (req, res) => {
    try {
        if (!req.session.usuarioLogado || !req.session.usuarioLogado.id) {
            return res.status(403).send('Você precisa estar logado para editar um post.');
        }
        const { titulo, conteudo, categoriaId } = req.body;
        await Post.update(
            {
                titulo,
                conteudo,
                categoriaId,
                usuarioId: req.session.usuarioLogado.id
            },
            { where: { id: req.params.id } }
        );
        res.redirect('/dados');
    } catch (error) {
        console.error('Erro ao editar o post:', error);
        res.status(500).send('Erro ao editar o post.');
    }
});

// Excluir post
router.post('/excluir-post/:id', async (req, res) => {
    try {
        await Post.destroy({ where: { id: req.params.id } });
        res.redirect('/dados');
    } catch (error) {
        console.error('Erro ao excluir o post:', error);
        res.status(500).send('Erro ao excluir o post.');
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
