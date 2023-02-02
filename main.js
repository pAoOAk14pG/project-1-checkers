// Piece numbers associated with ID in HTML file
let boardState = [
  null, 63, null, 64, null, 65, null, 66,
  67, null, 68, null, 69, null, 70, null,
  null, 71, null, 72, null, 73, null, 74,
  null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null,
  75, null, 76, null, 77, null, 78, null,
  null, 79, null, 80, null, 81, null, 82,
  83, null, 84, null, 85, null, 86, null
]

let turn = false; //false for red's turn, true for black's turn
let pieceID;
let pieceIndex;
let redPiecesLeft = 12;
let blackPiecesLeft = 12;
let capturePieceIndex = [-1. -1, -1, -1];
let captureMovementIndex = [-1, -1, -1, -1];

function clearCapturePieceArrays(){
  capturePieceIndex = [-1. -1, -1, -1];
  captureMovementIndex = [-1, -1, -1, -1];
  return 0;
}

function markChecker(checkerID){
  $("#" + checkerID.toString()).addClass("selected-checker");
  return 0;
}

function removeMarkedCheckers(){
  $("td").removeClass("selected-checker");
  return 0;
}

function modifyTurnText(){
  if (turn === false){
    $("h2").html("Red's turn (moves towards bottom)");
  }else if(turn === true){
    $("h2").html("Black's turn (moves towards top)")
  }
  else{
    alert("Something's gone wrong here.");
    return -1;
  }
  return 0;
}

function analyzeBoardState(){
  if (redPiecesLeft <= 0){
    $("h2").html("Black wins! (Red ran out of pieces)");
    $(".playing-piece").off("click");
    $("td").off("click");

  }
  if (blackPiecesLeft <= 0){
    $("h2").html("Red wins! (Black ran out of pieces)");
    $(".playing-piece").off("click");
    $("td").off("click");
  }
  return 0;
}

const manageCheckers = (e) => {
  if ($(e.target).hasClass("selected-checker") === true){;
    let moveCheckerID = parseInt($(e.target).attr("id"));
    boardState[moveCheckerID] = pieceID;
    $("#" + pieceID.toString()).appendTo($(e.target));
    boardState[pieceIndex] = null;
    $("#" + pieceIndex.toString()).empty();
    if (captureMovementIndex.includes(moveCheckerID) === true){
      let removePieceID = capturePieceIndex[captureMovementIndex.indexOf(moveCheckerID)];
      boardState[removePieceID] = null;
      $("#" + removePieceID.toString()).empty();
      if (turn === false){blackPiecesLeft--;}
      else{redPiecesLeft--;}
    }
    if (turn === false && moveCheckerID >= 56){
      $("#" + pieceID.toString()).addClass("king-piece");
    }
    if (turn === true && moveCheckerID <= 7){
      $("#" + pieceID.toString()).addClass("king-piece");
    }
    turn = Boolean(turn ^ 1) //Bitwise XOR used as hacky way to toggle a boolean
    clearCapturePieceArrays();
    modifyTurnText();
    analyzeBoardState();
    removeMarkedCheckers();
  }
}

function checkLeftUpDiagonal(){
  if (pieceIndex % 8 != 0 && pieceIndex >= 10){
    if (pieceIndex % 8 != 1 && pieceIndex >= 19){
      if (turn === false && boardState[pieceIndex - 9] >= 75){
        if (boardState[pieceIndex - 18] === null){
          capturePieceIndex[0] = pieceIndex - 9;
          captureMovementIndex[0] = pieceIndex - 18;
          markChecker(pieceIndex - 18);
        }
      }
      if (turn === true && boardState[pieceIndex - 9] <= 74){
        if (boardState[pieceIndex - 18] === null && boardState[pieceIndex - 9] >= 63){
            capturePieceIndex[0] = pieceIndex - 9;
            captureMovementIndex[0] = pieceIndex - 18;
            markChecker(pieceIndex - 18);
        }
      }
    }
    if (boardState[pieceIndex - 9] == null){
      markChecker(pieceIndex - 9);
    }
  }
  return 0;
}

function checkRightUpDiagonal(){
  if (pieceIndex % 8 != 7 && pieceIndex >= 8){
    if (pieceIndex % 8 != 6 && pieceIndex >= 19){
      if (turn === false && boardState[pieceIndex - 7] >= 75){
        if (boardState[pieceIndex - 14] === null){
          capturePieceIndex[1] = pieceIndex - 7;
          captureMovementIndex[1] = pieceIndex - 14;
          markChecker(pieceIndex - 14);
        }
      }
      if (turn === true && boardState[pieceIndex - 7] <= 74){
        if (boardState[pieceIndex - 14] === null && boardState[pieceIndex - 7] >= 63){
          capturePieceIndex[1] = pieceIndex - 7;
          captureMovementIndex[1] = pieceIndex - 14;
          markChecker(pieceIndex - 14);
        }
      }
    }
    if (boardState[pieceIndex - 7] == null){
      markChecker(pieceIndex - 7);
    }
  }
  return 0;
}

function checkLeftDownDiagonal(){
  if (pieceIndex % 8 != 0 && pieceIndex <= 55){
    if (pieceIndex % 8 != 1 && pieceIndex <= 46){
      if (turn === false && boardState[pieceIndex + 7] >= 75){
        if (boardState[pieceIndex + 14] === null){
          capturePieceIndex[2] = pieceIndex + 7;
          captureMovementIndex[2] = pieceIndex + 14;
          markChecker(pieceIndex + 14);
        }
      }
      if (turn === true && boardState[pieceIndex + 7] <= 74){
        if (boardState[pieceIndex + 14] === null && boardState[pieceIndex + 7] >= 63){
          capturePieceIndex[2] = pieceIndex + 7;
          captureMovementIndex[2] = pieceIndex + 14;
          markChecker(pieceIndex + 14);
        }
      }
    }
    if (boardState[pieceIndex + 7] == null){
      markChecker(pieceIndex + 7)
    }
  }
  return 0;
}

function checkRightDownDiagonal(){
  if (pieceIndex % 8 != 7 && pieceIndex <= 53){
    if (pieceIndex % 8 != 6 && pieceIndex <= 44){
      if (turn === false && boardState[pieceIndex + 9] >= 75){
        if (boardState[pieceIndex + 18] === null){
          capturePieceIndex[3] = pieceIndex + 9;
          captureMovementIndex[3] = pieceIndex + 18;
          markChecker(pieceIndex + 18);
        }
      }
      if (turn === true && boardState[pieceIndex + 9] <= 74){
        if (boardState[pieceIndex + 18] === null && boardState[pieceIndex + 9] >= 63){
          capturePieceIndex[3] = pieceIndex + 9;
          captureMovementIndex[3] = pieceIndex + 18;
          markChecker(pieceIndex + 18);
        }
      }
    }
    if (boardState[pieceIndex + 9] == null){
      markChecker(pieceIndex + 9);
    }
  }
  return 0;
}

function handleMovementValidity(){
  clearCapturePieceArrays();
  removeMarkedCheckers();
  if (pieceID <= 74 && turn === false){
    if ($("#" + pieceID.toString()).hasClass("king-piece") === true){
      checkLeftUpDiagonal();
      checkRightUpDiagonal();
    }
    checkLeftDownDiagonal();
    checkRightDownDiagonal();
  }
  else if (pieceID >= 75 && turn === true){
    if ($("#" + pieceID.toString()).hasClass("king-piece") === true){
      checkLeftDownDiagonal();
      checkRightDownDiagonal();
    }
    checkLeftUpDiagonal();
    checkRightUpDiagonal();
  }
  return 0;
}

const handlePieces = (e) => {
  pieceID = parseInt($(e.target).attr("id"));
  pieceIndex = boardState.indexOf(pieceID);
  handleMovementValidity();
  return 0;
}

function main(){
  $(".playing-piece").on("click", handlePieces);
  $("td").on("click", manageCheckers);
  return 0;
}

main();
