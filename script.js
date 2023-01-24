function createUserGrid() {
  opponent = "user";
  playerX = playerFactory(prompt("Player X name"));
  playerO = playerFactory(prompt("Player O name"));
  document.getElementById("nameX").innerHTML = playerX.name;
  document.getElementById("nameO").innerHTML = playerO.name;
  if (document.getElementById("nameX").innerHTML == "") {
    alert("Choose player names first");
  } else if (gameboardGrid.hasChildNodes()) {
    alert("Grid already here");
  } else {
    for (let i = 0; i < gameboardArray.length; i++) {
      const boxContent = document.createElement("div");
      boxContent.id = "gameboardBox";
      boxContent.addEventListener("click", () => {
        gameLogic.playAgainstUser(i, boxContent);
      });
      gameboardGrid.appendChild(boxContent);
    }
  }
}

function createComputerGrid() {
  opponent = "computer";
  playerX = playerFactory("User");
  playerO = playerFactory("Computer");
  document.getElementById("nameX").innerHTML = playerX.name;
  document.getElementById("nameO").innerHTML = playerO.name;
  if (gameboardGrid.hasChildNodes()) {
    alert("Grid already here");
  } else {
    for (let i = 0; i < gameboardArray.length; i++) {
      const boxContent = document.createElement("div");
      boxContent.id = `gameboardBox${i}`;
      boxContent.addEventListener("click", () => {
        gameLogic.playAgainstUser(i, boxContent);
      });
      gameboardGrid.appendChild(boxContent);
    }
  }
}

const playerFactory = (name) => {
  let winnerMessage = `${name} has won the game!`;
  return { name, winnerMessage };
};

const gameLogic = (() => {
  let lastPlayer = "";
  const checkWinner = function () {
    let winningConditionX =
      (gameboardArray[0] === "X" &&
        gameboardArray[3] === "X" &&
        gameboardArray[6] === "X") ||
      (gameboardArray[1] === "X" &&
        gameboardArray[4] === "X" &&
        gameboardArray[7] === "X") ||
      (gameboardArray[2] === "X" &&
        gameboardArray[5] === "X" &&
        gameboardArray[8] === "X") ||
      (gameboardArray[0] === "X" &&
        gameboardArray[1] === "X" &&
        gameboardArray[2] === "X") ||
      (gameboardArray[3] === "X" &&
        gameboardArray[4] === "X" &&
        gameboardArray[5] === "X") ||
      (gameboardArray[6] === "X" &&
        gameboardArray[7] === "X" &&
        gameboardArray[8] === "X") ||
      (gameboardArray[0] === "X" &&
        gameboardArray[4] === "X" &&
        gameboardArray[8] === "X") ||
      (gameboardArray[2] === "X" &&
        gameboardArray[4] === "X" &&
        gameboardArray[6] === "X");
    let winningConditionO =
      (gameboardArray[0] === "O" &&
        gameboardArray[3] === "O" &&
        gameboardArray[6] === "O") ||
      (gameboardArray[1] === "O" &&
        gameboardArray[4] === "O" &&
        gameboardArray[7] === "O") ||
      (gameboardArray[2] === "O" &&
        gameboardArray[5] === "O" &&
        gameboardArray[8] === "O") ||
      (gameboardArray[0] === "O" &&
        gameboardArray[1] === "O" &&
        gameboardArray[2] === "O") ||
      (gameboardArray[3] === "O" &&
        gameboardArray[4] === "O" &&
        gameboardArray[5] === "O") ||
      (gameboardArray[6] === "O" &&
        gameboardArray[7] === "O" &&
        gameboardArray[8] === "O") ||
      (gameboardArray[0] === "O" &&
        gameboardArray[4] === "O" &&
        gameboardArray[8] === "O") ||
      (gameboardArray[2] === "O" &&
        gameboardArray[4] === "O" &&
        gameboardArray[6] === "O");
    if (winningConditionX) {
      document.getElementById("winnerMessage").innerHTML =
        playerX.winnerMessage;
      gameStatus = "ended";
      document.getElementById("winnerScreen").classList.toggle("show");
    } else if (winningConditionO) {
      document.getElementById("winnerMessage").innerHTML =
        playerO.winnerMessage;
      gameStatus = "ended";
      document.getElementById("winnerScreen").classList.toggle("show");
    }
  };

  const playAgainstUser = function (i, box) {
    if (opponent === "user") {
      if (lastPlayer === "X") {
        if (!box.innerHTML && gameStatus === "running") {
          gameboardArray[i] = "O";
          box.innerHTML = gameboardArray[i];
          lastPlayer = "O";
          checkWinner();
        }
      } else if (lastPlayer === "" || "O") {
        if (!box.innerHTML && gameStatus === "running") {
          gameboardArray[i] = "X";
          box.innerHTML = gameboardArray[i];
          lastPlayer = "X";
          checkWinner();
        }
      }
    } else if (opponent === "computer") {
      if (!box.innerHTML && gameStatus === "running") {
        gameboardArray[i] = "X";
        box.innerHTML = gameboardArray[i];
        checkWinner();
        let checkAgain = "yes";
        setTimeout(() => {
          while (checkAgain == "yes" && gameStatus === "running") {
            let randomChoice = Math.floor(Math.random() * 9);
            if (gameboardArray[randomChoice]) {
              checkAgain = "yes";
            } else {
              gameboardArray[randomChoice] = "O";
              document.getElementById(`gameboardBox${randomChoice}`).innerHTML =
                gameboardArray[randomChoice];
              checkAgain = "no";
              checkWinner();
            }
          }
        }, 250)
      }
    }
  };

  function inputPlayerName() {
    playerX = playerFactory(prompt("Player X name"));
    playerO = playerFactory(prompt("Player O name"));
    document.getElementById("nameX").innerHTML = playerX.name;
    document.getElementById("nameO").innerHTML = playerO.name;
    return {
      playerX,
      playerO,
    };
  }

  return { playAgainstUser, inputPlayerName };
})();

function resetGrid() {
  document.getElementById("winnerScreen").classList.toggle("show");
  gameboardGrid.innerHTML = "";
  gameStatus = "running";
  gameboardArray = {};
  gameboardArray.length = 9;
}

let gameboardGrid = document.getElementById("gameboardGrid");
let gameboardArray = [];
gameboardArray.length = 9;
let gameStatus = "running";
let playerX = {};
let playerO = {};
let opponent = "";

document
  .getElementById("againstUserButton")
  .addEventListener("click", createUserGrid);

document.getElementById("gameReset").addEventListener("click", resetGrid);

document
  .getElementById("againstComputerButton")
  .addEventListener("click", createComputerGrid);