let table = document.getElementById("highscore") 
let name = document.getElementById("name").value

const bigNumber = 1e6

let stdData = {}
for(let i = 1; i <= 18; i++){
  stdData[i] = {time: bigNumber, steps: bigNumber}
}

document.getElementById("submitName").addEventListener("click", async () => {
  name = document.getElementById("name").value
  if(name.length > 0){
    localStorage.setItem("memName", name)
    document.getElementById('submitName').innerHTML = '<img src="loading.gif" alt="З" style="width: 6vw; height: 6vw;">'
    let data
    let x = await fetch("https://server.metagames.cf/mem/get", {
      method: "GET",
      headers:{
        "Content-Type":"application/json",
        name: name
      }
    }).catch(err => {
      data = "Error"
    })
    if(!data)data = await x.text()

    if(data === "Error")
    await fetch("https://server.metagames.cf/mem/set", {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        name: name,
        data: JSON.parse(localStorage.getItem('memHighest')) || stdData)
    })
    document.getElementById("enterName").style.display = 'none'
      table.style.display = 'table'
    window.onload()
  }
})
window.onload = async () => {
  if(!localStorage.getItem("memName")){
   table.style.display = 'none'
    document.getElementById("enterName").style.display = 'block'
  }
  else{
    let tbody = $("tbody")
    let loading = $("#loading")
    loading.append($("<img/>", {src: "loading.gif", alt: "Загрузка...", style: 
 "width: 6vw; height: 6vw;"}))
    let r = await fetch("https://server.metagames.cf/mem/getAll", {
      method: 'GET',
      headers:{
        "Content-Type":"application/json"
      }
    })
    let f = Object.entries(await r.json())
    let h = {}
    for(let [key, value] of f){
      let v = Object.entries(value)
      for(let [row, data] of v){
        if(data.time < bigNumber){
          if(!h[row])h[row] = []
          h[row].push({...data, name: key})
        }
      }
    }
    let he = Object.entries(h)
    for(let [row, data] of he){
      h[row] = data.sort((a, b) => a.time * a.steps - b.time * b.steps)
    }
    let hx = Object.entries(h).reverse()
    let i = 1
    for (let [key, value] of hx)
      for(let obj of value)
        if(obj.time != bigNumber){
          let tr = $("<tr/>")
          tr.append($("<td/>", {text: i}))
          tr.append($("<td/>", {text: obj.name}))
          tr.append($("<td/>", {text: key}))
          tr.append($("<td/>", {text: obj.time}))
          tr.append($("<td/>", {text: obj.steps}))
          tbody.append(tr)
          i++
        }
    loading.text("")
  }
  
  
}
