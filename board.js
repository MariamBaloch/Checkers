//Assigned values to each board block
let blocks = document.querySelectorAll('.board-block')
let j = 1
// for (let i = 0; i < blocks.length; i++) {
//   blocks[i].value = j
//   j++
// }

for (let i = 0; i < blocks.length; i += 2) {
  if (i === 8 || i === 24 || i === 40 || i === 56) {
    i++
  } else if (i === 17 || i === 33 || i === 49) {
    i--
  }
  blocks[i].value = j
  j++
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
  ['1', '1', '1', '1'],
  ['1', '1', '1', '1'],
  ['1', '1', '1', '1'],
  ['', '', '', ''],
  ['', '', '', ''],
  ['2', '2', '2', '2'],
  ['2', '2', '2', '2'],
  ['2', '2', '2', '2']
]

let board = document.querySelectorAll('.board-block')
for (let i = 0; i < board.length; i++) {
  board[i].addEventListener('click', () => {
    if (blocks[i].value > 0) {
    }
  })
}
