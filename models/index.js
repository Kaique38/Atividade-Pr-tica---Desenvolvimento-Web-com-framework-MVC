const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

const Categoria = sequelize.define('Categoria', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Produto = sequelize.define('Produto', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  quantidade: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

// Relação: uma categoria tem vários produtos; cada produto pertence a uma categoria
Categoria.hasMany(Produto, {
  as: 'produtos',
  foreignKey: { name: 'categoriaId', allowNull: false },
  onDelete: 'RESTRICT'
});
Produto.belongsTo(Categoria, {
  as: 'categoria',
  foreignKey: { name: 'categoriaId', allowNull: false }
});

module.exports = {
  sequelize,
  Categoria,
  Produto
};
