let currentPokemonArray = [];
let allPokemonSearchData = [];

function searchPokemon() {
  let searchResult = document.getElementById("content");
  let inputField = document.getElementById("search-bar");
  let input = inputField.value.toLowerCase();

  searchResult.innerHTML = "";


  if (input.length < 3) {
    searchResult.innerHTML = `<span class="no-result-feedback">Please enter at least 3 characters.</span>`;
    return;
  }

  const matchedPokemon = allPokemonSearchData.filter(p => p.name.includes(input));

  if (matchedPokemon.length === 0) {
    searchResult.innerHTML = "<span class='no-result-feedback'>No results found.</span>";
    return;
  } 
    currentPokemonArray = matchedPokemon;
    renderPokemonCards(currentPokemonArray); 
  
}

async function loadPokemonApi(){
    let url = `https://pokeapi.co/api/v2/pokemon?limit=1300`;
    
    const response = await fetch(url);
    const pokeSearchData = await response.json();
    const urls = pokeSearchData.results.map(p => p.url);
    
    const subset = urls.slice(0, 50);

  const detailedPokemonData = await Promise.all(
    subset.map(async url => {
      const response = await fetch(url);
      const pokeData = await response.json();
      return buildPokemonData(pokeData); 
    })
  );


  allPokemonSearchData = detailedPokemonData;
}


/*async function searchPokemonApi(){
    let keyword = document.getElementById('search-bar').value.toLowerCase();
    let url = `https://pokeapi.co/api/v2/pokemon?limit=1300`;
    

    const response = await fetch(url);
    const pokeData = await response.json();
    allPokemonData = pokeData.results;
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
