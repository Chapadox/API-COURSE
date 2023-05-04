import express from 'express';
const app = express();

app.use(express.json())

// mock
const db = [ 
    {id: 1, name: "Eduardo", idade: 16},
    {id: 2, name: "Wilker", idade: 20},
    {id: 3, name: "Amanda", idade: 26},
    {id: 4, name: "Junior", idade: 29},
]

// FUNÇÕES AUXILIARES
function BuscaPorID(id) {
    return db.filter (db => db.id == id)
}

function BuscaIdUser (id) {
    return db.findIndex( user => user.id == id)
}

// ROTAS CRUD COMPLETO.
app.get ('/', (req, res) => {
    res.send('Pagina inicial')
})

app.get('/users/:id', (req, res) => {
    res.json(BuscaPorID(req.params.id))
})

app.get ('/users', (req, res) => {
    res.status(200).send(db)
})

app.post('/users', (req, res) => {
        db.push(req.body)
        res.status(201).send('Item Adicionado com sucesso')
})

app.delete ('/users/:id', (req,res) => {
    let index = BuscaIdUser(req.params.id) 
    db.splice(index, 1)
    res.send(`Usuario de id: ${index} foi deletado`)
})

app.put ('/users/:id', (req,res) => {
   let id = BuscaIdUser(req.params.id)
   db[id].name = req.body.name
   db[id].idade = req.body.idade
   res.json(db)
})

export default app;
