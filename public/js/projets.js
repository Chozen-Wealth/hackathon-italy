const btnCreateForm = document.querySelector("#btnCreateForm")
const allModal = document.querySelector("#allModal")
const createProjectModal = document.querySelector("#createProjectModal")
const modalbackdrop = document.querySelector(".modal-backdrop")
const body = document.getElementsByTagName("body")[0]
let div = body.querySelectorAll("body > div")

let dragAndDropZone = document.getElementById("DragAndDropZone")
let preview = document.getElementById("imagePreview")
let fileInput = document.getElementById("fileInput")

dragAndDropZone.addEventListener("dragover", (e)=>{
  e.preventDefault()
  e.stopPropagation()
  dragAndDropZone.classList.add("hover")
})
dragAndDropZone.addEventListener("dragleave", (e)=>{
  e.preventDefault()
  dragAndDropZone.classList.remove("hover")
})
dragAndDropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  e.stopPropagation();

  const files = Array.from(e.dataTransfer.files);
  preview.innerHTML = '';

  files.forEach(file => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const img = document.createElement('img');
        img.src = event.target.result;
        preview.appendChild(img);
      };
      reader.readAsDataURL(file);
    }
  });
});
fileInput.addEventListener('change', () => {
  handleFiles(fileInput.files);
});

// === FONCTION COMMUNE POUR AFFICHER LES IMAGES ===
function handleFiles(files) {
  const fileList = Array.from(files);
  preview.innerHTML = '';

  fileList.forEach(file => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = document.createElement('img');
        img.src = event.target.result;
        preview.appendChild(img);
      };
      reader.readAsDataURL(file);
    }
  });
}

let fondBoxCreate = document.querySelector("#fondBoxCreate")
let btnCreate = document.querySelector(".btnCreate")
let btnClose = document.querySelector("#BoxCreateClose")
let projet1 = document.getElementsByClassName("projet")

btnCreateForm.addEventListener("click", ()=>{
  fondBoxCreate.style.display = "none"
  projet1[0].style.animation = "projetCreate 1.5s ease forwards"
  projet1[0].style.display = "flex"
})
btnCreate.addEventListener("click", ()=>{
  fondBoxCreate.style.display = "flex"
})
btnClose.addEventListener("click", ()=>{
  fondBoxCreate.style.display = "none"
})

let peopleTypes = document.querySelector("#peopleTypes")
let addTypeBtn = document.querySelector("#addTypeBtn")

addTypeBtn.addEventListener("click", ()=>{
  let newType = document.createElement("span")
})

