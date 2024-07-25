let canvas;
let world;
let keyboard = new Keyboard();
// let music = new Audio('audio/gamesound.mp3');


function init() {
    canvas = document.getElementById('canvas');
    initLevel();
    world = new World(canvas, keyboard);
}

// function showStartScreen() { 
//     startscreen = document.getElementById('startscreen');
//     startscreen.classList.remove('d-none');
//     canvasContainer = document.getElementById('canvasContainer');
//     canvasContainer.classList.add('d-none');
// }


// function playMusic() {
//     music.play();
// }

// function stopMusic() {
//     let img = document.getElementById('speaker');
//     let noSound = "img/no-sound.png";

//     if(img.src == noSound) {
//         img.src = "img/volume.png"
//         music.play();
//     } else {
//         img.src = "img/no-sound.png";
//         music.pause();
//     }
// }

function removeStartScreen() {
    startscreen = document.getElementById('startscreen');
    canvasContainer = document.getElementById('canvasContainer');
    canvasContainer.classList.remove('d-none');
    startscreen.classList.add('d-none');
    // playMusic();
    init();
}

function showGameOver() {
    canvasContainer = document.getElementById('canvasContainer');
    canvas.classList.add('grey');
    gameOver = document.getElementById('gameover');
    gameOver.classList.remove('d-none');
}

function restart() {
    gameOver = document.getElementById('gameover');
    gameOver.classList.add('d-none');
    canvas.classList.remove('grey');
    removeStartScreen();
}

function stopGame() {
    clearAllIntervals();
}

function fullscreen() {
    canvas.requestFullscreen();
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

window.addEventListener('keydown', (e) => {
    if(e.keyCode == 68) {
        keyboard.D = true;
    }

    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if(e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if(e.keyCode == 38) {
        keyboard.UP = true;
    }

    if(e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if(e.keyCode == 32) {
        keyboard.SPACE = true;
    }
});

window.addEventListener('keyup', (e) => {
    if(e.keyCode == 68) {
        keyboard.D = false;
    }

    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if(e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if(e.keyCode == 38) {
        keyboard.UP = false;
    }

    if(e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if(e.keyCode == 32) {
        keyboard.SPACE = false;
    }
});