// Piece numbers associated with ID in HTML file. Array used for most game logic
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
let capturePieceIndex = [-1. -1, -1, -1]; //Marks the indexes of pieces that can be captured by the last selected piece. One index for each direction to move in
let captureMovementIndex = [-1, -1, -1, -1];//Marks the indexes of checker squares that can be moved to when a capture is made. Indexes align with above array

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
  if ($(e.target).hasClass("selected-checker") === true){; //Is the clicked square a legal move for the last selected piece? If so, update the boardState array and the HTML file to reflect the changes
    let moveCheckerID = parseInt($(e.target).attr("id"));
    boardState[moveCheckerID] = pieceID;
    $("#" + pieceID.toString()).appendTo($(e.target));
    boardState[pieceIndex] = null;
    $("#" + pieceIndex.toString()).empty();
    if (captureMovementIndex.includes(moveCheckerID) === true){ //Was the last move made a capture? If so, remove the captured piece in the boardState array and the HTML file
      let removePieceID = capturePieceIndex[captureMovementIndex.indexOf(moveCheckerID)];
      boardState[removePieceID] = null;
      $("#" + removePieceID.toString()).empty();
      if (turn === false){blackPiecesLeft--;}
      else{redPiecesLeft--;}
    }
    if (turn === false && moveCheckerID >= 56){ //Is it red's turn, and if so has the last moved piece been moved to a back row checker square?
      $("#" + pieceID.toString()).addClass("king-piece");
    }
    if (turn === true && moveCheckerID <= 7){ //Is it black's turn, and if so has the last moved piece been moved to a back row checker square?
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
  if (pieceIndex % 8 != 0 && pieceIndex >= 10){ //Is the last selected piece NOT on the left edge of the board AND is it located far forward enough that it can't move up to the left?
    if (pieceIndex % 8 != 1 && pieceIndex >= 19){ //Is the last selected piece NOT on the second column AND is it located far forward enough that it can't capture up to the left?
      if (turn === false && boardState[pieceIndex - 9] >= 75){ //Is it red's turn, AND is the piece to the last selected piece's top left a black piece?
        if (boardState[pieceIndex - 18] === null){ //Is the checker square two times up to the left empty?
          capturePieceIndex[0] = pieceIndex - 9;
          captureMovementIndex[0] = pieceIndex - 18;
          markChecker(pieceIndex - 18);
        }
      }
      if (turn === true && boardState[pieceIndex - 9] <= 74){ //Is it black's turn? (Also one half of a check if the piece to the top left of the last selected is red)
        if (boardState[pieceIndex - 18] === null && boardState[pieceIndex - 9] >= 63){ //Is the square two times up to the left empty? (Also the other half of the aforementioned red piece check)
            captureMovementIndex[0] = pieceIndex - 18;
            markChecker(pieceIndex - 18);
        }
      }
    }
    if (boardState[pieceIndex - 9] == null){
      markChecker(pieceIndex - 9);
    }
  }
  return 0; //The other three functions have similar formats, just with different magic numbers to identify a different direction
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
  if (pieceID <= 74 && turn === false){ //Was the last selected piece a red piece AND is it red's turn? (Prevents black pieces from being moved)
    if ($("#" + pieceID.toString()).hasClass("king-piece") === true){
      checkLeftUpDiagonal();
      checkRightUpDiagonal();
    }
    checkLeftDownDiagonal();
    checkRightDownDiagonal();
  }
  else if (pieceID >= 75 && turn === true){ //Was the last selected piece a black piece AND is it blacks's turn? (Prevents red pieces from being moved)
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
