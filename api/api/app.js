const mongodb = require('./src/db')
const express = require('express')
const app = express()

const init = async () => {
  await mongodb.connect() // this line waits until db connection established
}

init()

app.get('/', async (req, res) => {
  mongodb.db.collection('notas').find({}).toArray((err, data) => {
    if (err != null) { res.send([]) }
    res.send(data)
  })
})

app.listen(3000, function () {
  console.log('App running!')
})
