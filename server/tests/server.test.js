const expect = require("expect")
const request = require("supertest")
const { ObjectID } = require("mongodb")

const { app } = require("./../server")
const { Todo } = require("./../models/todo")
const { User } = require("./../models/user")

const todos = [
  {
    _id: new ObjectID(),
    text: "First test todo",
    completed: false,
    completedAt: null
  },
  {
    _id: new ObjectID(),
    text: "Second test todo",
    completed: true,
    completedAt: 333
  }
]

// const users = [
//   {
//     _id: new ObjectID(),
//
//   },
//   {
//     _id: new ObjectID()
//   }
// ]

beforeEach(done => {
  Todo.remove({})
  .then(() => {
    return Todo.insertMany(todos)
  })
  .then(() => done())
})

describe("POST /todos", () => {
  it("should create a new todo", done => {
    let text = "Test todo text"

    request(app)
      .post("/todos")
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text)
      })
      .end((err, res) => {
        if (err) return done(err)

        Todo.find({ text })
          .then(todos => {
            expect(todos.length).toBe(1)
            expect(todos[0].text).toBe(text)
            done()
          })
          .catch(err => done(err))
      })
  })

  it("should not create todo with invalid body data", done => {
    request(app)
      .post("/todos")
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)

        Todo.find()
          .then(todos => {
            expect(todos.length).toBe(2)
            done()
          })
          .catch(err => done(err))

      })
  })
})

describe("GET /todos", () => {
  it("should get all todos", done => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2)
        expect(res.body.todos[0].text).toBe(todos[0].text)
      })
      .end(done)
  })

})

describe("GET /todos/:id", () => {
  it("should return todo doc", done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text)
      })
      .end(done)
  })

  it("should return 404 if todo not found", done => {
    // make sure you get 404 back
    const id = new ObjectID()
    request(app)
      .get(`/todos/${id.toHexString()}`)
      .expect(404)
      .end(done)
  })

  it("should return 404 for non-object ids", done => {
    // todos/123
    request(app)
      .get(`/todos/123`)
      .expect(404)
      .end(done)
  })
})

describe("DELETE /todos/:id", () => {
  it("should delete todo with given id", done => {
    const hexId = todos[1]._id.toHexString()

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[1].text)
      })
      .end((err, res) => {
        if (err) return done(err)

        Todo.findById(hexId)
          .then(todo => {
            expect(todo).toNotExist()
            done()
          })
          .catch(err => done(err))
      })
  })

  it("should return 404 if todo not found", done => {
    const id = new ObjectID()
    request(app)
      .delete(`/todos/${id.toHexString()}`)
      .expect(404)
      .end(done)
  })

  it("should return 404 for not-object ids", done => {
    request(app)
      .delete("todos/123")
      .expect(404)
      .end(done)
  })
})

describe("PATH /todos/:id", () => {
  it("should update todo", (done) => {
    const hexId = todos[0]._id.toHexString()
    const completed = true
    request(app)
      .patch(`/todos/${hexId}`)
      .send({ completed })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        Todo.findById(hexId)
          .then(todo => {
            expect(todo.completed).toBe(completed)
            expect(todo.completedAt).toBeA("number")
            done()
          })
          .catch(err => done(err))
      })
  })
  it("should clear completedAt when todo is not completed", done => {
    const hexId = todos[1]._id.toHexString()
    const completed = false
    request(app)
      .patch(`/todos/${hexId}`)
      .send({ completed })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)

        Todo.findById(hexId)
          .then(todo => {
            expect(todo.completed).toBe(completed)
            expect(todo.completedAt).toNotExist()
            done()
          })
          .catch(err => done(err))
      })
  })
})

describe("POST /users", () => {
  it("should create a new user user", done => {
    const user = {
      email: "admin@example.com",
      password: "password"
    }

    request(app)
      .post(`/users`)
      .send({
        email: user.email,
        password: user.password
      })
      .expect(200)
      .expect(res => {
        expect(res.body.email).toBe(user.email)
        expect(res.body.password).toBe(user.password)
      })
      .end((err, res) => {
        if (err) return done(err)

        User.find({ email: user.email })
          .then(users => {
            expect(users.length).toBe(1)
            expect(users[0].email).toBe(user.email)
            done()
          })
          .catch(err => done(err))
      })
  })
})
