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

const PORT = 3001 // onde vai rodar o back-end
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

// rota: CADASTRO
app.post("/auth/cadastro", async (req, res) => {
  try {
    const { nome, idade, altura, peso
    } = req.body;

    // verificação dos campos
    if (!nome, !idade, !altura, !peso) {
      return res.status(400).json({ error: "Preencha todos os campos!" });
    }

    await pool.query(
      "INSERT INTO docinho (nome, idade, altura, peso) VALUES (?, ?, ?, ?)",
      [nome, idade, altura, peso]
    );

    res.status(201).json({ message: "Usuário criado com sucesso!" })

    // mensagem de erro
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Erro ao registrar o usuário." })
  }
});

// rota: LOGIN
/* app.post("/auth/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    console.log(email, senha)

    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email])
    if (rows.length === 0) {
      return res.status(400).json({ error: "Usuário não encontrado." })
    }

    const usuario = rows[0];
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    // token do usuário (assinatura digital)
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    )

    res.json({ message: "Login bem sucedido!", token })

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error ao fazer login!" })
  }
}) */

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
