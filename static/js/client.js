const submit = document.getElementById("submit")
const empty = document.querySelector("#remove")
const mainContainer = document.querySelector(".main-container")
const addNoteBtn = document.querySelector("#addNotes")
const notesContainer = document.querySelector(".notes-container");
const boxContainer = document.querySelector(".box-container")
const textContainer = document.querySelector(".containers")
let h4 = document.getElementById("hd")
let textareaValue = textContainer.querySelector('#note-text');
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
        let btn2 = document.createElement("button");

        div.classList.add("box-container");
        div.style.transform = `rotate(${randomRotation}deg)`;
        texteria.setAttribute("disabled", true);
        texteria.style.backgroundColor = color;
        texteria.value = data.title + '\n' + data.noteBody + '\n' + data.dateOfCreation;  
        btn.classList.add("delete");
        btn.classList.add("delete");
        btn2.textContent = "edit";
        btn.textContent = "x";
        textContainer.classList.toggle("none");
        div.appendChild(texteria);
        div.appendChild(btn)
        div.appendChild(btn2);
        notesContainer.appendChild(div);
        btn2.addEventListener('click', ()=>{
            texteria.removeAttribute("disabled");
            texteria.style.backgroundColor = "white";
            texteria.style.color = "black";
            texteria.style.border = "1px solid black";
            btn2.textContent = "save";
            btn2.addEventListener('click', ()=>{
                texteria.setAttribute("disabled", true);
                texteria.style.backgroundColor = color;
                texteria.style.color = "white";
                texteria.style.border = "none";
                btn2.textContent = "edit";
                let dat = textareaValue.value;
                let io = dat.split('\n');
                let dataToSend = {
                    "title":io[0],
                    "body":io[1],
                  }
                dataToSend = JSON.stringify(dataToSend);
                const xhr = new XMLHttpRequest();
                xhr.open("put", url + "/" + data.id, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.addEventListener("load", function () {
                  let data = JSON.parse(xhr.responseText);
                  console.log(data);
              });
            
              xhr.send(dataToSend);
            })
        
        })
        btn.addEventListener('click', ()=>{
         const xhr = new XMLHttpRequest();
         xhr.open("delete", url + "/" + data.id, true);
         xhr.addEventListener('load',()=>{
            if (xhr.status != 200) return alert("error" + xhr.response);
         })
          xhr.send();
          div.remove();
        })
      
    
    }



getNotes();