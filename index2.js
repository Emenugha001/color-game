// Selecting elements
const colorBox = document.getElementById("colorBox");
const options = document.querySelectorAll(".color-option");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");

let targetColor = "";
let score = 0;

// Function to generate a random color ...random guy
function getRandomColor() {
    return `rgb(${Math.floor(Math.random() * 256)}, 
                ${Math.floor(Math.random() * 256)}, 
                ${Math.floor(Math.random() * 256)})`;
}

// Function to start a new game
function startGame() {
    gameStatus.textContent = "Pick a box to reveal the colors!";
    
    targetColor = getRandomColor();
    colorBox.style.backgroundColor = targetColor;

    let colors = [targetColor];
    while (colors.length < 6) {
        let newColor = getRandomColor();
        if (!colors.includes(newColor)) {
            colors.push(newColor);
        }
    }

    colors.sort(() => Math.random() - 0.5);

    // Hide colors and assign them
    options.forEach((button, index) => {
        button.style.backgroundColor = "#333"; // Hide the color (Dark color)
        button.dataset.hiddenColor = colors[index]; // Store hidden color
        button.onclick = () => revealColors(button, colors[index]);
    });
}

// Function to reveal colors and check guess
function revealColors(selectedButton, selectedColor) {
    // Reveal all colors
    options.forEach((button) => {
        button.style.backgroundColor = button.dataset.hiddenColor;
    });

    // Check if the selected color is correct
    if (selectedColor === targetColor) {
        gameStatus.textContent = "Correct! 🎉";
        score++;
    } else {
        gameStatus.textContent = "Wrong! 0 ❌";
        score = 0; // Reset score on wrong guess
    }

    // Update the score display
    scoreDisplay.textContent = `Score: ${score}`;

    // Restart game after a short delay
    setTimeout(startGame, 2000);
}

// Event listener for new game button
newGameButton.addEventListener("click", startGame);

// Start the game initially
startGame();
