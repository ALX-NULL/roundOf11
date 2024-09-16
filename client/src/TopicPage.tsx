import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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



export default function TopicPage() {
  const location = useLocation();
  const [topic, setTopic] = useState<Topic>({});
  useEffect(() => {
    const q = new URLSearchParams(location.search).get("q");
    (async function() {
      const res = await fetch(`http://localhost:8000/api/v1/get_ai_content?query=${q}`);
      if (res.ok) setTopic(await res.json() as Topic);
    })()
  }, [location])

  return (
    <article className="prose">
      <h1>{topic.title}</h1>
      <p>{topic.flags?.map((f)=> <span className="bg-red-500">{f}</span>)}</p>
      <hr />
      <h2>Short Introduction</h2>
      <p>{topic.introduction}</p>
      <h2>Resources</h2>
      <ul>{topic.resources?.map((o) => <a href={o.url}><li>{o.title}</li></a>)}</ul>
      <h2>Learning Objectives</h2>
      <p>You need to be able to answer these questions without the help of google to make sure you understand well</p>
      <p>{topic.learning_objectives?.map((o) => <li>{o}</li>)}</p>
    </article>
  );
}
