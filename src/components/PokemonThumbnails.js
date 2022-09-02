import React from 'react';

const PokemonThumbnails = ({id, name, image, type}) => {
    return(
        <div className="thumbNail-container" onClick={() => alert("This is a Pokemon")}>
            <div className="pokemonNumber">
                <small className="pokeDex#">#0{id}</small>
            </div>
            <img className="pokeImage"src={image} alt={name}/>
            <div className = "wrapper">
                <h3>
                    {name}
                </h3>
                <small>Type: {type}</small>
            </div>
        </div>
    )
}

export default PokemonThumbnails