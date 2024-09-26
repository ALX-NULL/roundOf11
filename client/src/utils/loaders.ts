import { LoaderFunction } from "react-router-dom";
import { Movie } from "../MovieCard";

const API_BASE_URL = "http://localhost:8000/api/v1";

export const getTopicDetails: LoaderFunction = async ({ request }) => {
  const q = new URLSearchParams(request.url.split("?")[1]).get("q");
  const res = await fetch(`${API_BASE_URL}/get_ai_content?query=${q}`);
  if (res.status == 200) return await res.json();
  else return {};
};

export async function getTasks(objs = "understanding") {
  const q = new URLSearchParams(window.location.search).get("q");
  const res = await fetch(
    `${API_BASE_URL}/quiz?topic=${q}&learning_objectives=${objs}`,
  );
  if (res.status == 200) return await res.json();
  else return {};
}

export async function getMovies() {
  const q = new URLSearchParams(window.location.search).get("q");
  try {
    const res = await fetch(`${API_BASE_URL}/get_movies?query=${q}`);
    if (res.status !== 200) return [];
    const data = await res.json();
    const movies = Object.entries<{ [k: string]: Movie }>(data).map(
      ([k, value]) => value[k],
    );
    return movies.filter((o: Movie) => o.poster_path && o.average_vote >= 5);
  } catch {
    return [];
  }
}
