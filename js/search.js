
let searchResult = document.getElementById('content');

function searchPokemon(){
    let input = document.getElementById('search-bar').value.toLowerCase();
    let results = pokemonArray.filter(pokemon => pokemon.name.includes(input));
    searchResult = "";
    
  if( results.length > 0){
    renderPokemonCards(results)

  } else {
    return searchResult +=`<span>Pokemon could not be found.</span>` 
  }
}
