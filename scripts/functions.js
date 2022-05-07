const emojis = ['🎈', '🎨', '🎃', '🎁', '🎀', '💎', '🎲', '⛏', '🍕', '🍩', '🍬', '🍓', '🥝', '🍏', '❤', '✨', '✔', '🎵', '📌', '🍉']

export function createGrid(height, width){
  let grid = new Array(height).fill(null).map(() => new Array(width).fill(null))
  let e = emojis
  let g = []
  grid.forEach((x, i) => x.forEach((y, j) => g.push(j + i * width)))
  for(let i = 0; i < height * width / 2; i++){
    let emoji = e.splice(Math.floor(Math.random() * e.length), 1)[0]
    for (let f = 0; f < 2; f++){
      let r = g.splice(Math.floor(Math.random() * g.length), 1)[0]
      grid[(r - r % width) / width][r % width] = emoji
    }
  }
  return grid
}

export function showGrid(grid, id){
  $(`#${id}`)
}

/*
https://kv.replit.com/v0/eyJhbGciOiJIUzUxMiIsImlzcyI6ImNvbm1hbiIsImtpZCI6InByb2Q6MSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb25tYW4iLCJleHAiOjE2NTE4NjgzODgsImlhdCI6MTY1MTc1Njc4OCwiZGF0YWJhc2VfaWQiOiI3ZjJlZTQzZC0wY2RmLTQyODYtYjViZS01ZTgyNzE2OTVkZDYifQ.nxaCoWmHM2CjNIA4M_9-shS14XhnBwu-lVHOM3JlmolJl1stDV8e_-f0qMjBXQwbJ8FwN7aqn_yB7cx883aLrg

*/

