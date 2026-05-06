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
 const pages = ["homePage", "journalPage", "moodPage", "copingPage", "affirmationsPage"];

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
const affirmations = [
  "I am doing my best, and that is enough.",
  "I am strong and capable.",
  "I deserve peace and happiness.",
  "I can get through difficult moments.",
  "I am growing every day.",
  "I am worthy of love and respect.",
  "I choose to focus on what I can control.",
  "I am proud of myself."
];

window.showRandomAffirmation = function () {
  const affirmations = [
    "I am doing my best, and that is enough.",
    "I am strong and capable.",
    "I deserve peace and happiness.",
    "I can get through difficult moments.",
    "I am growing every day.",
    "I am worthy of love and respect.",
    "I choose to focus on what I can control.",
    "I am proud of myself."
  ];

  const random = affirmations[Math.floor(Math.random() * affirmations.length)];
  document.getElementById("affirmationDisplay").textContent = random;
};
/* -------- INIT -------- */


window.showPage = function(pageId) {
  const pages = ["homePage", "journalPage", "moodPage", "copingPage", "affirmationsPage"];

  pages.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });

  document.getElementById(pageId).style.display = "block";
};

window.onload = function() {
  showPage("homePage");
};