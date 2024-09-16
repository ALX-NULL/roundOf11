import { LoaderFunction, useLoaderData, redirect } from "react-router-dom";

interface Task {
  title: string;
  question: string;
  example?: string;
}

interface Topic {
  title?: string;
  flags?: string[];
  introduction?: string;
  resources?: {title: string, url: string}[];
  learning_objectives?: string[];
  tasks?: Task[];
}


export const loader: LoaderFunction = async function loader({ request }) {
  const q = new URLSearchParams(request.url.split('?')[1]).get("q");
  const res = await fetch(`http://localhost:8000/api/v1/get_ai_content?query=${q}`);
  if (res.status == 200) return await res.json() as Topic;
  else return {};
}

export default function TopicPage() {
  const topic = useLoaderData() as Topic;

  return (
    <article className="prose dark:prose-invert px-4 py-8">
      <h1 className="">{topic.title}</h1>
      <p className="space-x-4 flex">{topic.flags?.map((o)=> <span key={o} className="dark:bg-cyan-200 bg-red-500 dark:text-gray-800 text-white font-semibold py-1 px-3 rounded-lg text-nowrap">{o}</span>)}</p>
      <hr  className="mt-0"/>
      <h2>Short Introduction</h2>
      <p>{topic.introduction}</p>
      <h2>Resources</h2>
      <ul>{topic.resources?.map((o) => <a href={o.url} key={o.title} className="dark:text-cyan-300 text-red-700 font-semibold"><li>{o.title}</li></a>)}</ul>
      <h2>Learning Objectives</h2>
      <p>{topic.learning_objectives?.map((o) => <li key={o}>{o}</li>)}</p>
    </article>
  );
}
