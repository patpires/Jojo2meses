const canvas = document.getElementById('pacman');
const ctx = canvas.getContext('2d');
//Display pacman's score
ctx.font = "20px 'Press Start 2P'";
ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.fillText("HIGH SCORE", 200, 20);
const grid = [
  [], [],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 4, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 4, 1, 0],
  [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0],
 [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
 [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
 [2, 2, 2, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 2, 2, 2, 2],
 [0, 0, 0, 0, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
 [2, 2, 2, 2, 1, 1, 1, 0, 3, 3, 3, 0, 1, 1, 1, 2, 2, 2, 2, 2],
 [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
 [2, 2, 2, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 2, 2, 2, 2],
 [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
 [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
 [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0],
 [0, 4, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 4, 1, 0],
 [0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
 [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

function drawGrid() {
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 0) {
        ctx.fillStyle = '#0000FF'; // Blue for 0s
      } else {
        ctx.fillStyle = '#000'; // Black for others
      }
      ctx.fillRect(j * 20, i * 20, 20, 20); // Each block is 20x20 pixels
      if (grid[i][j] === 1) {
        ctx.beginPath();
        ctx.arc(j * 20 + 10, i * 20 + 10, 2, 0, 2 * Math.PI); // Draw small white dots for 1s
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
      } else if (grid[i][j] === 4) {
        ctx.beginPath();
        ctx.arc(j * 20 + 10, i * 20 + 10, 5, 0, 2 * Math.PI); // Draw bigger white dots for 4s
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
// Define Pacman's structure
const pacman = {
  x: 130, // Pacman's starting x position at the center of the 6th column
  y: 270, // Pacman's starting y position at the center of the 11th row
  radius: 11, // Pacman's radius increased by 3 pixels
  color: 'yellow', // Pacman's color changed to yellow
  score: 0 //Pacman's score
};

function drawPacman() {
  ctx.beginPath();
  ctx.arc(pacman.x, pacman.y, pacman.radius, 0.2 * Math.PI, 1.8 * Math.PI); // Draw Pacman
  ctx.lineTo(pacman.x, pacman.y);
  ctx.fillStyle = pacman.color;
  ctx.fill();
  ctx.closePath();
}

function drawDead() {
  ctx.beginPath();
  ctx.arc(pacman.x, pacman.y, pacman.radius, 0.2 * Math.PI, 1.8 * Math.PI); // Draw Pacman
  // This line intentionally left blank to correct the reference error by removing the faulty function call
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.closePath();
}

// Define the keydown event handler function
function keydownEventHandler(event) {
  let newX = pacman.x;
  let newY = pacman.y;
  switch (event.key) {
    case 'ArrowUp':
      newY -= 20;
      break;
    case 'ArrowDown':
      newY += 20;
      break;
    case 'ArrowLeft':
      newX -= 20;
      break;
    case 'ArrowRight':
      newX += 20;
      break;
  }
  if (grid[Math.floor(newY / 20)] && [1, 3, 4, 5].includes(grid[Math.floor(newY / 20)][Math.floor(newX / 20)])) {
    if (grid[Math.floor(newY / 20)][Math.floor(newX / 20)] === 1) {
      grid[Math.floor(newY / 20)][Math.floor(newX / 20)] = 5; // Change the block to 5 after eating the dot
      dotsEaten++; // Increment dotsEaten counter
      pacman.score += 10; // Increase score by 10 points
    } else if (grid[Math.floor(newY / 20)][Math.floor(newX / 20)] === 4) {
      grid[Math.floor(newY / 20)][Math.floor(newX / 20)] = 5; // Change the block to 5 after eating the dot
      dotsEaten++; // Increment dotsEaten counter
      pacman.score += 50; // Increase score by 50 points
    }
    userWins(); // Check if the user wins
    pacman.x = newX;
    pacman.y = newY;
  }
  clearCanvas();
  //Display pacman's score
  ctx.font = "20px 'Press Start 2P'";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("HIGH SCORE", 200, 20);
  ctx.fillText(pacman.score, 200, 40);
  drawGrid();
  drawPacman();
  // Draw four ghosts
  drawGhost(pinkGhost.x, pinkGhost.y, pinkGhost.color);
  drawGhost(lightBlueGhost.x, lightBlueGhost.y, lightBlueGhost.color);
  drawGhost(redGhost.x, redGhost.y, redGhost.color);
  drawGhost(orangeGhost.x, orangeGhost.y, orangeGhost.color);
  clearInterval(gameInterval); // Clear existing interval to prevent multiple intervals running
  gameInterval = setInterval(function() { // Start a new interval
    clearCanvas();
    //Display pacman's score
    ctx.font = "20px 'Press Start 2P'";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("HIGH SCORE", 200, 20);
    ctx.fillText(pacman.score, 200, 40);
    drawGrid();
    drawPacman();
    // Draw four ghosts
    drawGhost(pinkGhost.x, pinkGhost.y, pinkGhost.color);
    drawGhost(lightBlueGhost.x, lightBlueGhost.y, lightBlueGhost.color);
    drawGhost(redGhost.x, redGhost.y, redGhost.color);
    drawGhost(orangeGhost.x, orangeGhost.y, orangeGhost.color);
    moveGhosts();
    checkCollision(pacman, pinkGhost);
    checkCollision(pacman, lightBlueGhost);
    checkCollision(pacman, redGhost);
    checkCollision(pacman, orangeGhost);
  }, 250);
}

// Adiciona ouvinte de evento para evento de tecla pressionada
document.addEventListener('keydown', keydownEventHandler);

function checkCollision(pacman, ladybug) {
  const distance = Math.sqrt(Math.pow(pacman.x - ladybug.x, 2) + Math.pow(pacman.y - ladybug.y, 2));
  if (distance < pacman.radius + 11) { // Assuming ladybug's radius is similar to Pacman's
    drawDead();
    clearInterval(gameInterval);
    alert('Fim de Jogo! Pacman colidiu com uma joaninha.');
    // Remove event listener after clearing the interval
    document.removeEventListener('keydown', keydownEventHandler);
    return true;
  }
  return false;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawGhost(x, y, color) {
    const s = 22; // Size of the ghost
    const top = y;
    const base = y + s;
    const left = x;
    const tl = left + s;
    const inc = s / 10;
    const high = 10;
    const low = -5;
    // Change ghost to ladybug appearance
    ctx.fillStyle = 'red'; // Ladybug's body color
    ctx.beginPath();
    ctx.ellipse(x + 11, y + 11, 11, 11, 0, 0, 2 * Math.PI); // Draw the body of the ladybug
    ctx.fill();
    ctx.fillStyle = 'black'; // Ladybug's head color
    ctx.beginPath();
    ctx.arc(x + 11, y, 5, 0, 2 * Math.PI); // Draw the head of the ladybug
    ctx.fill();
    // Draw dots on ladybug's body
    for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.arc(x + 5 + (i % 3) * 6, y + 8 + Math.floor(i / 3) * 6, 2, 0, 2 * Math.PI); // Draw dots
        ctx.fill();
    }
}

// Define individual ghost constants
const pinkGhost = { x: 5 * 20, y: 6 * 20, color: 'pink', direction: 'right' }; // Position updated to grid location (5, 4)
const lightBlueGhost = { x: 4 * 20, y: 16 * 20, color: 'lightblue', direction: 'up' }; // Position updated to grid location (4, 14)
const orangeGhost = { x: 14 * 20, y: 18 * 20, color: 'orange', direction: 'left' }; // Position updated to grid location (14, 16)
const redGhost = { x: 14 * 20, y: 8 * 20, color: 'red', direction: 'down' }; // Position updated to grid location (14, 6)

function moveGhost(ghost) {
    // Define possible directions
    const directions = ['up', 'down', 'left', 'right'];

    // Calculate new position based on the current direction
    let newX = ghost.x;
    let newY = ghost.y;

    // Move the ghost according to its direction
    switch (ghost.direction) {
        case 'up':
            newY -= 20; // Move up by 20 pixels
            break;
        case 'down':
            newY += 20; // Move down by 20 pixels
            break;
        case 'left':
            newX -= 20; // Move left by 20 pixels
            break;
        case 'right':
            newX += 20; // Move right by 20 pixels
            break;
    }

    // Check if the next position is valid
    if (!isValidPosition(newX, newY)) {
        // If the next position is invalid, choose a new random direction
        ghost.direction = directions[Math.floor(Math.random() * directions.length)];
    } else {
        // Update the ghost's position
        ghost.x = newX;
        ghost.y = newY;
    }
}

// Helper function to check if a position is valid
function isValidPosition(x, y) {
    // Check if the cell value is not 0 or 2
    const cellValue = grid[Math.floor(y / 20)][Math.floor(x / 20)];
    return cellValue !== 0 && cellValue !== 2;
}

function moveGhosts() {
  moveGhost(pinkGhost);
  moveGhost(lightBlueGhost);
  moveGhost(orangeGhost);
  moveGhost(redGhost);
}

// Moved drawGrid, drawPacman, drawGhost, and moveGhosts calls to window.onload
let gameInterval; // Define gameInterval variable to manage the interval
let dotsEaten = 0; // Track the number of dots Pacman has eaten
function resetGame() {
    document.getElementById('backgroundMusic').play();
  pacman.x = 130;
  pacman.y = 270;
  pinkGhost.x = 5 * 20;
  pinkGhost.y = 6 * 20;
  lightBlueGhost.x = 4 * 20;
  lightBlueGhost.y = 16 * 20;
  orangeGhost.x = 14 * 20;
  orangeGhost.y = 18 * 20;
  redGhost.x = 14 * 20;
  redGhost.y = 8 * 20;
  for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
          if (grid[i][j] === 5) {
              grid[i][j] = 1; // Reset dots
          }
      }
  }
  dotsEaten = 0; // Reset dots eaten
  pacman.score = 0; // Reset score
  if (gameInterval) clearInterval(gameInterval); // Clear existing game interval if any
  gameInterval = setInterval(function() { // Start a new game interval
      clearCanvas();
      drawGrid();
      drawPacman();
      drawGhost(pinkGhost.x, pinkGhost.y, pinkGhost.color);
      drawGhost(lightBlueGhost.x, lightBlueGhost.y, lightBlueGhost.color);
      drawGhost(redGhost.x, redGhost.y, redGhost.color);
      drawGhost(orangeGhost.x, orangeGhost.y, orangeGhost.color);
      moveGhosts();
      checkCollision(pacman, pinkGhost);
      checkCollision(pacman, lightBlueGhost);
      checkCollision(pacman, redGhost);
      checkCollision(pacman, orangeGhost);
  }, 250);
  document.addEventListener('keydown', keydownEventHandler);
}
function userWins() {
  if (dotsEaten === 177) { 
    drawDead();
    clearInterval(gameInterval);
    alert("You Won!");
    document.removeEventListener('keydown', keydownEventHandler);
    clearCanvas();
  }
}
