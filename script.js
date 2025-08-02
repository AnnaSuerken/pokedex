async function init() {
  loadingSpinner();

  const pokemonUrls = await fetchPokemonUrls();
  await fetchPokemonDetails(pokemonUrls);

  const evoUrls = await fetchEvoUrl();
  await fetchPokemonEvo(evoUrls);

  renderPokemonCards(pokemonArray);

  console.log(pokemonArray); //delete
  console.log(pokemonEvoChain); //delete
  console.log(nextStackUrl); //delete
}

async function fetchPokemonUrls() {
  const response = await fetch(baseUrl);
  const data = await response.json();
  const urls = data.results.map((pokemon) => pokemon.url);
  return urls;
}

async function fetchNextStackUrl() {
  const response = await fetch(baseUrl);
  const data = await response.json();
  const nextStackUrl = data.next;

  if (nextStackUrl === null) {
    return alert("Du bist beim letzten Stack angelangt");
  }

  baseUrl = nextStackUrl;
  let contentRef = document.getElementById("content");
  contentRef.innerHTML = "";
  pokemonArray = [];
  pokemonEvoChain = [];
  init();
}

async function fetchPreviousStackUrl() {
  const response = await fetch(baseUrl);
  const data = await response.json();
  const previousUrl = data.previous;

  if (previousUrl === null) {
    return alert("You've reached the first stack!");
  }
  baseUrl = previousUrl;
  let contentRef = document.getElementById("content");
  contentRef.innerHTML = "";
  pokemonArray = [];
  pokemonEvoChain = [];
  init();
}

async function fetchPokemonDetails(array) {
  const AllPokemonData = await Promise.all(
    array.map(async (url) => {
      const pokeResponse = await fetch(url);
      const pokeData = await pokeResponse.json();

      return {
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
    })
  );
  AllPokemonData.sort((a, b) => a.id - b.id);

  pokemonArray.push(...AllPokemonData);
}

function renderPokemonCards(array) {
  let contentRef = document.getElementById("content");
  contentRef.innerHTML = "";

  for (let index = 0; index < array.length; index++) {
    contentRef.innerHTML += getPokeCardTemplate(index);
  }
}

function toggleOverlay(index) {
  let overlay = document.getElementById("overlay");
  let overlayContent = document.getElementById("overlayContent");
  currentIndex = index;
  overlay.classList.remove("toggle_d_none");
  document.body.classList.add("no-scroll");
  overlayContent.innerHTML += getPokeCardTemplateLarge(currentIndex);
}

function exitOverlay(event) {
  let overlay = document.getElementById("overlay");

  if (event.target === overlay) {
    exitButton();
  }
}

function exitButton() {
  let overlay = document.getElementById("overlay");
  let overlayContent = document.getElementById("overlayContent");
  overlay.classList.add("toggle_d_none");
  document.body.classList.remove("no-scroll");
  overlayContent.innerHTML = "";
}

function toggleDNone(idName, idName2, idName3) {
  let id = document.getElementById(`${idName}`);
  let id2 = document.getElementById(`${idName2}`);
  let id3 = document.getElementById(`${idName3}`);

  id.classList.remove("toggle_d_none");
  id2.classList.add("toggle_d_none");
  id3.classList.add("toggle_d_none");
}

function loadingSpinner() {
  let contentRef = document.getElementById("content");
  let footerRef = document.getElementById("stack-buttons");
  return (contentRef.innerHTML += `<img src="./img/spinning_pokeball.gif" alt="loading" class="loading-spinner">`);
}

function nextButton() {
  let overlayContent = document.getElementById("overlayContent");

  if (currentIndex >= pokemonArray.length - 1) return;
  currentIndex++;
  overlayContent.innerHTML = "";
  overlayContent.innerHTML += getPokeCardTemplateLarge(currentIndex);
}

function previousButton() {
  let overlayContent = document.getElementById("overlayContent");

  if (currentIndex <= 0) return;
  currentIndex--;

  overlayContent.innerHTML = "";
  overlayContent.innerHTML += getPokeCardTemplateLarge(currentIndex);
}
