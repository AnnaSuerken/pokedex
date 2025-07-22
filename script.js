const apiUrl = "https://pokeapi.co/api/v2/pokedex/";
let baseUrl = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
const pokeUrl = "https://pokeapi.co/api/v2/pokemon/";
let nextStackUrl ="";
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
  console.log(nextStackUrl);
}

async function fetchPokemonUrls() {
  const response = await fetch(baseUrl);
  const data = await response.json();
  const urls = data.results.map((pokemon) => pokemon.url);
  return urls;
}

async function fetchNextStackUrl(){
  const response = await fetch(baseUrl);
  const data = await response.json();
  const nextStackUrl = data.next;

  if (nextStackUrl === null) {
    return alert("Du bist beim letzten Stack angelangt")
  }

  baseUrl = nextStackUrl;
  let contentRef = document.getElementById('content');
  contentRef.innerHTML = "";
  pokemonArray = [];
  pokemonEvoChain = [];
  init();
}

async function fetchPreviousStackUrl(){
  const response = await fetch(baseUrl);
  const data = await response.json();
  const previousUrl = data.previous;

  if (previousUrl === null) {
    return alert("Du bist beim ersten Stack angelangt")
  }
  baseUrl = previousUrl;
  let contentRef = document.getElementById('content');
  contentRef.innerHTML = "";
  pokemonArray = [];
  pokemonEvoChain = [];
  init();
}


async function fetchPokemonDetails(array) {             //has to be reduced to 14 rows
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
  currentIndex = index;
  overlay.classList.remove('toggle_d_none');
  document.body.classList.add('no-scroll');
  overlayContent.innerHTML += getPokeCardTemplateLarge(currentIndex);
}

function exitOverlay(){
  let overlay = document.getElementById('overlay');
  let overlayContent = document.getElementById('overlayContent');
  overlay.classList.toggle('toggle_d_none');
  document.body.classList.remove('no-scroll');
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
   let footerRef = document.getElementById('stack-buttons')
   return contentRef.innerHTML += `<img src="./img/spinning_pokeball.gif" alt="loading" class="loading-spinner">`;
}


function nextButton(){
  let overlayContent = document.getElementById('overlayContent');
  
  
  if(currentIndex >= pokemonArray.length - 1){
       
    currentIndex++;
    
  }
  overlayContent.innerHTML = "";
  overlayContent.innerHTML += getPokeCardTemplateLarge(currentIndex);
}

/*function searchPokemon(){
  let input = document.getElementById('search-bar').value;
  let pokemonName = pokemonArray.name;
  
  if( input === pokemonArray.filter(pokemonName => pokemonName.includes(input))){
    return 

  }
}*/