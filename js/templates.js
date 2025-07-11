function getPokeCardTemplate(index) {
 return `<div class="poke-card" onclick="toggleOverlay(${index})">
            <div class="card-header">
            <span># ${pokemonArray[index].id}</span>
            <span>${pokemonArray[index].name.toUpperCase()}</span>
            </div>
            <div class="bg_${pokemonArray[index].type[0]}">
            <img src="${pokemonArray[index].image}" alt="${pokemonArray[index].name}" class="pokemon-img">
            </div>
            <div class="card-footer">
            ${getTypeIcon(index)}
            </div>
        </div>`;
}

function getTypeIcon(index){
    let type = pokemonArray[index].type;
    return type.map(type => {
        return `<div id="pokeType-img" class="icon_${type}" alt="${type}"></div>`
    }).join('');
}
