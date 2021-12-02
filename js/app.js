const getRand = (min, max) => {
  var nbre01 = Math.random();
  var possibleScale = max - min;
  return Math.floor(Math.round(nbre01 * possibleScale + min));
}



var app = {
  init: function () {
    console.log('init');
    // TODO
    app.drawBoardDiv = document.getElementById("board");



    console.log('drawboard');
    app.drawBoard(2, 5, 6);
  },



  drawBoard: (nbMines, xMax, yMax) => {

    const mines = app.buryMines(nbMines, xMax, yMax);
    console.log('mineseuh', mines);

    const board = document.getElementById('board');
    console.log('board', board);
    for (let y = 0; y < yMax; y++) {
      const cellRow = document.createElement("div");
      cellRow.className = "cellRow";
      const nb = y + 1;
      cellRow.id = 'row' + nb;
      board.appendChild(cellRow);

      for (let x = 0; x < xMax; x++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.addEventListener('contextmenu', function (e) {
          e.preventDefault();

          cell.classList.toggle('flagged')
        });



        if (cell.classList.contains('flagged')) {
          cell.addEventListener('click', function () {
            alert(`nan c'est flagged`)
          });

        }

        for (let mine of mines) {
          if (x === mine.x && y === mine.y) {
            cell.addEventListener('click', function () {
              cell.classList.add('boom');
              console.log("boom");
              const replay = confirm('Vous avez perdu ! Rejouer ?');
              if (replay) {
                app.init();
              }

            })

          } else {
            cell.addEventListener('click', function () {

              cell.classList.add('unhidden');
            })
          };
        }



        cellRow.appendChild(cell);

      };

    };



  },

  buryMines: (nbMines, xMax, yMax) => {

    const mines = [];

    for (let i = 0; i < nbMines; i++) {
      let mine = {
        id: i + 1,
        x: getRand(0, xMax),
        y: getRand(0, yMax)

      }
      mines.push(mine);
      console.log('mine.id', mine["id"]);
      // return mines;

    }
    console.log('mines[1]', mines[1]);

    console.log('mines1', mines);
    return mines;
  },



  clearBoard: function () {

    app.drawBoardDiv.innerHTML = "";
  },

  redrawBoard: function () {
    app.clearBoard();
    app.drawBoard();
  },






  mine1: {
    x: getRand(0, 5),
    y: getRand(0, 5),
  },






  addListenerToActions: () => {
    const btn = document.getElementById('launchScript');

    btn.addEventListener('click', app.handleLaunchScriptButton);

    console.log('launchScript', btn);





  },

  handleLaunchScriptButton: function () {
    // TODO
    var codeLines = document.getElementById('userCode').value.split(' ');


    // codeLines.forEach(truc => console.log(truc));
    console.log('codeLines', codeLines);



    // TODO : get all lines as an array

    window.setTimeout(function () {
      app.codeLineLoop(codeLines, 0);
    }, 2000);
  },



  checkSuccess: function () {
    // TODO display if the game is won or not
    if (app.cellCurrent.x === app.cellEnd.x && app.cellCurrent.y === app.cellEnd.y) {

      alert('you win!');
    } else {
      alert('you loose');
    };

  }
};

document.addEventListener('DOMContentLoaded', app.init);

