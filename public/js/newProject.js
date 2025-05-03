document.addEventListener("DOMContentLoaded", function () {
  const dropArea = document.getElementById("dropArea");
  const fileInput = document.getElementById("fileInput");
  const imagePreview = document.getElementById("imagePreview");
  const fundingCheckbox = document.getElementById("needs-funding");
  const fundingDetails = document.getElementById("funding-details");
  const peopleTypesContainer = document.getElementById("peopleTypes");
  const addTypeBtn = document.getElementById("addTypeBtn");

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
