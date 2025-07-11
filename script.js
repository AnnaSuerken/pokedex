const apiUrl = "https://pokeapi.co/api/v2/pokedex/";
const baseUrl = "https://pokeapi.co/api/v2/pokemon?limit=40&offset=0";
const pokeUrl = "https://pokeapi.co/api/v2/pokemon/";
let currentIndex = 0;

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
      image: pokeData.sprites.other.home.front_default,
      id: pokeData.id,
      type: pokeData.types.map(t => t.type.name),
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

function toggleOverlay(index){
  let overlay = document.getElementById('overlay');
  currentIndex = index;
  overlay.classList.toggle('toggle_d_none');
  pokeCardLarge();
}

function pokeCardLarge(){
  let srcPath = pokemonArray[currentIndex].image;
  document.getElementById('pokemon-img').src = srcPath;
}

function loadingButton(){
  
}