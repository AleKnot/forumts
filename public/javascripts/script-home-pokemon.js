

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
          
          <img class="card-img-top" style="width: 35%; alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"
          <br>
          <p class="card-title">${pokemon.id}. ${pokemon.name} </p>
          
          <p class="class-subtitle">Type: ${types.join( ' | ')}</p>
          <p class="class-subtitle">Ability: ${ability.join( ' | ')}</p>
          <p class="class-subtitle">Skill Tree: ${moves}</p>

          
          
          `
        return accumulator
      }, '')

      const ul = document.querySelector('[data-js="pokedex"]')

      ul.innerHTML = listPokemons;

    })
  }

getPokemon();
