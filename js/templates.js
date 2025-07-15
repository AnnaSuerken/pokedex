function getPokeCardTemplate(index) {
  return `<div class="poke-card" onclick="toggleOverlay(${index})">
            <div class="card-header">
            <span># ${pokemonArray[index].id}</span>
            <span>${pokemonArray[index].name.toUpperCase()}</span>
            </div>
            <div class="bg_${pokemonArray[index].type[0]} bg-size">
            <img src="${pokemonArray[index].image}" alt="${
    pokemonArray[index].name
  }" class="pokemon-img">
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
            <div class="bg_${
              pokemonArray[currentIndex].type[0]
            } overlay-bg-size">
            <img src="${pokemonArray[currentIndex].image}" alt="${
    pokemonArray[currentIndex].name
  }" class="overlay-pokemon-img">
            </div>
            <div class="card-footer">
            ${getTypeIcon(currentIndex)}
            </div>
            <div class="pokeDetails">
                <span class="detail-category" onclick="toggleDNone('main-table', 'stats-table', 'evo-chain')">main</span>
                <span class="detail-category" onclick="toggleDNone('stats-table', 'main-table', 'evo-chain')">stats</span>
                <span class="detail-category" onclick="toggleDNone('evo-chain', 'stats-table', 'main-table')">evo chain</span>
            </div>
            <table class="detail-view-main toggle_d_none" id="main-table">
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
            <table class="detail-view-main toggle_d_none" id="stats-table">
                        <tr>
                        <th>Height: </th>
                        <td></td>
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
            <table class="detail-view-main toggle_d_none" id="evo-chain">
                        <tr>
                        <th>Height: </th>
                        <td>${pokemonArray[currentIndex].height}</td>
                        <tr>
                        <th>Weight: </th>
                        <td>${pokemonArray[currentIndex].weight}</td>
                        <tr>
                        <th>Base experience: </th>
                        <td></td>
                        <tr>
            </table>`;
}

function getTypeIcon(index) {
  let type = pokemonArray[index].type;
  return type
    .map((type) => {
      return `<div id="pokeType-img" class="icon_${type}" alt="${type}"></div>`;
    })
    .join("");
}
