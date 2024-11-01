const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 400;
canvas.height = 600;

// Game variables
let basket = { x: 180, y: 550, width: 50, height: 20 };
let objects = [];
let score = 0;
let gameOver = false;
let speed = 2;

// Event listener for basket movement
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && basket.x > 0) {
    basket.x -= 20;
  } else if (e.key === 'ArrowRight' && basket.x < canvas.width - basket.width) {
    basket.x += 20;
  }
});

// Function to create a falling object
function createObject() {
  const size = Math.floor(Math.random() * 20) + 10;
  const x = Math.floor(Math.random() * (canvas.width - size));
  objects.push({ x: x, y: 0, width: size, height: size });
}

// Function to draw the basket and objects
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw basket
  ctx.fillStyle = '#4CAF50';
  ctx.fillRect(basket.x, basket.y, basket.width, basket.height);

  // Draw objects
  ctx.fillStyle = '#FF5722';
  objects.forEach((object, index) => {
    ctx.fillRect(object.x, object.y, object.width, object.height);
    object.y += speed;

    // Check if object falls below the canvas
    if (object.y > canvas.height) {
      objects.splice(index, 1);
      if (!gameOver) score -= 1; // Penalize for missing an object
    }

    // Check for collision
    if (
      object.x < basket.x + basket.width &&
      object.x + object.width > basket.x &&
      object.y < basket.y + basket.height &&
      object.y + object.height > basket.y
    ) {
      objects.splice(index, 1);
      score += 10; // Reward for catching an object
    }
  });

  document.getElementById('score').textContent = score;

  // Check for game over
  if (score < 0) {
    gameOver = true;
    ctx.fillStyle = 'red';
    ctx.font = '30px Arial';
    ctx.fillText('Game Over', canvas.width / 2 - 80, canvas.height / 2);
  }
}

// Game loop
function gameLoop() {
  if (!gameOver) {
    draw();
    requestAnimationFrame(gameLoop);
  }
}

// Start the game
setInterval(createObject, 1000); // Spawn new objects every second
gameLoop();
