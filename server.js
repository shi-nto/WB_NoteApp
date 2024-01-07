const express = require('express');
const fs = require('fs');
const PORT = 3000;
const app = express();

app.use(express.static('./static'))
app.use(express.json())
let notes = [];

fs.readFile('./database/db.json' , (err , data) => {
  if(err)
    return console.log(err)

  notes = JSON.parse(data).Notes;
})

app.get('/notes' , (req , res) => {
  if(notes === null)
    return res.status(500).json({msg : 'error on the server'})

  res.status(200).json(notes)
})

app.listen(PORT , () => {
  console.log('server listening on port: ' + PORT)
})