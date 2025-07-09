function getPokeCardTemplate(index) {
 return `<div class="poke-card" onclick="toggleOverlay()">
            <div class="card-header">
            <span># ${pokemonArray[index].id}</span>
            <span>${pokemonArray[index].name}</span>
            </div>
            <div class="bg_${pokemonArray[index].type}">
            <img src="${pokemonArray[index].image}" alt="${pokemonArray[index].name}" class="pokemon-img">
            </div>
            <div class="card-footer">
            <div id="pokeType-img" class="icon_${pokemonArray[index].type}" alt="${pokemonArray[index].type}"></div>
            </div>
        </div>`;
}
