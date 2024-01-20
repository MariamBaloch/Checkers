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

// const movement = [
//   [1, 2, 3, 4],
//   [5, 6, 7, 8],
//   [9, 10, 11, 12],
//   [13, 14, 15, 16],
//   [17, 18, 19, 20],
//   [21, 22, 23, 24],
//   [25, 26, 27, 28],
//   [29, 30, 31, 32]
// ]

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
            break
          case 2:
            if (!blocks[k].classList.contains('op-piece')) {
              blocks[k].classList.toggle('op-piece')
            }
            break
          case 3:
            if (!blocks[k].classList.contains('cr-piece')) {
              blocks[k].classList.toggle('cr-piece')
            }
            break
          case 4:
            if (!blocks[k].classList.contains('cr-op-piece')) {
              blocks[k].classList.toggle('cr-op-piece')
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
update_board()

//fix
// const update_board = () => {
//   let k = 0
//   for (let i = 0; i < board_place.length; i++) {
//     for (let j = 0; j < 8; j++) {
//       let temp = blocks[k].classList[1]
//       if (temp !== undefined) {
//         switch (temp) {
//           case 'piece':
//             board_place[i][j] = 1
//             break
//           case 'op-piece':
//             board_place[i][j] = 2
//             break
//           case 'cr-piece':
//             board_place[i][j] = 10
//             break
//           case 'cr-op-piece':
//             board_place[i][j] = 20
//             break
//         }
//       } else {
//         board_place[i][j] = ''
//       }
//       k++
//     }
//   }
// }
//update_board()

// let status = 0
// const make_move = (x, y, moves) => {
//   let temp = board_place[x][y]
//   board_place[x][y] = 0

//   if (board_place[moves[0][0]][moves[0][1]] === 0) {
//     board_place[moves[0][0]][moves[0][1]] = 'h'
//   }
//   if (board_place[moves[1][0]][moves[1][1]] === 0) {
//     board_place[moves[1][0]][moves[1][1]] = 'h'
//   }

//   for (let i = 0; i < blocks.length; i++) {
//     blocks[i].addEventListener('click', () => {
//       if (status === 0) {
//         if (
//           blocks[i].value[0] === moves[0][0] &&
//           blocks[i].value[1] === moves[0][1]
//         ) {
//           board_place[moves[0][0]][moves[0][1]] = temp
//         } else if (
//           blocks[i].value[0] === moves[1][0] &&
//           blocks[i].value[1] === moves[1][1]
//         ) {
//           board_place[moves[1][0]][moves[1][1]] = temp
//         } else {
//           board_place[x][y] = temp
//         }
//         update_board()
//         status = 1
//       }
//       reset_highlight(status)
//     })
//   }
//   return status
// }

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
const reset_highlight = () => {
  for (let i = 0; i < board_place.length; i++) {
    for (let j = 0; j < 8; j++) {
      if (board_place[i][j] === 'h') {
        board_place[i][j] === 0
      }
    }
  }

  // for (let i = 0; i < blocks.length; i++) {
  //   if (blocks[i].classList.contains('highlight')) {
  //     blocks[i].classList.toggle('highlight')
  //   }
  // }
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
      move4 = [x + 1, y - 1]
      break
  }
  return [move1, move2, move3, move4]
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

    if (blocks[i].value[2] === 1 && turn === 1) {
      click++
      console.log('click' + click)
      if (click === 1) {
        moves = movable_blocks(x, y, classname)
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
// for (let i = 0; i < blocks.length; i++) {
//   blocks[i].addEventListener('click', () => {
//     if (blocks[i].value > 0) {
//       if (
//         turn === 1 &&
//         !blocks[i].classList.contains('op-piece') &&
//         !blocks[i].classList.contains('cr-op-piece')
//       ) {
//         if (
//           blocks[i].value === 1 ||
//           blocks[i].value === 9 ||
//           blocks[i].value === 17 ||
//           blocks[i].value === 21
//         ) {
//           blocks[i].classList.toggle('piece')
//           if (
//             !blocks[i].classList.contains('piece') &&
//             !blocks[i].classList.contains('cr-piece') &&
//             !blocks[i].classList.contains('op-piece') &&
//             !blocks[i].classList.contains('cr-op-piece')
//           ) {
//             blocks[i + 9].classList.toggle('highlight')
//           }
//         } else {
//           blocks[i].classList.toggle('piece')
//           if (
//             !blocks[i].classList.contains('piece') &&
//             !blocks[i].classList.contains('cr-piece') &&
//             !blocks[i].classList.contains('op-piece') &&
//             !blocks[i].classList.contains('cr-op-piece')
//           ) {
//             if (!blocks[i + 7].classList.contains('highlight')) {
//               blocks[i + 7].classList.toggle('highlight')
//               turn = 0
//             }
//             blocks[i + 9].classList.toggle('highlight')
//             turn = 0
//           }

//           if (turn === 0 && blocks[i].classList.contains('highlight')) {
//             blocks[i].classList.toggle('piece')
//           }
//         }
//       }
//     }
//     update_board()
//   })
// }

//if piece exists blocks[i].value[3] == 1 else 0
// for (let i = 0; i < blocks.length; i++) {
//   if (
//     blocks[i].classList.contains('piece') ||
//     blocks[i].classList.contains('cr-piece') ||
//     blocks[i].classList.contains('op-piece') ||
//     blocks[i].classList.contains('cr-op-piece')
//   ) {
//     blocks[i].value[3] = 1
//   } else {
//     blocks[i].value[3] = 0
//   }
// }
// blocks.forEach((block) => {
//   console.log(block.value)
// })
