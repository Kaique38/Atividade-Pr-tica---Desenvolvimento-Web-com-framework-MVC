const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

const { Produto, Categoria } = require('../models');

router.get('/', async (req, res) => {
  const busca = (req.query.busca || '').trim();
  const produtos = await Produto.findAll({
    where: busca ? { nome: { [Op.like]: `%${busca}%` } } : {},
    include: [{ model: Categoria, as: 'categoria' }]
  });
  res.render('produtos/index', { produtos, busca });
});

router.get('/categoria/:id', async (req, res) => {
  const categoria = await Categoria.findByPk(req.params.id);
  if (!categoria) return res.status(404).send('Categoria não encontrada.');

  const produtos = await Produto.findAll({
    where: { categoriaId: categoria.id }
  });

  res.render('produtos/categoria', { categoria, produtos });
});

router.get('/novo', async (req, res) => {
  const categorias = await Categoria.findAll();
  res.render('produtos/novo', { categorias });
});

router.post('/', async (req, res) => {
  const categoria = await Categoria.findByPk(req.body.categoriaId);
  if (!categoria) return res.status(400).send('Categoria inválida.');
  await Produto.create(req.body);
  res.redirect('/produtos');
});

router.get('/:id/editar', async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);
  const categorias = await Categoria.findAll();
  res.render('produtos/editar', { produto, categorias });
});

router.post('/:id', async (req, res) => {
  const categoria = await Categoria.findByPk(req.body.categoriaId);
  if (!categoria) return res.status(400).send('Categoria inválida.');
  await Produto.update(req.body, { where: { id: req.params.id } });
  res.redirect('/produtos');
});

router.post('/:id/deletar', async (req, res) => {
  await Produto.destroy({ where: { id: req.params.id } });
  res.redirect('/produtos');
});

module.exports = router;
