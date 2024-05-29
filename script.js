// script.js
function startGame() {
    document.querySelector('.intro').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';
    // Weitere Initialisierungen...
}

function startNextLevel() {
    document.querySelector('.level-complete').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';
    // Weitere Initialisierungen für das nächste Level...
}

function restartGame() {
    document.querySelector('.ending').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';
    // Spiel zurücksetzen und neu starten...
}

document.addEventListener('keydown', function(event) {
    const character = document.getElementById('character');
    let left = parseInt(window.getComputedStyle(character).left);
    
    if (event.key === 'ArrowLeft') {
        character.style.left = left - 10 + 'px';
    }
    if (event.key === 'ArrowRight') {
        character.style.left = left + 10 + 'px';
    }
    if (event.key === ' ') {
        jump();
    }
});

function jump() {
    const character = document.getElementById('character');
    if (!character.classList.contains('jumping')) {
        character.classList.add('jumping');
        setTimeout(() => {
            character.classList.remove('jumping');
        }, 500);
    }
}

function checkCollision() {
    const character = document.getElementById('character');
    const obstacle = document.getElementById('obstacle');

    const characterRect = character.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (characterRect.x < obstacleRect.x + obstacleRect.width &&
        characterRect.x + characterRect.width > obstacleRect.x &&
        characterRect.y < obstacleRect.y + obstacleRect.height &&
        characterRect.y + characterRect.height > obstacleRect.y) {
        alert('Kollision! Spiel vorbei.');
        // Weitere Aktionen bei Kollision...
    }
}

setInterval(checkCollision, 50);
