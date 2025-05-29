const legalWords = ["writs", "lease", "trial", "torts", "deeds"];
const targetWord = legalWords[Math.floor(Math.random() * legalWords.length)];

let currentGuess = "";
const maxGuesses = 6;

const board = document.getElementById("game-board");

function createBoard() {
  for (let i = 0; i < maxGuesses; i++) {
    const row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < 5; j++) {
      const box = document.createElement("div");
      box.classList.add("box");
      row.appendChild(box);
    }

    board.appendChild(row);
  }
}

function updateBoard() {
  const rows = document.querySelectorAll(".row");
  const row = rows[guessCount];
  const boxes = row.querySelectorAll(".box");

  currentGuess.split("").forEach((letter, i) => {
    boxes[i].textContent = letter.toUpperCase();
  });
}

let guessCount = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === "Backspace") {
    currentGuess = currentGuess.slice(0, -1);
    updateBoard();
    return;
  }

  if (e.key === "Enter" && currentGuess.length === 5) {
    checkGuess();
    return;
  }

  if (e.key.length === 1 && currentGuess.length < 5 && e.key.match(/[a-z]/i)) {
    currentGuess += e.key.toLowerCase();
    updateBoard();
  }
});

function checkGuess() {
  if (currentGuess === targetWord) {
    alert("🎉 Correct! The word was: " + targetWord.toUpperCase());
    return;
  }

  guessCount++;
  if (guessCount === maxGuesses) {
    alert("❌ Game over! The word was: " + targetWord.toUpperCase());
    return;
  }

  currentGuess = "";
  updateBoard();
}

createBoard();
