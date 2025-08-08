let pokemonImages = [];

async function loadAllPokemonImgs(){
    for (let i = 1; i <= 1010; i++) {
    const name = await getPokemonNameById(i);
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${i}.png`;
    pokemonImages.push({ name: name.toLowerCase(), image });
  }
}

async function getPokemonNameById(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  return data.name;
}