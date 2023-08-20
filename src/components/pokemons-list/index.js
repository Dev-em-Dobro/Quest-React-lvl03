import { getPokemon, getPokemons } from "../../services/requestApi";
import { useEffect, useState } from "react";
import { CardsList } from "../pokeCard";
import { Button } from "../pokebutton";
import { ThemeToggler } from "../theme-toggler";
import styled from "styled-components";
import logopoke from "../../assets/logopoke.png";

function PokemonsList() {
  const paginationLimit = 10;

  const [pokemons, setPokemons] = useState([]);
  const [paginationOffset, setPaginationOffset] = useState(0); 

  const addPokemons = () => {
    setPaginationOffset(paginationOffset + paginationLimit)
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemons(paginationLimit, paginationOffset);

      const pokemonsNames = data.map(pokemon => pokemon.name);
      const pokemonsPromises = pokemonsNames.map(async (pokemonName) => await getPokemon(pokemonName));
      const paginatedPokemons = await Promise.all(pokemonsPromises);

      setPokemons([...pokemons, ...paginatedPokemons]);
    };
    fetchData();
    
  }, [paginationOffset]);

  return (
    <div>
      <header>
       
        <Logo>
          <Img src={logopoke} alt="logo POKEMON"></Img>
        </Logo>
        <ThemeToggler />
      </header>
      <main>
        <div>
          {pokemons.length !== undefined ? (
            <CardsList pokemon={pokemons} />
          ) : (
            "No pokemon found"
          )}
        </div>
      </main>
      <footer>
        <Button onClick={addPokemons}>Show More</Button>
      </footer>
    </div>
  );
}

const Logo = styled.div`
  text-align: center;
  margin: 5px;
`;

const Img = styled.img`
  width: 45%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export { PokemonsList };
