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
                <button>Join Project</button>
            </div>
        </div>
        <div class="progress-container">
            <div class="progress-bar"></div>
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

let newProject1 = new projects(1, "Anime Box", "Anime Box is inspired by letterBox, a website that shares reviews about movies and series. The goal is to make the same thing but for anime fans...", "https://anime-box.com/wp-content/uploads/2023/03/animebox-logo2.jpg", "Mathis", "../assets/images/people1.png", 10, ["Copywriting"], ["Need1"], true,10000, 10000, false);
let newProject2 = new projects(2, "TripMates", "Description of project 2", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6XB8lydESMCEiJC8AdESTGoYqftMLPFeJnQ&s", "Author 2", "https://placehold.co/50x50", 20, ["Backend"], ["Need2"], true,1000, 500, false);
let newProject3 = new projects(3, "Project 3", "Description of project 3", "https://placehold.co/200x200", "Author 3", "https://placehold.co/50x50", 30, ["Tag"], ["Need3"],true ,1000, 500, false);

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
