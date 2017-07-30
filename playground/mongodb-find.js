const { MongoClient, ObjectID } = require("mongodb")

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
    return console.log("Unable to connect to MongoDb server")
  }

  console.log("Connected to MongoDb server")

  // db.collection("Todos").find({
  //   _id: new ObjectID("597a9b9f4926297bdfe31cc7")
  // })
  // .toArray()
  // .then((docs) => {
  //   console.log("Todos")
  //   console.log(JSON.stringify(docs, undefined, 2))
  // }, err => {
  //   console.log("Unable to fetch todos", err)
  // })

  // db.collection("Todos")
  //   .find()
  //   .count()
  //   .then(count => console.log(`Todos count: ${count}`))
  //   .catch(err => console.log("Unable to fetch todos", err))

  db.collection("Users")
    .find({
      name: "Cameron"
    })
    .toArray()
    .then(docs => console.log(JSON.stringify(docs, undefined, 2)))
    .catch(err => console.log("Unable to fetch todos", err))

  // db.close()
})
