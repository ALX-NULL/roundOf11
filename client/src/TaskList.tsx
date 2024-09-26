import { FormEventHandler, useMemo, useState } from "react";
import SpinnerButton from "./SpinnerButton";
import Task, { TaskT } from "./Task";
import { getTasks } from "./utils/loaders";

interface Props {
  learningObjectives?: string[];
}

export default function TaskList(props: Props) {
  const [tasks, setTasks] = useState<{ [k: string]: TaskT }>({});
  const totalTasks = useMemo(() => Object.keys(tasks).length, [tasks]);
  const [spining, setSpining] = useState(false);
  const [correctAnswers, setAnswers] = useState(0);
  const updateTasks = () => {
    setSpining(true);
    getTasks(props.learningObjectives?.join(", ")).then((data) => {
      setTasks(data);
      setSpining(false);
    });
  };

  const checkAnswers: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSpining(true);
    const data = new FormData(e.currentTarget);
    let correct = 0;
    for (const [key, value] of data) {
      await new Promise((res) => setTimeout(res, 500));
      if (value == tasks[key]?.answer) setAnswers(++correct);
    }
    setSpining(false);
  };

  return (
    <div className="my-8 flex flex-col">
      {totalTasks ? (
        <form onSubmit={checkAnswers}>
          <hr />
          <h2>Quizzes</h2>
          <div className="flex flex-col gap-4">
            {Object.entries(tasks).map(([key, task]) => (
              <Task key={key} {...task} id={key} />
            ))}
          </div>
          <div className="text-center">
            {correctAnswers > 0 && (
              <h3>{` ${correctAnswers} / ${totalTasks}`}</h3>
            )}
            {!spining &&
              correctAnswers > 0 &&
              (correctAnswers < totalTasks ? (
                <p className="-mb-7">You can do better, try again.</p>
              ) : (
                <p>
                  <strong>Well Done,</strong> You aced it.
                </p>
              ))}
            {correctAnswers < totalTasks && (
              <SpinnerButton
                spin={spining}
                type="submit"
                spinLabel="Looking into them..."
              >
                Check your answers
              </SpinnerButton>
            )}
          </div>
        </form>
      ) : (
        <SpinnerButton
          spin={spining}
          onClick={updateTasks}
          spinLabel="Getting some questions..."
        >
          Check your knowledge
        </SpinnerButton>
      )}
    </div>
  );
}
