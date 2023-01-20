// console.log("welcome to tic tio tio");


document.addEventListener("DOMContentLoaded", () => {
    // let consider veriabale for audio file
    const gameStart = new Audio("./src/media/sound/sound-01/startgame.mp3");
    gameStart.play();

    // get class box element
    const boxes = document.querySelectorAll(".boxContainer .box");

    // image box 
    let imagebox = document.querySelector('#imagebox');

    // game element 
    let isGameOver = false;

    // defalt value of player
    let chance = "X";

    // initial user chance
    document.getElementById('turn').innerText = chance;


    // change turn function 
    function changeTurn() {
        console.log(chance);
        if (chance === "X") {
            chance = "0";
            // after x change turn x into 0
        }
        else {
            chance = "X";
            // after 0 change turn 0 into x
        }
        // update username after turned changed
        document.getElementById('turn').innerText = " " + chance;
    }


    // change audio file 
    function changeAudio(gameStatus) {
        // variable defind for game audio object
        const audioTurn = new Audio("./src/media/sound/sound-01/turnOn.mp3");
        const audioGameOver = new Audio("./src/media/sound/sound-01/gameOver.mp3");

        // condition for game status check and return audio 
        if (gameStatus == "won") {
            audioGameOver.play();
        } else if (gameStatus == "turn") {
            audioTurn.play();
        };
    }


    // Winning message 
    const messageWin = document.querySelector('.message');


    // check a game status
    function checkWin() {
        // wining condition - 
        const wins = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        // get a value from boxtext class --- x --- 0 ---
        const boxTexts = document.getElementsByClassName('boxtext');

        wins.forEach((el) => {
            // condition for boxtext shoud not be blank
            let isBlank = boxTexts[el[0]].innerText !== '' && boxTexts[el[1]].innerText !== '' && boxTexts[el[1]].innerText !== '';
            // check a win condition and get value from wins posiblities
            if (isBlank && boxTexts[el[0]].innerText === boxTexts[el[1]].innerText && boxTexts[el[1]].innerText === boxTexts[el[2]].innerText) {
                messageWin.innerText = boxTexts[el[0]].innerText + " has won the match";
                changeAudio('won');
                isGameOver = true;
            }
        });
    }


    // Game reset function 
    function resetGame() {
        const newGameButton = document.querySelector('#reset');
        const boxTexts = document.getElementsByClassName('boxtext');
        newGameButton.addEventListener('click', () => {
            // for(let i = 0; i < boxTexts.length; i++) {
            //     boxTexts[i].innerText = "";
            // }
            //create a loop for clear a boxtext element  
            Array.from(boxTexts).forEach((box) => {
                // clear all element from box
                box.innerText = "";
            })
            // call start game sound
            gameStart.play();
            // clear start game message
            messageWin.innerText = "";
            // reasign a value 
            isGameOver = false;
            chance = "X"
            // set default value of chance 
            document.getElementById('turn').innerText = chance;
        });
    }

    // most important part of the game 
    // get array from boxes object then use for each function
    Array.from(boxes).forEach((box) => {
        // click box perform events
        box.addEventListener('click', (element) => {
            // call audio function
            changeAudio('turn');
            // changeTurn();
            let boxText = element.target.firstChild;
            if (chance === 'X') {
                boxText.innerText = "X";
            }
            else {
                boxText.innerText = "0";
            }
            checkWin();
            if (!isGameOver) {
                changeTurn();
                // resetGame();
            }
        });
    })

    // call a game reset game fucntion.
    resetGame();
});

