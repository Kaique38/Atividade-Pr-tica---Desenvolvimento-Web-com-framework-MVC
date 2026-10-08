const express = require('express');
const router = express.Router();

const { Categoria, Produto } = require('../models');

router.get('/', async (req, res) => {
  const categorias = await Categoria.findAll();
  res.render('categorias/index', { categorias });
});

router.get('/novo', (req, res) => {
  res.render('categorias/novo');
});

router.post('/', async (req, res) => {
  await Categoria.create(req.body);
  res.redirect('/categorias');
});

router.get('/:id/editar', async (req, res) => {
  const categoria = await Categoria.findByPk(req.params.id);
  res.render('categorias/editar', { categoria });
});

router.post('/:id', async (req, res) => {
  await Categoria.update(req.body, { where: { id: req.params.id } });
  res.redirect('/categorias');
});

router.post('/:id/deletar', async (req, res) => {
  const total = await Produto.count({ where: { categoriaId: req.params.id } });

  if (total > 0) {
    return res.status(400).send('Não é possível excluir: há produtos nesta categoria.');
  }

  await Categoria.destroy({ where: { id: req.params.id } });
  res.redirect('/categorias');
});

module.exports = router;