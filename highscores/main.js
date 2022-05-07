let table = document.getElementById("highscore") 
let name = document.getElementById("name").value

const bigNumber = 1e10

document.getElementById("submitName").addEventListener("click", async () => {
  name = document.getElementById("name").value
  if(name.length > 0){
    localStorage.setItem("memName", name)
    document.getElementById('submitName').innerHTML = 'Загрузка...'
    
    let x = await fetch("https://server.metagames.cf/mem/get", {
      method: "GET",
      headers:{
        "Content-Type":"application/json",
        name: name
      }
    })
    let data = await x.text()

    if(data === "Error")
    await fetch("https://server.metagames.cf/mem/set", {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        name: name,
        data: JSON.parse(localStorage.getItem('memHighest')) || {1: {time: bigNumber, steps: bigNumber}, 2: {time: bigNumber, steps: bigNumber}, 3: {time: bigNumber, steps: bigNumber}, 4: {time: bigNumber, steps: bigNumber}, 5: {time: bigNumber, steps: bigNumber}, 6: {time: bigNumber, steps: bigNumber}, 7: {time: bigNumber, steps: bigNumber}, 8: {time: bigNumber, steps: bigNumber}}
      })
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
    loading.text("Загрузка...")
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
        if(data.time != bigNumber){
          if(!h[row])h[row] = []
          h[row].push({...data, name: key})
        }
      }
    }
    let he = Object.entries(h)
    for(let [row, data] of he){
      h[row] = data.sort((a, b) => a.time - b.time)
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
