const express = require('express');
const router = express.Router();
const { Post, Categoria, Usuario } = require('../models');

// Página inicial exibe posts do blog
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [
                { model: Categoria, as: 'Categoria' },
                { model: Usuario, as: 'Usuario' }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.render('index', {
            titulo: 'Blog - Página Inicial',
            posts: posts
        });
    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        res.status(500).send('Erro ao carregar os posts.');
    }
});

module.exports = router;