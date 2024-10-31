//console.log("Estou no console")
const pokemonImage = document.querySelector(".pokemon__image");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonName = document.querySelector(".pokemon_name");
const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

let searchPokemon = 1;


//CONECTAR E CAPITURAR AS INFORMAÇÕES DA POKEAPI

const fetchPokemon = async (pokemon) => {
    

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {

        const data = await APIResponse.json();

        return data;

    }


    // console.log(data);


};

const renderPokemon = async (pokemon) => {


    pokemonName.textContent = "loading...";
    pokemonNumber.textContent = "";
    pokemonImage.src = "https://media.tenor.com/d0GeOMz6_HwAAAAM/pikachu.gif";

    const data = await fetchPokemon(pokemon);

    console.log(data);

    if (data) {
        //Caso tudo de certo
        pokemonImage.src = data.sprites.versions["generation-v"]["black-white"].animated.front_default;
        pokemonImage.style.width = "20%";
        pokemonNumber.textContent = data.id;
        pokemonName.textContent = data.name;
        input.value = "";
        searchPokemon = data.id


    } else {
        //Caso de errado
        pokemonNumber.textContent = "";
        pokemonName.textContent = "Not found :(";
        pokemonImage.src = "https://media.tenor.com/03NZAgvjSZkAAAAi/dance-pokemon.gif"
        pokemonImage.style.width = "35%";
       

    }





}


form.addEventListener(`submit`, (event) => {

    event.preventDefault();

    renderPokemon(input.value.toLowerCase());

})

buttonPrev.addEventListener("click", () => {

    if (searchPokemon > 1) {
        
        searchPokemon -= 1
        renderPokemon(searchPokemon);
    }
    


})

buttonNext.addEventListener("click", () => {

    searchPokemon += 1;
    
    renderPokemon(searchPokemon);

})


renderPokemon(searchPokemon)


