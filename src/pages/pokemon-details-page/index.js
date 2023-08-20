import { useState, useEffect } from "react";
import { getPokemon } from "../../services/requestApi";
import { useParams } from "react-router";
import { PokemonDetails } from "../../components/pokemon-details";

const PokemonDetailsPage = () => {
  const [pokemon, setPokemon] = useState();

  const { name } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemon(name);
      setPokemon(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {pokemon !== undefined ? (
        <PokemonDetails pokemon={pokemon} />
      ) : (
        "No pokemon found"
      )}
    </div>
  );
};

export { PokemonDetailsPage };
