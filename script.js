let matriz = [];
for (let i = 0; i < 3; i++) {
  matriz[i] = [];
  for (let j = 0; j < 3; j++) {
    matriz[i][j] = 0;
  }
}

let turn = select_player();
//1 player 2 computer

function select_player() {
  let turn = Math.floor(Math.random() * 2) + 1;
  console.log(turn);
  if (turn == 2) {
    iamove();
  }
  return turn;
}

function matrix(i, j) {
  if (turn != -1) {
    if (matriz[i][j] == 0) {
      matriz[i][j] = 1;
    }
    update_table();
    if (alerta()) return;
    iamove();
  }
}
function iamove() {
  ia = getMove(matriz);
  matriz[ia[0]][ia[1]] = 2;
  console.log(ia);
  update_table();  
  alerta();
}

function update_table() {
  let table = document.querySelector("table");
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (matriz[i][j] == 1) {
        table.rows[i].cells[j].innerHTML = "X";
      } else if (matriz[i][j] == 2) {
        table.rows[i].cells[j].innerHTML = "O";
      } else if (matriz[i][j] == 0) {
        table.rows[i].cells[j].innerHTML = " ";
      }
    }
  }
}

function check_win() {
  //verificar se alguem ganhou na horizontal
  for (let i = 0; i < 3; i++) {
    if (
      matriz[i][0] != 0 &&
      matriz[i][0] == matriz[i][1] &&
      matriz[i][0] == matriz[i][2]
    ) {
      return matriz[i][0];
    }
  }
  //verificar se alguem ganhou na vertical
  for (let i = 0; i < 3; i++) {
    if (
      matriz[0][i] != 0 &&
      matriz[0][i] == matriz[1][i] &&
      matriz[0][i] == matriz[2][i]
    ) {
      return matriz[0][i];
    }
  }
  //verificar se alguem ganhou na diagonal principal
  if (
    matriz[0][0] != 0 &&
    matriz[0][0] == matriz[1][1] &&
    matriz[0][0] == matriz[2][2]
  ) {
    return matriz[0][0];
  }
  //verificar se alguem ganhou na diagonal secundaria
  if (
    matriz[0][2] != 0 &&
    matriz[0][2] == matriz[1][1] &&
    matriz[0][2] == matriz[2][0]
  ) {
    return matriz[0][2];
  }
  return 0;
}

function alerta() {
  let winner = check_win();
  if (winner === 1) {
    document.getElementById("win").innerHTML = "Player venceu!"
    turn = -1;
    return true;
  } else if (winner === 2) {
    document.getElementById("win").innerHTML = "Computador venceu!"
    turn = -1;
    return true;
  } else if (isBoardFull()) {
    document.getElementById("win").innerHTML = "Empate!"
    turn = -1;
    return true;
  }
  return false;
}

function clearMatrix() {
  // Itera pelas linhas e colunas da matriz para zerar os valores
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      matriz[i][j] = 0;
    }
  }
  turn = select_player();
  update_table();
  document.getElementById("win").innerHTML = ""
}

function isBoardFull() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (matriz[i][j] === 0) return false;
    }
  }
  return true;
}

function init() {
  if (select_player() == 2) {
    iamove();
    update_table();
  }
}


function test() {
  fetch('/test', {
    method: 'post', // Método HTTP POST
    headers: {
      'Content-Type': 'application/json' // Tipo de dado enviado
    },
    body: JSON.stringify({
      key1: 'value1',
      key2: 'value2'
    }) // Corpo da requisição, convertido para JSON
  })
  .then(response => response.json()) // Converte a resposta em JSON
  .then(data => console.log(data));  // Exibe os dados no console
}
