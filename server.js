const express = require('express');
const app = express();

const usuarios = [];
const recados = [];

app.use(express.json());

// Rota para criar uma nova conta de usuário
app.post('/contas', (req, res) => {
  const { nome, email, senha } = req.body;

  const usuarioExistente = usuarios.find((usuario) => usuario.email === email);
  if (usuarioExistente) {
    res.status(400).json({ error: 'Já existe um usuário com esse e-mail' });
    return;
  }

  const novoUsuario = {
    id: usuarios.length + 1,
    nome,
    email,
    senha,
  };
  usuarios.push(novoUsuario);

  res.status(201).json({ message: 'Conta criada com sucesso' });
});

// Rota para fazer o login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  const usuario = usuarios.find((u) => u.email === email);
  if (!usuario || usuario.senha !== senha) {
    res.status(401).json({ error: 'Credenciais inválidas' });
    return;
  }

  res.json({ message: 'Login bem-sucedido' });
});

// Rota para criar um novo recado
app.post('/recados', (req, res) => {
  const { titulo, descricao } = req.body;

  const recado = {
    id: recados.length + 1,
    titulo,
    descricao,
    usuarioId: req.body.usuarioId,
  };
  recados.push(recado);

  res.status(201).json({ message: 'Recado criado com sucesso' });
});

// Rota para obter todos os recados de um usuário
app.get('/recados/:usuarioId', (req, res) => {
  const usuarioId = parseInt(req.params.usuarioId);

  const recadosDoUsuario = recados.filter((recado) => recado.usuarioId === usuarioId);
  res.json(recadosDoUsuario);
});

app.listen(3000, () => {
  console.log('Deu tudo certo');
  console.log('Servidor rodando na porta 3000');
});


