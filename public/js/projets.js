document.getElementById("create-project-btn").addEventListener("click", function () {
  document.getElementById("create-project-modal").style.display = "flex";
});

document.getElementById("close-modal-btn").addEventListener("click", function () {
  document.getElementById("create-project-modal").style.display = "none";
});

document.getElementById("create-project-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const projectName = document.getElementById("project-name").value;
  const projectDescription = document.getElementById("project-description").value;

  if (projectName && projectDescription) {
    addProjectToList(projectName, projectDescription);
    document.getElementById("create-project-modal").style.display = "none";
    document.getElementById("create-project-form").reset();
  }
});

function addProjectToList(name, description) {
  const projectList = document.getElementById("projects-list");
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
      <img src="https://via.placeholder.com/200" alt="Project image">
      <div class="card-body">
        <h3>${name}</h3>
        <p>${description}</p>
        <button class="btn">Voir le projet</button>
      </div>
    `;

  projectList.appendChild(card);
}

document.getElementById("all-projects-btn").addEventListener("click", function () {
  // Afficher tous les projets
  alert("Afficher tous les projets");
});

document.getElementById("my-projects-btn").addEventListener("click", function () {
  // Afficher uniquement les projets de l'utilisateur
  alert("Afficher mes projets");
});

// Création dynamique de projet
document.getElementById("projectForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("projectTitle").value.trim();
  const desc = document.getElementById("projectDesc").value.trim();
  const img = document.getElementById("projectImg").value.trim() || "https://via.placeholder.com/300";

  if (!title || !desc) return;

  const projectHTML = `
      <div class="col-md-4 mb-4">
        <div class="card h-100 shadow-sm">
          <img src="${img}" class="card-img-top" alt="${title}">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${desc}</p>
          </div>
          <div class="card-footer d-flex justify-content-between small text-muted">
            <span>🔍 0 vues</span>
            <span>⭐ -</span>
          </div>
        </div>
      </div>
    `;

  // Ajoute à la section "Mes projets"
  document.getElementById("myProjects").innerHTML += projectHTML;

  // Réinitialise le formulaire et ferme la modale
  document.getElementById("projectForm").reset();
  bootstrap.Modal.getInstance(document.getElementById("createProjectModal")).hide();
});

// Affiche la section des projets créés par l'utilisateur
document.querySelector(".btn-outline-secondary").addEventListener("click", () => {
  const section = document.getElementById("myProjectsSection");
  section.style.display = section.style.display === "none" ? "block" : "none";
});

let modalProjet = document.getElementById("creationProjet");
console.log(modalProjet);

modalProjet.addEventListener("DOMContentLoaded", function () {
  const dropArea = modalProjet .getElementById("dropArea");
  const fileInput = modalProjet .getElementById("fileInput");
  const imagePreview = modalProjet .getElementById("imagePreview");
  const fundingCheckbox = modalProjet .getElementById("needs-funding");
  const fundingDetails = modalProjet .getElementById("funding-details");
  const peopleTypesContainer = modalProjet .getElementById("peopleTypes");
  const addTypeBtn = modalProjet .getElementById("addTypeBtn");

  let files = [];
  let roleCounter = 0;

  // Common role types
  const commonRoles = ["Developer", "Designer", "Project Manager", "Marketer", "Content Writer", "QA Tester", "Data Analyst", "UX Researcher", "Product Owner", "DevOps Engineer"];

  // Toggle funding details
  fundingCheckbox.addEventListener("change", function () {
    fundingDetails.style.display = this.checked ? "block" : "none";
  });

  // Add new role type
  addTypeBtn.addEventListener("click", function () {
    addRoleType();
  });

  // Add initial role type
  addRoleType();

  function addRoleType() {
    const roleId = "role-" + roleCounter++;
    const roleDiv = document.createElement("div");
    roleDiv.className = "people-type";

    roleDiv.innerHTML = `
      <input type="number" min="1" value="1" id="${roleId}-count">
      <select class="role-select" id="${roleId}-type">
      ${commonRoles.map((role) => `<option value="${role}">${role}</option>`).join("")}
      <option value="other">Other...</option>
      </select>
      <button class="remove-type-btn" type="button"><i class="fa-solid fa-x"></i></button>
    `;

    peopleTypesContainer.appendChild(roleDiv);

    // Handle role type change to "other"
    const typeSelect = roleDiv.querySelector(".role-select");
    const otherInput = document.createElement("input");
    otherInput.type = "text";
    otherInput.placeholder = "Specify role";
    otherInput.style.display = "none";
    otherInput.className = "role-other-input";

    typeSelect.insertAdjacentElement("afterend", otherInput);

    typeSelect.addEventListener("change", function () {
      if (this.value === "other") {
        otherInput.style.display = "block";
        otherInput.focus();
      } else {
        otherInput.style.display = "none";
      }
    });

    // Handle remove button
    roleDiv.querySelector(".remove-type-btn").addEventListener("click", function () {
      peopleTypesContainer.removeChild(roleDiv);
    });
  }

  // Drop area click triggers file input
  dropArea.addEventListener("click", () => fileInput.click());

  // Handle file selection
  fileInput.addEventListener("change", function () {
    files = Array.from(this.files);
    displayImages();
  });

  // Prevent default drag behaviors
  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    dropArea.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  // Highlight drop area when item is dragged over it
  ["dragenter", "dragover"].forEach((eventName) => {
    dropArea.addEventListener(eventName, highlight, false);
  });

  ["dragleave", "drop"].forEach((eventName) => {
    dropArea.addEventListener(eventName, unhighlight, false);
  });

  function highlight() {
    dropArea.classList.add("highlight");
  }

  function unhighlight() {
    dropArea.classList.remove("highlight");
  }

  // Handle dropped files
  dropArea.addEventListener("drop", handleDrop, false);

  function handleDrop(e) {
    const dt = e.dataTransfer;
    files = Array.from(dt.files);
    displayImages();
  }

  // Display preview of images
  function displayImages() {
    imagePreview.innerHTML = "";

    files.forEach((file, index) => {
      if (!file.type.match("image.*")) return;

      const reader = new FileReader();

      reader.onload = (e) => {
        const previewItem = document.createElement("div");
        previewItem.className = "preview-item";

        previewItem.innerHTML = `
                      <img src="${e.target.result}" alt="Preview">
                      <button class="remove-btn" data-index="${index}">×</button>
                  `;

        imagePreview.appendChild(previewItem);

        // Add remove button functionality
        previewItem.querySelector(".remove-btn").addEventListener("click", function () {
          const indexToRemove = parseInt(this.getAttribute("data-index"));
          files.splice(indexToRemove, 1);
          displayImages();
        });
      };

      reader.readAsDataURL(file);
    });
  }
});
