document.getElementById('create-project-btn').addEventListener('click', function() {
    document.getElementById('create-project-modal').style.display = 'flex';
  });
  
  document.getElementById('close-modal-btn').addEventListener('click', function() {
    document.getElementById('create-project-modal').style.display = 'none';
  });
  
  document.getElementById('create-project-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const projectName = document.getElementById('project-name').value;
    const projectDescription = document.getElementById('project-description').value;
  
    if (projectName && projectDescription) {
      addProjectToList(projectName, projectDescription);
      document.getElementById('create-project-modal').style.display = 'none';
      document.getElementById('create-project-form').reset();
    }
  });
  
  function addProjectToList(name, description) {
    const projectList = document.getElementById('projects-list');
    const card = document.createElement('div');
    card.classList.add('card');
    
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
  
  document.getElementById('all-projects-btn').addEventListener('click', function() {
    // Afficher tous les projets
    alert('Afficher tous les projets');
  });
  
  document.getElementById('my-projects-btn').addEventListener('click', function() {
    // Afficher uniquement les projets de l'utilisateur
    alert('Afficher mes projets');
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
  