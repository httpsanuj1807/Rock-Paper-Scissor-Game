const rockBtn = document.querySelectorAll(".rock-btn");
const paperBtn = document.querySelectorAll(".paper-btn");
const scissorsBtn = document.querySelectorAll(".scissors-btn");
const resetBtn = document.querySelector(".reset-btn");




let count = 0;

let scoreObj = JSON.parse(localStorage.getItem("jsonScore"));
if (scoreObj == null) {
  scoreObj = {
    win: 0,
    loss: 0,
    tie: 0,
    count: 0,
  };
} else {
  document.querySelector(".display-scores").innerHTML = `<p>Score !!</p>
    <p>Attempt ${scoreObj.count}/5</p>
    <p>Your Score: ${scoreObj.win}</p>
    <p>Computer Score: ${scoreObj.loss}</p>`;
}

rockBtn.forEach((value) => {
  value.addEventListener("click", () => {
    play("rock");
  });
});
paperBtn.forEach((value) => {
  value.addEventListener("click", () => {
    play("paper");
  });
});
scissorsBtn.forEach((value) => {
  value.addEventListener("click", () => {
    play("scissors");
  });
});

function play(playerMove) {
  scoreObj.count++;
  let computerMove = "";
  const randomNumber = Math.random();

  if (randomNumber < 0.3) {
    computerMove = "rock";
  } else if (randomNumber >= 0.3 && randomNumber < 0.6) {
    computerMove = "paper";
  } else {
    computerMove = "scissors";
  }
  const showYourMoveImgEle = document.querySelector(".display-your-moves");
  const showCompMoveImgEle = document.querySelector(".display-comp-moves");
  showYourMoveImgEle.innerHTML = `<p>Your move</p>
    <img class="display-moves-img your-img" src="${playerMove}.png" />`;
  showCompMoveImgEle.innerHTML = `<p>Computer move</p>
    <img class="display-moves-img your-img" src="${computerMove}.png" />`;
  let result = "";
  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie";
    } else if (computerMove === "paper") {
      result = "You Lose";
    } else {
      result = "You Win";
    }
  }

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You Lose";
    } else if (computerMove === "paper") {
      result = "You Win";
    } else {
      result = "Tie";
    }
  }

  if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You Win";
    } else if (computerMove === "paper") {
      result = "Tie";
    } else {
      result = "You Lose";
    }
  }

  if (result === "You Win") {
  scoreObj.win++;
  } else if (result === "You Lose") {
    scoreObj.loss++;
  } else if (result === "Tie") {
    scoreObj.tie++;
  }

  localStorage.setItem("jsonScore", JSON.stringify(scoreObj));

  const resultElement = document.querySelector(".display-scores");
  resultElement.innerHTML = `<p>${result} !!</p>
    <p>Attempt ${scoreObj.count}/5</p>
    <p>Your Score: ${scoreObj.win}</p>
    <p>Computer Score: ${scoreObj.loss}</p>`;
  if (scoreObj.count == 5) {
    endGame();
  }
}

function playAudio(type){
  if(type==='click'){
    document.body
  }
}

function endGame(result) {
  if (scoreObj.win>=scoreObj.tie && scoreObj.win > scoreObj.loss) {
    result = "You win";
  } else if (scoreObj.loss>=scoreObj.tie && scoreObj.loss > scoreObj.win) {
    result = "You Lose";
  } else {
    result = "Tie";
  }
  const resultElement = document.querySelector(".display-scores");
  resultElement.innerHTML = `<p>Game Over - ${result} !!</p>
    <p>Attempt 5/5</p>
    <p>Your Score: ${scoreObj.win}</p>
    <p>Computer Score: ${scoreObj.loss}</p>`;
  scoreObj.win = 0;
  scoreObj.loss = 0;
  scoreObj.tie = 0;
  scoreObj.count = 0;
  localStorage.removeItem("jsonScore");
}
resetBtn.addEventListener("click", function () {
  scoreObj.win = 0;
  scoreObj.loss = 0;
  scoreObj.tie = 0;
  scoreObj.count = 0;
  const resultElement = document.querySelector(".display-scores");
  resultElement.innerHTML = `<p>Let's Play !!</p>
    <p>Attempt ${scoreObj.count}/5</p>
    <p>Your Score: ${scoreObj.win}</p>
    <p>Computer Score: ${scoreObj.loss}</p>`;
  const showYourMoveImgEle = document.querySelector(".display-your-moves");
  const showCompMoveImgEle = document.querySelector(".display-comp-moves");
  showYourMoveImgEle.innerHTML = ``;
  showCompMoveImgEle.innerHTML = ``;
  localStorage.removeItem("jsonScore");
});
