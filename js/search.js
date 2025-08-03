let currentPokemonArray = [];

function searchPokemon() {
  let searchResult = document.getElementById("content");
  let inputField = document.getElementById("search-bar");
  let input = inputField.value.toLowerCase();
  let results = pokemonArray.filter((pokemon) => pokemon.name.includes(input));
  searchResult.innerHTML = "";

  if (input.length < 3) {
    searchResult.innerHTML = `<span class="no-result-feedback">Please enter at least 3 characters.</span>`;
    return;
  }

  if (results.length > 0) {
    currentPokemonArray = results;
    renderPokemonCards(currentPokemonArray);
  } else {
    searchResult.innerHTML = `<span class="no-result-feedback">Pokemon could not be found.</span>`;
  }
  
}

/*async function searchPokemonApi(){
    let keyword = document.getElementById('search-bar').value.toLowerCase();
    let url = `https://pokeapi.co/api/v2/pokemon/${keyword}`;

    const response = await fetch(url);
    const pokeData = await response.json();
    console.log(pokeData)

    let pokeSearchArray = {
        name: pokeData.name,
        image: pokeData.sprites.other.home.front_default,
        id: pokeData.id,
        height: pokeData.height,
        weight: pokeData.weight,
        experience: pokeData.base_experience,
        abilities: pokeData.abilities.map((a) => a.ability.name),
        type: pokeData.types.map((t) => t.type.name),
        stats: pokeData.stats.map((s) => s.stat.name),
        base_stat: pokeData.stats.map((b) => b.base_stat),
        effort: pokeData.stats.map((e) => e.effort),
      };

      document.getElementById('content').innerHTML = "";

    renderPokemonCards([searchIndex, pokeSearchArray]);
}*/
