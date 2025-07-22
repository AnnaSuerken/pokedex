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
            <img src="./img/left_chevron_white.png" onclick="nextButton()" alt="previous card" class="icon-img">
            <span># ${pokemonArray[currentIndex].id}</span>
            <span>${pokemonArray[currentIndex].name.toUpperCase()}</span>
            <img src="./img/right_chevron_white.png" onclick="nextButton()" alt="next card" class="icon-img">
            </div>
            <div class="bg_${pokemonArray[currentIndex].type[0]} overlay-bg-size">
            <img src="${pokemonArray[currentIndex].image}" alt="${pokemonArray[currentIndex].name}" class="overlay-pokemon-img">
            </div>
            <div class="card-footer">
            ${getTypeIcon(currentIndex)}
            </div>
            <div class="pokeDetails">
                <span class="detail-category" onclick="toggleDNone('main-table', 'stats-table', 'evo-chain')">main</span>
                <span class="detail-category" onclick="toggleDNone('stats-table', 'main-table', 'evo-chain')">stats</span>
                <span class="detail-category" onclick="toggleDNone('evo-chain', 'stats-table', 'main-table')">evo chain</span>
            </div>
            <table class="detail-view-main text-align" id="main-table">
                        <tr>
                        <th>height: </th>
                        <td>${pokemonArray[currentIndex].height}</td>
                        <tr>
                        <th>weight: </th>
                        <td>${pokemonArray[currentIndex].weight}</td>
                        <tr>
                        <th>base experience: </th>
                        <td>${pokemonArray[currentIndex].experience}</td>
                        <tr>
                        <th>abilities: </th>
                        <td>${pokemonArray[currentIndex].abilities}</td>
            </table>
            <div class="detail-view-main toggle_d_none" id="stats-table">
                        <div class="stats-content-container">
                          <span><label for="stats">${
                            pokemonArray[currentIndex].stats[0]
                          }: </label></span>
                          <div class="progress-bar-container">${
                            pokemonArray[currentIndex].base_stat[0]
                          }
                          <progress id="stats" max="300" value="${
                            pokemonArray[currentIndex].base_stat[0]
                          }"></progress>
                          </div>
                        </div>
                        <div class="stats-content-container">
                          <span><label for="stats">${
                            pokemonArray[currentIndex].stats[1]
                          }: </label></span>
                          <div class="progress-bar-container">${
                            pokemonArray[currentIndex].base_stat[1]
                          }
                          <progress id="stats" max="300" value="${
                            pokemonArray[currentIndex].base_stat[1]
                          }"></progress>
                          </div>
                        </div>
                        <div class="stats-content-container">
                          <span><label for="stats">${
                            pokemonArray[currentIndex].stats[2]
                          }: </label></span>
                          <div class="progress-bar-container">${
                            pokemonArray[currentIndex].base_stat[2]
                          }
                          <progress id="stats" max="300" value="${
                            pokemonArray[currentIndex].base_stat[2]
                          }"></progress>
                          </div>
                        </div>
                        <div class="stats-content-container">
                          <span><label for="stats">${
                            pokemonArray[currentIndex].stats[3]
                          }: </label></span>
                          <div class="progress-bar-container">${
                            pokemonArray[currentIndex].base_stat[3]
                          }
                          <progress id="stats" max="300" value="${
                            pokemonArray[currentIndex].base_stat[3]
                          }"></progress>
                          </div>
                        </div>
                        <div class="stats-content-container">
                          <span><label for="stats">${
                            pokemonArray[currentIndex].stats[4]
                          }: </label></span>
                          <div class="progress-bar-container">${
                            pokemonArray[currentIndex].base_stat[4]
                          }
                          <progress id="stats" max="300" value="${
                            pokemonArray[currentIndex].base_stat[4]
                          }"></progress>
                          </div>
                        </div>
            </div>
            <div class="detail-view-main toggle_d_none" id="evo-chain">
                        <div class="evo-container" id="evo-chain-imgs"> 
                        ${connectingEvoPokemon()}
                        </div>
            </div>`;
}

function connectingEvoPokemon() {
  let currentPokemonName = pokemonArray[currentIndex].name;
  let evoPokemon = pokemonEvoChain.find(e => e.name === currentPokemonName);

  if( !evoPokemon || !evoPokemon.images || evoPokemon.images.length === 0) //// => not quite correct, have to adjust so all pokemon have evole chain
    return "<span>Keine Evolutionsdaten vorhanden.</span>";

  return evoPokemon.images
    .filter(img => img) //filters the array and deletes all emty values
    .map(img => `<img src="${img}" class="evo-img" alt="${evoPokemon.name}">`) //turns value into an HTML string so I can use it as a src file
    .join('') //combines all strings to one large string
}

function getTypeIcon(index) {
  let type = pokemonArray[index].type;
  return type
    .map((type) => {
      return `<div id="pokeType-img" class="icon_${type}" alt="${type}"></div>`;
    })
    .join("");
}

function loadMoreTemplate() {
  return `<button class="loading-btn" id="loading-btn">Weiter</button>`;
}
