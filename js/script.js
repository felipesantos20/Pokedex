// <--------------- declarando variaveis -------------------> //
var pokemonName = document.querySelector('.pokemon_name');
var pokemonNumber = document.querySelector('.pokemon_number');
var imgPokemon = document.querySelector('.pokemon');

var form = document.querySelector('.form');
var input = document.querySelector('.input_search');
var buttonPrev = document.querySelector('.btn-prev')
var buttonNext = document.querySelector('.btn-next')

var searchPokemon = 1;
// <--------------------------------------------------------> //

// <---------------------- Chamndo API ----------------------------> // 
var fetchPokemon = async (pokemon) => {
    var APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status === 200){
        var data = await APIResponse.json();
        return data;
    }    
}
// <---------------------------------------------------------------> //

// <--------------------- Pegando os dados da API ------------------------> //
var renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = "Carregando..."; 

    var data = await fetchPokemon(pokemon);

if(data) {
    imgPokemon.style.display ="block"
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    imgPokemon.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    input.value =""
    searchPokemon = data.id;
} else {
    imgPokemon.style.display ="none"
    pokemonName.innerHTML = "Não Encontrado";
    pokemonNumber.innerHTML = "";
}   
}
// <---------------------------------------------------------------------> //

// <-------------------- Pesquisa do pokemon -----------------------> //
form.addEventListener('submit', (event)=>{

    event.preventDefault();
    renderPokemon(input.value.toLowerCase())
    
});
// <----------------------------------------------------------------> //

// <--------------- Botão para voltar um pokemon ------------------> //
buttonPrev.addEventListener('click', ()=>{
 if (searchPokemon > 1) {
    searchPokemon -= 1
    renderPokemon(searchPokemon);
}
});
// <----------------------------------------------------------------> //

// <--------------- Botão para o proximo pokemon ------------------> //
buttonNext.addEventListener('click', ()=>{  
    searchPokemon += 1
    renderPokemon(searchPokemon);
});
// <----------------------------------------------------------------> //

renderPokemon(searchPokemon);