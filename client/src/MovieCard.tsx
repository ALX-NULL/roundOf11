import StarSVG from "./StarSVG";

export interface Movie {
  name: string;
  overview: string;
  poster_path: string;
  release_date: string;
  average_vote: number;
}

export default function MovieCard(movie: Movie) {
  return (
    <div
      style={{ backgroundImage: `url("${movie.poster_path}")` }}
      className="relative aspect-[9/16] min-w-[17rem] overflow-hidden rounded-lg border bg-contain bg-top bg-repeat dark:border-gray-700"
    >
      <div className="no-scrollbar absolute mt-auto h-full w-full translate-y-[77%] justify-end overflow-y-scroll bg-gradient-to-t dark:from-black from-90% dark:to-gray-900/80 p-2 duration-150 ease-in hover:translate-y-0 hover:from-20% from-gray-100 to-gray-200/80">
        <h2 className="m-0 min-h-[15%] font-semibold">
          {movie.name}
        </h2>
        <p className="rounded-pill m-0 flex min-h-[5%] content-center items-center">
          <span className="mr-auto">{movie.release_date.split("-")[0]}</span>
          <span className="mr-2">{movie.average_vote.toPrecision(2)}</span>
          <StarSVG className="mb-1 size-4 fill-yellow-500" />
        </p>
        <p className="text-justify text-lg">{movie.overview}</p>
      </div>
    </div>
  );
}
