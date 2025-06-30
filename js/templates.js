function getPokeCardTemplate(index) {
  `<div class="poke-card">
            <div class="card-header"></div>
            <span>${pokemonArray[index].id}</span>
            <span>${pokemonArray[index].name}</span>
            </div>
            <img src="${pokemonArray[index].image}" alt="">
            <div>
            <img src="" alt="">
            <img src="" alt="">
            </div>
        </div>`;
}
