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

// Imports
const express = require('express')
const cors = require('cors')
const { Sequelize, QueryTypes } = require('sequelize')

// ====== Iniciando Servidor Express para disponibilizar os endpoints ======
const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`API rodando na porta ${port}!`)
})

// ====== Configurando conexão na base de dados ======
const DATABSE_USER = process.env.DATABSE_USER || "postgres"
const DATABSE_PASS = process.env.DATABSE_PASS || "postgres"
const DATABSE_HOST = process.env.DATABSE_HOST || "localhost"
const DATABSE_PORT = process.env.DATABSE_PORT || "5432"
const DATABSE_NAME = process.env.DATABSE_NAME || "2023-02-20-12-api-express-simples"

const sequelize = new Sequelize(
    `postgres://${DATABSE_USER}:${DATABSE_PASS}@${DATABSE_HOST}:${DATABSE_PORT}/${DATABSE_NAME}`
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

// Endpoint 'minhaapi.com/livros', GET para mostrar todos os livros
app.get('/livros', async (req, res) => {
    const result = await sequelize.query(
        'SELECT * FROM livros',
        { type: QueryTypes.SELECT }
    );
    return res.json(result)
})

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