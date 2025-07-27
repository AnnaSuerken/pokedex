const apiUrl = "https://pokeapi.co/api/v2/pokedex/";
let baseUrl = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
const pokeUrl = "https://pokeapi.co/api/v2/pokemon/";
let nextStackUrl ="";
let currentIndex = 0;

let pokemonArray=[];
let pokemonEvoChain = [];
let pokemonStats=[];