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

// ---------- ROTAS -----------------------------------------------------

// LOGIN
app.post("/auth/login", async (req, res) => {
  try {
    const { nome, idade, altura, peso } = req.body;

    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email])
    if (rows.length === 0) {
      return res.status(400).json({ error: "Usuário não encontrado!" })
    }

    const usuario = rows[0];

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: "Senha incorreta!" });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JTW_SECRET,
      { expiresIn: "1h" }
    )

    res.json({ message: "Login bem sucedido!", token })

  } catch {
    console.log(error);
    res.status(500).json({ error: "Erro ao fazer login!" })
  }
})

