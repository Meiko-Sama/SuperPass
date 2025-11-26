// Teste para ver o motivo do NODE estar morrendo
process.on("uncaughtException", (err) => {
  console.error("❌ Erro não tratado:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Promessa rejeitada sem catch:", reason);
});

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

const PORT = 8082 // onde vai rodar o back-end NO CELULAR

const app = express();

dotenv.config();
console.log("DB_NAME carregado:", process.env.DB_NAME);

app.use(cors());

app.use(express.json());

// conexão com o banco MYSQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
})

// Mostrar mensagem de erro se a conexão do BD funcionou ou não e o motivo dele
async function conexaoDB() {
  try {
    const conn = await pool.getConnection();
    console.log("✅ Conexão com MYSQL bem-sucedida!");
    conn.release();
  } catch (error) {
    console.error("❌ Erro de conexão com MYSQL:", error);
  }
}
conexaoDB();

// rota: FORMULARIO
app.post("/auth/Formulario", async (req, res) => {
  try {

    console.log("📩 Body recebido:", req.body);

    const {
      nome, idade, altura, peso,
      emagrecimento, hipertrofia, saude, condicionamento,
      mulher, homem
    } = req.body;

    console.log(nome, idade, peso)

    // Se algum campo estiver undefined
    if ([nome, idade, altura, peso, emagrecimento, hipertrofia, saude, condicionamento, mulher, homem].some(v => v === undefined)) { // Esse .some(v => === undefined) serve para verificar se tem algum campo que pelo menos esta enviando um dado indefinido!
      console.log("Algum campo está undefined");
      return res.status(400).json({ error: "Algum campo está faltando" });
    }
    const [result] = await pool.query(
      "INSERT INTO info (nome, idade, altura, peso, emagrecimento, hipertrofia, saude, condicionamento, mulher, homem) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [nome, idade, altura, peso, emagrecimento, hipertrofia, saude, condicionamento, mulher, homem]
    );
    console.log("✅ Inserido com sucesso:", result);
    res.status(201).json({ message: "Formulário cadastrado com sucesso!" });
  } catch (error) {
    console.error("❌ Erro ao inserir:", error);
    res.status(500).json({ error: "Erro ao continuar." });
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

//rota: verificarCODIGO

// app.post("/auth/verificarCodigo", async (req, res) => {
//   try {
//     const { codigo } = req.body;

//     if (!codigo) {
//       return res.status(400).json({ error: "Código não enviado!" });
//     }

//     const [rows] = await pool.query(
//       "SELECT * FROM codigos WHERE codigo = ?",
//       [codigo]
//     );

//     if (rows.length === 0) {
//       return res.status(404).json({ valid: false, error: "Código inválido!" });
//     }

//     return res.json({ valid: true, message: "Código válido!" });

//   } catch (error) {
//     console.log("Erro:", error);
//     return res.status(500).json({ error: "Erro ao verificar código" });
//   }
// });


console.log("Host:", process.env.DB_HOST);
console.log("User:", process.env.DB_USER);

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

app.get("/", (req, res) => {
  res.send("Servidor acessível!");
});

// iniciando o servidor:
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}!`)
});
