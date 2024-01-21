//Assigned values to each board block
let blocks = document.querySelectorAll('.board-block')
let turn = 1

//adding co-ordinates
let x = 1
let y = 1
for (let i = 0; i < blocks.length; i++) {
  if (y >= 9) {
    x++
    y = 1
  }
  blocks[i].value = [x, y]
  y++
}
//adding spaces that pieces can be moved to
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
// let board_place = [
//   [1, 0, 1, 0, 1, 0, 1, 0],
//   [0, 1, 0, 1, 0, 1, 0, 1],
//   [1, 0, 1, 0, 1, 0, 1, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 2, 0, 2, 0, 2, 0, 2],
//   [2, 0, 2, 0, 2, 0, 2, 0],
//   [0, 2, 0, 2, 0, 2, 0, 2]
// ]

let board_place = [
  [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
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
//crown pieces that reach the end line
//update board visually
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
// reset the highlighting once move has been made
const reset_highlight = () => {
  for (let i = 0; i < board_place.length; i++) {
    for (let j = 0; j < 8; j++) {
      if (board_place[i][j] === 'h') {
        board_place[i][j] = 0
        update_board()
      }
    }
  }
}
// need to fix this
// const make_move = (x, y, moves) => {
//   let complete = 0
//   if (board_place[x][y] === 'h') {
//     if (x === moves[0][0] && y === moves[0][1]) {
//       // board_place[x][y] = 0
//       board_place[moves[0][0]][moves[0][1]] = 1
//       complete = 1
//     } else if (x === moves[1][0] && y === moves[1][1]) {
//       // board_place[x][y] = 0
//       board_place[moves[1][0]][moves[1][1]] = 1
//       complete = 1
//     }
//   }
//   reset_highlight()
//   update_board()
//   return complete
// }

const make_move = (x, y, new_moves, prevX, prevY, prevClassName) => {
  let complete = 0
  let moves = new_moves.moves
  let removable_pieces = new_moves.removables
  let remove = []

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
      }
    }
  }

  reset_highlight()
  update_board()
  return complete
}
//highlighting movable blocks
const hightlight_movable_blocks = (new_moves) => {
  let complete = 0
  let moves = new_moves.moves
  console.log(moves)
  moves.forEach((move) => {
    if (move[0] || move[1] !== false) {
      board_place[move[0]][move[1]] = 'h'
    }
  })
  complete = 1
  update_board()
  return complete
}
//calculate vanilla movable blocks
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
// calculate extended movable blocks and removable pieces
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
        } else {
          new_moves[3][0] = moves[3][0]
          new_moves[3][1] = moves[3][1]
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

//event listener
let click = 0
let prevValues = []
for (let i = 0; i < blocks.length; i++) {
  blocks[i].addEventListener('click', () => {
    console.log('i am here ' + blocks[i].value)
    let classname = blocks[i].classList[1]
    let x = blocks[i].value[0]
    let y = blocks[i].value[1]
    prevValues.push(x)
    prevValues.push(y)
    prevValues.push(classname)
    let prevX = prevValues[prevValues.length - 6]
    let prevY = prevValues[prevValues.length - 5]
    let prevClass = prevValues[prevValues.length - 4]

    let complete
    let new_moves
    console.log('click: ' + click)
    if (
      blocks[i].value[2] === 1 &&
      turn === 1 &&
      classname !== 'op-piece' &&
      classname !== 'cr-op-piece' &&
      board_place[x][y] !== 0
    ) {
      click++
      console.log('click: ' + click)
      console.log('turn 1')
      if (click === 1) {
        moves = movable_blocks(x, y, classname)
        new_moves = removable_blocks(moves, classname)
        complete = hightlight_movable_blocks(new_moves)
        if (complete === 1) {
          console.log('complete ' + complete)
        }
      }
      // debugger
      if (click === 2) {
        if (board_place[x][y] === 'h' && board_place[x][y] !== 0) {
          click = 3
        } else {
          reset_highlight()
          moves = movable_blocks(x, y, classname)
          new_moves = removable_blocks(moves, classname)
          complete = hightlight_movable_blocks(new_moves)
          if (complete === 1) {
            console.log('complete 2 ' + complete)
          }
          click = 1
        }
      }
      if (click === 3) {
        //add moving pieces function which if completed returns 1
        moves = movable_blocks(prevX, prevY, prevClass)
        new_moves = removable_blocks(moves, prevClass)
        console.log(new_moves)
        make_move(x, y, new_moves, prevX, prevY, prevClass)
        turn = 2
        click = 0
        console.log('koko')
        //debugger
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
      console.log("its 2's turn")
      click++
      console.log('click: ' + click)

      if (click === 1) {
        moves = movable_blocks(x, y, classname)
        new_moves = removable_blocks(moves, classname)
        complete = hightlight_movable_blocks(new_moves)
        if (complete === 1) {
          console.log('complete ' + complete)
        }
      }
      // debugger
      if (click === 2) {
        if (board_place[x][y] === 'h' && board_place[x][y] !== 0) {
          click = 3
        } else {
          reset_highlight()
          moves = movable_blocks(x, y, classname)
          new_moves = removable_blocks(moves, classname)
          complete = hightlight_movable_blocks(new_moves)
          if (complete === 1) {
            console.log('complete 2 ' + complete)
          }
          click = 1
        }
      }
      if (click === 3) {
        //add moving pieces function which if completed returns 1
        moves = movable_blocks(prevX, prevY, prevClass)
        new_moves = removable_blocks(moves, prevClass)
        console.log(new_moves)
        make_move(x, y, new_moves, prevX, prevY, prevClass)
        turn = 1
        click = 1
      }
    }
  })
}
