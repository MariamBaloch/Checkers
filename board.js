////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Global Variables Here
let blocks = document.querySelectorAll('.board-block')
let turn = 1
let scoreP1 = 0
let scoreP2 = 0
let remaningPiecesP1 = 12
let remaningPiecesP2 = 12
let x = 1
let y = 1
let board_place = [
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

//Assigning values to each board block
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
// Functions Here

// Crowning pieces that have reached the opposite end
const crown_piece = () => {
  for (let i = 0; i < board_place[8].length; i++) {
    if (board_place[8][i] === 1) {
      board_place[8][i] = 3
    }
  }
  for (let i = 0; i < board_place[1].length; i++) {
    if (board_place[1][i] === 2) {
      board_place[1][i] = 4
    }
  }
}

//Updating Game Board on HTML page
const update_board = () => {
  let k = 0
  for (let i = 1; i < board_place.length - 1; i++) {
    for (let j = 1; j < 9; j++) {
      x = blocks[k].value[0]
      y = blocks[k].value[1]
      if (x === i && y === j)
        switch (board_place[i][j]) {
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
      crown_piece()
    }
  }
}
update_board()

//Resetting highlighted blocks
const reset_highlight = () => {
  for (let i = 1; i < board_place.length; i++) {
    for (let j = 1; j < 9; j++) {
      if (board_place[i][j] === 'h') {
        board_place[i][j] = 0
        update_board()
      }
    }
  }
}

//Moving pieces selected
const make_move = (x, y, new_moves, prevX, prevY, prevClassName) => {
  let remove = 0
  let moves = new_moves.moves
  let removable_pieces = new_moves.removables

  for (let i = 0; i < moves.length; i++) {
    if (x === moves[i][0] && y === moves[i][1]) {
      board_place[prevX][prevY] = 0
      switch (prevClassName) {
        case 'piece':
          board_place[x][y] = 1
          break
        case 'op-piece':
          board_place[x][y] = 2
          break
        case 'cr-piece':
          board_place[x][y] = 3
          break
        case 'cr-op-piece':
          board_place[x][y] = 4
          break
      }
      if (removable_pieces[i][0] !== false && removable_pieces[i][0] != false) {
        board_place[[removable_pieces[i][0]]][[removable_pieces[i][1]]] = 0
        remove = 1
      }
    }
  }
  reset_highlight()
  update_board()
  return remove
}

//Highlighting blocks movable
const hightlight_movable_blocks = (new_moves) => {
  let moves = new_moves.moves
  moves.forEach((move) => {
    if (move[0] || move[1] !== false) {
      board_place[move[0]][move[1]] = 'h'
    }
  })
  update_board()
}

//Calculating normal piece movement
const movable_blocks = (x, y, classname) => {
  move1 = []
  move2 = []
  move3 = []
  move4 = []

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
const removable_blocks = (moves, classname) => {
  new_moves = [[], [], [], []]
  let removable_piece = [[], [], [], []]
  let moves_removables = {}

  //check if this loop even needed?
  for (let i = 0; i < moves.length; i++) {
    switch (classname) {
      case 'piece':
        if (
          board_place[moves[0][0]][moves[0][1]] === 2 ||
          board_place[moves[0][0]][moves[0][1]] === 4
        ) {
          new_moves[0][0] = moves[0][0] + 1
          new_moves[0][1] = moves[0][1] + 1
          if (board_place[new_moves[0][0]][new_moves[0][1]] > 0) {
            new_moves[0][0] = false
            new_moves[0][1] = false
          }
          removable_piece[0][0] = moves[0][0]
          removable_piece[0][1] = moves[0][1]
        } else if (
          board_place[moves[0][0]][moves[0][1]] === 1 ||
          board_place[moves[0][0]][moves[0][1]] === 3
        ) {
          new_moves[0][0] = false
          new_moves[0][1] = false
          removable_piece[0][0] = false
          removable_piece[0][1] = false
        } else {
          new_moves[0][0] = moves[0][0]
          new_moves[0][1] = moves[0][1]
          removable_piece[0][0] = false
          removable_piece[0][1] = false
        }
        if (
          board_place[moves[1][0]][moves[1][1]] === 2 ||
          board_place[moves[1][0]][moves[1][1]] === 4
        ) {
          new_moves[1][0] = moves[1][0] + 1
          new_moves[1][1] = moves[1][1] - 1
          if (board_place[new_moves[1][0]][new_moves[1][1]] > 0) {
            new_moves[1][0] = false
            new_moves[1][1] = false
          }
          removable_piece[1][0] = moves[1][0]
          removable_piece[1][1] = moves[1][1]
        } else if (
          board_place[moves[1][0]][moves[1][1]] === 1 ||
          board_place[moves[1][0]][moves[1][1]] === 3
        ) {
          new_moves[1][0] = false
          new_moves[1][1] = false
          removable_piece[1][0] = false
          removable_piece[1][1] = false
        } else {
          new_moves[1][0] = moves[1][0]
          new_moves[1][1] = moves[1][1]
          removable_piece[1][0] = false
          removable_piece[1][1] = false
        }
        new_moves[2][0] = false
        new_moves[2][1] = false
        new_moves[3][0] = false
        new_moves[3][1] = false
        removable_piece[2][0] = false
        removable_piece[2][1] = false
        removable_piece[3][0] = false
        removable_piece[3][1] = false
        break
      case 'op-piece':
        if (
          board_place[moves[0][0]][moves[0][1]] === 1 ||
          board_place[moves[0][0]][moves[0][1]] === 3
        ) {
          new_moves[0][0] = moves[0][0] - 1
          new_moves[0][1] = moves[0][1] + 1
          if (board_place[new_moves[0][0]][new_moves[0][1]] > 0) {
            new_moves[0][0] = false
            new_moves[0][1] = false
          }
          removable_piece[0][0] = moves[0][0]
          removable_piece[0][1] = moves[0][1]
        } else if (
          board_place[moves[0][0]][moves[0][1]] === 2 ||
          board_place[moves[0][0]][moves[0][1]] === 4
        ) {
          new_moves[0][0] = false
          new_moves[0][1] = false
          removable_piece[0][0] = false
          removable_piece[0][1] = false
        } else {
          new_moves[0][0] = moves[0][0]
          new_moves[0][1] = moves[0][1]
          removable_piece[0][0] = false
          removable_piece[0][1] = false
        }
        if (
          board_place[moves[1][0]][moves[1][1]] === 1 ||
          board_place[moves[1][0]][moves[1][1]] === 3
        ) {
          new_moves[1][0] = moves[1][0] - 1
          new_moves[1][1] = moves[1][1] - 1
          if (board_place[new_moves[1][0]][new_moves[1][1]] > 0) {
            new_moves[1][0] = false
            new_moves[1][1] = false
          }
          removable_piece[1][0] = moves[1][0]
          removable_piece[1][1] = moves[1][1]
        } else if (
          board_place[moves[1][0]][moves[1][1]] === 2 ||
          board_place[moves[1][0]][moves[1][1]] === 4
        ) {
          new_moves[1][0] = false
          new_moves[1][1] = false
          removable_piece[1][0] = false
          removable_piece[1][1] = false
        } else {
          new_moves[1][0] = moves[1][0]
          new_moves[1][1] = moves[1][1]
          removable_piece[1][0] = false
          removable_piece[1][1] = false
        }
        new_moves[2][0] = false
        new_moves[2][1] = false
        new_moves[3][0] = false
        new_moves[3][1] = false
        removable_piece[2][0] = false
        removable_piece[2][1] = false
        removable_piece[3][0] = false
        removable_piece[3][1] = false
        break
      case 'cr-piece':
        if (
          board_place[moves[0][0]][moves[0][1]] === 2 ||
          board_place[moves[0][0]][moves[0][1]] === 4
        ) {
          new_moves[0][0] = moves[0][0] + 1
          new_moves[0][1] = moves[0][1] + 1
          if (board_place[new_moves[0][0]][new_moves[0][1]] > 0) {
            new_moves[0][0] = false
            new_moves[0][1] = false
          }
          removable_piece[0][0] = moves[0][0]
          removable_piece[0][1] = moves[0][1]
        } else if (
          board_place[moves[0][0]][moves[0][1]] === 1 ||
          board_place[moves[0][0]][moves[0][1]] === 3
        ) {
          new_moves[0][0] = false
          new_moves[0][1] = false
          removable_piece[0][0] = false
          removable_piece[0][1] = false
        } else {
          new_moves[0][0] = moves[0][0]
          new_moves[0][1] = moves[0][1]
          removable_piece[0][0] = false
          removable_piece[0][1] = false
        }
        if (
          board_place[moves[1][0]][moves[1][1]] === 2 ||
          board_place[moves[1][0]][moves[1][1]] === 4
        ) {
          new_moves[1][0] = moves[1][0] + 1
          new_moves[1][1] = moves[1][1] - 1
          if (board_place[new_moves[1][0]][new_moves[1][1]] > 0) {
            new_moves[1][0] = false
            new_moves[1][1] = false
          }
          removable_piece[1][0] = moves[1][0]
          removable_piece[1][1] = moves[1][1]
        } else if (
          board_place[moves[1][0]][moves[1][1]] === 1 ||
          board_place[moves[1][0]][moves[1][1]] === 3
        ) {
          new_moves[1][0] = false
          new_moves[1][1] = false
          removable_piece[1][0] = false
          removable_piece[1][1] = false
        } else {
          new_moves[1][0] = moves[1][0]
          new_moves[1][1] = moves[1][1]
          removable_piece[1][0] = false
          removable_piece[1][1] = false
        }
        if (
          board_place[moves[2][0]][moves[2][1]] === 2 ||
          board_place[moves[2][0]][moves[2][1]] === 4
        ) {
          new_moves[2][0] = moves[2][0] - 1
          new_moves[2][1] = moves[2][1] - 1
          if (board_place[new_moves[2][0]][new_moves[2][1]] > 0) {
            new_moves[2][0] = false
            new_moves[2][1] = false
          }
          removable_piece[2][0] = moves[2][0]
          removable_piece[2][1] = moves[2][1]
        } else if (
          board_place[moves[2][0]][moves[2][1]] === 1 ||
          board_place[moves[2][0]][moves[2][1]] === 3
        ) {
          new_moves[2][0] = false
          new_moves[2][1] = false
          removable_piece[2][0] = false
          removable_piece[2][1] = false
        } else {
          new_moves[2][0] = moves[2][0]
          new_moves[2][1] = moves[2][1]
          removable_piece[2][0] = false
          removable_piece[2][1] = false
        }
        if (
          board_place[moves[3][0]][moves[3][1]] === 2 ||
          board_place[moves[3][0]][moves[3][1]] === 4
        ) {
          new_moves[3][0] = moves[3][0] - 1
          new_moves[3][1] = moves[3][1] + 1
          if (board_place[new_moves[3][0]][new_moves[3][1]] > 0) {
            new_moves[3][0] = false
            new_moves[3][1] = false
          }
          removable_piece[3][0] = moves[3][0]
          removable_piece[3][1] = moves[3][1]
        } else if (
          board_place[moves[3][0]][moves[3][1]] === 1 ||
          board_place[moves[3][0]][moves[3][1]] === 3
        ) {
          new_moves[3][0] = false
          new_moves[3][1] = false
          removable_piece[3][0] = false
          removable_piece[3][1] = false
        } else {
          new_moves[3][0] = moves[3][0]
          new_moves[3][1] = moves[3][1]
          removable_piece[3][0] = false
          removable_piece[3][1] = false
        }
        break
      case 'cr-op-piece':
        if (
          board_place[moves[0][0]][moves[0][1]] === 1 ||
          board_place[moves[0][0]][moves[0][1]] === 3
        ) {
          new_moves[0][0] = moves[0][0] - 1
          new_moves[0][1] = moves[0][1] + 1
          if (board_place[new_moves[0][0]][0][1]) {
            new_moves[0][0] = false
            new_moves[0][1] = false
          }
          removable_piece[0][0] = moves[0][0]
          removable_piece[0][1] = moves[0][1]
        } else if (
          board_place[moves[0][0]][moves[0][1]] === 2 ||
          board_place[moves[0][0]][moves[0][1]] === 4
        ) {
          new_moves[0][0] = false
          new_moves[0][1] = false
          removable_piece[0][0] = false
          removable_piece[0][1] = false
        } else {
          new_moves[0][0] = moves[0][0]
          new_moves[0][1] = moves[0][1]
          removable_piece[0][0] = false
          removable_piece[0][1] = false
        }
        if (
          board_place[moves[1][0]][moves[1][1]] === 1 ||
          board_place[moves[1][0]][moves[1][1]] === 3
        ) {
          new_moves[1][0] = moves[1][0] - 1
          new_moves[1][1] = moves[1][1] - 1
          if (board_place[new_moves[1][0]][new_moves[1][1]] > 0) {
            new_moves[1][0] = false
            new_moves[1][1] = false
          }
          removable_piece[1][0] = moves[1][0]
          removable_piece[1][1] = moves[1][1]
        } else if (
          board_place[moves[1][0]][moves[1][1]] === 2 ||
          board_place[moves[1][0]][moves[1][1]] === 4
        ) {
          new_moves[1][0] = false
          new_moves[1][1] = false
          removable_piece[1][0] = false
          removable_piece[1][1] = false
        } else {
          new_moves[1][0] = moves[1][0]
          new_moves[1][1] = moves[1][1]
          removable_piece[1][0] = false
          removable_piece[1][1] = false
        }
        if (
          board_place[moves[2][0]][moves[2][1]] === 1 ||
          board_place[moves[2][0]][moves[2][1]] === 3
        ) {
          new_moves[2][0] = moves[2][0] + 1
          new_moves[2][1] = moves[2][1] - 1
          if (board_place[new_moves[2][0]][new_moves[2][1]] > 0) {
            new_moves[2][0] = false
            new_moves[2][1] = false
          }
          removable_piece[2][0] = moves[2][0]
          removable_piece[2][1] = moves[2][1]
        } else if (
          board_place[moves[2][0]][moves[2][1]] === 2 ||
          board_place[moves[2][0]][moves[2][1]] === 4
        ) {
          new_moves[2][0] = false
          new_moves[2][1] = false
          removable_piece[2][0] = false
          removable_piece[2][1] = false
        } else {
          new_moves[2][0] = moves[2][0]
          new_moves[2][1] = moves[2][1]
          removable_piece[2][0] = false
          removable_piece[2][1] = false
        }
        if (
          board_place[moves[3][0]][moves[3][1]] === 1 ||
          board_place[moves[3][0]][moves[3][1]] === 3
        ) {
          new_moves[3][0] = moves[3][0] + 1
          new_moves[3][1] = moves[3][1] + 1
          if (board_place[new_moves[3][0]][new_moves[3][1]] > 0) {
            new_moves[3][0] = false
            new_moves[3][1] = false
          }
          removable_piece[3][0] = moves[3][0]
          removable_piece[3][1] = moves[3][1]
        } else if (
          board_place[moves[3][0]][moves[3][1]] === 2 ||
          board_place[moves[3][0]][moves[3][1]] === 4
        ) {
          new_moves[3][0] = false
          new_moves[3][1] = false
          removable_piece[3][0] = false
          removable_piece[3][1] = false
        } else {
          new_moves[3][0] = moves[3][0]
          new_moves[3][1] = moves[3][1]
          removable_piece[3][0] = false
          removable_piece[3][1] = false
        }
        break
    }
  }

  moves_removables.moves = new_moves
  moves_removables.removables = removable_piece
  return moves_removables
}

//Displays winning player
const displayWin = (turn) => {
  if (turn === 1) {
    document.querySelector('.main').style.display = 'none'
    document.querySelector('#forfeit').style.display = 'none'
    document.querySelector('#player').innerText = 'Player 1'
    document.querySelector('#result').style.display = 'block'
  } else if (turn === 2) {
    document.querySelector('.main').style.display = 'none'
    document.querySelector('#forfeit').style.display = 'none'
    document.querySelector('#player').innerText = 'Player 2'
    document.querySelector('#result').style.display = 'block'
  }
}

//Calculate double jump possibility
const double_jump = (x, y, classname) => {
  let result = {}
  let removable_status = false
  let movable_places = [[], [], [], []]
  let removables = [[], [], [], []]
  let original_moves = movable_blocks(x, y, classname)
  let new_moves = removable_blocks(original_moves, classname)
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
const highlight_movable_pieces = (turn) => {
  let classname
  let movables
  let counterP1 = 0
  let temp = 0
  let counterP2 = 0
  for (let i = 1; i < board_place.length; i++) {
    for (let j = 1; j < 9; j++) {
      if (turn === 1) {
        if (board_place[i][j] === 1 || board_place[i][j] === 3) {
          if (board_place[i][j] === 1) {
            classname = 'piece'
          } else if (board_place[i][j] === 3) {
            classname = 'cr-piece'
          }
          movables = removable_blocks(
            movable_blocks(i, j, classname),
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
                block.classList.toggle('highlight-movables')
              }
            })
            counterP1++
          }
        }
      } else if (turn === 2) {
        if (board_place[i][j] === 2 || board_place[i][j] === 4) {
          if (board_place[i][j] === 2) {
            classname = 'op-piece'
          } else if (board_place[i][j] === 4) {
            classname = 'cr-op-piece'
          }
          movables = removable_blocks(
            movable_blocks(i, j, classname),
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
                block.classList.toggle('highlight-movables')
              }
            })
            counterP2++
          }
        }
      }
    }
  }

  if (turn === 1) {
    for (let i = 1; i < board_place.length; i++) {
      for (let j = 1; j < 9; j++) {
        if (board_place[i][j] === 2 || board_place[i][j] === 4) {
          blocks.forEach((block) => {
            if (block.value[0] === i && block.value[1] === j) {
              if (block.classList.contains('highlight-movables'))
                block.classList.toggle('highlight-movables')
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
    for (let i = 1; i < board_place.length; i++) {
      for (let j = 1; j < 9; j++) {
        if (board_place[i][j] === 1 || board_place[i][j] === 3) {
          blocks.forEach((block) => {
            if (block.value[0] === i && block.value[1] === j) {
              if (block.classList.contains('highlight-movables'))
                block.classList.toggle('highlight-movables')
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GAME LOGIC

// Displaying Player Turn
if (turn === 1) {
  document.querySelector('#turnP1').innerHTML = "Player 1's turn !"
  highlight_movable_pieces(1)
} else if (turn === 2) {
  document.querySelector('#turnP2').innerHTML = "Player 2's turn !"
  highlight_movable_pieces(2)
}
//Event Listener
let click = 0
let prevValues = []
for (let i = 0; i < blocks.length; i++) {
  blocks[i].addEventListener('click', () => {
    let classname = blocks[i].classList[1]
    let x = blocks[i].value[0]
    let y = blocks[i].value[1]
    prevValues.push(x)
    prevValues.push(y)
    prevValues.push(classname)
    let prevX = prevValues[prevValues.length - 6]
    let prevY = prevValues[prevValues.length - 5]
    let prevClass = prevValues[prevValues.length - 4]
    let removed = 0
    let new_moves
    if (
      blocks[i].value[2] === 1 &&
      turn === 1 &&
      classname !== 'op-piece' &&
      classname !== 'cr-op-piece' &&
      board_place[x][y] !== 0
    ) {
      if (scoreP1 === 12) {
        displayWin(turn)
      }
      click++
      if (click === 1) {
        moves = movable_blocks(x, y, classname)
        new_moves = removable_blocks(moves, classname)
        hightlight_movable_blocks(new_moves)
      }
      if (click === 2) {
        if (board_place[x][y] === 'h' && board_place[x][y] !== 0) {
          click = 3
        } else {
          reset_highlight()
          moves = movable_blocks(x, y, classname)
          new_moves = removable_blocks(moves, classname)
          hightlight_movable_blocks(new_moves)
          click = 1
        }
      }
      if (click === 3) {
        moves = movable_blocks(prevX, prevY, prevClass)
        new_moves = removable_blocks(moves, prevClass)
        removed = make_move(x, y, new_moves, prevX, prevY, prevClass)
        if (removed === 1) {
          scoreP1++
          remaningPiecesP2--
          document.querySelector('#scoreP1').innerHTML = scoreP1
          document.querySelector('#rem-piecesP2').innerHTML = remaningPiecesP2
        }
        if (double_jump(x, y, prevClass).removable_status === true) {
          click = 3
          hightlight_movable_blocks(double_jump(x, y, prevClass))
        } else {
          turn = 2
          click = 0
          document.querySelector('#turnP2').innerHTML = "Player 2's turn !"
          document.querySelector('#turnP1').innerHTML = 'Player 1'
          highlight_movable_pieces(2)
        }
      }
      if (click === 4) {
        removed = make_move(
          x,
          y,
          double_jump(prevX, prevY, prevValues[prevValues.length - 7]),
          prevX,
          prevY,
          prevValues[prevValues.length - 7]
        )
        if (removed === 1) {
          scoreP1++
          remaningPiecesP2--
          document.querySelector('#scoreP1').innerHTML = scoreP1
          document.querySelector('#rem-piecesP2').innerHTML = remaningPiecesP2
        }
        turn = 2
        click = 0
        document.querySelector('#turnP2').innerHTML = "Player 2's turn !"
        document.querySelector('#turnP1').innerHTML = 'Player 1'
        highlight_movable_pieces(2)
      }
    }
    if (
      blocks[i].value[2] === 1 &&
      turn === 2 &&
      classname !== 'piece' &&
      classname !== 'cr-piece' &&
      board_place[x][y] !== 0 &&
      board_place[x][y] !== 1 &&
      board_place[x][y] !== 3
    ) {
      if (scoreP2 === 12) {
        displayWin(turn)
      }
      click++
      if (click === 1) {
        moves = movable_blocks(x, y, classname)
        new_moves = removable_blocks(moves, classname)
        hightlight_movable_blocks(new_moves)
      }
      if (click === 2) {
        if (board_place[x][y] === 'h' && board_place[x][y] !== 0) {
          click = 3
        } else {
          reset_highlight()
          moves = movable_blocks(x, y, classname)
          new_moves = removable_blocks(moves, classname)
          hightlight_movable_blocks(new_moves)
          click = 1
        }
      }
      if (click === 3) {
        moves = movable_blocks(prevX, prevY, prevClass)
        new_moves = removable_blocks(moves, prevClass)
        removed = make_move(x, y, new_moves, prevX, prevY, prevClass)
        if (removed === 1) {
          scoreP2++
          remaningPiecesP1--
          document.querySelector('#scoreP2').innerHTML = scoreP2
          document.querySelector('#rem-piecesP1').innerHTML = remaningPiecesP1
        }
        if (double_jump(x, y, prevClass).removable_status === true) {
          click = 3
          hightlight_movable_blocks(double_jump(x, y, prevClass))
        } else {
          document.querySelector('#turnP1').innerHTML = "Player 1's turn !"
          document.querySelector('#turnP2').innerHTML = 'Player 2'
          turn = 1
          click = 1
          highlight_movable_pieces(1) === 0
        }
      }
      if (click === 4) {
        removed = make_move(
          x,
          y,
          double_jump(prevX, prevY, prevValues[prevValues.length - 7]),
          prevX,
          prevY,
          prevValues[prevValues.length - 7]
        )
        if (removed === 1) {
          scoreP2++
          remaningPiecesP1--
          document.querySelector('#scoreP2').innerHTML = scoreP2
          document.querySelector('#rem-piecesP1').innerHTML = remaningPiecesP1
        }
        document.querySelector('#turnP1').innerHTML = "Player 1's turn !"
        document.querySelector('#turnP2').innerHTML = 'Player 2'
        turn = 1
        highlight_movable_pieces(1) === 0
        click = 1
      }
    }
  })
}
