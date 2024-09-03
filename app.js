let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#resetBtn");
let newGameBtn = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;

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

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "0";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    reset.disabled = true; // Disable the reset button when the game is over
};

const showTie = () => {
    msg.innerText = "It's a tie! No one wins.";
    msgContainer.classList.remove("hide");
    reset.disabled = true; // Disable the reset button when the game is over
};

const checkWinner = () => {
    let winnerFound = false;

    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                console.log("Winner:", pos1val);
                disableAllBoxes();
                showWinner(pos1val);
                winnerFound = true;
                break;
            }
        }
    }

    // Check for a tie if no winner was found
    if (!winnerFound && Array.from(boxes).every(box => box.innerText !== "")) {
        disableAllBoxes();
        showTie();
    }
};

const disableAllBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

reset.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    msgContainer.classList.add("hide"); // Hide the message container
    reset.disabled = false; // Re-enable the reset button
    turn0 = true;
});

newGameBtn.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    msgContainer.classList.add("hide");
    turn0 = true;
    reset.disabled = false; // Re-enable the reset button
});
