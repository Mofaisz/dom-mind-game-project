const cardsArray = [
  { name: "shell", img: "img/blueshell.png" },
  { name: "star", img: "img/star.png" },
  { name: "bobomb", img: "img/bobomb.png" },
  { name: "mario", img: "img/bulletbill.png" },
  { name: "luigi", img: "img/luigi.png" },
  { name: "peach", img: "img/peach.png" },
  { name: "1up", img: "img/1up.png" },
  { name: "mushroom", img: "img/mushroom.png" },
];

let activeList = [];
let startTime = null;
let move = 0;

const tileWrapper = document.querySelector(".game_grid");
const overlayWrapper = document.querySelector(".overlay_success");
const closeBtn = overlayWrapper.querySelector(".close_stats");

function createCardElement({ name, img }) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.name = name;

  const front = document.createElement("div");
  front.className = "front";

  const back = document.createElement("div");
  back.className = "back";
  back.style.backgroundImage = `url(https://taniarascia.github.io/memory/${img})`;

  card.append(front, back);
  return card;
}

function appendCards() {
  tileWrapper.innerHTML = "";
  const shuffledCards = [...cardsArray, ...cardsArray].sort(() => Math.random() - 0.5);
  shuffledCards.forEach((cardData) => {
    tileWrapper.appendChild(createCardElement(cardData));
  });
}

function checkCompletion() {
  const matchedCards = document.querySelectorAll(".card.counted").length;
  if (matchedCards === 16) {
    const endTime = new Date().getTime();
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    const min = Math.floor(timeTaken / 60);
    const sec = timeTaken % 60;

    overlayWrapper.querySelector(".moves span").textContent = move;
    overlayWrapper.querySelector(".time span").textContent = `${min} Min ${sec} Sec`;
    overlayWrapper.setAttribute("data-stats", "true");
    appendCards();
  }
}

function resetActiveCards() {
  activeList.forEach((card) => card.classList.remove("active"));
  activeList = [];
}

function handleCardClick(event) {
  const card = event.target.closest(".card");
  if (!card || card.classList.contains("active") || card.classList.contains("counted")) return;

  if (!startTime) startTime = new Date().getTime();

  card.classList.add("active");
  activeList.push(card);
  move++;

  if (activeList.length === 2) {
    const [first, second] = activeList;
    if (first.dataset.name === second.dataset.name) {
      first.classList.add("counted");
      second.classList.add("counted");
    }
    setTimeout(() => {
      resetActiveCards();
      checkCompletion();
    }, 1000);
  }
}

function init() {
  appendCards();
  tileWrapper.addEventListener("click", handleCardClick);
  closeBtn.addEventListener("click", () => {
    overlayWrapper.setAttribute("data-stats", "false");
  });
}

document.addEventListener("DOMContentLoaded", init);
