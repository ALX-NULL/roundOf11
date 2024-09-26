import { useLoaderData } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import TaskList from "./TaskList";

interface Topic {
  title: string;
  flags: string[];
  suggestions: string[];
  introduction: string;
  resources: { title: string; url: string }[];
  "learning objectives": string[];
}

export default function TopicPage() {
  const topic = useLoaderData() as Topic;

  if (!topic.title) return <NotFoundPage suggestions={topic.suggestions} />;
  return (
    <article className="prose mx-auto px-4 py-8 dark:prose-invert">
      <h1 className="">{topic.title}</h1>
      <p className="flex flex-wrap gap-2">
        {topic.flags?.map((o) => (
          <span
            key={o}
            className="text-nowrap rounded-lg bg-red-500 px-3 py-1 text-sm font-semibold text-white dark:bg-cyan-200 dark:text-gray-800"
          >
            {o}
          </span>
        ))}
      </p>
      <hr className="mt-0" />
      <h2>Short Introduction</h2>
      <p>{topic.introduction}</p>
      <h2>Resources</h2>
      <ul>
        {topic.resources?.map((o) => (
          <a
            href={o.url}
            key={o.title}
            className="font-semibold text-red-600 dark:text-cyan-300"
          >
            <li>{o.title}</li>
          </a>
        ))}
      </ul>
      <h2>Learning Objectives</h2>
      <p>
        {topic["learning objectives"].map((o) => (
          <li key={o}>{o}</li>
        ))}
      </p>
      <TaskList />
    </article>
  );
}
