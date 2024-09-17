import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="mx-auto my-auto">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="text-primary-600 dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">
            404
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry, we can't find information about the requested topic.
            <p>try another one in the home page.</p>{" "}
          </p>
          <Link
            to="/"
            className="gradient-secondary my-4 rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-rose-300 dark:text-gray-900 dark:focus:ring-rose-900"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
