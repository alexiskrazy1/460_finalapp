console.log("app.js loaded"); // TEST

let entries = JSON.parse(localStorage.getItem("entries")) || [];
let mood = localStorage.getItem("mood") || "No mood selected";

/* -------- JOURNAL -------- */

function saveToStorage() {
  localStorage.setItem("entries", JSON.stringify(entries));
}

function renderEntries() {
  const list = document.getElementById("entriesList");
  if (!list) return;

  list.innerHTML = "";

  entries.forEach((entry, index) => {
    const li = document.createElement("li");

    const text = document.createElement("p");
    text.textContent = entry;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editEntry(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteEntry(index);

    li.appendChild(text);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}

function addEntry() {
  const input = document.getElementById("entryInput");
  if (!input || input.value.trim() === "") return;

  entries.push(input.value);
  input.value = "";

  saveToStorage();
  renderEntries();
}

function editEntry(index) {
  const newText = prompt("Update your entry:", entries[index]);
  if (newText && newText.trim() !== "") {
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

/* -------- NAVIGATION (FIXED) -------- */

function showPage(pageId) {
  console.log("Switching to:", pageId); // DEBUG

  const pages = ["journalPage", "moodPage", "copingPage"];

  pages.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });

  const active = document.getElementById(pageId);
  if (active) active.style.display = "block";
}

/* -------- MOOD -------- */

function setMood(selectedMood) {
  mood = selectedMood;
  localStorage.setItem("mood", mood);

  const moodText = document.getElementById("todayMood");
  if (moodText) moodText.textContent = mood;
}

function loadMood() {
  const moodText = document.getElementById("todayMood");
  if (moodText) moodText.textContent = mood;
}

/* -------- INIT -------- */

window.onload = function () {
  console.log("Page fully loaded");

  renderEntries();
  loadMood();
  showPage("journalPage");

  // 🔥 Make functions global (guaranteed fix for your issue)
  window.showPage = showPage;
  window.addEntry = addEntry;
  window.setMood = setMood;
};