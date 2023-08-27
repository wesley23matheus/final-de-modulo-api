import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (request, response) => {
  return response.json("OK");
});

app.listen(4000, () => {
  console.log('Servidor rodando na porta 4000');
});

let recados = [];
let ultimoId = 0;
let usuarios = [
  { acesso: "marcelo", nome: "Marcelo Eltz", senha: "123123" },
  { acesso: "andrea", nome: "Andrea Noer", senha: "123456" },
];

//Login - POST
app.post("/login", (request, response) => {
  const dados = request.body;

  const usuarioLogado = usuarios.find(
    (item) => item.acesso === dados.acesso && item.senha === dados.senha
  );

  if (usuarioLogado) {
    return response
      .status(200)
      .json({ msg: "Usuário autenticado", usuario: usuarioLogado });
  }

  return response.status(401).json("Usuário sem acesso");
});

//Create - POST
app.post("/recados", (request, response) => {
  const recado = request.body;

  const novoRecado = {
    id: (ultimoId += 1),
    titulo: recado.titulo,
    descricao: recado.descricao,
  };

  recados.push(novoRecado);

  return response.status(200).json("Recado criado com sucesso");
});

//List - GET
app.get("/recados", (request, response) => {
  return response.status(200).json(recados);
});

// Delete
app.delete("/recados/:idRecado", (request, response) => {
  const recadoId = Number(request.params.idRecado);

  const indiceRecado = recados.findIndex((recado) => recado.id === recadoId);

  if (indiceRecado === -1) {
    return response.status(404).json("Recado não encontrado.");
  }

  recados.splice(indiceRecado, 1);

  return response.status(200).json("Recado excluído com sucesso.");
});
/*const express = require('express');
const cors = require('cors');

const app = express();

/* Configurar o CORS
const corsOptions = {
  origin: 'https://apirecados.onrender.com', // Altere para o domínio do seu site
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
};
*/
/*app.use(express.json());
app.use(cors());

// Dados de exemplo
const usuarios = [
  { id: 1, email: 'wesleynui40@gmail.com', senha: '123' },
];

const recados = [
  /*{ id: 1, titulo: 'Recado 1', descricao: 'Olá, este é o Recado 1', usuarioId: 1 },
  { id: 2, titulo: 'Recado 2', descricao: 'Olá, este é o Recado 2', usuarioId: 2 },
  { id: 3, titulo: 'Recado 3', descricao: 'Olá, este é o Recado 3', usuarioId: 3 },
  { id: 4, titulo: 'Recado 4', descricao: 'Olá, este é o Recado 4', usuarioId: 4 },
  { id: 5, titulo: 'Recado 5', descricao: 'Olá, este é o Recado 5', usuarioId: 5 },
  { id: 6, titulo: 'Recado 6', descricao: 'Olá, este é o Recado 6', usuarioId: 6 },
  { id: 7, titulo: 'Recado 7', descricao: 'Olá, este é o Recado 7', usuarioId: 7 },
  { id: 8, titulo: 'Recado 9', descricao: 'Olá, este é o Recado 8', usuarioId: 8 },
];

// Rota para criar uma nova conta de usuário (Método POST)
app.post('/contas', (req, res) => {
  const {nome, email, senha } = req.body;

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
});*/

// Rota para criar um novo recado (Método POST)
/*app.post('/recados', (req, res) => {
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

// Rota para obter todos os recados (com paginação) (Método GET)
app.get('/recados', (req, res) => {
  const array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  const itemsPorPagina = 3; // Número de recados por página
  const pagina = req.query.page || 1;

  const indiceInicial = (pagina - 1) * itemsPorPagina;
  const indiceFinal = pagina * itemsPorPagina -1;

  // Lista apenas os recados da página atual
  const recadosPaginados = recados.slice(indiceInicial, indiceFinal +1);

  const resposta = {
    mensagem: 'Recados da Página',
    numeroDePaginas: Math.ceil(recados.length / itemsPorPagina),
    recados: recadosPaginados,
  };
  res.json(resposta);
});

// Rota para obter todos os recados de um usuário (Método GET)
app.get('/recados/usuario/:usuarioId', (req, res) => {
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
});*/
//Create - POST
/*app.post("/recados", (request, response) => {
  const recado = request.body;

  const novoRecado = {
    id: (ultimoId += 1),
    titulo: recado.titulo,
    descricao: recado.descricao,
  };

  recados.push(novoRecado);

  return response.status(200).json("Recado criado com sucesso");
});

//List - GET
app.get("/recados", (request, response) => {
  return response.status(200).json(recados);
});

// Delete
app.delete("/recados/:idRecado", (request, response) => {
  const recadoId = Number(request.params.idRecado);

  const indiceRecado = recados.findIndex((recado) => recado.id === recadoId);

  if (indiceRecado === -1) {
    return response.status(404).json("Recado não encontrado.");
  }

  recados.splice(indiceRecado, 1);

  return response.status(200).json("Recado excluído com sucesso.");
});

// Rota para obter todas as contas de usuário (Método GET) foi aqui
app.get('/contas', (req, res) => {
  res.json(usuarios);
});

app.listen(4000, () => {
  console.log('Servidor rodando na porta 4000');
});*/



