const emojis = ['🎈', '🎨', '🎃', '🎁', '🎀', '💎', '🎲', '⛏', '🍕', '🍩', '🍬', '🍓', '🥝', '🍏', '❤', '✨', '✔', '🎵', '📌', '🍉', '🚘', '🛩', '⏰', '🌦']

const width = 6

let time = 0
const timerLabel = $("#timer")
let timerInterval

let steps = 0

const bigNumber = 1e10

let localhighest = localStorage.getItem('memHighest')
if(!localhighest)localStorage.setItem('memHighest', JSON.stringify({1: {time: bigNumber, steps: bigNumber}, 2: {time: bigNumber, steps: bigNumber}, 3: {time: bigNumber, steps: bigNumber}, 4: {time: bigNumber, steps: bigNumber}, 5: {time: bigNumber, steps: bigNumber}, 6: {time: bigNumber, steps: bigNumber}, 7: {time: bigNumber, steps: bigNumber}, 8: {time: bigNumber, steps: bigNumber}}))
localhighest = JSON.parse(localStorage.getItem("memHighest"))
let name = localStorage.getItem("memName")

if(name !== null){
  document.getElementById("playername").innerHTML = `Ваше имя: ${name}`
  document.getElementById("playername").parentElement.removeAttribute("onclick")
}
  

const placeHolder = "ㅤ"

const gameDiv = $("#gameDiv")

let height

let grid = emojis.slice(0, width*height/2)

$("#reload").click(play)
$("#reload").click()

let timerOn = false;

function checkWin(){
  let x = true
  gameDiv.children().each((i, e) => {
    let el = $(e)
    if(el.text() === placeHolder)return x = false
  })
  return x
}

function timer(){
  if(!checkWin()){
    time += 0.01
    let t = time.toFixed(2)
    time = Number(t)
    return timerLabel.text(t)
  }

  if(localhighest[height].time > time){
    localhighest[height] = {time: time, steps: steps}
    localStorage.setItem("memHighest", JSON.stringify(localhighest))
    name = localStorage.getItem("memName")
    if(name !== null)
      
      fetch("https://server.metagames.cf/mem/set", {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          name: name,
          data: localhighest
        })
      })
      }
  time = 0
  
  clearInterval(timerInterval)
}

function startTimer(){
  time = 0
  timerInterval = setInterval(timer, 10)
}

function play() {

  clearInterval(timerInterval)
  timerLabel.text("0.00")
  
  height = Number(document.getElementById("height").value)
  $("#gameDiv").children().remove()
  
  for(let i = 0; i < height*width; i++){
    gameDiv.append($("<div/>", {class: "buttonDiv pic", text: placeHolder}))
  }
  
  
  grid = emojis.slice(0, width*height/2)
  grid.push(...grid)
  grid.sort(() => 0.5 - Math.random())
  
  steps = 0
  $("#steps").text("0")
  let previous
  let recentClicked = false
  
  $(".pic").click(async function() {
    if(timerLabel.text() === "0.00") startTimer()
    let jelement = $(this)
    if(jelement.text() !== placeHolder || recentClicked) return
    jelement.css('transform','scale(-0.001, 1)')
    await sleep(100)
    jelement.text(grid[jelement.index()])
    jelement.css('transform','scale(1, 1)')
      
    steps++
    $("#steps").text(steps)
    if(steps % 2 !== 0)
      return previous = jelement
    
    if(previous.text() !== jelement.text()) {
      let jelement2 = jelement
      let previous2 = previous
      recentClicked = true
      setTimeout(async function(){
        jelement2.css('transform','scale(-0.001, 1)')
        previous2.css('transform','scale(-0.001, 1)')
        await sleep(100)
        previous2.text(placeHolder)
        jelement2.text(placeHolder)
        jelement2.css('transform','scale(1, 1)')
        previous2.css('transform','scale(1, 1)')
        recentClicked = false
      }, 800)
    }
  })
  
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}