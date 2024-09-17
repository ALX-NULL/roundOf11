import { useState } from "react";
import SpinnerButton from "./SpinnerButton";
import Task, { TaskT } from "./Task";
import { getTasks } from "./utils/loaders";

export default function TaskList() {
  const [tasks, setTasks] = useState<{[k: string]: TaskT}>({});
  const [spining, setSpining] = useState(false);
  const updateTasks = () => {
    setSpining(true);
    getTasks().then((data) => {
      setTasks(data);
      setSpining(false);
    })
  };

  return (
    <div className="flex flex-col my-8">
    {Object.keys(tasks).length ?
      <form>
      <hr />
      <h2>Quizzes</h2>
      <div className="flex flex-col gap-4">
      {Object.entries(tasks).map(([key, task]) => <Task key={key} {...task} />)}
      </div>
      <SpinnerButton type="submit" spin={spining} spinLabel="Looking into them..." >
      Check your answers
      </SpinnerButton>
      </ form>
    :
      <SpinnerButton spin={spining} onClick={updateTasks} spinLabel="Getting some questions...">
      Check your knowledge
      </SpinnerButton>
    }
    </div>
  );
}
