const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const PORT = 3000

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "040-123456",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "040-123456",
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "040-123456",
  }
]

app.get('/info', (req, res) => {
  res.send(`Phonebook has infor dor ${persons.length} people<br />
  ${new Date()}`)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.post('/api/persons', (req, res) => {
  const nextId = Math.max(Math.max(...persons.map(e => e.id))) + 1
  const { name, number } = req.body
  const isExist = persons.find(e => e.name.toLowerCase() === name.toLowerCase())
  if ((name && number) && !isExist) {
    const person = {
      id: nextId,
      name: name,
      number: number
    }
    persons.push(person)
    res.json(person)
  } else {
    res.status(400).json({
      error: !isExist ? 'el nombre y el numero son obligatorios' : 'el usuario ya existe'
    })
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

app.listen(PORT)
console.log("Server running on port " + PORT)