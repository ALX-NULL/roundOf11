import { Form, useNavigation } from "react-router-dom";
import LoadingPage from "./LoadingPage";

export default function HomePage() {
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <LoadingPage />
  }

  return (
    <Form className="mx-auto flex flex-col items-center justify-center w-full p-8" action="/topic">
    <div className="text-red-500 dark:text-teal-400 text-4xl font-serif flex-col flex">
    <span>I want to</span>
    <h1 className="bg-gradient-to-bl from-red-600 dark:from-teal-700 to-rose-400 dark:to-teal-200 bg-clip-text text-transparent text-9xl">LEARN</h1>
    <input className="w-[150%] my-8 text-gray-800 dark:text-gray-200 dark:bg-gray-900 self-center rounded-full outline-none border dark:border-gray-800 focus:border-rose-400 dark:focus:border-teal-200 shadow-lg py-4 px-8 max-w-[90vw] text-2xl duration-100 hover:shadow-xl dark:shadow-gray-950 dark:hover:shadow-gray-950" id="q" name="q" placeholder="Python"/>
    <button type="submit" className="bg-gradient-to-tr from-red-600 dark:from-teal-700 to-rose-400 dark:to-teal-200 ml-auto duration-100 rounded-full w-36 py-3 text-lg font-semibold bg-red-500 text-white dark:text-gray-800 active:translate-y-0 hover:-translate-y-1">
    NOW!
    </button>
    </div>
    </Form>
  );
}
