// script.js

let score = 0;
let currentLevel = 1;

function startGame() {
    document.querySelector('.intro').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';
    document.getElementById('score').innerText = 'Punkte: 0';
    score = 0;
    // Weitere Initialisierungen...
}

function playSound(soundId) {
    const sound = document.getElementById(soundId);
    sound.play();
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
        playSound('jumpSound');
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

function collectCoin() {
    const character = document.getElementById('character');
    const coin = document.getElementById('coin');

    const characterRect = character.getBoundingClientRect();
    const coinRect = coin.getBoundingClientRect();

    if (characterRect.x < coinRect.x + coinRect.width &&
        characterRect.x + characterRect.width > coinRect.x &&
        characterRect.y < coinRect.y + coinRect.height &&
        characterRect.y + characterRect.height > coinRect.y) {
        coin.style.display = 'none';
        score += 10;
        document.getElementById('score').innerText = 'Punkte: ' + score;
        playSound('coinSound');
        setTimeout(() => {
            placeNewCoin();
        }, 1000);
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
        playSound('gameOverSound');
        alert('Kollision! Spiel vorbei.');
        document.getElementById('gameArea').style.display = 'none';
        document.querySelector('.ending').style.display = 'block';
    }
}

function placeNewCoin() {
    const coin = document.getElementById('coin');
    coin.style.display = 'block';
    coin.style.top = Math.random() * (document.getElementById('gameArea').clientHeight - 25) + 'px';
    coin.style.left = Math.random() * (document.getElementById('gameArea').clientWidth - 25) + 'px';
}

setInterval(collectCoin, 50);

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
        document.getElementById('gameArea').style.display = 'none';
        document.querySelector('.ending').style.display = 'block';
    }
}

setInterval(checkCollision, 50);

function startNextLevel() {
    document.querySelector('.level-complete').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';
    currentLevel++;
    document.getElementById('level').innerText = 'Level: ' + currentLevel;
    // Weitere Initialisierungen für das nächste Level...
}

function levelComplete() {
    document.getElementById('gameArea').style.display = 'none';
    document.querySelector('.level-complete').style.display = 'block';
    // Weitere Aktionen bei Levelabschluss...
}

// Beispielhafte Logik für Levelübergang
function checkLevelProgress() {
    if (score >= 50 * currentLevel) {  // Beispielhafter Schwellenwert für Levelübergang
        levelComplete();
    }
}

setInterval(checkLevelProgress, 100);
