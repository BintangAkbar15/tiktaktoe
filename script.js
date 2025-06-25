const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    // kesamping
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // kebawah
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // miring
    [0, 4, 8],
    [2, 4, 6]
];
let options = 
[
    "", "", "", 
    "", "", "", 
    "", "", ""
];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute('cellIndex')
    
    if(options[cellIndex] != '' || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    cell.textContent = currentPlayer
    options[index] = currentPlayer
}

function restartGame(){
    cells.forEach(cell => cell.textContent = '');
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
    options = 
    [
        "", "", "", 
        "", "", "", 
        "", "", ""
    ];
}

function checkWinner(){
    let roundwon = false
    for (let i = 0; i < winConditions.length; i++) {
        let condition = winConditions[i]
        let cellA = options[condition[0]]
        let cellB = options[condition[1]]
        let cellC = options[condition[2]]

        if (cellA == '' ||cellB == '' || cellC == '') {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundwon = true
            break;
        }
    }
    if(roundwon){
        statusText.textContent = `${currentPlayer} Win`
        running = false
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw`
        running = false
    }
    else{
        changePlayer()
    }
    
}  

function changePlayer(){
    currentPlayer = (currentPlayer == 'X') ? 'O' : 'X'
    statusText.textContent = `${currentPlayer}'s Turn`
}