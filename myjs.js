var cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let score1 = 0,
    score2 = 0,
    p1wins = 0,
    p2wins = 0;
let player = true;

var p1Name = prompt("Please name for player 1 :", "");
var p2Name = prompt("Please name for player 2 :", "");
if (p1Name != null)
    document.getElementById("id1name").innerHTML = "<h1>" + p1Name + "</h1>";
if (p2Name != null)
    document.getElementById("id2name").innerHTML = "<h1>" + p2Name + "</h1>";
document.getElementById("id1score").innerHTML = "<h1>Score: " + score1 + "</h1>";
document.getElementById("id2score").innerHTML = "<h1>Score: " + score2 + "</h1>";
document.getElementById("id1wins").innerHTML = "<h1>Wins: " + p1wins + "</h1>";
document.getElementById("id2wins").innerHTML = "<h1>Wins: " + p2wins + "</h1>";


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // first card click
        hasFlippedCard = true;
        firstCard = this;
        return;
    } else {
        //second card click
        hasFlippedCard = false;
        secondCard = this;
        checkIfMatch();
    }
}

function checkIfMatch() {
    // check if cards have same picture
    if (firstCard.dataset.val === secondCard.dataset.val) {
        // if same
        disableCards();
        if (player)
            score1 += 1;
        else
            score2 += 1;
        updateScore();
        player = !player;
        console.log("1- " + score1 + ", 2- " + score2);
        if (isGameOver())
            startGame();
    } else {
        // not same
        flipBack();
        player = !player;
    }
}

function isGameOver() {
    if (score1 + score2 == cards.length / 2) {
        markWinner();
        return true;
    }

    return false;
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}


function updateScore() {
    document.getElementById("id1score").innerHTML = "<h1>Score: " + score1 + "</h1>";
    document.getElementById("id2score").innerHTML = "<h1>Score: " + score2 + "</h1>";
}

function flipBack() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;
        resetBoard();
    }, 1000);

}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
})();

function markWinner() {
    if (score1 > score2) {
        document.getElementById("id1name").innerHTML = "<h1 style='color:red;'>" + p1Name + " Winner!</h1>";
        p1wins += 1;
    } else if (score2 > score1) {
        document.getElementById("id2name").innerHTML = "<h1 style='color:red;'>" + p2Name + " Winner!</h1>";
        p2wins += 1;
    } else {
        document.getElementById("id1name").innerHTML = "<h1 style='color:red;'>" + p1Name + " Winner!</h1>";
        document.getElementById("id2name").innerHTML = "<h1 style='color:red;'>" + p2Name + " Winner!</h1>";
        p1wins += 1;
        p2wins += 1;
    }
    document.getElementById("id1wins").innerHTML = "<h1>Wins: " + p1wins + "</h1>";
    document.getElementById("id2wins").innerHTML = "<h1>Wins: " + p2wins + "</h1>";
}

function startGame() {
    cards = document.querySelectorAll('.memory-card');
    score1 = 0;
    score2 = 0;
    resetBoard();
    setTimeout(() => {
        document.getElementById("id1name").innerHTML = "<h1>" + p1Name + "</h1>";
        document.getElementById("id2name").innerHTML = "<h1>" + p2Name + "</h1>";
        updateScore();
        cards.forEach(card => {
            //flip back
            card.classList.remove('flip');
            //enable flipability again
            card.addEventListener('click', flipCard);
            //reshuffle
            let randomPos = Math.floor(Math.random() * cards.length);
            card.style.order = randomPos;
        })

    }, 3500);


}
cards.forEach(card => card.addEventListener('click', flipCard));