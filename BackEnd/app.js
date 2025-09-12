// import express
const express = require("express");

// import cors
const cors = require("cors");

// import dotenv
const dotenv = require("dotenv");

// import mysql2
const mysql = require("mysql2/promise");

// import bcrypt
const bcrypt = require("bcrypt");
// import jsonwebtoken
const jwt = require("jsonwebtoken");

const PORT = 8081 // onde vai rodar o back-end
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

// conexão com o banco MYSQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
})

// rota: FORMULARIO
app.post("/auth/Formulario", async (req, res) => {
  try {
    const { nome, idade, altura, peso
    } = req.body;

    // verificação dos campos
    if (!nome || !idade || !altura || !peso) {
      return res.status(400).json({ error: "Preencha todos os campos!" });
    }

    await pool.query(
      "INSERT INTO info (nome, idade, altura, peso, emagrecimento, hipertrofia, saude, condicionamento, mulher, homem) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [nome, idade, altura, peso, emagrecimento, hipertrofia, saude, condicionamento, mulher, homem]
    );
    console.log("REQ BODY:", req.body);


    res.status(201).json({ message: "Formulário cadastrado com sucesso!" })

    // mensagem de erro
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Erro ao continuar." })
  }
});

// rota: CADASTRO
app.post("/auth/Cadastro", async (req, res) => {
  try {
    const { nome, idade, altura, peso } = req.body;

    console.log(nome, idade, altura, peso)

    const [rows] = await pool.query(
      "SELECT * FROM info WHERE nome=? AND idade=? AND altura=? AND peso=?",
      [nome, idade, altura, peso]
    );

    if (rows.length === 0) {
      return res.status(400).json({ error: "Usuário não encontrado." })
    }
    const usuario = rows[0];

    // token do usuário (assinatura digital)
    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    )

    res.json({ message: "cadastro bem sucedido!", token })

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error ao fazer cadastro!" })
  }
})

// -------------- Devolução das informações para o usuário-----------
// MIDDLEWARE ↪ intermediário entre a requisição e a respostas
// Middleware:
function autenticarToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // se o token não for fornecido:
  if (!token) {
    return res.status(401).json({ error: "Token não fornecido!" })
  }

  // verificar se o token está correto:
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido!" })
    }
    req.user = user;
    next();
  })
}

async function conexaoDB() {
  try {
    const conn = await pool.getConnection();
    console.log("Conexão com MYSQL bem-sucedida!");
    conn.release();
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}

// iniciando o servidor:
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}!`)
});
