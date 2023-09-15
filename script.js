
//menu para ecras mais pequenos

$(document).ready(function() {
  $(".btn-menu").hide(); // Oculta o botão de menu ao carregar a página

  $(".btn-menu").click(function() {
    $(".navbar").toggleClass("menu-vertical");
    $(".btn-close").show();
  });

  $(".btn-close").click(function() {
    $(".navbar").removeClass("menu-vertical");
    $(".btn-close").hide();
    $(".btn-menu").show();
  });

  var previousWidth = $(window).width();
  var menuSizeThreshold = 999; // Tamanho da largura da janela para exibir o botão de menu

  if (previousWidth <= menuSizeThreshold) {
    $(".btn-menu").show(); // Exibe o botão de menu se a largura da janela for menor ou igual ao tamanho limite
  }

  $(window).resize(function() {
    var windowWidth = $(window).width();

    if (windowWidth > previousWidth && windowWidth > menuSizeThreshold) {
      $(".btn-menu").hide(); // Oculta o botão de menu ao redimensionar a janela para uma largura maior que o tamanho limite
    } else if (windowWidth < previousWidth && windowWidth < menuSizeThreshold) {
      $(".btn-menu").show();
    }

    previousWidth = windowWidth;
  });
});


//Blur na pagina ao passar no header
window.addEventListener('scroll', function() {
  var header = document.querySelector('.header-pages');
  var shouldBlur = window.scrollY > 0;
  if (shouldBlur) {
      header.style.backdropFilter = 'blur(8px)';
      header.style.backgroundColor = 'transparent';
  } else {
      header.style.backdropFilter = 'none';
      header.style.backgroundColor = 'initial';
  }
});
//Dark Mode

const changeThemeBtn = document.querySelector("#change-theme");

// Toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// Load light or dark mode
function loadTheme() {
  const darkMode = localStorage.getItem("dark");

  if (darkMode) {
    toggleDarkMode();
  }
}

loadTheme();

changeThemeBtn.addEventListener("change", function () {
  toggleDarkMode();

  localStorage.removeItem("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("dark", 1);
  }
});


//Snake Game

window.onload = function () {
    canv = document.getElementById("gameCanvas");
    ctx = canv.getContext("2d");
    setInterval(game, 1000 / 15); //60fps
}
best = 0;
posX = posY = 10;
gs = tc = 20;
appleX = appleY = 15;
xv = yv = 0;
trail = [];
tail = 5;
enemyX = enemyY = 5;
autoplay = true

function game() {
    posX += xv;
    posY += yv;
    if (posX < 0) {
        posX = tc - 1;
    }
    if (posX > tc - 1) {
        posX = 0;
    }
    if (posY < 0) {
        posY = tc - 1;
    }
    if (posY > tc - 1) {
        posY = 0;
    }
    if (document.body.classList.contains("dark")) {
        ctx.fillStyle = "#151515"; // Cor do dark mode
      } else {
        ctx.fillStyle = "#C4C3C3"; // Cor do light mode
      }
    ctx.fillRect(0, 0, canv.width, canv.height);

    ctx.fillStyle = "turquoise";

    for (var i = 0; i < trail.length; i++) {
        ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2);
        if (trail[i].x == posX && trail[i].y == posY) {
            tail = 5;
        }
    }

    trail.push({ x: posX, y: posY });

    while (trail.length > tail) {
        trail.shift();
    }
    if (autoplay) {

        if (posX > appleX) {
            if (posX - 1 != (trail[trail.length - 2].x)) {
                xv = -1; yv = 0;
            }
        }
        if (posX < appleX) {
            if (posX + 1 != (trail[trail.length - 2].x)) {
                xv = 1; yv = 0;
            }
        }
        if (posY > appleY) {
            if (posY - 1 != (trail[trail.length - 2].y)) {
                xv = 0; yv = -1;
            }
        }
        if (posY < appleY) {
            if (posY + 1 != (trail[trail.length - 2].y)) {
                xv = 0; yv = +1;
            }
        }

    //avoid dying
    console.log(trail[trail.length-2].x)

    }
    if (appleX == posX && appleY == posY) {
        tail++;
        appleX = Math.floor(Math.random() * tc);
        appleY = Math.floor(Math.random() * tc);
    }
    if (enemyX == posX && enemyY == posY) {
        tail--;
        enemyX = Math.floor(Math.random() * tc);
        enemyY = Math.floor(Math.random() * tc);
    }
    if (best < tail - 5) {
        best = tail - 5
    }
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * gs, appleY * gs, gs - 2, gs - 2);

    ctx.fillStyle = "pink";
    ctx.fillRect(enemyX * gs, enemyY * gs, gs - 2, gs - 2);

}

//Tic Tac Toe

let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--text-color');
let gameOver = false;

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;

let spaces = Array(9).fill(null);

const startGame = () => {
  gameOver = false;
  boxes.forEach(box => box.addEventListener('click', boxClicked));
};

function boxClicked(e) {
  const id = e.target.id;

  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (playerHasWon() !== false) {
      playerText.innerText = `${currentPlayer} has won!`;

      let winning_blocks = playerHasWon();
      winning_blocks.forEach(box => boxes[box].style.backgroundColor = winnerIndicator);

      gameOver = true;
      boxes.forEach(box => box.removeEventListener('click', boxClicked));
    }

    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
  }
}

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;

    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}

restartBtn.addEventListener('click', restart);

function restart() {
  gameOver = false;
  spaces.fill(null);

  boxes.forEach(box => {
    box.innerText = '';
    box.style.backgroundColor = '';
  });

  playerText.innerText = 'Tic Tac Toe';

  currentPlayer = X_TEXT;

  boxes.forEach(box => box.addEventListener('click', boxClicked));
}

startGame();




  
  



