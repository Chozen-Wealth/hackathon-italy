import { projects } from "./class.js";
import { setProgress } from "./progressBar.js";

function createProjectCard(project, i) {
  let newProject = `
    <img src="${project.image}" alt="">
    <div class="project-info">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
    </div>
    <div class="project-author">
        <img src="${project.authorAvatar}" alt="">
        <span>${project.author}</span>
        <span>${project.likes} Likes</span>
    </div>
    <div class="project-details">
        <span>${project.tags.join(" ")}</span>
        <span>${project.needs.join(" ")}</span>
        <span>${project.paid ? `Paid : Yes` : `Paid : No`}</span>
    </div>
    <div class="project-actions">
        <button>View Project</button>
        <button>Join Project</button>
    </div>
    <div class="progress-container">
        <div class="progress-bar"></div>
    </div>
`;
setTimeout(() => {
    setProgress(project.money, project.fundingNeeded, i);
  }, 1);

return newProject;
}
let allProjects = [];
let allProjectscontainer = document.querySelector("#allProjects");

let newProject1 = new projects(1, "Project 1", "Description of project 1", "https://placehold.co/200x200", "Author 1", "https://placehold.co/50x50", 10, ["Tag1", "Tag2"], ["Need1"], 10000, 10000, false);
let newProject2 = new projects(2, "Project 2", "Description of project 2", "https://placehold.co/200x200", "Author 2", "https://placehold.co/50x50", 20, ["Tag3", "Tag4"], ["Need2"], 1000, 500, false);
let newProject3 = new projects(3, "Project 3", "Description of project 3", "https://placehold.co/200x200", "Author 3", "https://placehold.co/50x50", 30, ["Tag5", "Tag6"], ["Need3"], 1000, 500, false);

let project1 = document.createElement("div");
project1.innerHTML = createProjectCard(newProject1, 0);
allProjects.push(newProject1);
allProjectscontainer.appendChild(project1);

let project2 = document.createElement("div");
project2.innerHTML = createProjectCard(newProject2, 1);
allProjects.push(newProject2);
allProjectscontainer.appendChild(project2);

let project3 = document.createElement("div");
project3.innerHTML = createProjectCard(newProject3, 2);
allProjects.push(newProject3);
allProjectscontainer.appendChild(project3);
