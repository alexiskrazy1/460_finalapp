let entries = JSON.parse(localStorage.getItem("entries")) || [];

function saveToStorage() {
  localStorage.setItem("entries", JSON.stringify(entries));
}

function renderEntries() {
  const list = document.getElementById("entriesList");
  list.innerHTML = "";

  entries.forEach((entry, index) => {
    const li = document.createElement("li");

    const text = document.createElement("p");
    text.textContent = entry;

    const btnContainer = document.createElement("div");
    btnContainer.className = "entry-buttons";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editEntry(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => deleteEntry(index);

    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);

    li.appendChild(text);
    li.appendChild(btnContainer);
    list.appendChild(li);
  });
}

function addEntry() {
  const input = document.getElementById("entryInput");
  if (input.value.trim() === "") return;

  entries.push(input.value);
  input.value = "";

  saveToStorage();
  renderEntries();
}

function editEntry(index) {
  const newText = prompt("Update your entry:", entries[index]);
  if (newText !== null && newText.trim() !== "") {
    entries[index] = newText;
    saveToStorage();
    renderEntries();
  }
}

function deleteEntry(index) {
  entries.splice(index, 1);
  saveToStorage();
  renderEntries();
}

renderEntries();