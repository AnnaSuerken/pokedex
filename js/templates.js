function getPokeCardTemplate(index) {
 return `<div class="poke-card" onclick="toggleOverlay(${index})">
            <div class="card-header">
            <span># ${pokemonArray[index].id}</span>
            <span>${pokemonArray[index].name.toUpperCase()}</span>
            </div>
            <div class="bg_${pokemonArray[index].type[0]} bg-size">
            <img src="${pokemonArray[index].image}" alt="${pokemonArray[index].name}" class="pokemon-img">
            </div>
            <div class="card-footer">
            ${getTypeIcon(index)}
            </div>
        </div>`;
}

function getPokeCardTemplateLarge(currentIndex) {
 return `<div class="overlay-header">
            <span># ${pokemonArray[currentIndex].id}</span>
            <span>${pokemonArray[currentIndex].name.toUpperCase()}</span>
            </div>
            <div class="bg_${pokemonArray[currentIndex].type[0]} overlay-bg-size">
            <img src="${pokemonArray[currentIndex].image}" alt="${pokemonArray[currentIndex].name}" class="overlay-pokemon-img">
            </div>
            <div class="card-footer">
            ${getTypeIcon(currentIndex)}
            </div>
            <div class="pokeDetails">
                <div>
                <div class="detail-category">main</div>
                <div>
                <div class="detail-category">stats</div>
                </div>
                <div>
                <div class="detail-category">evo chain</div>
                </div>
            </div>
            <div>
                    <table class="detail-view-table">
                        <tr>
                        <th>Height: </th>
                        <td>${pokemonArray[currentIndex].height}</td>
                        <tr>
                        <th>Weight: </th>
                        <td>${pokemonArray[currentIndex].weight}</td>
                        <tr>
                        <th>Base experience: </th>
                        <td>${pokemonArray[currentIndex].experience}</td>
                        <tr>
                        <th>Abilities: </th>
                        <td>${pokemonArray[currentIndex].abilities}</td>
                    </table>
                    </div>
                </div>
            </div>
        </div>`;
}

function getTypeIcon(index){
    let type = pokemonArray[index].type;
    return type.map(type => {
        return `<div id="pokeType-img" class="icon_${type}" alt="${type}"></div>`
    }).join('');
}
