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
});
