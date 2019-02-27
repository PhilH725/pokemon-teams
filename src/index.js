
document.addEventListener('DOMContentLoaded', init)

function init() {
  renderTrainers()
}

function renderTrainers() {
  document.querySelector('main').innerHTML = ''
  fetch('http://localhost:3000/trainers')
  .then(resp => resp.json())
  .then(json => json.forEach(renderTrainer))
}

function renderTrainer(trainer) {
  let trainerArea = document.querySelector('main')

  let trainerDiv = document.createElement('div')
  trainerArea.appendChild(trainerDiv)
  trainerDiv.classList.add('card')

  let nameP = document.createElement('p')
  trainerDiv.appendChild(nameP)
  nameP.innerText = trainer.name

  let addBtn = document.createElement('button')
  trainerDiv.appendChild(addBtn)
  addBtn.innerText = 'Add Pokemon'

  let pokeList = document.createElement('ul')
  trainerDiv.appendChild(pokeList)

  for (const i of trainer.pokemons) {
    let li = document.createElement('li')
    pokeList.appendChild(li)
    li.innerText = `${i.nickname} (${i.species})`

    let releaseBtn = document.createElement('button')
    li.appendChild(releaseBtn)
    releaseBtn.classList.add('release')
    releaseBtn.innerText = 'Release'

    releaseBtn.addEventListener('click', ()=> {
      pokeList.removeChild(li)
      releasePokemon(i)
    })
  }

  addBtn.addEventListener('click', ()=>{
    addPokemon(trainer)
  })
}

function addPokemon(trainer) {
  if (trainer.pokemons.length < 6) {
    fetch(`http://localhost:3000/pokemons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({trainer_id:trainer.id})
    })
    setTimeout(renderTrainers, 50)
  } else {
    window.alert('You can only have six pokemon on a team')
  }
}

function releasePokemon(pokemon) {
  fetch(`http://localhost:3000/pokemons/${pokemon.id}`, {
    method: 'DELETE'
  })
  setTimeout(renderTrainers, 50)
}












//
