function getPokeCardTemplate(index, array) {
  return `<div class="poke-card" onclick="toggleOverlay(${index}, currentPokemonArray)">
            <div class="card-header">
            <span># ${array[index].id}</span>
            <span>${array[index].name.toUpperCase()}</span>
            </div>
            <div class="bg_${array[index].type[0]} bg-size">
            <img src="${array[index].image}" alt="${
    array[index].name
  }" class="pokemon-img">
            </div>
            <div class="card-footer">
            ${getTypeIcon(index, array)}
            </div>
        </div>`;
}

function getPokeCardTemplateLarge(currentIndex, array) {
  return `<div class="overlay-header">
            <img src="./img/left_chevron_white.png" onclick="previousButton()" alt="previous card" class="icon-img">
            <span># ${array[currentIndex].id}</span>
            <span>${array[currentIndex].name.toUpperCase()}</span>
            <img src="./img/right_chevron_white.png" onclick="nextButton()" alt="next card" class="icon-img">
            </div>
            <div class="bg_${array[currentIndex].type[0]} overlay-bg-size">
            <img src="${array[currentIndex].image}" alt="${
    array[currentIndex].name
  }" class="overlay-pokemon-img">
            </div>
            <div class="card-footer">
            ${getTypeIcon(currentIndex, array)}
            </div>
            <div class="pokeDetails">
                <span class="detail-category" onclick="toggleDNone('main-table', 'stats-table', 'evo-chain')">main</span>
                <span class="detail-category" onclick="toggleDNone('stats-table', 'main-table', 'evo-chain')">stats</span>
                <span class="detail-category" onclick="toggleDNone('evo-chain', 'stats-table', 'main-table'); showEvolutionChain()">evo chain</span>
            </div>
            <div class="detail-view-main text-align" id="main-table">
                      <div class="detail-content">
                        <span>height: </span>
                        <span>${array[currentIndex].height}</span>
                      </div>
                      <div class="detail-content">
                        <span>weight: </span>
                        <span>${array[currentIndex].weight}</span>
                      </div>
                      <div class="detail-content">
                        <span>abilities: </span>
                        <span>${array[currentIndex].abilities}</span>
                      </div>
            </div>
            <div class="detail-view-main toggle_d_none" id="stats-table">
                        <div class="stats-content-container">
                          <span><label for="stats">${
                            array[currentIndex].stats[0]
                          }: </label></span>
                          <div class="progress-bar-container">${
                            array[currentIndex].base_stat[0]
                          }
                          <progress id="stats" max="300" value="${
                            array[currentIndex].base_stat[0]
                          }"></progress>
                          </div>
                        </div>
                        <div class="stats-content-container">
                          <span><label for="stats">${
                            array[currentIndex].stats[1]
                          }: </label></span>
                          <div class="progress-bar-container">${
                            array[currentIndex].base_stat[1]
                          }
                          <progress id="stats" max="300" value="${
                            array[currentIndex].base_stat[1]
                          }"></progress>
                          </div>
                        </div>
                        <div class="stats-content-container">
                          <span><label for="stats">${
                            array[currentIndex].stats[2]
                          }: </label></span>
                          <div class="progress-bar-container">${
                            array[currentIndex].base_stat[2]
                          }
                          <progress id="stats" max="300" value="${
                            array[currentIndex].base_stat[2]
                          }"></progress>
                          </div>
                        </div>
                        <div class="stats-content-container">
                          <span><label for="stats">${
                            array[currentIndex].stats[3]
                          }: </label></span>
                          <div class="progress-bar-container">${
                            array[currentIndex].base_stat[3]
                          }
                          <progress id="stats" max="300" value="${
                            array[currentIndex].base_stat[3]
                          }"></progress>
                          </div>
                        </div>
                        <div class="stats-content-container">
                          <span><label for="stats">${
                            array[currentIndex].stats[4]
                          }: </label></span>
                          <div class="progress-bar-container">${
                            array[currentIndex].base_stat[4]
                          }
                          <progress id="stats" max="375" value="${
                            array[currentIndex].base_stat[4]
                          }"></progress>
                          </div>
                        </div>
            </div>
            <div class="detail-view-main toggle_d_none" id="evo-chain">
              <div class="evo-container" id="evo-chain-imgs"> 
              </div>
            </div>`;
}

