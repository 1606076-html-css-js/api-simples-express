/* ATENÇÃO:
- API meramente para fins de entendimento das aulas de FRONTEND
- Não utilizar este exemplo como base para construir uma API
  pois há erros de design de código e de segurança!
  
  Documentação para aprofundar:
  - Express (Hello World)
    https://expressjs.com/pt-br/starter/hello-world.html
  - Sequelize (Raw Queries)
    https://sequelize.org/docs/v6/core-concepts/raw-queries/
*/


escreva()
leia()



// Imports
const express = require('express')
const cors = require('cors')
const { Sequelize, QueryTypes } = require('sequelize')

// ====== Iniciando Servidor Express para disponibilizar os endpoints ======
const app = express()
app.use(express.json())
app.use(cors())

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`API rodando na porta ${port}!`)
})

// ====== Configurando conexão na base de dados ======
const DATABSE_USER = process.env.DATABSE_USER || 'postgres'
const DATABSE_PASS = process.env.DATABSE_PASS || 'postgres'
const DATABSE_HOST = process.env.DATABSE_HOST || 'localhost'
const DATABSE_PORT = process.env.DATABSE_PORT || 5432
const DATABSE_NAME = process.env.DATABSE_NAME || 'livraria'

const URL = `postgres://${DATABSE_USER}:${DATABSE_PASS}@${DATABSE_HOST}:${DATABSE_PORT}/${DATABSE_NAME}`
const sequelize = new Sequelize(
    URL
)

let dbError = false
sequelize.authenticate().catch(() => {
    dbError = true
})

// ====== Rotas da API ======

// Endpoint 'minhaapi.com/', mostrará a versão
app.get('/', (req, res) => {
    res.status(200).json(
        {
            message: `API online versão 01.00.00`,
            dbError: dbError === true
        }
    )
})

// Endpoint 'minhaapi.com/generica', POST mostrará exatamente o que foi recebido
app.post('/generica', (req, res) => {
    res.json(
        {
            mensagem: "Funcionou! Aqui é o retorno da API! Veja abaixo o que você enviou!",
            apiRecebeu: req.body
        })
})


/*
    Documentação de listagem de livros:
    Voce deve enviar um GET para https://api-aula.up.railway.app/livros
*/
// Endpoint 'minhaapi.com/livros', GET para mostrar todos os livros
app.get('/livros', async (req, res) => {
    const result = await sequelize.query(
        'SELECT * FROM livros',
        { type: QueryTypes.SELECT }
    );
    return res.json(result)
})

/*
    Documentação de cadastro de livros:
    Voce deve enviar um POST para https://api-aula.up.railway.app/livros
    E no corpo da requisição, enviar um JSON com os campos title e description
*/
// Endpoint 'minhaapi.com/livros', POST para cadastrar novo livro
app.post('/livros', async (req, res) => {
    if (!req.body.title) {
        return res.status(400).json(`Título é obrigatório!`)
    }

    await sequelize.query(
        `INSERT INTO livros
            (title, description)
        VALUES
            ('${req.body.title}', '${req.body.description}')`,
        { type: QueryTypes.INSERT }
    );

    return res.status(201).json(`Você cadastrou o livro ${req.body.title}`)
})

// Endpoint 'minhaapi.com/livros', DELETE para deletar todos os livros
app.delete('/livros', async (req, res) => {
    await sequelize.query(
        `DELETE FROM livros;`,
        { type: QueryTypes.DELETE }
    );

    return res.status(200).json("Todos os valores na base de dados foram DELETADOS!")
})


app.get('/jogadores', async (req, res) => {
    const result = await sequelize.query(
        'SELECT * FROM jogadores',
        { type: QueryTypes.SELECT }
    );
    return res.json(result)
})

app.post('/jogadores', async (req, res) => {
    if (!req.body.nome) {
        return res.status(400).json(`Nome é obrigatório!`)
    }

    await sequelize.query(
        `INSERT INTO jogadores
            (nome, idade)
        VALUES
            ('${req.body.nome}', '${req.body.idade}')`,
        { type: QueryTypes.INSERT }
    );

    return res.status(201).json(`Você cadastrou o jogador ${req.body.nome}`)
})

app.delete('/jogadores', async (req, res) => {
    await sequelize.query(
        `DELETE FROM jogadores;`,
        { type: QueryTypes.DELETE }
    );

    return res.status(200).json("Todos os valores na base de dados foram DELETADOS!")
})