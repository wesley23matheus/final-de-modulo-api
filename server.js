/*const express = require ('express');
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
});*/

import express from "express";
import cors from "cors";
const app = express();

// Configurar o CORS
const corsOptions = {
  origin: 'https://apirecados.onrender.com', // Altere para o domínio
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
};
app.use(express.json());
app.use(cors(corsOptions));


app.get("/", function (requisicao, resposta) {
  resposta.status(200);
  resposta.send("Bem vindo a minha primeira API!");
})

const usuarios = [
  {nome: "teste",
email: "teste@teste.com",
senha: "12345",
}
];
let identificadorUnicoUsuario = 0;

const recados = [{titulo: "teste1",
descricao: "Boa noite growdever",
identificador: 0,
},
{titulo: "teste2",
descricao: "Boa tarde growdever",
identificador: 1,
},
{titulo: "teste3",
descricao: "Bom dia growdever",
identificador: 2,
},
{titulo: "teste4",
descricao: "Boa noite growdever",
identificador: 3,
},
{titulo: "teste5",
descricao: "Boa tarde growdever",
identificador:4,
},
{titulo: "teste6",
descricao: "Bom dia growdever",
identificador: 5,
},
{titulo: "teste7",
descricao: "Boa noite growdever",
identificador: 6,
},
{titulo: "teste8",
descricao: "Boa tarde growdever",
identificador: 7,
},
{titulo: "teste9",
descricao: "Bom dia growdever",
identificador: 8,
}];
let identificadorUnicoRecado = 0;


app.post("/usuarios", function (requisicao, resposta) {


  const bodyInvalido =
    !requisicao.body.nome || !requisicao.body.senha || !requisicao.body.email;
  
  const existeEmail = usuarios.some(function (usuario) {
    return usuario.email === requisicao.body.email;
  });
  if (bodyInvalido) {
    resposta.status(400);
    resposta.send("Dados inválidos");
  } else if (existeEmail) {
    resposta.status(400);
    resposta.send("Email já cadastrado");
  } else {
   
    const novoUsuario = {
      nome: requisicao.body.nome,
      senha: requisicao.body.senha,
      email: requisicao.body.email,
    };
    novoUsuario.identificador = identificadorUnicoUsuario;
    identificadorUnicoUsuario++;
    usuarios.push(novoUsuario);
    resposta.json({
      mensagem: "Usuário criado com sucesso",
      usuario: novoUsuario,
    });
  }
});

app.post("/usuarios/login", function (requisicao, resposta) {
  const email = requisicao.body.email;
  const senha = requisicao.body.senha;

  const usuarioEncontrado = usuarios.find(function (usuario) {
    return usuario.email === email && usuario.senha === senha;
  });
  if (usuarioEncontrado) {
    resposta.json({
      mensagem: "Usuário logado com sucesso",
      usuario: usuarioEncontrado,
    });
  } else {
    resposta.status(401);
    resposta.send("Email ou senha inválidos");
  }
});

app.post("/recados", function (requisicao, resposta) {
  const bodyInvalido = !requisicao.body.titulo || !requisicao.body.descricao;
  if (bodyInvalido) {
    resposta.status(400);
    resposta.send("Dados inválidos");
  } else {
    const novoRecado = {
      titulo: requisicao.body.titulo,
      descricao: requisicao.body.descricao,
    };
    novoRecado.identificador = identificadorUnicoRecado;
    identificadorUnicoRecado++;
    recados.push(novoRecado);
    resposta.json({
      mensagem: "Recado criado com sucesso",
      recado: novoRecado,
    });
  }
});

app.get("/recados", function (requisicao, resposta) {

  const page = requisicao.query.page; 
  if (page < 1) {
    return resposta.status(400).send("Página inválida") 
  }
 
  const recadosPorPagina = 5;
  const maxPage =  Math.ceil(recados.length/recadosPorPagina);
  if (page > maxPage) {
    return resposta.status(400).send("Página inválida"); 
  }
  const messages = recados.slice((page-1)*recadosPorPagina, page*recadosPorPagina);
  
  
  resposta.json({
    quantidade: recados.length,
    recados: messages,
  });
});

app.get("/recados/:id", function (requisicao, resposta) {
  const id = parseInt(requisicao.params.id);
  const recadoEncontrado = recados.find(function (recado) {
    return recado.identificador === id;
  });
  if (recadoEncontrado) {
    resposta.json({
      mensagem: "Recado encontrado",
      recado: recadoEncontrado,
    });
  } else {
    resposta.status(404);
    resposta.send("Recado não encontrado");
  }

});


app.put("/recados/:id", function (requisicao, resposta) {
  const bodyInvalido = !requisicao.body.titulo || !requisicao.body.descricao;
  // atualizar um recado
  const id = parseInt(requisicao.params.id);
  const recadoEncontrado = recados.find(function (recado) {
    return recado.identificador === id;
  });
  if (bodyInvalido) {
    resposta.status(400);
    resposta.send("Dados inválidos");
  } else if (!recadoEncontrado) {
    resposta.status(404);
    resposta.send("Recado não encontrado");
  } else {
    recadoEncontrado.titulo = requisicao.body.titulo;
    recadoEncontrado.descricao = requisicao.body.descricao;
    resposta.json({
      mensagem: "Recado atualizado com sucesso",
      recado: recadoEncontrado,
    });
  }
});

app.delete("/recados/:id", function (requisicao, resposta) {
  const id = parseInt(requisicao.params.id);
  const indice = recados.findIndex(function (recado) {
    return recado.identificador === id;
  });
  if (indice === -1) {
    resposta.status(404);
    resposta.send("Recado não encontrado");
  } else {
    recados.splice(indice, 1);
    resposta.json({
      mensagem: "Recado removido com sucesso",
    });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

