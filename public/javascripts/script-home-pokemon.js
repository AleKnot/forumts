// setInterval(carregaPaginaInicial(), 1000)

// const { response } = require("express");

// // const { response } = require("express");

// async function carregaPaginaInicial(){

//   try {
//     await axios.get('http://localhost:3000/thread/contarComentarios').then((response) => {

//     const span = document.getElementById('qtd_msg');
  
//     span.innerText = response.data.qtd_msg;
//     });
  
//   } catch (error) {
//     console.log(error)
//   }

//   try {
//     await axios.get('http://localhost:3000/thread/contarThreads').then((response) => {

//     const span = document.getElementById('threads_rolando');
  
//     span.innerText = response.data.qtd_msg;
//     });
  
//   } catch (error) {
//     console.log(error)
//   }

//   try {
//     await axios.get('http://localhost:3000/usuario/contarUsuariosFelizes').then((response) => {

//     const span = document.getElementById('usuarios_felizes');
  
//     span.innerText = response.data.qtd_msg;
//     });
  
//   } catch (error) {
//     console.log(error)
//   }
  
// }




const getPokemon = () =>{

  const getPokemonUrl = id => 'https://pokeapi.co/api/v2/pokemon/'+id

  const pokemonPromises = []
  
    const pokemonAleatorio = Math.floor(Math.random() * 150)
    pokemonPromises.push(fetch(getPokemonUrl(pokemonAleatorio)).then(response => response.json()))
  

  const buscaPokemonAbility =(listaUrlAbilities) =>{
    const fromUrl = []
    // console.log(listaUrlAbilities)
    listaUrlAbilities.forEach(url => {
      fromUrl.push(fetch(url).then(response => response.json()))
      fetch(url)
      .then(response => response.json())
      .then(function(pokeData){
      // console.log(pokeData)
      const lang = pokeData.effect_entries.map(typeInfo => typeInfo.language.name)

      })
    
    });

  }

  Promise.all(pokemonPromises)
    .then(pokemons => {
        const listPokemons = pokemons.reduce((accumulator, pokemon) => {
        const types = pokemon.types.map(typeInfo => typeInfo.type.name);
        const ability = pokemon.abilities.map(typeInfo => typeInfo.ability.name);
        const moves = pokemon.moves.map(typeInfo => ' ' + typeInfo.move.name).toString();
        
        accumulator += `
          <li class="card ${types[0]}">
          <img class="card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"
          <h2 class="card-title">${pokemon.id}. ${pokemon.name} </h2>
          <p class="class-subtitle">Type: ${types.join( ' | ')}</p>
          <p class="class-subtitle">Ability: ${ability.join( ' | ')}</p>
          <p class="class-subtitle">Skill Tree: ${moves}</p>

          </li>
          
          `
        return accumulator
      }, '')

      const ul = document.querySelector('[data-js="pokedex"]')

      ul.innerHTML = listPokemons;

    })
  }
// window.onload = carregaPaginaInicial; getPokemon;
// window.onload = function(){
//   // All code comes here 
//   carregaPaginaInicial;
//   getPokemon;
// }
getPokemon();
// window.onload = carregaPaginaInicial;
