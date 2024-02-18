import pg from 'pg'
import express from 'express'
import bodyParser from 'body-parser';

// Database Connection
const db = new pg.Client({
  // configpostgres:
  connectionString: 'postgres://jbdztohs:CyKK_oEPn0qZxP-svsqhH9iy-x_kckvd@silly.db.elephantsql.com/jbdztohs',
  password: 'CyKK_oEPn0qZxP-svsqhH9iy-x_kckvd',
  user: 'jbdztohs',
  database: 'jbdztohs'
})
db.connect()

const server = express();
server.set('view engine', 'ejs')
server.use(bodyParser.urlencoded({ extended: false }))

// ENDPOINT: /
// ? GET
// * gets all todos
server.get("/", async (req, res) => {
  const dbtodos = await db.query("Select * from todos")
  res.render("index", { todos: dbtodos.rows })
})

server.post("/add", async (req, res) => {
  const todo = req.body.todo
  await db.query(`INSERT INTO todos (task) VALUES ('${todo}')`)
  res.redirect('/')
})

// DELETE ENDPOINT
server.post("/delete", async(req, res) => {
  const id = req.body.todo
  await db.query(`DELETE FROM todos WHERE id = ${id}`)
  res.redirect('/')
})

server.listen(3000, () => {
  console.log("Server started on port: 3000")
})
