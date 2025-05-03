document.addEventListener("DOMContentLoaded", () => {
  const modalProjet = document.getElementById("creationProjet");

  const dropArea = modalProjet.querySelector("#dropArea");
  const fileInput = modalProjet.querySelector("#fileInput");
  const imagePreview = modalProjet.querySelector("#imagePreview");
  const fundingCheckbox = modalProjet.querySelector("#needs-funding");
  const fundingDetails = modalProjet.querySelector("#funding-details");
  const peopleTypesContainer = modalProjet.querySelector("#peopleTypes");
  const addTypeBtn = modalProjet.querySelector("#addTypeBtn");

  let files = [];
  let roleCounter = 0;

  const commonRoles = ["Developer", "Designer", "Project Manager", "Marketer", 
                      "Content Writer", "QA Tester", "Data Analyst", 
                      "UX Researcher", "Product Owner", "DevOps Engineer"];

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

    const typeSelect = roleDiv.querySelector(".role-select");
    const otherInput = document.createElement("input");
    otherInput.type = "text";
    otherInput.placeholder = "Specify role";
    otherInput.style.display = "none";
    otherInput.className = "role-other-input";

    typeSelect.insertAdjacentElement("afterend", otherInput);

    typeSelect.addEventListener("change", function() {
      otherInput.style.display = this.value === "other" ? "block" : "none";
      if (this.value === "other") otherInput.focus();
    });

    roleDiv.querySelector(".remove-type-btn").addEventListener("click", function() {
      roleDiv.remove();
    });
  }


  fundingCheckbox.addEventListener("change", function() {
    fundingDetails.style.display = this.checked ? "block" : "none";
  });

  addTypeBtn.addEventListener("click", addRoleType);
  addRoleType();

  dropArea.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", function() {
    files = Array.from(this.files);
    displayImages();
  });

  ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
  });

  ["dragenter", "dragover"].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
  });

  ["dragleave", "drop"].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
  });

  dropArea.addEventListener("drop", handleDrop, false);

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function highlight() {
    dropArea.classList.add("highlight");
  }

  function unhighlight() {
    dropArea.classList.remove("highlight");
  }

  function handleDrop(e) {
    const dt = e.dataTransfer;
    files = Array.from(dt.files);
    displayImages();
  }

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
        
        previewItem.querySelector(".remove-btn").addEventListener("click", () => {
          files.splice(index, 1);
          displayImages();
        });
        
        imagePreview.appendChild(previewItem);
      };
      reader.readAsDataURL(file);
    });
  }
});