const evoUrl = "https://pokeapi.co/api/v2/evolution-chain/?limit=20&offset=0";

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
    traverse(pokeEvoData.chain);

    pokemonEvoChain.push(pushChainData(pokeEvoData, names));
  }
}

function pushChainData(pokeEvoData, names) {
  return {
    id: pokeEvoData.id,
    name: names[0],
    chain: names,
  };
}
