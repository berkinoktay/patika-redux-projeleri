const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const { json } = require('body-parser');
const { nanoid } = require('nanoid');

dotenv.config({ path: './config.env' });

const app = express();

app.use(cors());
app.use(json());

let todos = [
  {
    id: nanoid(),
    text: 'todo 1',
    completed: true,
  },
  {
    id: nanoid(),
    text: 'todo 2',
    completed: false,
  },
  {
    id: nanoid(),
    text: 'todo 3',
    completed: false,
  },
  {
    id: nanoid(),
    text: 'todo 4',
    completed: false,
  },
  {
    id: nanoid(),
    text: 'todo 5',
    completed: false,
  },
];

app.get('/todos', (req, res) => res.send(todos));
app.get('/todos/clear', (req, res) => {
  const filteredTodo = todos.filter((todo) => todo.completed === false);
  todos = filteredTodo;
  res.send(todos);
});
app.post('/todos', (req, res) => {
  const todo = { text: req.body.text, id: nanoid(), completed: false };
  todos.push(todo);
  return res.send(todo);
});

app.patch('/todos/:id', (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id == id);
  const completed = Boolean(req.body.completed);
  if (index > -1) {
    todos[index].completed = completed;
  }
  return res.send(todos[index]);
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id == id);
  if (index > -1) {
    todos.splice(index, 1);
  }

  res.send(todos);
});

const PORT = 9000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.green.bold));
