//Assigned values to each board block
let blocks = document.querySelectorAll('.board-block')
let turn = 1
// for (let i = 0; i < blocks.length; i++) {
//   blocks[i].value = j
//   j++
// }

// for (let i = 0; i < blocks.length; i +=2) {
//   if (i === 8 || i === 24 || i === 40 || i === 56) {
//     i++
//   } else if (i === 17 || i === 33 || i === 49) {
//     i--
//   }
//   blocks[i].value = [[i], [j]]
//   j++
// }

//adding co-ordinates
let x = 0
let y = 0
for (let i = 0; i < blocks.length; i++) {
  if (y >= 8) {
    x++
    y = 0
  }
  blocks[i].value = [x, y]
  y++
}
//adding spaces that can be moved to
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

//showing co-ordinates for helping meee
for (let i = 0; i < blocks.length; i++) {
  blocks[i].innerText = `(${blocks[i].value[0]} , ${blocks[i].value[1]})`
}

// 1-piece 2 = op-piece 3 = cr-piece 4-cr-op-piece 0=nothing h=highlight
let board_place = [
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 0, 2, 0, 2, 0, 2],
  [2, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 2, 0, 2, 0, 2]
]

//debugger
const update_board = () => {
  let k = 0

  for (let i = 0; i < board_place.length; i++) {
    for (let j = 0; j < 8; j++) {
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
    }
  }
}

const crown_piece = () => {
  for (let i = 0; i < board_place[7].length; i++) {
    if (board_place[7][i] === 1) {
      board_place[7][i] = 3
    }
  }
  for (let i = 0; i < board_place[0].length; i++) {
    if (board_place[0][i] === 2) {
      board_place[0][i] = 4
    }
  }
}
crown_piece()
update_board()

const reset_highlight = () => {
  for (let i = 0; i < board_place.length; i++) {
    for (let j = 0; j < 8; j++) {
      console.log(board_place[i][j])
      if (board_place[i][j] === 'h') {
        board_place[i][j] = 0
        update_board()
      }
    }
  }
}

const make_move = (x, y, moves) => {
  let complete = 0
  if (board_place[x][y] === 'h') {
    if (x === moves[0][0] && y === moves[0][1]) {
      // board_place[x][y] = 0
      board_place[moves[0][0]][moves[0][1]] = 1
      complete = 1
    } else if (x === moves[1][0] && y === moves[1][1]) {
      // board_place[x][y] = 0
      board_place[moves[1][0]][moves[1][1]] = 1
      complete = 1
    }
  }
  reset_highlight()
  update_board()
  return complete
}

const hightlight_movable_blocks = (x, y, moves) => {
  let complete = 0
  if (board_place[moves[0][0]][moves[0][1]] === 0) {
    board_place[moves[0][0]][moves[0][1]] = 'h'
    board_place[x][y] = 0
    complete = 1
  }
  if (board_place[moves[1][0]][moves[1][1]] === 0) {
    board_place[moves[1][0]][moves[1][1]] = 'h'
    board_place[x][y] = 0
    complete = 1
  }
  update_board()
  return complete
}

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

const removable_blocks = (moves, classname) => {
  complete = 0
  new_moves = [[], [], [], []]
  let removable_piece = [[], [], [], []]
  let moves_removables = {}
  for (let i = 0; i < moves.length; i++) {
    switch (classname) {
      case 'piece':
        if (
          board_place[moves[0][0]][moves[0][1]] === 2 ||
          board_place[moves[0][0]][moves[0][1]] === 4
        ) {
          new_moves[0][0] = moves[0][0] + 1
          new_moves[0][1] = moves[0][1] + 1
          removable_piece[0][0] = moves[0][0]
          removable_piece[0][1] = moves[0][1]
        } else if (
          board_place[moves[0][0]][moves[0][1]] === 1 ||
          board_place[moves[0][0]][moves[0][1]] === 3
        ) {
          new_moves[0][0] = false
          new_moves[0][1] = false
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
          removable_piece[1][0] = moves[1][0]
          removable_piece[1][1] = moves[1][1]
        } else if (
          board_place[moves[1][0]][moves[1][1]] === 1 ||
          board_place[moves[1][0]][moves[1][1]] === 3
        ) {
          new_moves[1][0] = false
          new_moves[1][1] = false
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
          removable_piece[0][0] = moves[0][0]
          removable_piece[0][1] = moves[0][1]
        } else if (
          board_place[moves[0][0]][moves[0][1]] === 2 ||
          board_place[moves[0][0]][moves[0][1]] === 4
        ) {
          new_moves[0][0] = false
          new_moves[0][1] = false
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
          removable_piece[1][0] = moves[1][0]
          removable_piece[1][1] = moves[1][1]
        } else if (
          board_place[moves[1][0]][moves[1][1]] === 2 ||
          board_place[moves[1][0]][moves[1][1]] === 4
        ) {
          new_moves[1][0] = false
          new_moves[1][1] = false
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
          removable_piece[0][0] = moves[0][0]
          removable_piece[0][1] = moves[0][1]
        } else if (
          board_place[moves[0][0]][moves[0][1]] === 1 ||
          board_place[moves[0][0]][moves[0][1]] === 3
        ) {
          new_moves[0][0] = false
          new_moves[0][1] = false
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
          removable_piece[1][0] = moves[1][0]
          removable_piece[1][1] = moves[1][1]
        } else if (
          board_place[moves[1][0]][moves[1][1]] === 1 ||
          board_place[moves[1][0]][moves[1][1]] === 3
        ) {
          new_moves[1][0] = false
          new_moves[1][1] = false
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
          removable_piece[2][0] = moves[2][0]
          removable_piece[2][1] = moves[2][1]
        } else if (
          board_place[moves[2][0]][moves[2][1]] === 1 ||
          board_place[moves[2][0]][moves[2][1]] === 3
        ) {
          new_moves[2][0] = false
          new_moves[2][1] = false
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
          removable_piece[3][0] = moves[3][0]
          removable_piece[3][1] = moves[3][1]
        } else if (
          board_place[moves[3][0]][moves[3][1]] === 1 ||
          board_place[moves[3][0]][moves[3][1]] === 3
        ) {
          new_moves[3][0] = false
          new_moves[3][1] = false
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
          removable_piece[0][0] = moves[0][0]
          removable_piece[0][1] = moves[0][1]
        } else if (
          board_place[moves[0][0]][moves[0][1]] === 2 ||
          board_place[moves[0][0]][moves[0][1]] === 4
        ) {
          new_moves[0][0] = false
          new_moves[0][1] = false
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
          removable_piece[1][0] = moves[1][0]
          removable_piece[1][1] = moves[1][1]
        } else if (
          board_place[moves[1][0]][moves[1][1]] === 2 ||
          board_place[moves[1][0]][moves[1][1]] === 4
        ) {
          new_moves[1][0] = false
          new_moves[1][1] = false
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
          new_moves[2][0] = moves[0][0] + 1
          new_moves[2][1] = moves[0][1] - 1
          removable_piece[2][0] = moves[0][0]
          removable_piece[2][1] = moves[0][1]
        } else if (
          board_place[moves[2][0]][moves[2][1]] === 2 ||
          board_place[moves[2][0]][moves[2][1]] === 4
        ) {
          new_moves[2][0] = false
          new_moves[2][1] = false
        } else {
          new_moves[2][0] = moves[0][0]
          new_moves[2][1] = moves[0][1]
          removable_piece[2][0] = false
          removable_piece[2][1] = false
        }
        if (
          board_place[moves[3][0]][moves[3][1]] === 1 ||
          board_place[moves[3][0]][moves[3][1]] === 3
        ) {
          new_moves[3][0] = moves[0][0] + 1
          new_moves[3][1] = moves[0][1] + 1
        } else if (
          board_place[moves[3][0]][moves[3][1]] === 2 ||
          board_place[moves[3][0]][moves[3][1]] === 4
        ) {
          new_moves[3][0] = false
          new_moves[3][1] = false
        } else {
          new_moves[3][0] = moves[0][0]
          new_moves[3][1] = moves[0][1]
          removable_piece[3][0] = false
          removable_piece[3][1] = false
        }
        break
    }
  }
  complete = 1
  moves_removables.moves = new_moves
  moves_removables.removables = removable_piece
  moves_removables.complete = complete
  return moves_removables
}

let click = 0
let prevValues = []
for (let i = 0; i < blocks.length; i++) {
  blocks[i].addEventListener('click', () => {
    console.log('i am here ' + blocks[i].value)
    let classname = blocks[i].classList[1]
    x = blocks[i].value[0]
    y = blocks[i].value[1]
    prevValues.push(x)
    prevValues.push(y)
    prevValues.push(classname)
    let prevX = prevValues[0]
    let prevY = prevValues[1]
    let prevClass = prevValues[2]
    let complete

    if (
      blocks[i].value[2] === 1 &&
      turn === 1 &&
      !classname !== 'op-piece' &&
      !classname !== 'cr-op-piece'
    ) {
      click++
      console.log('click' + click)
      if (click === 1) {
        moves = movable_blocks(x, y, classname)
        console.log(moves)
        console.log(removable_blocks(moves, classname))
        complete = hightlight_movable_blocks(x, y, moves)

        if (complete === 0) {
          console.log('complete' + complete)
          click = 0
        }
      }
      if (click === 2) {
        moves = movable_blocks(prevX, prevY, prevClass)
        complete = make_move(x, y, moves)

        if (complete === 1) {
          turn = 2
          click = 0
        } else {
          click = 0
        }
      }
    } else if (turn === 2) {
      prevValues = []
      console.log("its 2's turn")
      console.log(prevValues)
      console.log(turn)
      console.log(click)
    }
    //update_board()
  })
}
