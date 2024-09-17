import { Form, useNavigation } from "react-router-dom";
import LoadingPage from "./LoadingPage";

export default function HomePage() {
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <LoadingPage />;
  }

  return (
    <Form
      className="mx-auto flex w-full flex-col items-center justify-center p-8"
      action="/topic"
    >
      <div className="text-primary flex flex-col font-serif text-4xl">
        <span>I want to</span>
        <h1 className="gradient-primary bg-clip-text text-8xl text-transparent sm:text-9xl">
          LEARN
        </h1>
        <input
          className="my-8 w-[150%] max-w-[90vw] self-center rounded-full border px-8 py-4 text-2xl text-gray-800 shadow-lg outline-none duration-100 hover:shadow-xl focus:border-rose-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:shadow-gray-950 dark:hover:shadow-gray-950 dark:focus:border-teal-200"
          id="q"
          name="q"
          placeholder="Python"
        />
        <button
          type="submit"
          className="text-invert gradient-secondary ml-auto w-36 rounded-full py-3 text-lg font-semibold duration-100 hover:-translate-y-1 active:translate-y-0"
        >
          NOW!
        </button>
      </div>
    </Form>
  );
}
