"use strict";

// X and O buttons
const xStartButton = document.getElementById("x-div");
const oStartButton = document.getElementById("o-div");

// Cpu vs Player buttons
const newGameCpu = document.getElementById("new-game-vs-cpu");
const newGamePlayer = document.getElementById("new-game-vs-player");

// Main Container
const mainContainer = document.getElementById("main-container");

//Game Start Container
const gameStart = document.getElementById("game-start");
const restart = document.getElementById("restart-container");

//9 Buttons
const button = document.querySelectorAll("button.x-o-button");

// turn icons
const iconTurnX = document.getElementById("iconturnx");
const iconTurnO = document.getElementById("iconturno");

// Modal Container
const modal =document.getElementById("modal");
const firstBox = document.getElementById("first-box");

//Modal Quit and Nextround buttons
const quitGame = document.getElementById("quit");
const nextRound = document.getElementById("next-round");

// Restart Box Container
const restartGameBox = document.getElementById("restart-game-box");
const noRestart = document.getElementById("no-restart");
const yesRestart = document.getElementById("yes-restart");

// Icons X and O ( svg pictures )
const xIcon =  `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
<path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#31C3BD" fill-rule="evenodd"/></svg>`

const oIcon = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
<path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="#F2B137"/></svg>`

let xScore = document.getElementById("x-button-score");
let oScore = document.getElementById("o-button-score");
let tieScore = document.getElementById("ties-button-score");

let turn = "x";
let valuesLeft = [0,1,2,3,4,5,6,7,8];
const array = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let xValues = [];
let oValues = [];
let finished = false;
let cpuClick = false;
let playerClick = false;

let catchWinX;
let catchWinO;

let firstPlayer;
let secondPlayer;

let xWinValue = 0;
let oWinValue = 0;
let displayTie = 0;

xStartButton.addEventListener("click", (_event) =>{
    xStartButton.style.backgroundColor = 'rgba(168, 191, 201, 1)';
    xStartButton.style.borderRadius = '10px';
    removeXBtn();
    firstPlayer = "x";
    secondPlayer = "o";
})

oStartButton.addEventListener("click", (_event) =>{
    oStartButton.style.backgroundColor = 'rgba(168, 191, 201, 1)';
    oStartButton.style.borderRadius = '10px';  
    removeOBtn(); 
    firstPlayer = "o";
    secondPlayer = "x";
})

newGameCpu.addEventListener("click", () =>{
    cpuClick = true;
    mainContainer.style.display = 'none';
    gameStart.style.display = 'block'; 
    if(secondPlayer === "x"){
    cpuMove();
    document.getElementById("x-button-score-text").innerHTML = 'X (CPU)';
    document.getElementById("o-button-score-text").innerHTML = 'O (YOU)';
    }
    button.forEach(item => {
        item.addEventListener("click", handleClick)
    })
});

newGamePlayer.addEventListener("click", () =>{
    playerClick = true;
    document.getElementById("x-button-score-text").innerHTML = 'X (P1)';
    document.getElementById("o-button-score-text").innerHTML = 'O (P2)';
    playerClick = true;
    mainContainer.style.display = 'none';
    gameStart.style.display = 'block';
    button.forEach(every =>{
        every.addEventListener("click", handleClickPlayer);
    })
});

noRestart.addEventListener("click", (_event) =>{
    restartGameBox.style.display = 'none';
    modal.style.display = 'none';
})

yesRestart.addEventListener("click", (_event) =>{
    restartGameBox.style.display = 'none';
    modal.style.display = 'none';
    gameStart.style.display = 'none';
    mainContainer.style.display = 'block';
    xScore.innerHTML = "0";
    oScore.innerHTML = "0";
    tieScore.innerHTML = "0";
    xWinValue = 0;
    oWinValue = 0;
    displayTie = 0;
    clearBoard();
    
})

restart.addEventListener("click", (_event) =>{
    restartGameBox.style.display = 'block';
    modal.style.display = 'block';
})

function handleClick(event){
    const findIndex = valuesLeft.findIndex((numberLeft) => numberLeft === +event.target.id );
    event.target.innerHTML = turn === "x" ? xIcon:oIcon;
    if(turn === "x" && firstPlayer === "x"){
        turn = "o";
        iconTurnX.style.display = 'none';
        iconTurnO.style.display = 'block';
        button[+event.target.id].removeEventListener("click",handleClick);
        valuesLeft.splice(findIndex, 1);
        xValues.push(+event.target.id);
        winOrTie();
        console.log("first");
        if(!finished && cpuClick){
            cpuMove();
            console.log("second");
        }
    }else if(turn === "o" && firstPlayer === "o"){
        turn = "x";
        iconTurnX.style.display = 'block';
        iconTurnO.style.display = 'none';
        button[+event.target.id].removeEventListener("click",handleClick);
        valuesLeft.splice(findIndex, 1);
        oValues.push(+event.target.id);
        winOrTie();
        console.log("third");
        if(!finished && cpuClick){
            console.log("fourth");
            cpuMove();
        }
    }
}

function handleClickPlayer(event){
    const findIndex = valuesLeft.findIndex((numberLeft) => numberLeft === +event.target.id );
    event.target.innerHTML = turn === "x" ? xIcon:oIcon;
    if(turn === "x" && firstPlayer === "x"){
        turn = "o";
        iconTurnX.style.display = 'none';
        iconTurnO.style.display = 'block';
        button[+event.target.id].removeEventListener("click",handleClickPlayer);
        valuesLeft.splice(findIndex, 1);
        xValues.push(+event.target.id);
        winOrTie();
    }else if(turn === "o" && secondPlayer === "o"){
        turn = "x";
        iconTurnX.style.display = 'block';
        iconTurnO.style.display = 'none';
        button[+event.target.id].removeEventListener("click",handleClickPlayer);
        valuesLeft.splice(findIndex, 1);
        oValues.push(+event.target.id);
        winOrTie();
    }else if(turn === "x" && firstPlayer === "o"){
        turn = "o";
        iconTurnX.style.display = 'none';
        iconTurnO.style.display = 'block';
        button[+event.target.id].removeEventListener("click",handleClickPlayer);
        valuesLeft.splice(findIndex, 1);
        xValues.push(+event.target.id);
        winOrTie();
    }else if(turn === "o" && firstPlayer === "o"){
        turn = "x";
        iconTurnX.style.display = 'block';
        iconTurnO.style.display = 'none';
        button[+event.target.id].removeEventListener("click",handleClickPlayer);
        valuesLeft.splice(findIndex, 1);
        oValues.push(+event.target.id);
        winOrTie();
    }
}

function clearBoard(){
    turn = "x";
    
    button.forEach(item => {
        item.innerHTML = "";
        if(cpuClick){
        item.addEventListener("click", handleClick);
    }else{
        item.addEventListener("click", handleClickPlayer);
    }
    })

    catchWinX = false;
    catchWinO = false;
    finished = false;
    xValues = [];
    oValues = [];
    valuesLeft = [0,1,2,3,4,5,6,7,8];


    iconTurnO.style.display = 'none';
    iconTurnX.style.display = 'block';
    oStartButton.style.backgroundColor = 'rgba(26, 42, 51, 1)';
    xStartButton.style.backgroundColor = 'rgba(26, 42, 51, 1)';
}

function removeXBtn(){
    if(xStartButton){
        oStartButton.style.backgroundColor = 'rgba(26, 42, 51, 1)';
    }
}

function removeOBtn(){
    if(oStartButton){
        xStartButton.style.backgroundColor = 'rgba(26, 42, 51, 1)';
    }
}

function cpuMove() {
    if(finished){
        return;
    }
    let randomNumber = Math.floor(Math.random() * valuesLeft.length);
    let random = valuesLeft[randomNumber];

    let findIndex = valuesLeft.findIndex( valueLeft => random === valueLeft );

    setTimeout(function(){ button[random].innerHTML = turn === "x" ? xIcon : oIcon;
        if(turn === "x" && secondPlayer === "x" && valuesLeft.length > 0 && !finished){ 
            iconTurnX.style.display = 'none';
            iconTurnO.style.display = 'block';
            button[random].removeEventListener("click",handleClick);
            valuesLeft.splice(findIndex, 1);  
            xValues.push(random);
            winOrTie();
            turn = "o";            
        }else if(turn === "o" && secondPlayer === "o" && valuesLeft.length > 0 && !finished){
            iconTurnX.style.display = 'block';
            iconTurnO.style.display = 'none';
            button[random].removeEventListener("click",handleClick);
            valuesLeft.splice(findIndex, 1); 
            oValues.push(random);
            winOrTie();
            turn = "x";
        }

    },400 );   
}

function winOrTie(){
    for(let i = 0; i < array.length; i ++){
         catchWinX = array[i].every(index => {
            return  xValues.includes(index);
        })

         catchWinO = array[i].every(index => {
            return  oValues.includes(index);
        })

        if((catchWinX && firstPlayer === "o") || (catchWinO && firstPlayer === "x")){
            document.getElementById("modal-first-text").innerHTML = "OH NO, YOU LOST…";
            modal.style.display = 'flex';
            document.getElementById("first-box").style.display = 'grid';
            document.getElementById("modal-second-text").style.display = 'flex';
            if(firstPlayer === "o"){
                    document.getElementById("modal-first-img").style.display = 'none';
                    document.getElementById("modal-second-img").style.display = 'flex';
                    document.getElementById("modal-second-text").style.color = "#31C3BD";
                    xWinValue++;
                    xScore.innerHTML = xWinValue;
                }else{
                    document.getElementById("modal-first-img").style.display = 'flex';
                    document.getElementById("modal-second-img").style.display = 'none';
                    document.getElementById("modal-second-text").style.color = "#F2B137";
                    oWinValue++;
                    oScore.innerHTML = oWinValue;
                }
            finished = true;
            
            return;
        }
        if((catchWinX && firstPlayer === "x") || (catchWinO && firstPlayer === "o")){
            document.getElementById("modal-first-text").innerHTML = "YOU WON!";
            modal.style.display = 'flex';
            document.getElementById("first-box").style.display = 'grid';
            document.getElementById("modal-second-text").style.display = 'flex';
            if(firstPlayer === "o"){
                document.getElementById("modal-first-img").style.display = 'flex';
                document.getElementById("modal-second-img").style.display = 'none';
                document.getElementById("modal-second-text").style.color = "#F2B137";
                oWinValue++;
                oScore.innerHTML = oWinValue;
            }else{
                document.getElementById("modal-first-img").style.display = 'none';
                document.getElementById("modal-second-img").style.display = 'flex';
                document.getElementById("modal-second-text").style.color = "#31C3BD";
                xWinValue++;
                xScore.innerHTML = xWinValue;
            }
            finished = true;
            return;
        }

        if(valuesLeft.length === 0 &&  i === array.length - 1 && catchWinX != true && catchWinO != true) {
            document.getElementById("modal-first-text").innerHTML = "ROUND TIED";
            document.getElementById("modal-first-text").style.fontSize = '24px';
            document.getElementById("modal-second-text").style.display = 'none';
            modal.style.display = 'flex';
            document.getElementById("first-box").style.display = 'grid';
            document.getElementById("modal-first-img").style.display = 'none';
            document.getElementById("modal-second-img").style.display = 'none';
            displayTie++;
            tieScore.innerHTML = displayTie;
            finished = true;
        }
}
}

quitGame.addEventListener("click", () =>{
    clearBoard();
    gameStart.style.display = 'none';
    modal.style.display = 'none';
    firstBox.style.display = 'none';
    mainContainer.style.display = 'block';

    xWinValue = 0;
    oWinValue = 0;
    displayTie = 0;

    xScore.innerHTML = xWinValue;
    oScore.innerHTML = oWinValue;
})

nextRound.addEventListener("click", () =>{
    clearBoard();
    iconTurnX.style.display = 'block';
    iconTurnO.style.display = 'none';

    turn = "x";

    firstBox.style.display = 'none';
    modal.style.display = 'none';  

    if(firstPlayer === "x"){
        turn = "x";
        winOrTie();
    }

    if(firstPlayer === "o"){
        turn = "x";
        winOrTie();
        if(cpuClick){ 
            cpuMove(); 
        }     
    }
    
})




