// Alla kort, 2 st av samma
let cardsArray = [
  { imgSrc: "./assets/bauble.png", name: "bauble" },
  { imgSrc: "./assets/cane.png", name: "cane" },
  { imgSrc: "./assets/bell.png", name: "bell" },
  { imgSrc: "./assets/lights.png", name: "lights" },
  { imgSrc: "./assets/reindeer.png", name: "reindeer" },
  { imgSrc: "./assets/mistletoe.png", name: "mistletoe" },
  { imgSrc: "./assets/tree.png", name: "tree" },
  { imgSrc: "./assets/gingerbread.png", name: "gingerbread" },
  { imgSrc: "./assets/sock.png", name: "sock" },
  { imgSrc: "./assets/presents.png", name: "presents" },
  { imgSrc: "./assets/sleigh.png", name: "sleigh" },
  { imgSrc: "./assets/wreath.png", name: "wreath" },

  { imgSrc: "./assets/bauble.png", name: "bauble" },
  { imgSrc: "./assets/cane.png", name: "cane" },
  { imgSrc: "./assets/bell.png", name: "bell" },
  { imgSrc: "./assets/lights.png", name: "lights" },
  { imgSrc: "./assets/reindeer.png", name: "reindeer" },
  { imgSrc: "./assets/mistletoe.png", name: "mistletoe" },
  { imgSrc: "./assets/tree.png", name: "tree" },
  { imgSrc: "./assets/gingerbread.png", name: "gingerbread" },
  { imgSrc: "./assets/sock.png", name: "sock" },
  { imgSrc: "./assets/presents.png", name: "presents" },
  { imgSrc: "./assets/sleigh.png", name: "sleigh" },
  { imgSrc: "./assets/wreath.png", name: "wreath" },
];

// Blandar korten varje gång
cardsArray.sort(() => Math.random() - 0.5);

// Objektlista för players (användarna)
let players = [
  {
    name: "Player One",
    score: 0,
  },
  {
    name: "Player Two",
    score: 0,
  },
];

// Variabler som vi har skapat
const startScreen = document.querySelector(".start-screen");
const button = document.querySelector(".start-btn");
const fieldOne = document.querySelector(".player-one-field");
const fieldTwo = document.querySelector(".player-two-field");
let cardContainer = document.querySelector(".card-container");
let playerTurnHolder = document.querySelector(".player-turn-holder");
let playerOneScoreHolder = document.querySelector(".player-one-score");
let playerTwoScoreHolder = document.querySelector(".player-two-score");

let cardsChosen = [];
let cardsChosenId = [];
let gameTurn = 0;
let pairOfCards = cardsArray.length / 2;

// Startknapp på förstasidan
button.addEventListener("click", startAndHide);

// Användarna skriver in sina namn
function nameInputs() {
  players[0].name = fieldOne.value;
  players[1].name = fieldTwo.value;
}

// Tar bort startrutan och visar spelplanen
function startAndHide() {
  if (startScreen.style.display === "none") {
    startScreen.style.display = "block";
  } else {
    nameInputs();
    startGame();
    startScreen.style.display = "none";
  }
}

// Lägger ut alla kort på brädet
function distributeCards() {
  for (let i = 0; i < cardsArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "./assets/back-of-card.png");
    card.setAttribute("class", i);
    cardContainer.appendChild(card);
    card.addEventListener("click", showChosenCard);
  }
}

// Uppdaterar vems tur det är av användarna 
function updateGame() {
  let currentPlayer = players[gameTurn];
  playerTurnHolder.innerText = currentPlayer.name;
  playerOneScoreHolder.innerText = `${players[0].name}: ${players[0].score}`;
  playerTwoScoreHolder.innerText = `${players[1].name}: ${players[1].score}`;
}

// Funktion som startar spelet. Spelet startar med den som skrev in sitt namn i första rutan
function startGame() {
  gameTurn = 0;
  let currentPlayer = players[gameTurn];
  playerTurnHolder.innerText = currentPlayer.name;
  playerOneScoreHolder.innerText = `${players[0].name}: ${players[0].score}`;
  playerTwoScoreHolder.innerText = `${players[1].name}: ${players[1].score}`;
}

// Funktion som visar vilket kort användaren har tryckt på
function showChosenCard() {
  const cardIndex = this.getAttribute("class");
  cardsChosen.push(cardsArray[cardIndex].name);
  cardsChosenId.push(cardIndex);
  this.setAttribute("src", cardsArray[cardIndex].imgSrc);
  if (cardsChosenId.length === 2) {
    setTimeout(checkForMatch, 300);
  }
}

/*  
Funktion som kollar så att man inte får en matchning om man trycker på enbart ett och samma kort
men man får en matchning om man får upp två olika kort med samma bild och poängen uppdateras med +1
*/
function checkForMatch() {
  let imgs = document.querySelectorAll("img");
  let firstCard = cardsChosenId[0];
  let secondCard = cardsChosenId[1];
  if (cardsChosen[0] === cardsChosen[1] && firstCard !== secondCard) {
    let currentPlayer = players[gameTurn];
    currentPlayer.score = currentPlayer.score + 1;

    // Korten "försvinner" efter matchning 
    imgs[firstCard].setAttribute("src", "./assets/blank.png");
    imgs[secondCard].setAttribute("src", "./assets/blank.png");
    setTimeout(checkWon, 300);
  } else {
    // Om det inte blir en matchning så vänds korten tillbaka
    imgs[firstCard].setAttribute("src", "./assets/back-of-card.png");
    imgs[secondCard].setAttribute("src", "./assets/back-of-card.png");
    gameTurn =
      (gameTurn + 1) %
      2; // Modulus 2 ger 1 och 0 varannan gång. Altenerar spelare
  }

  cardsChosen = []; // Nollar listan
  cardsChosenId = []; // Nollar listan
  updateGame(); // Kör funktionen som visar vems tur det är
}

// Funktionen räknar ihop poängen och skriver ut vem som har vunnit eller om det har blivit oavgjort
function checkWon() {
  let score1 = players[0].score;
  let score2 = players[1].score;
  let sum = score1 + score2;

  if (sum == pairOfCards) {
    if (score1 > score2) {
      alert(`Grattis, ${players[0].name} vann omgången!`);
    } else if (score1 == score2) {
      alert(`Det blev oavgjort !`);
    } else {
      alert(`Grattis, ${players[1].name} vann omgången!`);
    }
  }
}

// Funktionen som lägger ut korten och spelet börjar
distributeCards();
