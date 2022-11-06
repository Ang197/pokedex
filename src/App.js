import {useState, useEffect} from "react";
import PokemonThumbnails from "./components/PokemonThumbnails";
import pokemonLogo from "./Images/International_Pokémon_logo.svg.png";
import axios from "axios";

//The whole body for the app
function App() {

  //constant variables with use states that allow us store data into an array, and display a default amount of pokemon when first loaded
  const [pokemon, setPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");
  const [mainUrl, setMainUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=151');
  
  //This is meant to handle any changes occur when grabbing the targeted object/pokemon
  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase())
  }

  //This activates the function of grabbing the targeted pokemon's data
  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  }

  //This grabs a specific's pokemon data and pushes it into an array
  const getPokemon = async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      toArray.push(res.data);
      setPokemonType(res.data.types[0].type.name);
      setPokemonData(toArray);
    } catch (e) {
      console.log(e);
    }
  };

  //An asynchronus function that allows us to grab data from various amounts of pokemon
  const getAllPokemon = async () => {
    
    //Fetches from the mainurl const variable
    const res = await fetch(mainUrl);

    //Api responds after making a promise with the data from said url
    const data = await res.json();

    // //This allows us to increase the amount of pokemon we want to see on screen based on the given intial limit
    // setMainUrl(data.next);
    
    //Grabs the data for each individual pokemon, such as id, type, and name
    function createPokemonStats (results){
      results.forEach(async (pokemon) =>{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json();

        //The pokemonData array would grab an array of data from an array of data within the json pack
        setPokemonData(currentList => [...currentList, data])
      })
    }

    //Function calls for the data from the results
    createPokemonStats(data.results);

  }

  //Use effect uses the entire function
  useEffect(() => {
    getAllPokemon()
  }, [])

  return (
    <div className="app-pokemon-container">
      <div onClick={() => alert("This is a logo")}>
        <img className="logo"src ={pokemonLogo} alt="International_Pokémon_logo.svg.png" />
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text" 
            onChange={handleChange}   
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
