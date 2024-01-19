//Assigned values to each board block
let blocks = document.querySelectorAll('.board-block')

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
for (let i = 0; i < blocks.length; i += 2) {
  if (i === 8 || i === 24 || i === 40 || i === 56) {
    i++
  } else if (i === 17 || i === 33 || i === 49) {
    i--
  }
  blocks[i].value.push(1)
}

// for (let i = 0; i < blocks.length; i++) {
//   console.log(blocks[i].value)
//   blocks[i].innerText = blocks[i].value
// }

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
let turn = 1
let board_place = [
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [, , , , , , ,],
  [, , , , , , ,],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1]
]
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

for (let i = 0; i < blocks.length; i++) {
  blocks[i].addEventListener('click', () => {
    x = blocks[i].value[0]
    y = blocks[i].value[1]
    console.log(board_place[x][y])
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
