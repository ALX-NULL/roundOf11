export interface TaskT {
  question: string;
  choices: object;
  answer: string;
}


export default function Task(task: TaskT) {

  return (
    <article>
    <h2>{task.question}</h2>
    <ul>{Object.entries(task.choices).map(([key, val]) =>
        <label key={key}><input type="radio" />{val}</label>)
    }</ul>
    </article>
  );
}
