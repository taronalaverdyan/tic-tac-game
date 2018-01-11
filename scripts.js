var gameMap = [  [0,0,0],[0,0,0],[0,0,0]  ];
var playerClicked ;
var rowIndex;
var cellIndex;
var dioganal1 = [gameMap[0][0],gameMap[1][1],gameMap[2][2]];
var dioganal2 = [gameMap[0][2],gameMap[1][1],gameMap[2][0]];
var isGameFinished = false;
var totalClicks = 0;

$(function() {
  $("#tic-tac-table")[0].oncontextmenu = function() {return false;};

  $('#tic-tac-table td').mousedown(function(e) {
    if (!$(this).html() && !isGameFinished) {
      rowIndex = $(this).parent().index();
      cellIndex = $(this).index();

      if (e.button == 2) {
        if (playerClicked == "x" ) {
          return;
        }
        $(this).html('<span class = x > x </span>');
        playerClicked = "x";
      } else {
        if (playerClicked == "o") {
          return;
        }
        $(this).html('<span class = o > o </span>')
        playerClicked = "o";
      }
      gameMap[rowIndex][cellIndex] = playerClicked;
      totalClicks = totalClicks + 1;


      dioganal1 = [];
      dioganal2 = [];
      for (var i = 0; i < gameMap.length; i++) {
        dioganal1.push(gameMap[i][i]);
        dioganal2.push(gameMap[i][gameMap.length-1-i])
      }

      checkGameStatus(gameMap);
    }
  });
});

function checkGameStatus(gameMap) {
  for (var i = 0; i < gameMap.length; i++) {
    if (isArrayElementEqual(gameMap[i]) || isArrayElementEqual(dioganal1) || isArrayElementEqual(dioganal2) || isArrayColElementEqual(gameMap)) {
      alert("Player " + playerClicked + " win");
      isGameFinished = true;
      break;
    } else {
        if (totalClicks == 9) {
          alert("Draw");
          break;
        }
      }
    }
}

function isArrayElementEqual(array) {
  var isEqual = false;
  if (!array[0]) {
    return isEqual;
  }
  for (var i = 1; i < array.length; i++) {
    if (array[0] !== array[i]) {
      break;
    }
    else {
      if (i == array.length - 1) {
        isEqual = true
      }
    }
  }
  return isEqual;
}

function isArrayColElementEqual(array) {
   var isEqual = false;

   for (var j = 0; j < array.length; j++) {
     firstElement = array[0][j];

     if (!firstElement) {
       return isEqual;
     }
     for (var i = 0; i < array.length; i++) {
       if (array[0][j] !== array[i][j]) {
         break;
       }
       else {
         if (i == array.length - 1) {
           isEqual = true
         }
       }
     }
   }
   return isEqual;
}
