const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

let options = 
[
    "","","",
    "","","",
    "","",""
]

const winCondition = 
[
    // ke samping
    [0,1,2],
    [3,4,5],
    [6,7,8],
    // ke bawah
    [0,3,6],
    [1,4,7],
    [2,5,8],
    // miring
    [0,4,8],
    [2,4,6]
]
let currentPlayer = 'X'
let running = false

let xMoves = []
let oMoves = []

initializeGame()

function initializeGame(){
    cells.forEach(cell => cell.addEventListener('click',cellClicked));
    restartBtn.addEventListener('click',restartGame);
    statusText.textContent = `${currentPlayer}'s Turn`
    running = true
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex")

    if (options[cellIndex] != '' || !running) {
        return;
    }

    updateCell(this,cellIndex);
    checkWinner()
}

function updateCell(cell,index){
    options[index] = currentPlayer
    cell.textContent = currentPlayer

    if(currentPlayer == "X"){
        xMoves.push(index)
        if(xMoves.length == 2) cells[xMoves[0]].classList.add('text-muted')
        
        if(xMoves.length > 3){
            let oldIndex = xMoves.shift()
            cells[oldIndex].classList.remove('text-muted')
            
            cells[xMoves[0]].classList.add('text-muted')
            
            options[oldIndex] = ''
            cells[oldIndex].textContent = ''
        }
    }
    else{
        oMoves.push(index)
        if(oMoves.length == 2) cells[oMoves[0]].classList.add('text-muted')
    
        if(oMoves.length > 3){
            let oldIndex = oMoves.shift()
            cells[oldIndex].classList.remove('text-muted')
            
            cells[oMoves[0]].classList.add('text-muted')
           
            options[oldIndex] = ''
            cells[oldIndex].textContent = ''
        }
    }
}

function changePlayer(){
    currentPlayer = (currentPlayer == 'X') ? 'O' : 'X'
    statusText.textContent = `${currentPlayer}'s Turn`
}

function checkWinner(){
    let roundWon = false
    
    for (let i = 0; i < winCondition.length; i++) {
        const condition = winCondition[i];
        const cellA = options[condition[0]]
        const cellB = options[condition[1]]
        const cellC = options[condition[2]]
        
        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }
    
    if(roundWon){
        statusText.textContent = `${currentPlayer} Win`
        running = false

        Swal.fire({
            title: "Congratulation!!",
            icon: 'success',
            html: `${currentPlayer} dominates the board!`,
            timer: 2000,
            timerProgressBar: true,
        })
    }
    else if (!options.includes('')){
        statusText.textContent = `Draw`
        running = false
        Swal.fire({
            title: "No Winner This Time",
            icon: 'warning',
            html: `Both players ran out of moves — it's a tie!`,
            timer: 2000,
            timerProgressBar: true,
        })
    }
    else{
        changePlayer()
    }
}

function restartGame(){
    cells.forEach(cell => cell.textContent = '');
    cells.forEach(cell => cell.classList.remove('text-muted'));
    currentPlayer = 'X'
    statusText.textContent = `${currentPlayer}'s Turn`
    running = true
    options = 
    [
        "","","",
        "","","",
        "","",""
    ]
    xMoves = []
    oMoves = []
}