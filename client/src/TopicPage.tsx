import { useLoaderData } from "react-router-dom";
import TaskList from "./TaskList";

interface Topic {
  title: string;
  flags: string[];
  introduction: string;
  resources: {title: string, url: string}[];
  learning_objectives: string[];
}

export default function TopicPage() {
  const topic = useLoaderData() as Topic;

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
      <TaskList />
    </article>
  );
}
