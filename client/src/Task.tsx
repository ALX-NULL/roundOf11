export interface TaskT {
  id: string;
  question: string;
  choices: object;
  answer: string;
}


export default function Task(task: TaskT) {
  return (
    <article className="rounded-lg px-8 border dark:border-gray-700 bg-white dark:bg-gray-900">
    <h4 className="">{task.question}</h4>
    <ul className="flex flex-col gap-2 w-[max] px-6">
    {Object.entries(task.choices).map(([key, val]) =>
        <label key={key} className="leading-5 py-2 has-[:checked]:font-bold has-[:checked]:border-cyan-500 dark:border-gray-700 rounded-full w-full min-w-32 px-4 cursor-pointer border bg-gray-50 dark:bg-slate-800">
        <input className="hidden" type="radio" name={task.id} value={key} />
        {val}
        </label>)
    }
    </ul>
    </article>
  );
}
