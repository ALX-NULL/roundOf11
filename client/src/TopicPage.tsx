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
  resources?: string[];
  learning_objectives?: string[];
  tasks?: Task[];
}



export default function TopicPage() {
  const location = useLocation();
  const [topic, setTopic] = useState<Topic>({});
  useEffect(() => {
    console.log(location);
    const q = new URLSearchParams(location.search).get("q");
    (async function() {
      const res = await fetch(`http://localhost:8000/api/v1/get_ai_content?query=${q}`);
      if (res.ok) setTopic(await res.json() as Topic);
    })()
  }, [])
  return (
    <article className="prose">
      <h1>{topic.title}</h1>
      <p>{topic.flags}</p>
      <hr />
      <h2>Short Introduction</h2>
      <p>{topic.introduction}</p>
      <h2>Resources</h2>
      <p>{topic.resources}</p>
      <h2>Learning Objectives</h2>
      <p>You need to be able to answer these questions without the help of google to make sure you understand well</p>
      <p>{topic.learning_objectives}</p>
    </article>
  );
}
