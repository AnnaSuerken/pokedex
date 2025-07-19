const apiUrl = "https://pokeapi.co/api/v2/pokedex/";
const baseUrl = "https://pokeapi.co/api/v2/pokemon?limit=40&offset=0";
const pokeUrl = "https://pokeapi.co/api/v2/pokemon/";
let currentIndex = 0;

async function init() {
  loadingSpinenr();
  const pokemonUrls = await fetchPokemonUrls();
  await fetchPokemonDetails(pokemonUrls);
  renderPokemonCards(pokemonArray);
  const evoUrls = await fetchEvoUrl();
  await fetchPokemonEvo(evoUrls);
  console.log(pokemonArray);
  console.log(pokemonEvoChain);
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
      height: pokeData.height,
      weight: pokeData.weight,
      experience: pokeData.base_experience,
      abilities: pokeData.abilities.map(a => a.ability.name),
      type: pokeData.types.map(t => t.type.name),
      stats: pokeData.stats.map(s => s.stat.name),
      base_stat: pokeData.stats.map(b => b.base_stat),
      effort: pokeData.stats.map(e => e.effort),
    };
    pokemonArray.push(pokemon);
  }
}

function renderPokemonCards(array){
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";

    for (let index = 0; index < array.length; index++) {
        contentRef.innerHTML += getPokeCardTemplate(index)
    }

}

function toggleOverlay(index){
  let overlay = document.getElementById('overlay');
  let overlayContent = document.getElementById('overlayContent');
  overlayContent.innerHTML += "";
  currentIndex = index;
  overlay.classList.toggle('toggle_d_none');
  overlayContent.innerHTML += getPokeCardTemplateLarge(currentIndex);

}

function exitOverlay(){
  let overlay = document.getElementById('overlay');
  let overlayContent = document.getElementById('overlayContent');
  overlay.classList.toggle('toggle_d_none');
  overlayContent.innerHTML = "";

}

function toggleDNone(idName, idName2, idName3){
  let id = document.getElementById(`${idName}`);
  let id2 = document.getElementById(`${idName2}`);
  let id3 = document.getElementById(`${idName3}`);

  id.classList.remove('toggle_d_none');
  id2.classList.add('toggle_d_none');
  id3.classList.add('toggle_d_none');
}

function loadingSpinenr (){
   let contentRef = document.getElementById('content');
   return contentRef.innerHTML += `<img src="./img/spinning_pokeball.gif" alt="loading" class="loading-spinner">`
}