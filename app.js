window.showPage = function(pageId) {

  const pages = [
    "homePage",
    "journalPage",
    "moodPage",
    "copingPage",
    "affirmationsPage"
  ];


  // Show selected page
  const activePage = document.getElementById(pageId);

  if (activePage) {
    activePage.style.display = "block";
  }
};

/* RANDOM AFFIRMATIONS */

window.showRandomAffirmation = function () {

  const affirmations = [
    "I am doing my best.",
    "I am strong and capable.",
    "I deserve peace and happiness.",
    "I can get through difficult moments.",
    "I am growing every day.",
    "I am worthy of love and respect.",
    "I choose to focus on what I can control.",
    "I am proud of myself."
  ];

  // Pick random affirmation
  const randomIndex = Math.floor(Math.random() * affirmations.length);

  // Display it
  document.getElementById("affirmationDisplay").textContent =
    affirmations[randomIndex];
};

/* START APP */

window.onload = function () {
  showPage("homePage");
};