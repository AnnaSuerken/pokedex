function getMatchedPokemon(input) {
  return allPokemonSearchData.filter((p) => p.name.includes(input));
}

function showFeedback(el, msg) {
  el.innerHTML = `<div class="feedback-container">
                    <span class="no-result-feedback">${msg}</span>
                    </div>`;
                    exitSearch();
}

function searchPokemon() {
  let searchResult = document.getElementById("content");
  let input = document.getElementById("search-bar").value.toLowerCase();
  searchResult.innerHTML = "";

  if (input.length < 3) {
    return showFeedback(searchResult, "Please enter at least 3 characters.");
  }

  const matchedPokemon = getMatchedPokemon(input);

  if (matchedPokemon.length === 0) { 
    return showFeedback(searchResult, "No results found.");
  }

  currentPokemonArray = matchedPokemon;
  renderPokemonCards(currentPokemonArray);
  exitSearch();
}

async function fetchPokemonData(url) {
  const response = await fetch(url);
  const pokeData = await response.json();
  return buildPokemonData(pokeData);
}

async function loadPokemonApi() {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1300`);
  const pokeSearchData = await response.json();
  const subset = pokeSearchData.results.map((p) => p.url).slice(0, 50);

  const detailedPokemonData = await Promise.all(
    subset.map(async (url) => fetchPokemonData(url))
  );

  allPokemonSearchData = detailedPokemonData;
}

function exitSearch() {
  let searchButton = document.getElementById("search-button");
  let searchExitButton = document.getElementById("search-exit-button");

  searchExitButton.classList.remove("toggle_d_none");
  searchButton.classList.add("toggle_d_none");
}
