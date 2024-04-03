// Selectors
let buttons = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset_btn");
let newGameBtn = document.querySelector("#new_game_btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let hide = document.querySelector(".hide");
let playerTurn = document.querySelector(".player-turn");

//Variables Iniatilizations
let turnO = true; //PlayerX and PlayerO //turnO is initialized as true, indicating it's Player O's turn at the start.
let count = 0; //count is initialized to keep track of the number of moves made.

/*Winning Patterns-An array winPatterns is defined, which contains arrays representing the winning patterns on the game board.*/
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

/*Reset Game Function-The resetGame function is defined to reset the game state:*/
let resetGame = () => {
  turnO = true; //It sets turnO to true.
  enableButtons(); // It enables all buttons.
  hide.classList.add("hide"); //It hides the message container.
  playerTurn.innerText = "Player O turn"; //It updates the player turn message to "Player O turn".
};

/*Event Listeners-Event listeners are added to each box (game board buttons):
It updates the player turn message accordingly.
It marks the box with 'O' or 'X' based on the player turn. */
buttons.forEach((box) => {
  box.addEventListener("click", function () {
    if (turnO) {
      playerTurn.innerText = "Player O turn"; //When a box is clicked, it checks whose turn it is (turnO).
      box.innerText = "O";
      turnO = false;
    } else {
      playerTurn.innerText = "Player X turn"; // Player X Turn
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true; //It disables the clicked box.
    count++; //It increments the count.

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }

    checkWinner(); //It checks for a winner or a draw after each move.
  });
});

//Helper Functions
//disabledButtons() disables all game board buttons.
const disabledButtons = () => {
  for (let box of buttons) {
    box.disabled = true;
  }
};
// enables all game board buttons and clears their text.
const enableButtons = () => {
  for (let box of buttons) {
    box.disabled = false;
    box.innerText = "";
  }
};

//gameDraw() is called when the game ends in a draw. It displays a message, plays a game over sound, and disables all buttons.
const gameDraw = () => {
  msg.innerText = `Game is Draw.`;
  hide.classList.remove("hide");
  document.getElementById("audioGameOver").play();
  disabledButtons();
};

//showWinner() displays the winner message, plays a game over sound, and disables all buttons.
let showWinner = (winner) => {
  msg.innerHTML = `Winner is ${winner}`;
  hide.classList.remove("hide");
  document.getElementById("audioGameOver").play();
  disabledButtons();
};

//checkWinner() iterates through the winPatterns to check if any player has won based on the current game board state.
let checkWinner = () => {
  for (let pattern of winPatterns) {
    let position1Value = buttons[pattern[0]].innerText;
    let position2Value = buttons[pattern[1]].innerText;
    let position3Value = buttons[pattern[2]].innerText;
    if (position1Value != "" && position2Value != "" && position3Value) {
      if (
        position1Value === position2Value &&
        position2Value === position3Value
      ) {
        console.log("winner");
        showWinner(position1Value);
      }
    }
  }
};

// New Game Button: An event listener is added to the new game button (newGameBtn). When clicked, it calls the resetGame function to start a new game.
newGameBtn.addEventListener("click", resetGame);
//Reset Button: An event listener is added to the reset button (resetButton). When clicked, it also calls the resetGame function to reset the game.
resetButton.addEventListener("click", resetGame);
