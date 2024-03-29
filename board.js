////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Global Variables
let blocks = document.querySelectorAll('.board-block')
let turn
let scoreP1 = 0
let scoreP2 = 0
let remaningPiecesP1 = 12
let remaningPiecesP2 = 12
let x = 1
let y = 1
let click = 0
let prevValues = []
let boardPlace = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
  [0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 2, 0, 2, 0, 2, 0, 0],
  [0, 0, 2, 0, 2, 0, 2, 0, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Important Loops

//Assigning values to each board block as co-ordinates
for (let i = 0; i < blocks.length; i++) {
  if (y >= 9) {
    x++
    y = 1
  }
  blocks[i].value = [x, y]
  y++
}

//Adding spaces that pieces can be moved to in values
for (let i = 0; i < blocks.length; i += 2) {
  if (i === 8 || i === 24 || i === 40 || i === 56) {
    i--
    blocks[i].value.push(0)
    i += 2
  } else if (i === 17 || i === 33 || i === 49) {
    i--
  }
  blocks[i].value.push(1)
  if (i > 0) {
    if (i !== 16 && i !== 32 && i !== 48) {
      i--
      blocks[i].value.push(0)
      i++
    }
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions

// Crowning pieces that have reached the opposite end
const crownPieces = () => {
  for (let i = 0; i < boardPlace[8].length; i++) {
    if (boardPlace[8][i] === 1) {
      boardPlace[8][i] = 3
    }
  }
  for (let i = 0; i < boardPlace[1].length; i++) {
    if (boardPlace[1][i] === 2) {
      boardPlace[1][i] = 4
    }
  }
}

//Updating Game Board on HTML page
const updateBoard = () => {
  let k = 0
  for (let i = 1; i < boardPlace.length - 1; i++) {
    for (let j = 1; j < 9; j++) {
      x = blocks[k].value[0]
      y = blocks[k].value[1]
      if (x === i && y === j)
        switch (boardPlace[i][j]) {
          case 1:
            if (!blocks[k].classList.contains('piece')) {
              blocks[k].classList.toggle('piece')
            }
            if (blocks[k].classList.contains('highlight')) {
              blocks[k].classList.toggle('highlight')
            }
            break
          case 2:
            if (!blocks[k].classList.contains('op-piece')) {
              blocks[k].classList.toggle('op-piece')
            }
            if (blocks[k].classList.contains('highlight')) {
              blocks[k].classList.toggle('highlight')
            }
            break
          case 3:
            if (!blocks[k].classList.contains('cr-piece')) {
              blocks[k].classList.toggle('cr-piece')
            }
            if (blocks[k].classList.contains('highlight')) {
              blocks[k].classList.toggle('highlight')
            }
            break
          case 4:
            if (!blocks[k].classList.contains('cr-op-piece')) {
              blocks[k].classList.toggle('cr-op-piece')
            }
            if (blocks[k].classList.contains('highlight')) {
              blocks[k].classList.toggle('highlight')
            }
            break
          case 0:
            blocks[k].className = 'board-block'
            break
          case 'h':
            if (!blocks[k].classList.contains('highlight')) {
              blocks[k].classList.toggle('highlight')
            }
        }
      k++
      crownPieces()
    }
  }
}
updateBoard()

//Resetting highlighted blocks
const resetHighlight = () => {
  for (let i = 1; i < boardPlace.length; i++) {
    for (let j = 1; j < 9; j++) {
      if (boardPlace[i][j] === 'h') {
        boardPlace[i][j] = 0
        updateBoard()
      }
    }
  }
}

//Moving pieces selected
const makeMove = (x, y, new_moves, prevX, prevY, prevClassName) => {
  let remove = 0
  let moves = new_moves.moves
  let removablePieces = new_moves.removables

  for (let i = 0; i < moves.length; i++) {
    if (x === moves[i][0] && y === moves[i][1]) {
      boardPlace[prevX][prevY] = 0
      switch (prevClassName) {
        case 'piece':
          boardPlace[x][y] = 1
          break
        case 'op-piece':
          boardPlace[x][y] = 2
          break
        case 'cr-piece':
          boardPlace[x][y] = 3
          break
        case 'cr-op-piece':
          boardPlace[x][y] = 4
          break
      }
      if (removablePieces[i][0] !== false && removablePieces[i][0] != false) {
        boardPlace[[removablePieces[i][0]]][[removablePieces[i][1]]] = 0
        remove = 1
      }
    }
  }
  resetHighlight()
  updateBoard()
  return remove
}

//Highlighting blocks movable
const highlightMovableBlocks = (new_moves) => {
  let moves = new_moves.moves
  moves.forEach((move) => {
    if (move[0] || move[1] !== false) {
      boardPlace[move[0]][move[1]] = 'h'
    }
  })
  updateBoard()
}

//Calculating normal piece movement
const movableBlocks = (x, y, classname) => {
  let move1 = []
  let move2 = []
  let move3 = []
  let move4 = []

  switch (classname) {
    case 'piece':
      move1 = [x + 1, y + 1]
      move2 = [x + 1, y - 1]
      break
    case 'op-piece':
      move1 = [x - 1, y + 1]
      move2 = [x - 1, y - 1]
      break
    case 'cr-piece':
      move1 = [x + 1, y + 1]
      move2 = [x + 1, y - 1]
      move3 = [x - 1, y - 1]
      move4 = [x - 1, y + 1]
      break
    case 'cr-op-piece':
      move1 = [x - 1, y + 1]
      move2 = [x - 1, y - 1]
      move3 = [x + 1, y - 1]
      move4 = [x + 1, y + 1]
      break
  }
  return [move1, move2, move3, move4]
}

//Extending pieces movement calculation with removable pieces
const removableBlocks = (moves, classname) => {
  let newMoves = [[], [], [], []]
  let removablePiece = [[], [], [], []]
  let movesRemovables = {}
  switch (classname) {
    case 'piece':
      if (
        boardPlace[moves[0][0]][moves[0][1]] === 2 ||
        boardPlace[moves[0][0]][moves[0][1]] === 4
      ) {
        newMoves[0][0] = moves[0][0] + 1
        newMoves[0][1] = moves[0][1] + 1
        if (boardPlace[newMoves[0][0]][newMoves[0][1]] > 0) {
          newMoves[0][0] = false
          newMoves[0][1] = false
        }
        removablePiece[0][0] = moves[0][0]
        removablePiece[0][1] = moves[0][1]
      } else if (
        boardPlace[moves[0][0]][moves[0][1]] === 1 ||
        boardPlace[moves[0][0]][moves[0][1]] === 3
      ) {
        newMoves[0][0] = false
        newMoves[0][1] = false
        removablePiece[0][0] = false
        removablePiece[0][1] = false
      } else {
        newMoves[0][0] = moves[0][0]
        newMoves[0][1] = moves[0][1]
        removablePiece[0][0] = false
        removablePiece[0][1] = false
      }
      if (
        boardPlace[moves[1][0]][moves[1][1]] === 2 ||
        boardPlace[moves[1][0]][moves[1][1]] === 4
      ) {
        newMoves[1][0] = moves[1][0] + 1
        newMoves[1][1] = moves[1][1] - 1
        if (boardPlace[newMoves[1][0]][newMoves[1][1]] > 0) {
          newMoves[1][0] = false
          newMoves[1][1] = false
        }
        removablePiece[1][0] = moves[1][0]
        removablePiece[1][1] = moves[1][1]
      } else if (
        boardPlace[moves[1][0]][moves[1][1]] === 1 ||
        boardPlace[moves[1][0]][moves[1][1]] === 3
      ) {
        newMoves[1][0] = false
        newMoves[1][1] = false
        removablePiece[1][0] = false
        removablePiece[1][1] = false
      } else {
        newMoves[1][0] = moves[1][0]
        newMoves[1][1] = moves[1][1]
        removablePiece[1][0] = false
        removablePiece[1][1] = false
      }
      newMoves[2][0] = false
      newMoves[2][1] = false
      newMoves[3][0] = false
      newMoves[3][1] = false
      removablePiece[2][0] = false
      removablePiece[2][1] = false
      removablePiece[3][0] = false
      removablePiece[3][1] = false
      break
    case 'op-piece':
      if (
        boardPlace[moves[0][0]][moves[0][1]] === 1 ||
        boardPlace[moves[0][0]][moves[0][1]] === 3
      ) {
        newMoves[0][0] = moves[0][0] - 1
        newMoves[0][1] = moves[0][1] + 1
        if (boardPlace[newMoves[0][0]][newMoves[0][1]] > 0) {
          newMoves[0][0] = false
          newMoves[0][1] = false
        }
        removablePiece[0][0] = moves[0][0]
        removablePiece[0][1] = moves[0][1]
      } else if (
        boardPlace[moves[0][0]][moves[0][1]] === 2 ||
        boardPlace[moves[0][0]][moves[0][1]] === 4
      ) {
        newMoves[0][0] = false
        newMoves[0][1] = false
        removablePiece[0][0] = false
        removablePiece[0][1] = false
      } else {
        newMoves[0][0] = moves[0][0]
        newMoves[0][1] = moves[0][1]
        removablePiece[0][0] = false
        removablePiece[0][1] = false
      }
      if (
        boardPlace[moves[1][0]][moves[1][1]] === 1 ||
        boardPlace[moves[1][0]][moves[1][1]] === 3
      ) {
        newMoves[1][0] = moves[1][0] - 1
        newMoves[1][1] = moves[1][1] - 1
        if (boardPlace[newMoves[1][0]][newMoves[1][1]] > 0) {
          newMoves[1][0] = false
          newMoves[1][1] = false
        }
        removablePiece[1][0] = moves[1][0]
        removablePiece[1][1] = moves[1][1]
      } else if (
        boardPlace[moves[1][0]][moves[1][1]] === 2 ||
        boardPlace[moves[1][0]][moves[1][1]] === 4
      ) {
        newMoves[1][0] = false
        newMoves[1][1] = false
        removablePiece[1][0] = false
        removablePiece[1][1] = false
      } else {
        newMoves[1][0] = moves[1][0]
        newMoves[1][1] = moves[1][1]
        removablePiece[1][0] = false
        removablePiece[1][1] = false
      }
      newMoves[2][0] = false
      newMoves[2][1] = false
      newMoves[3][0] = false
      newMoves[3][1] = false
      removablePiece[2][0] = false
      removablePiece[2][1] = false
      removablePiece[3][0] = false
      removablePiece[3][1] = false
      break
    case 'cr-piece':
      if (
        boardPlace[moves[0][0]][moves[0][1]] === 2 ||
        boardPlace[moves[0][0]][moves[0][1]] === 4
      ) {
        newMoves[0][0] = moves[0][0] + 1
        newMoves[0][1] = moves[0][1] + 1
        if (boardPlace[newMoves[0][0]][newMoves[0][1]] > 0) {
          newMoves[0][0] = false
          newMoves[0][1] = false
        }
        removablePiece[0][0] = moves[0][0]
        removablePiece[0][1] = moves[0][1]
      } else if (
        boardPlace[moves[0][0]][moves[0][1]] === 1 ||
        boardPlace[moves[0][0]][moves[0][1]] === 3
      ) {
        newMoves[0][0] = false
        newMoves[0][1] = false
        removablePiece[0][0] = false
        removablePiece[0][1] = false
      } else {
        newMoves[0][0] = moves[0][0]
        newMoves[0][1] = moves[0][1]
        removablePiece[0][0] = false
        removablePiece[0][1] = false
      }
      if (
        boardPlace[moves[1][0]][moves[1][1]] === 2 ||
        boardPlace[moves[1][0]][moves[1][1]] === 4
      ) {
        newMoves[1][0] = moves[1][0] + 1
        newMoves[1][1] = moves[1][1] - 1
        if (boardPlace[newMoves[1][0]][newMoves[1][1]] > 0) {
          newMoves[1][0] = false
          newMoves[1][1] = false
        }
        removablePiece[1][0] = moves[1][0]
        removablePiece[1][1] = moves[1][1]
      } else if (
        boardPlace[moves[1][0]][moves[1][1]] === 1 ||
        boardPlace[moves[1][0]][moves[1][1]] === 3
      ) {
        newMoves[1][0] = false
        newMoves[1][1] = false
        removablePiece[1][0] = false
        removablePiece[1][1] = false
      } else {
        newMoves[1][0] = moves[1][0]
        newMoves[1][1] = moves[1][1]
        removablePiece[1][0] = false
        removablePiece[1][1] = false
      }
      if (
        boardPlace[moves[2][0]][moves[2][1]] === 2 ||
        boardPlace[moves[2][0]][moves[2][1]] === 4
      ) {
        newMoves[2][0] = moves[2][0] - 1
        newMoves[2][1] = moves[2][1] - 1
        if (boardPlace[newMoves[2][0]][newMoves[2][1]] > 0) {
          newMoves[2][0] = false
          newMoves[2][1] = false
        }
        removablePiece[2][0] = moves[2][0]
        removablePiece[2][1] = moves[2][1]
      } else if (
        boardPlace[moves[2][0]][moves[2][1]] === 1 ||
        boardPlace[moves[2][0]][moves[2][1]] === 3
      ) {
        newMoves[2][0] = false
        newMoves[2][1] = false
        removablePiece[2][0] = false
        removablePiece[2][1] = false
      } else {
        newMoves[2][0] = moves[2][0]
        newMoves[2][1] = moves[2][1]
        removablePiece[2][0] = false
        removablePiece[2][1] = false
      }
      if (
        boardPlace[moves[3][0]][moves[3][1]] === 2 ||
        boardPlace[moves[3][0]][moves[3][1]] === 4
      ) {
        newMoves[3][0] = moves[3][0] - 1
        newMoves[3][1] = moves[3][1] + 1
        if (boardPlace[newMoves[3][0]][newMoves[3][1]] > 0) {
          newMoves[3][0] = false
          newMoves[3][1] = false
        }
        removablePiece[3][0] = moves[3][0]
        removablePiece[3][1] = moves[3][1]
      } else if (
        boardPlace[moves[3][0]][moves[3][1]] === 1 ||
        boardPlace[moves[3][0]][moves[3][1]] === 3
      ) {
        newMoves[3][0] = false
        newMoves[3][1] = false
        removablePiece[3][0] = false
        removablePiece[3][1] = false
      } else {
        newMoves[3][0] = moves[3][0]
        newMoves[3][1] = moves[3][1]
        removablePiece[3][0] = false
        removablePiece[3][1] = false
      }
      break
    case 'cr-op-piece':
      if (
        boardPlace[moves[0][0]][moves[0][1]] === 1 ||
        boardPlace[moves[0][0]][moves[0][1]] === 3
      ) {
        newMoves[0][0] = moves[0][0] - 1
        newMoves[0][1] = moves[0][1] + 1
        if (boardPlace[newMoves[0][0]][0][1]) {
          newMoves[0][0] = false
          newMoves[0][1] = false
        }
        removablePiece[0][0] = moves[0][0]
        removablePiece[0][1] = moves[0][1]
      } else if (
        boardPlace[moves[0][0]][moves[0][1]] === 2 ||
        boardPlace[moves[0][0]][moves[0][1]] === 4
      ) {
        newMoves[0][0] = false
        newMoves[0][1] = false
        removablePiece[0][0] = false
        removablePiece[0][1] = false
      } else {
        newMoves[0][0] = moves[0][0]
        newMoves[0][1] = moves[0][1]
        removablePiece[0][0] = false
        removablePiece[0][1] = false
      }
      if (
        boardPlace[moves[1][0]][moves[1][1]] === 1 ||
        boardPlace[moves[1][0]][moves[1][1]] === 3
      ) {
        newMoves[1][0] = moves[1][0] - 1
        newMoves[1][1] = moves[1][1] - 1
        if (boardPlace[newMoves[1][0]][newMoves[1][1]] > 0) {
          newMoves[1][0] = false
          newMoves[1][1] = false
        }
        removablePiece[1][0] = moves[1][0]
        removablePiece[1][1] = moves[1][1]
      } else if (
        boardPlace[moves[1][0]][moves[1][1]] === 2 ||
        boardPlace[moves[1][0]][moves[1][1]] === 4
      ) {
        newMoves[1][0] = false
        newMoves[1][1] = false
        removablePiece[1][0] = false
        removablePiece[1][1] = false
      } else {
        newMoves[1][0] = moves[1][0]
        newMoves[1][1] = moves[1][1]
        removablePiece[1][0] = false
        removablePiece[1][1] = false
      }
      if (
        boardPlace[moves[2][0]][moves[2][1]] === 1 ||
        boardPlace[moves[2][0]][moves[2][1]] === 3
      ) {
        newMoves[2][0] = moves[2][0] + 1
        newMoves[2][1] = moves[2][1] - 1
        if (boardPlace[newMoves[2][0]][newMoves[2][1]] > 0) {
          newMoves[2][0] = false
          newMoves[2][1] = false
        }
        removablePiece[2][0] = moves[2][0]
        removablePiece[2][1] = moves[2][1]
      } else if (
        boardPlace[moves[2][0]][moves[2][1]] === 2 ||
        boardPlace[moves[2][0]][moves[2][1]] === 4
      ) {
        newMoves[2][0] = false
        newMoves[2][1] = false
        removablePiece[2][0] = false
        removablePiece[2][1] = false
      } else {
        newMoves[2][0] = moves[2][0]
        newMoves[2][1] = moves[2][1]
        removablePiece[2][0] = false
        removablePiece[2][1] = false
      }
      if (
        boardPlace[moves[3][0]][moves[3][1]] === 1 ||
        boardPlace[moves[3][0]][moves[3][1]] === 3
      ) {
        newMoves[3][0] = moves[3][0] + 1
        newMoves[3][1] = moves[3][1] + 1
        if (boardPlace[newMoves[3][0]][newMoves[3][1]] > 0) {
          newMoves[3][0] = false
          newMoves[3][1] = false
        }
        removablePiece[3][0] = moves[3][0]
        removablePiece[3][1] = moves[3][1]
      } else if (
        boardPlace[moves[3][0]][moves[3][1]] === 2 ||
        boardPlace[moves[3][0]][moves[3][1]] === 4
      ) {
        newMoves[3][0] = false
        newMoves[3][1] = false
        removablePiece[3][0] = false
        removablePiece[3][1] = false
      } else {
        newMoves[3][0] = moves[3][0]
        newMoves[3][1] = moves[3][1]
        removablePiece[3][0] = false
        removablePiece[3][1] = false
      }
      break
  }
  movesRemovables.moves = newMoves
  movesRemovables.removables = removablePiece
  return movesRemovables
}

//Displays winning player
const displayWin = (turn) => {
  if (turn === 1) {
    document.querySelector('#player').innerText = 'Player 1'
    document.querySelector('#ghost-win').style.display = 'inline-block'
  } else if (turn === 2) {
    document.querySelector('#player').innerText = 'Player 2'
    document.querySelector('#born-win').style.display = 'inline-block'
  }
  document.querySelector('.main').style.opacity = '0.3'
  document.querySelector('.main').style.pointerEvents = 'none'
  document.querySelector('#forfeit').style.opacity = '0.3'
  document.querySelector('#forfeit').style.pointerEvents = 'none'
  document.querySelector('#result').style.display = 'block'
}

//Calculate double jump possibility
const doubleJump = (x, y, classname) => {
  let result = {}
  let removable_status = false
  let movable_places = [[], [], [], []]
  let removables = [[], [], [], []]
  let original_moves = movableBlocks(x, y, classname)
  let new_moves = removableBlocks(original_moves, classname)
  let removable_pieces = new_moves.removables
  let moves2 = new_moves.moves

  for (let i = 0; i < removable_pieces.length; i++) {
    if (
      removable_pieces[i][0] !== false &&
      removable_pieces[i][0] !== false &&
      moves2[i][0] !== false &&
      moves2[i][1] !== false &&
      moves2[i][0] !== 0 &&
      moves2[i][0] !== 9 &&
      moves2[i][1] !== 0 &&
      moves2[i][1] !== 9
    ) {
      removable_status = true
      movable_places[i][0] = moves2[i][0]
      movable_places[i][1] = moves2[i][1]
      removables[i][0] = removable_pieces[i][0]
      removables[i][1] = removable_pieces[i][1]
    } else {
      movable_places[i][0] = false
      movable_places[i][1] = false
      removables[i][0] = false
      removables[i][1] = false
    }
  }
  result.removable_status = removable_status
  result.moves = movable_places
  result.removables = removables
  return result
}

//Highlighting movables pieces
const hightlightMovablePieces = (turn) => {
  let classname
  let movables
  let counterP1 = 0
  let temp = 0
  let counterP2 = 0
  for (let i = 1; i < boardPlace.length; i++) {
    for (let j = 1; j < 9; j++) {
      if (turn === 1) {
        if (boardPlace[i][j] === 1 || boardPlace[i][j] === 3) {
          if (boardPlace[i][j] === 1) {
            classname = 'piece'
          } else if (boardPlace[i][j] === 3) {
            classname = 'cr-piece'
          }
          movables = removableBlocks(
            movableBlocks(i, j, classname),
            classname
          ).moves
          temp = 0
          for (let k = 0; k < movables.length; k++) {
            if (
              movables[k][0] !== false &&
              movables[k][0] !== false &&
              movables[k][0] !== false &&
              movables[k][1] !== false &&
              movables[k][0] !== 0 &&
              movables[k][0] !== 9 &&
              movables[k][1] !== 0 &&
              movables[k][1] !== 9
            ) {
              temp = 1
            }
          }
          if (temp > 0) {
            blocks.forEach((block) => {
              if (block.value[0] === i && block.value[1] === j) {
                block.classList.toggle('highlight-movable-ghosts')
              }
            })
            counterP1++
          }
        }
      } else if (turn === 2) {
        if (boardPlace[i][j] === 2 || boardPlace[i][j] === 4) {
          if (boardPlace[i][j] === 2) {
            classname = 'op-piece'
          } else if (boardPlace[i][j] === 4) {
            classname = 'cr-op-piece'
          }
          movables = removableBlocks(
            movableBlocks(i, j, classname),
            classname
          ).moves
          temp = 0
          for (let k = 0; k < movables.length; k++) {
            if (
              movables[k][0] !== false &&
              movables[k][0] !== false &&
              movables[k][0] !== false &&
              movables[k][1] !== false &&
              movables[k][0] !== 0 &&
              movables[k][0] !== 9 &&
              movables[k][1] !== 0 &&
              movables[k][1] !== 9
            ) {
              temp = 1
            }
          }
          if (temp > 0) {
            blocks.forEach((block) => {
              if (block.value[0] === i && block.value[1] === j) {
                block.classList.toggle('highlight-movable-borns')
              }
            })
            counterP2++
          }
        }
      }
    }
  }
  if (turn === 1) {
    for (let i = 1; i < boardPlace.length; i++) {
      for (let j = 1; j < 9; j++) {
        if (boardPlace[i][j] === 2 || boardPlace[i][j] === 4) {
          blocks.forEach((block) => {
            if (block.value[0] === i && block.value[1] === j) {
              if (block.classList.contains('highlight-movable-borns'))
                block.classList.toggle('highlight-movable-borns')
            }
          })
        }
      }
    }
    if (counterP1 === 0) {
      displayWin(2)
    } else {
      return counterP1
    }
  } else {
    for (let i = 1; i < boardPlace.length; i++) {
      for (let j = 1; j < 9; j++) {
        if (boardPlace[i][j] === 1 || boardPlace[i][j] === 3) {
          blocks.forEach((block) => {
            if (block.value[0] === i && block.value[1] === j) {
              if (block.classList.contains('highlight-movable-ghosts'))
                block.classList.toggle('highlight-movable-ghosts')
            }
          })
        }
      }
    }
    if (counterP2 === 0) {
      displayWin(1)
    } else {
      return counterP1
    }
  }
}

//Update plsayer stats
const updateStats = (turn) => {
  if (turn === 1) {
    scoreP1++
    remaningPiecesP2--
    document.querySelector('#scoreP1').innerHTML = scoreP1
    document.querySelector('#rem-piecesP2').innerHTML = remaningPiecesP2
  } else if (turn === 2) {
    scoreP2++
    remaningPiecesP1--
    document.querySelector('#scoreP2').innerHTML = scoreP2
    document.querySelector('#rem-piecesP1').innerHTML = remaningPiecesP1
  }
}

//Logic for playing turn
const playTurn = (turn, x, y, classname, removed, new_moves, turnComplete) => {
  prevValues.push(x)
  prevValues.push(y)
  prevValues.push(classname)
  let prevX = prevValues[prevValues.length - 6]
  let prevY = prevValues[prevValues.length - 5]
  let prevClass = prevValues[prevValues.length - 4]
  click++
  if (click === 1) {
    moves = movableBlocks(x, y, classname)
    new_moves = removableBlocks(moves, classname)
    highlightMovableBlocks(new_moves)
  }
  if (click === 2) {
    if (boardPlace[x][y] === 'h' && boardPlace[x][y] !== 0) {
      click = 3
    } else {
      resetHighlight()
      moves = movableBlocks(x, y, classname)
      new_moves = removableBlocks(moves, classname)
      highlightMovableBlocks(new_moves)
      click = 1
    }
  }
  if (click === 3) {
    moves = movableBlocks(prevX, prevY, prevClass)
    new_moves = removableBlocks(moves, prevClass)
    removed = makeMove(x, y, new_moves, prevX, prevY, prevClass)
    if (removed === 1) {
      updateStats(turn)
    }
    if (
      doubleJump(x, y, prevClass).removable_status === true &&
      removed === 1
    ) {
      click = 3
      highlightMovableBlocks(doubleJump(x, y, prevClass))
    } else {
      turnComplete = true
    }
  }
  if (click === 4) {
    removed = makeMove(
      x,
      y,
      doubleJump(prevX, prevY, prevValues[prevValues.length - 7]),
      prevX,
      prevY,
      prevValues[prevValues.length - 7]
    )
    turnComplete = true
    if (removed === 1) {
      updateStats(turn)
    }
  }
  return turnComplete
}

//Generating random numbers for dice roll
const diceRoll = () => {
  let rand1
  let rand2
  rand1 = Math.floor(Math.random() * 6) + 1
  document.querySelector('#dice1').innerText = `${rand1}`
  rand2 = Math.floor(Math.random() * 6) + 1
  document.querySelector('#dice2').innerText = `${rand2}`
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Event Listeners

//Event listener for pieces
for (let i = 0; i < blocks.length; i++) {
  blocks[i].addEventListener('click', () => {
    let classname = blocks[i].classList[1]
    let x = blocks[i].value[0]
    let y = blocks[i].value[1]
    let newMoves
    let turnComplete = false
    let removed = 0
    if (
      blocks[i].value[2] === 1 &&
      turn === 1 &&
      classname !== 'op-piece' &&
      classname !== 'cr-op-piece' &&
      boardPlace[x][y] !== 0
    ) {
      if (scoreP1 === 12) {
        displayWin(turn)
      }
      turnComplete = playTurn(
        1,
        x,
        y,
        classname,
        removed,
        newMoves,
        turnComplete
      )
      if (turnComplete === true) {
        document.querySelector('#turnP2').innerHTML = "Player 2's turn !"
        document.querySelector('#turnP1').innerHTML = 'Player 1'
        hightlightMovablePieces(2)
        turn = 2
        click = 0
      }
    }
    if (
      blocks[i].value[2] === 1 &&
      turn === 2 &&
      classname !== 'piece' &&
      classname !== 'cr-piece' &&
      boardPlace[x][y] !== 0 &&
      boardPlace[x][y] !== 1 &&
      boardPlace[x][y] !== 3
    ) {
      if (scoreP2 === 12) {
        displayWin(turn)
      }
      turnComplete = playTurn(
        2,
        x,
        y,
        classname,
        removed,
        newMoves,
        turnComplete
      )
      if (turnComplete === true) {
        document.querySelector('#turnP1').innerHTML = "Player 1's turn !"
        document.querySelector('#turnP2').innerHTML = 'Player 2'
        hightlightMovablePieces(1)
        turn = 1
        click = 0
      }
    }
  })
}
//Event listener for surrendering
document.querySelector('#forfeit').addEventListener('click', () => {
  let forfeit = confirm('Are you sure you want to surrender?')
  if (forfeit) {
    if (turn === 1) {
      displayWin(2)
    } else {
      displayWin(1)
    }
  } else {
    document.querySelector('.main').style.opacity = '1'
    document.querySelector('.main').style.pointerEvents = 'auto'
    document.querySelector('#forfeit').style.opacity = '1'
    document.querySelector('#forfeit').style.pointerEvents = 'auto'
    document.querySelector('#result').style.display = 'none'
  }
})

//Event listener for rolling dice
document.querySelector('#roll').addEventListener('click', () => {
  let diceinterval = setInterval(diceRoll, 100)
  let player1Roll
  let player2Roll
  document.querySelector('#roll').style.display = 'none'
  diceinterval
  setTimeout(() => {
    clearInterval(diceinterval)
    player1Roll = document.querySelector('#dice1').innerText
    player2Roll = document.querySelector('#dice2').innerText
    if (player1Roll > player2Roll) {
      document.querySelector('#win-turn').firstElementChild.innerText =
        'Player 1 Goes First !'
      document.querySelector('#dice1').style.backgroundColor = '#638889'
      document.querySelector('#confirm').style.display = 'inline-block'
      turn = 1
    } else if (player1Roll < player2Roll) {
      document.querySelector('#win-turn').firstElementChild.innerText =
        'Player 2 Goes First !'
      document.querySelector('#dice2').style.backgroundColor = '#638889'
      document.querySelector('#confirm').style.display = 'inline-block'
      turn = 2
    } else {
      document.querySelector('#roll').style.display = 'inline-block'
      document.querySelector('#win-turn').firstElementChild.innerText =
        'Draw ! Roll Again.'
    }
  }, 1900)
})
document.querySelector('#confirm').addEventListener('click', () => {
  document.querySelector('.main').style.opacity = '1'
  document.querySelector('.main').style.pointerEvents = 'auto'
  document.querySelector('#forfeit').style.opacity = '1'
  document.querySelector('#forfeit').style.pointerEvents = 'auto'
  document.querySelector('.dice-roll').style.display = 'none'
  if (turn === 1) {
    document.querySelector('#turnP1').innerHTML = "Player 1's turn !"
    hightlightMovablePieces(1)
  } else if (turn === 2) {
    document.querySelector('#turnP2').innerHTML = "Player 2's turn !"
    hightlightMovablePieces(2)
  }
})
