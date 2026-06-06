const submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", function () {
    const player1 = document.getElementById("player1").value;
    const player2 = document.getElementById("player2").value;

    document.querySelector(".container").innerHTML += `
        <div class="message">${player1}, you're up</div>
        <div id="board"></div>
    `;

    const board = document.getElementById("board");

    let currentPlayer = "x";
    let currentName = player1;

    const state = Array(9).fill("");

    for (let i = 1; i <= 9; i++) {
        const cell = document.createElement("div");
        cell.id = i;
        board.appendChild(cell);

        cell.addEventListener("click", function () {
            if (state[i - 1] !== "") return;

            state[i - 1] = currentPlayer;
            cell.textContent = currentPlayer;

            if (checkWinner(state, currentPlayer)) {
                document.querySelector(".message").textContent =
                    `${currentName} congratulations you won!`;
                return;
            }

            if (currentPlayer === "x") {
                currentPlayer = "o";
                currentName = player2;
            } else {
                currentPlayer = "x";
                currentName = player1;
            }

            document.querySelector(".message").textContent =
                `${currentName}, you're up`;
        });
    }
});

function checkWinner(board, player) {
    const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    return wins.some(combo =>
        combo.every(index => board[index] === player)
    );
}