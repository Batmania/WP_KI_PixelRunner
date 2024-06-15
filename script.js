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
    sound.currentTime = 0; // Setzt den Sound auf den Anfang zurück, falls er bereits abgespielt wird
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

function checkLevelProgress() {
    if (score >= 50 * currentLevel) {  // Beispielhafter Schwellenwert für Levelübergang
        levelComplete();
    }
}

setInterval(checkLevelProgress, 100);

//Neu

function placeObstacle() {
    const obstacle = document.getElementById('obstacle');
    obstacle.style.display = 'block';
    obstacle.style.top = Math.random() * (document.getElementById('gameArea').clientHeight - 50) + 'px';
    obstacle.style.left = Math.random() * (document.getElementById('gameArea').clientWidth - 50) + 'px';
}

function startNextLevel() {
    document.querySelector('.level-complete').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';
    currentLevel++;
    document.getElementById('level').innerText = 'Level: ' + currentLevel;
    placeObstacle(); // Platzieren eines Hindernisses beim Start des nächsten Levels
    // Weitere Initialisierungen für das nächste Level...
}

// Funktion zum Zufälligen Platzieren eines Power-Ups
function placePowerUp() {
    const powerUp = document.getElementById('powerUp');
    powerUp.style.display = 'block';
    powerUp.style.top = Math.random() * (document.getElementById('gameArea').clientHeight - 25) + 'px';
    powerUp.style.left = Math.random() * (document.getElementById('gameArea').clientWidth - 25) + 'px';
}

// Eventlistener für das Sammeln des Power-Ups
document.addEventListener('keydown', function(event) {
    if (event.key === 'p') { // Beispielhaftes Tastenkürzel für das Aktivieren des Power-Ups
        activatePowerUp();
    }
});

// Funktion zum Aktivieren des Power-Ups
function activatePowerUp() {
    // Hier Implementierung des Power-Up-Effekts, z.B. Geschwindigkeitsboost, Unverwundbarkeit usw.
    playSound('powerUpSound');
    // Weitere Logik für den Effekt des Power-Ups
    setTimeout(() => {
        // Deaktivierung des Power-Ups nach einer gewissen Zeit oder nach Verbrauch
        document.getElementById('powerUp').style.display = 'none';
    }, 5000); // Beispielhafte Dauer des Power-Up-Effekts
}



