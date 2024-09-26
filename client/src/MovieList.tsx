import { useEffect, useState } from "react";
import MovieCard, { Movie } from "./MovieCard";
import { getMovies } from "./utils/loaders";

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getMovies().then((data) => data.length > 0 && setMovies(data));
  }, []);
  return (
    <section>
      {movies.length > 0 && (
        <>
          <h1 className="text-2xl font-bold">Related Movies</h1>
          <div className="no-scrollbar flex gap-4 overflow-x-scroll pb-4">
            {movies.map((movie) => (
              <MovieCard key={movie.name} {...movie} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
