const { ObjectID } = require("mongodb")
const { mongoose } = require("./../server/db/mongoose")
const { Todo } = require("./../server/models/todo")
const { User } = require("./../server/models/user")

// const id = "597c0df793da1adf158b1153"
//
// if (!ObjectID.isValid(id)) {
//   console.log("ID not valid")
// }

// Todo.find({
//   _id: id
// })
//   .then(todos => console.log("Todos", todos))
//   .catch(err => console.log(err))
//
// Todo.findOne({
//   _id: id
// })
//   .then(todo => console.log("Todo", todo))
//   .catch(err => console.log(err))

// Todo.findById(id)
//   .then(todo => {
//     if (!todo) return console.log("No todo with given id")
//     console.log("Todo", todo)
//   })
//   .catch(err => console.log(err))


// User.findById - query works but not user - user found - print errors

const user_id = "597bd5107410184b7686ae51"

User.findById(user_id)
  .then(user => {
    if (!user) return console.log("No user with given id")
    console.log("User", user)
  })
  .catch(err => console.log(err))
