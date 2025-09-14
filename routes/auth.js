const express = require('express');
const router = express.Router();
const { Usuario } = require('../models');
const bcrypt = require('bcrypt');

// Rota de debug para listar usuários
router.get('/debug-usuarios', async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
});

// Página de cadastro
router.get('/cadastro', (req, res) => {
    res.render('cadastro', { erro: null, sucesso: null });
});

// Cadastro de usuário
router.post('/cadastro', async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        const existe = await Usuario.findOne({ where: { email } });
        if (existe) {
            return res.render('cadastro', { erro: 'E-mail já cadastrado.', sucesso: null });
        }
        const hash = await bcrypt.hash(senha, 10);
        await Usuario.create({ nome, email, senha: hash });
        res.render('cadastro', { erro: null, sucesso: 'Usuário cadastrado com sucesso! Faça login.' });
    } catch (error) {
        res.render('cadastro', { erro: 'Erro ao cadastrar usuário.', sucesso: null });
    }
});

// Página de login
router.get('/login', (req, res) => {
    res.render('login', { titulo: 'Login', erro: null });
});

// Autenticação
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.render('login', { titulo: 'Login', erro: 'Usuário não encontrado.' });
        }
        const senhaOk = await bcrypt.compare(senha, usuario.senha);
        if (!senhaOk) {
            return res.render('login', { titulo: 'Login', erro: 'Senha incorreta.' });
        }
        req.session.usuarioLogado = { id: usuario.id, nome: usuario.nome, email: usuario.email };
        res.redirect('/');
    } catch (error) {
        console.error('Erro detalhado ao autenticar:', error);
        res.render('login', { titulo: 'Login', erro: 'Erro ao autenticar.' });
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = router;
