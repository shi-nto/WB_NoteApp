const submit = document.getElementById("submit")
const empty = document.querySelector("#remove")
const mainContainer = document.querySelector(".main-container")
const addNoteBtn = document.querySelector("#addNotes")
const notesContainer = document.querySelector(".notes-container");
const boxContainer = document.querySelector(".box-container")
const textContainer = document.querySelector(".containers")
let textareaValue = textContainer.querySelector('#note-text');
const h4 = document.getElementById("hd")
const url = "http://localhost:3000/notes"
addNoteBtn.addEventListener('click', () => {
    textareaValue.value = "";
    textContainer.classList.toggle("none")
})
empty.addEventListener('click', (e) => {
    textareaValue.value = "";
})
function getRandomLightColor() {
    const threshold = 150;
    
    const red = Math.floor(Math.random() * (255 - threshold) + threshold);
    const green = Math.floor(Math.random() * (255 - threshold) + threshold);
    const blue = Math.floor(Math.random() * (255 - threshold) + threshold);

    const redDiff = 255 - red;
    const greenDiff = 255 - green;
    const blueDiff = 255 - blue;

    const lightRed = red + Math.floor(Math.random() * redDiff);
    const lightGreen = green + Math.floor(Math.random() * greenDiff);
    const lightBlue = blue + Math.floor(Math.random() * blueDiff);
    const color = `rgb(${lightRed}, ${lightGreen}, ${lightBlue})`;

    return color;
}

submit.addEventListener('click', (event) => {
    event.preventDefault();
    console.log(h4.value);
    const xhr = new XMLHttpRequest();
    xhr.open("post", url, true);
    xhr.addEventListener("load", function () {
    if (xhr.status == 200) {
        console.log("success");
    } else {
      console.log("error");
    }
  });
  let dataToSend = {
    "title":h4.value,
    "noteBody":textareaValue.value
  }
  console.log(dataToSend);
  xhr.send(dataToSend);
   //  
   makeDivNote();          
})

const makeDivNote = ()=>{
    if (textareaValue.value != "") {
        const randomRotation = (Math.random() - 0.5) * 100;
        const color = getRandomLightColor();
        let div = document.createElement("div");
        let texteria = document.createElement("textarea");
        let btn = document.createElement("button");

        div.classList.add("box-container");
        div.style.transform = `rotate(${randomRotation}deg)`;
        texteria.setAttribute("disabled", true);
        texteria.style.backgroundColor = color;
        texteria.value = textareaValue.value;
        btn.classList.add("delete");
        btn.textContent = "x";
        textContainer.classList.toggle("none");
        div.appendChild(texteria);
        notesContainer.appendChild(div);
    }
}

function deleteNotes() {
    let deleteNotesBtn = document.querySelectorAll(".delete");
    deleteNotesBtn.forEach(function (button) {
        button.addEventListener('click', (event) => {
            event.target.parentElement.remove();
            let taskText = event.target.parentElement.querySelector('textarea').value.trim();
            let index = tasks.indexOf(taskText);
            if (index !== -1) {
                tasks.splice(index, 1);
                // Save tasks to local storage
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
            });
    });
}



/*
submit.addEventListener('click', (e) => {
    e.preventDefault();
    if (textareaValue.value != "") {
        if (textareaValue.value != "") {
            normal long old code
            let boxContainer = document.createElement('div');
            boxContainer.classList.add('box-container')
            let createNotes = document.createElement('textarea')
            createNotes.value = textareaValue.value;
            createNotes.setAttribute('disabled', true);
            let deletebtn = document.createElement('button');
            deletebtn.setAttribute("id", "delete");
            deletebtn.textContent = "x";
            notesContainer.appendChild(boxContainer);
            boxContainer.appendChild(createNotes);
            boxContainer.appendChild(deletebtn);
            textContainer.classList.toggle("none")
        }
    }
})*/