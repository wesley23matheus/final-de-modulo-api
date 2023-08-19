const express = require ('express');
const cors = require('cors');

const app = express();
// Configurar o CORS
const corsOptions = {
  origin: 'https://apirecados.onrender.com', // Altere para o domínio
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
};
app.use(express.json());
app.use(cors(corsOptions));

const usuarios = [
  { id: 1, nome: 'wesley', email: 'wesleynui40@gmail.com', senha: '123' },
  { id: 2, nome: 'Usuário 2', email: 'usuario2@example.com', senha: 'senha456' },
];
const recados = [ 
{ id: 1, mensagem: 'Recado 1' },
{ id: 2, mensagem: 'Recado 2' },
{ id: 3, mensagem: 'Recado 3' },
{ id: 2, mensagem: 'Recado 2' },
{ id: 3, mensagem: 'Recado 3' },
];

// Rota para criar uma nova conta de usuário (Método POST)
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

// Rota para fazer o login (Método POST)
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  const usuario = usuarios.find((u) => u.email === email);
  if (!usuario || usuario.senha !== senha) {
    res.status(401).json({ error: 'Credenciais inválidas' });
    return;
  }

  res.json({ message: 'Login bem-sucedido' });
});

// Rota para criar um novo recado (Método POST)
app.post('/recados', (req, res) => {
  const { titulo, descricao, usuarioId } = req.body;

  const recado = {
    id: recados.length + 1,
    titulo,
    descricao,
    usuarioId,
  };
  recados.push(recado);

  res.status(201).json({ message: 'Recado criado com sucesso' });
});

// Rota para obter todos os recados de um usuário (Método GET)
app.get('/recados/:usuarioId', (req, res) => {
  const usuarioId = parseInt(req.params.usuarioId);

  const recadosDoUsuario = recados.filter((recado) => recado.usuarioId === usuarioId);
  res.json(recadosDoUsuario);
});

// Rota para atualizar um recado (Método PUT)
app.put('/recados/:id', (req, res) => {
  const recadoId = parseInt(req.params.id);
  const { titulo, descricao } = req.body;

  const recado = recados.find((r) => r.id === recadoId);
  if (!recado) {
    res.status(404).json({ error: 'Recado não encontrado' });
    return;
  }

  recado.titulo = titulo;
  recado.descricao = descricao;

  res.json({ message: 'Recado atualizado com sucesso' });
});

// Rota para excluir um recado (Método DELETE)
app.delete('/recados/:id', (req, res) => {
  const recadoId = parseInt(req.params.id);

  const recadoIndex = recados.findIndex((r) => r.id === recadoId);
  if (recadoIndex === -1) {
    res.status(404).json({ error: 'Recado não encontrado' });
    return;
  }

  recados.splice(recadoIndex, 1);

  res.json({ message: 'Recado excluído com sucesso' });
});

// Rota para obter todas as contas de usuário (Método GET)
app.get('/contas', (req, res) => {
  res.json(usuarios);
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
