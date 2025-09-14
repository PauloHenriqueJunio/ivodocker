const { Categoria } = require('./models');

async function criarCategorias() {
  const categorias = [
    { nome: 'Tecnologia' },
    { nome: 'Educação' },
    { nome: 'Saúde' }
  ];
  for (const cat of categorias) {
    await Categoria.findOrCreate({ where: { nome: cat.nome } });
  }
  console.log('Categorias criadas ou já existentes!');
  process.exit();
}

criarCategorias();
