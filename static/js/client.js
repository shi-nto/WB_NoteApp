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
    let title = h4.value;
    let body = textareaValue.value;
    let dataToSend = {
        "title":h4.value,
        "body":textareaValue.value
      }
    dataToSend = JSON.stringify(dataToSend);
    const xhr = new XMLHttpRequest();
    xhr.open("post", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", function () {
      let data = JSON.parse(xhr.responseText);
      makeDivNote(data)
  });


  xhr.send(dataToSend);
           
})

const getNotes = () => {
    console.log("Hellooodofsdf");
    notesContainer.innerHTML = "";
    const xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.addEventListener("load", () => {
      if (xhr.status != 200) return alert("errorthis is the erreur" + xhr.response);
      let data = JSON.parse(xhr.response);
      console.log("it s here");
      data.forEach((ele) => makeDivNote(ele));
    });
    xhr.addEventListener("error", () => {
      alert("error");
    });
    xhr.send();    

}

const makeDivNote = (data)=>{
        const randomRotation = (Math.random() - 0.5) * 100;
        const color = getRandomLightColor();

        let div = document.createElement("div");
        let texteria = document.createElement("textarea");
        let btn = document.createElement("button");

        div.classList.add("box-container");
        div.style.transform = `rotate(${randomRotation}deg)`;
        texteria.setAttribute("disabled", true);
        texteria.style.backgroundColor = color;
        texteria.value = data.title + '\n' + data.noteBody + '\n' + data.dateOfCreation;  
        btn.classList.add("delete");
        btn.textContent = "x";
        textContainer.classList.toggle("none");
        div.appendChild(texteria);
        div.appendChild(btn)
        notesContainer.appendChild(div);
        btn.addEventListener('click', ()=>{
         const xhr = new XMLHttpRequest();
         xhr.open("delete", url + "/" + data.id, true);
         xhr.addEventListener('load',()=>{
            if (xhr.status != 200) return alert("error" + xhr.response);
         })
          xhr.send();
        })
      
    
    }



getNotes();

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