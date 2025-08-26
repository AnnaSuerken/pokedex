function getId(url) {
  const parts = url.split("/");
  return parseInt(parts[parts.length - 2], 10);
}

function traverse(chain, evoList) {
  evoList.push({ name: chain.species.name, id: getId(chain.species.url) });
  chain.evolves_to.forEach((next) => traverse(next, evoList));
}

async function fetchEvolutionForPokemon(pokemonName) {
  const speciesResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${pokemonName.toLowerCase()}`
  );
  const speciesData = await speciesResponse.json();

  const evoChainUrl = speciesData.evolution_chain.url;
  const evoChainResponse = await fetch(evoChainUrl);
  const evoChainData = await evoChainResponse.json();

  const evoList = [];

  traverse(evoChainData.chain, evoList);

  return evoList;
}

function generateEvolutionHTML(evoList) {
  return evoList
    .map((poke) => {
      const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${poke.id}.png`;
      return `<div class="evo-item">
                <img src="${imgUrl}" alt="${poke.name}" class="evo-img" />
              </div>`;
    })
    .join("");
}

async function showEvolutionChain() {
  const currentPokemon = currentPokemonArray[currentIndex];
  if (!currentPokemon) return;

  const evoNames = await fetchEvolutionForPokemon(currentPokemon.name);
  const evoHTML = generateEvolutionHTML(evoNames, currentPokemonArray);

  const evoContainer = document.getElementById("evo-chain-imgs");
  if (evoContainer) {
    evoContainer.innerHTML = evoHTML;
  }
}
