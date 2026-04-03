import pokemonList from "./pokemon.json";

async function GetPokemon(name: string) {
  // read pokemon
  const pokemonResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name}`,
  );
  const pokemon = await pokemonResponse.json();

  return {
    image: pokemon.sprites.front_default,
    title: name,
  };
}

async function GetAllPokemon() {
  const results = await Promise.all(
    pokemonList.map((value) => GetPokemon(value)),
  );
  return results;
}

export default GetAllPokemon;
