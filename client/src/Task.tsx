export interface TaskT {
  id: string;
  question: string;
  choices: object;
  answer: string;
}

export default function Task(task: TaskT) {
  return (
    <article className="rounded-lg border bg-white px-8 dark:border-gray-700 dark:bg-gray-900">
      <h4 className="">{task.question}</h4>
      <ul className="flex w-[max] flex-col gap-2 px-6">
        {Object.entries(task.choices).map(([key, val]) => (
          <label
            key={key}
            className="w-full min-w-32 cursor-pointer rounded-full border bg-gray-50 px-4 py-2 leading-5 has-[:checked]:border-cyan-500 has-[:checked]:font-bold dark:border-gray-700 dark:bg-slate-800"
          >
            <input className="hidden" type="radio" name={task.id} value={key} />
            {val}
          </label>
        ))}
      </ul>
    </article>
  );
}
