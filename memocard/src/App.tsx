import { useEffect } from "react";
import "./App.css";
import GetAllPokemon from "./Pokeapi";
import { useState } from "react";

function App() {
  type Pokemon = {
    image: string;
    title: string;
  };
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [seenPokemon, setSeenPokemon] = useState(new Set<string>());

  useEffect(() => {
    async function load() {
      const data = await GetAllPokemon();
      setPokemonList(data);
      const random = data[Math.floor(Math.random() * data.length)];
      setCurrentPokemon(random);
    }
    load();
  }, []);

  function randomizePokemon() {
    if (pokemonList.length === 0) return;
    const random = pokemonList[Math.floor(Math.random() * pokemonList.length)];
    setCurrentPokemon(random);
  }

  function handleSeenClick(img: string) {
    if (seenPokemon.has(img)) {
      randomizePokemon();
      setScore((prev) => prev + 1);
    } else {
      setGameOver(true);
    }
  }
  function handleNotSeenClick(img: string) {
    if (seenPokemon.has(img)) {
      setGameOver(true);
    } else {
      setSeenPokemon((prev) => new Set<string>(prev).add(img));
      randomizePokemon();
      setScore((prev) => prev + 1);
    }
  }

  function restartGame() {
    setScore(0);
    setSeenPokemon(new Set<string>());
    setGameOver(false);
    randomizePokemon();
  }

  if (!currentPokemon) return <div>Loading...</div>;
  if (gameOver) {
    return (
      <div className="gameover">
        <h1>Game Over</h1>
        <p>Score: {score}</p>
        <button onClick={restartGame}>Restart Game</button>
      </div>
    );
  }
  return (
    <div className="container">
      <img src={currentPokemon.image} alt={currentPokemon.title} />
      <div>
        <button onClick={() => handleNotSeenClick(currentPokemon.image)}>
          Not Seen
        </button>
        <button onClick={() => handleSeenClick(currentPokemon.image)}>
          Seen
        </button>
      </div>
    </div>
  );
}

export default App;
