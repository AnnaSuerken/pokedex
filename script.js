async function init() {
  loadingSpinner();

  const pokemonUrls = await fetchPokemonUrls();
  await fetchPokemonDetails(pokemonUrls);

  await loadAllEvoData();

  await loadPokemonApi();

  await loadAllPokemonImgs();

  renderPokemonCards((currentPokemonArray = pokemonArray));
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
    return alert("You've reached the last stack!");
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
  const allPokemonData = await Promise.all(
    array.map(async (url) => {
      const pokeResponse = await fetch(url);
      const pokeData = await pokeResponse.json();

      return buildPokemonData(pokeData);
    })
  );
  allPokemonData.sort((a, b) => a.id - b.id);

  pokemonArray.push(...allPokemonData);
}

function buildPokemonData(data) {
  return {
    name: data.name,
    image: data.sprites.other.home.front_default,
    id: data.id,
    height: data.height,
    weight: data.weight,
    abilities: data.abilities.map((a) => a.ability.name),
    type: data.types.map((t) => t.type.name),
    stats: data.stats.map((s) => s.stat.name),
    base_stat: data.stats.map((s) => s.base_stat),
    effort: data.stats.map((s) => s.effort),
  };
}

function renderPokemonCards(array) {
  let contentRef = document.getElementById("content");
  contentRef.innerHTML = "";

  for (let index = 0; index < array.length; index++) {
    contentRef.innerHTML += getPokeCardTemplate(index, array);
  }
}

function toggleOverlay(index, array = currentPokemonArray) {
  currentIndex = index;
  currentPokemonArray = array;

  let overlay = document.getElementById("overlay");
  let overlayContent = document.getElementById("overlayContent");

  overlay.classList.remove("toggle_d_none");
  document.body.classList.add("no-scroll");

  overlayContent.innerHTML = getPokeCardTemplateLarge(
    currentIndex,
    currentPokemonArray
  );
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

function nextButton() {
  currentIndex++;

  if (currentIndex >= currentPokemonArray.length) {
    currentIndex = currentPokemonArray.length - 1;
  }
  updateOverlayCard();
}

function previousButton() {
  currentIndex--;

  if (currentIndex <= 0) {
    currentIndex = 0;
  }
  updateOverlayCard();
}

function updateOverlayCard() {
  let overlayContent = document.getElementById("overlayContent");
  overlayContent.innerHTML = getPokeCardTemplateLarge(
    currentIndex,
    currentPokemonArray
  );
}
