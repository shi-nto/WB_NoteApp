const express = require('express');
const fs = require('fs');
const { verifyNote , verifyPathId } = require('./controller')
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

app.post('/notes' , verifyNote ,(req , res) => {
  const {title , body} = req.body;
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateToSave = [year, month, day].join('-');
  fs.readFile('./database/db.json' , (err , data) => {
    if(err)
      return console.log(err)

    let notesInfo = JSON.parse(data);
    let noteToSave = {
      id: notesInfo.lastId,
      title,
      dateOfCreation: dateToSave,
      noteBody: body
    }
    notesInfo.Notes.push(noteToSave);
    notesInfo.lastId++;
    fs.writeFile('./database/db.json' , JSON.stringify(notesInfo , null , 2) , (err) => {
      if(err)
        return res.status(500).json({msg : "error will writing on the server"})

      res.status(201).json(noteToSave)
    })
  })
})

app.delete('/notes/:id', verifyPathId ,(req , res) => {
  console.log('delete');
  const id = req.params.id;
  console.log(id);

  fs.readFile('./database/db.json' , (err , data) => {
    if(err)
      return console.log(err)

    let notesInfo = JSON.parse(data);
    let notesData = notesInfo.Notes;
    const noteToDelete = notesData.findIndex((note) => note.id == id );
    console.log(noteToDelete);

    if(noteToDelete === -1)
      return res.status(404).json({msg : "note not found"})

    let notesToSave = notesData.filter((note) => {
      return note.id != id
    })
    
    console.log(notesToSave);
    notesInfo.Notes = notesToSave;
    fs.writeFile('./database/db.json' , JSON.stringify(notesInfo , null , 2) , (err) => {
      if(err)
        return res.status(500).json({msg : "error will writing on the server"})

      res.status(200).json({msg : "note was deleted"})
    })
  })
})

app.listen(PORT , () => {
  console.log('server listening on port: ' + PORT)
})