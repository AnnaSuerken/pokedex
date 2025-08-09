let evoUrl = "https://pokeapi.co/api/v2/evolution-chain/?limit=1000";

async function loadAllEvoData() {
  const evoUrls = await fetchEvoUrl();
  await fetchPokemonEvo(evoUrls);
}

async function fetchEvoUrl() {
  const response = await fetch(evoUrl);
  const data = await response.json();
  const evoUrls = data.results.map((results) => results.url);

  return evoUrls;
}

async function fetchPokemonEvo(array) {
  for (let urlIndex = 0; urlIndex < array.length; urlIndex++) {
    const pokeEvoResponse = await fetch(array[urlIndex]);
    const pokeEvoData = await pokeEvoResponse.json();

    const names = [];

    function traverse(chain) {
      names.push(chain.species.name);
      chain.evolves_to.forEach((next) => traverse(next));
    }
    pokemonEvoChain.sort((a, b) => a.id - b.id);
    traverse(pokeEvoData.chain);

    pokemonEvoChain.push(pushChainData(pokeEvoData, names));
  }
}

function pushChainData(pokeEvoData, names) {
  return {
    name: names[0],
    chain: names,
  };
}

function connectingEvoPokemon(pokemon) {
  let evoPokemon = pokemonEvoChain.find((e) => e.chain.includes(pokemon.name.toLowerCase())
  );

  return evoPokemon.chain
    .map((name) => {
      const imgEntry = pokemonImages.find((p) => p.name === name.toLowerCase());
      if (imgEntry) {
        return `<img src="${imgEntry.image}" class="evo-img" alt="${name}">`;
      } else {
        return `<span>${name}</span>`;
      }
    })
    .join("");
}