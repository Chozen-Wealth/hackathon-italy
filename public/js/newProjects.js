import { projects } from "./class.js";
import { setProgress } from "./progressBar.js";

function createProjectCard(project, i) {
  let newProject = `
    <img src="${project.image}" alt="">
    <div class="project-right">
        <div class="project-top">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        </div>
        <div class="project-bot">
            <div class="project-details">
                <span>${project.likes} <i class="fa-solid fa-heart"></i></span>
                <span class="project-tags">${project.tags.join(" ")}</span>
                <span class="tag2">React</span>
                <span>${project.paid ? `Paid : Yes` : `Paid : No`}</span>
            </div>
            <div class="project-author">
                <img src="${project.authorAvatar}" alt="">
                <span>${project.author}</span>
            </div>
            <div class="project-actions">
                <button>View Project</button>
                <button class="btnJoinProject">Join Project</button>
            </div>
        </div>
        <div class="progress-container">
            <div class="progress-bar"></div>
            <p></p>
        </div>
    </div>
`;
setTimeout(() => {
    setProgress(project.money, project.fundingNeeded, i);
  }, 1);

return newProject;
}
let allProjects = [];
let allProjectscontainer = document.querySelector("#allProjects");

let newProject1 = new projects(1, "TechLab", "TechLab is the best place for people that want to find new exciting projects to work on or create their own and invite talents.", "../assets/images/techlab.jpg", "Neha", "../assets/images/neha.jpg", 0, ["Copywriting"], ["Need1"], true,10000, 0, false);
let newProject2 = new projects(2, "TripMates", "A platform where you can meet people or look for good places to eat or do activities anywhere in the world.", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6XB8lydESMCEiJC8AdESTGoYqftMLPFeJnQ&s", "Maxence", "../assets/images/maxence.jpg", 1023, ["Backend"], ["Need2"], true,20000, 20253, false);
let newProject3 = new projects(3, "VisionVoice AudioBooks", "We are a community that create ebooks for blind and disabled people.", "../assets/images/audioBook.jpg", "Benoit", "../assets/images/benoit.jpg", 422, ["Speaker"], ["Need3"],true ,50000, 10231, false);
let newProject4 = new projects(4, "Anime Box", "Anime Box is inspired by letterBox, a website that shares reviews about movies and series. The goal is to make the same thing but for anime fans...", "https://anime-box.com/wp-content/uploads/2023/03/animebox-logo2.jpg", "Marcus", "../assets/images/Marcus.jpg", 194, ["Copywriting"], ["Need1"], true,10000, 3789, false);

let project1 = document.createElement("div");
project1.innerHTML = createProjectCard(newProject1, 0);
allProjects.push(newProject1);
allProjectscontainer.appendChild(project1);
project1.classList.add("projet")

let project2 = document.createElement("div");
project2.innerHTML = createProjectCard(newProject2, 1);
allProjects.push(newProject2);
allProjectscontainer.appendChild(project2);
project2.classList.add("projet")

let project3 = document.createElement("div");
project3.innerHTML = createProjectCard(newProject3, 2);
allProjects.push(newProject3);
allProjectscontainer.appendChild(project3);
project3.classList.add("projet")

let project4 = document.createElement("div");
project4.innerHTML = createProjectCard(newProject4, 3);
allProjects.push(newProject4);
allProjectscontainer.appendChild(project4);
project4.classList.add("projet")


let btnJoinProject = document.querySelector(".btnJoinProject")
let fondJoinRequest = document.querySelector("#fondJoinRequest")
let btnRequestClose = document.querySelector(".btnRequestClose")

btnJoinProject.addEventListener("click", ()=> {
    fondJoinRequest.style.display = "flex"
})

btnRequestClose.addEventListener("click", ()=> {
    fondJoinRequest.style.display = "none"
    setTimeout(()=>{
        fondJoinAccept.style.display = "flex"
    }, 2000)
})

let fondJoinAccept = document.querySelector("#fondJoinAccept")
let btnAcceptClose = document.querySelector(".btnAcceptClose")
let myTechLab = document.querySelector("#myTechLab")

btnAcceptClose.addEventListener("click", ()=>{
    fondJoinAccept.style.display = "none"
    setTimeout(()=> {
        myTechLab.style.transform = "translateX(0px)"
    }, 500)
})