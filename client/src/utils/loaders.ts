import { LoaderFunction } from "react-router-dom";

const API_BASE_URL = "http://localhost:8000/api/v1";

export const getTopicDetails: LoaderFunction = async ({ request }) => {
  const q = new URLSearchParams(request.url.split("?")[1]).get("q");
  const res = await fetch(`${API_BASE_URL}/get_ai_content?query=${q}`);
  if (res.status == 200) return await res.json();
  else return {};
};

export async function getTasks(objectives: string[]) {
  const q = new URLSearchParams(window.location.search).get("q");
  const res = await fetch(`${API_BASE_URL}/get_ai_content?query=${q}&learing_objectives:${objectives}`);
  if (res.status == 200) return await res.json();
  else return {};
};
