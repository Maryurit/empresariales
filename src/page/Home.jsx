import { useEffect } from "react";
import CardList from "../components/CardList";
import { useMoviesStore } from "../store/movies.store";

const Home = () => {
  const items = useMoviesStore((state) => state.items);
  const getItems = useMoviesStore((state) => state.getItems);

  useEffect(() => {
  const baseUrl = import.meta.env.VITE_BASE_URL || "";

  let resource = "movie/popular"; // default (TMDB)

  if (baseUrl.includes("rickandmorty")) {
    resource = "character";
  } else if (baseUrl.includes("dragonball")) {
    resource = "characters";
  } else if (baseUrl.includes("pokeapi")) {
    resource = "pokemon";
  }

  getItems(resource); // ← Lo pasas manualmente
}, []);

  return (
    <section className="container py-4">
      <h2 className="mb-4">Contenido dinámico</h2>
      <CardList data={items} />
    </section>
  );
};

export default Home;
