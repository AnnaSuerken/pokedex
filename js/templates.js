function getPokeCardTemplate(index) {
 return `<div class="poke-card" onclick="toggleOverlay()">
            <div class="card-header">
            <span># ${pokemonArray[index].id}</span>
            <span>${pokemonArray[index].name}</span>
            </div>
            <div class="card-main">
            <img src="${pokemonArray[index].image}" alt="" class="pokemon-img">
            </div>
            <div class="card-footer">
            <div id="pokeType-img">${pokemonArray[index].type}</sdiv>
            </div>
        </div>`;
}
