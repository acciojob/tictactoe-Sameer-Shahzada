//your JS code here. If required.
const container = document.querySelector(".container");

document.getElementById("submit").addEventListener("click", () => {
    const player1 = document.getElementById("player-1").value;
    const player2 = document.getElementById("player-2").value;

    if (!player1 || !player2) return;

    container.innerHTML = `
        <h1>Tic Tac Toe</h1>
        <div class="message">${player1}, you're up</div>
        <div id="board" style="display:grid;grid-template-columns:repeat(3,100px);gap:5px;"></div>
    `;

    const board = document.getElementById("board");

    let currentPlayer = "X";
    let currentName = player1;

    const cells = [];
    const boardState = Array(9).fill("");

    for (let i = 1; i <= 9; i++) {
        const cell = document.createElement("div");
        cell.id = i;
        cell.style.width = "100px";
        cell.style.height = "100px";
        cell.style.border = "1px solid black";
        cell.style.display = "flex";
        cell.style.alignItems = "center";
        cell.style.justifyContent = "center";
        cell.style.fontSize = "40px";
        cell.style.cursor = "pointer";

        cell.addEventListener("click", () => {
            const index = i - 1;

            if (boardState[index] !== "") return;

            boardState[index] = currentPlayer;
            cell.textContent = currentPlayer;

            if (checkWinner(boardState, currentPlayer)) {
                document.querySelector(".message").textContent =
                    `${currentName} congratulations you won!`;
                return;
            }

            if (currentPlayer === "X") {
                currentPlayer = "O";
                currentName = player2;
            } else {
                currentPlayer = "X";
                currentName = player1;
            }

            document.querySelector(".message").textContent =
                `${currentName}, you're up`;
        });

        board.appendChild(cell);
        cells.push(cell);
    }
});

function checkWinner(board, player) {
    const wins = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    return wins.some(combo =>
        combo.every(index => board[index] === player)
    );
}