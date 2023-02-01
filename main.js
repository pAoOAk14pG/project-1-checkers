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

function markChecker(checkerID){
  $("#" + checkerID.toString()).addClass("selected-checker");
  return 0;
}

const isValidCheckerNextClicked = (e) => {
  console.log($(e.target))
  if($(e.target).hasClass("selected-checker") === true){
    let moveCheckerID = parseInt($(e.target).attr("id"));
    boardState[moveCheckerID] = pieceID;
    $("#" + pieceIndex.toString()).appendTo("#" + moveCheckerID.toString());
    boardState[pieceIndex] = null;
    $("#" + pieceIndex.toString()).empty();
    turn = Boolean(turn ^ 1) //Bitwise XOR used as hacky way to toggle a boolean
    console.log(turn);
  }
}

function handleMovementValidity(){
  let validSpaceFound = false;
  if (pieceID <= 74 && turn === false){ //Red pieces must have an ID smaller than 75
    if(pieceIndex % 8 != 0 && boardState[pieceIndex + 7] === null){ //Is this red checker piece NOT on the left side of the board, and if not, is the left diagonal space below it empty?
      markChecker(pieceIndex + 7);
      validSpaceFound = true;
    }
    if(pieceIndex % 8 != 7 && boardState[pieceIndex + 9] === null){ //Is this red checker piece NOT on the right side of the board, and if not, is the right diagonal space below it empty?
      markChecker(pieceIndex + 9);
      validSpaceFound = true;
    }
  }
  if (validSpaceFound === true){
    $(document).one("click", isValidCheckerNextClicked);
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
  return 0;
}

main();
