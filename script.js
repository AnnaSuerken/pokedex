const apiUrl = "https://pokeapi.co/api/v2/pokedex/";
const baseUrl = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
const pokeUrl = "https://pokeapi.co/api/v2/pokemon/";

async function init() {
  const pokemonUrls = await fetchPokemonUrls();
  await fetchPokemonDetails(pokemonUrls);
  renderPokemonCards(pokemonArray);

  console.log(pokemonArray);
}

async function fetchPokemonUrls() {
  const response = await fetch(baseUrl);
  const data = await response.json();
  const urls = data.results.map((pokemon) => pokemon.url);
  return urls;
}

async function fetchPokemonDetails(array) {
  for (let urlIndex = 0; urlIndex < array.length; urlIndex++) {  //for loop to iterate through different API urls
    const pokeResponse = await fetch(array[urlIndex]);          //fetching each individual Pokemon URL
    const pokeData = await pokeResponse.json();                 

    const pokemon = {                                           //defining object for push()
      name: pokeData.name,
      image: pokeData.sprites.front_default,
      id: pokeData.id,
    };

    pokemonArray.push(pokemon);
  }
}

function renderPokemonCards(array){
    let contentRef = document.getElementById('content');
    contentRef.innerHTML += "";

    for (let index = 0; index < array.length; index++) {
        contentRef.innerHTML += getPokeCardTemplate(index)
    }

}
