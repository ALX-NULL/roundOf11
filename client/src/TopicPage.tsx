import { LoaderFunction, useLoaderData } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import { useState } from "react";
import Spinner from "./Spinner";

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



export const loader: LoaderFunction = async function loader(o) {
  const q = new URLSearchParams(o.request.url.split('?')[1]).get("q");
  const res = await fetch(`http://localhost:8000/api/v1/get_ai_content?query=${q}`);
  if (res.status == 200) return await res.json() as Topic;
  else return await loader(o);
}

export default function TopicPage() {
  const topic = useLoaderData() as Topic;
  const [tasks, setTasks] = useState<Task[]>([]);
  const [spining, setSpining] = useState(false);

  const getTasks = () => {
    setSpining(true);
    setTasks([]);
  };

  if (!topic.title) return <NotFoundPage />;
  return (
    <article className="mx-auto prose dark:prose-invert px-4 py-8">
      <h1 className="">{topic.title}</h1>
      <p className="gap-3 flex flex-wrap">{topic.flags?.map((o)=> <span key={o} className="dark:bg-cyan-200 bg-red-500 dark:text-gray-800 text-white font-semibold py-1 px-3 rounded-lg text-nowrap">{o}</span>)}</p>
      <hr  className="mt-0"/>
      <h2>Short Introduction</h2>
      <p>{topic.introduction}</p>
      <h2>Resources</h2>
      <ul>{topic.resources?.map((o) => <a href={o.url} key={o.title} className="dark:text-cyan-300 text-red-700 font-semibold"><li>{o.title}</li></a>)}</ul>
      <h2>Learning Objectives</h2>
      <p>{topic.learning_objectives?.map((o) => <li key={o}>{o}</li>)}</p>
      <div className="flex my-8">
      { tasks.length > 0 &&
      <>
      <hr />
      <h2>Tasks</h2>
      {tasks.map((task) => <div>{task.title}</div>)}
      </>
      }
      <button disabled={spining} onClick={getTasks} className="bg-red-500 min-w-96 text-center dark:bg-cyan-200 dark:text-gray-800 mx-auto py-3 px-4 rounded-xl text-xl font-semibold hover:opacity-90 disabled:opacity-80">
      {spining? <div className="flex space-x-4 items-center justify-center"><Spinner /> <span>Getting some questions...</span></div> : "Check your knowledge" }
      </button>
      </div>
    </article>
  );
}
