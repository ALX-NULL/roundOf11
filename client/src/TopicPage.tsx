import { useLoaderData } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import { useState } from "react";
import Spinner from "./Spinner";
import Task, { TaskT } from "./Task";

interface Topic {
  title?: string;
  flags?: string[];
  introduction?: string;
  resources?: {title: string, url: string}[];
  learning_objectives?: string[];
  tasks?: { [k: string]: TaskT };
}

export default function TopicPage() {
  const topic = useLoaderData() as Topic;
  const [tasks, setTasks] = useState([]);
  const [spining, setSpining] = useState(false);

  const getTasks = () => {
    setSpining(true);
    setTasks([]);
  };

  if (!topic.title) return <NotFoundPage />;
  return (
    <article className="mx-auto prose dark:prose-invert px-4 py-8">
      <h1 className="">{topic.title}</h1>
      <p className="gap-2 flex flex-wrap">
      {topic.flags?.map((o)=> <span key={o} className="dark:bg-cyan-200 bg-red-500 dark:text-gray-800 text-white font-semibold py-1 px-3 rounded-lg text-nowrap text-sm">{o}</span>)}
      </p>
      <hr  className="mt-0"/>
      <h2>Short Introduction</h2>
      <p>{topic.introduction}</p>
      <h2>Resources</h2>
      <ul>{topic.resources?.map((o) => <a href={o.url} key={o.title} className="dark:text-cyan-300 text-red-600 font-semibold"><li>{o.title}</li></a>)}</ul>
      <h2>Learning Objectives</h2>
      <p>{topic.learning_objectives?.map((o) => <li key={o}>{o}</li>)}</p>
      <div className="flex my-8">
      { tasks.length > 0 &&
      <>
      <hr />
      <h2>Tasks</h2>
      {Object.entries<TaskT>(tasks).map(([key, task]) => <Task key={key} {...task} />)}
      </>
      }
      <button disabled={spining} onClick={getTasks} className="gradient-secondary text-invert min-w-96 text-center mx-auto py-3 px-4 rounded-xl text-xl font-semibold hover:brightness-90 disabled:brightness-90">
      {spining?
        <div className=" flex space-x-4 items-center justify-center">
        <Spinner /><span> Getting some questions...</span>
        </div> : "Check your knowledge" }
      </button>
      </div>
    </article>
  );
}
