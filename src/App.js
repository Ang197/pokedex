import {useState, useEffect} from "react";
import PokemonThumbnails from "./components/PokemonThumbnails";
import pokemonLogo from "./Images/International_Pokémon_logo.svg.png";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [mainUrl, setMainUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=151');

  const getAllPokemon = async () => {
    const res = await fetch(mainUrl);
    const data = await res.json();

    setMainUrl(data.next);
    
    function createPokemonStats (results){
      results.forEach(async (pokemon) =>{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json();

        setPokemonData(currentList => [...currentList, data])
      })
    }

    createPokemonStats(data.results);
    console.log(pokemonData);
  }

  useEffect(() => {
    getAllPokemon()
  }, [])

  return (
    <div className="app-pokemon-container">

      <img className="logo"src ={pokemonLogo} alt="International_Pokémon_logo.svg.png" />
      
      <form>
        <label>
          <input
            type="text"
            placeholder="Search for your Pokemon..."
            className="pokedexSearchbar"/>
        </label>
      </form>
      
      <div className="pokemon-container">
        <div className ="pokemon-information-container">
          {pokemonData.map((pokemon, index) => 
            <PokemonThumbnails
            id={pokemon.id}
            name={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            image={pokemon.sprites.other.dream_world.front_default}
            type={pokemon.types[0].type.name.charAt(0).toUpperCase() + pokemon.types[0].type.name.slice(1)}
            key={index}
            />  
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
