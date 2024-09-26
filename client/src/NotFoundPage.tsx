import { Link } from "react-router-dom";

interface Props {
  suggestions?: string[];
}

export default function NotFoundPage(p: Props) {
  return (
    <section className="mx-auto my-auto h-max">
      <div className="mx-auto max-w-screen-xl p-4 lg:p-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="text-primary-600 dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">
            404
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
            Something's missing.
          </p>
          <div className="mb-8 text-lg font-light text-gray-500 dark:text-gray-400">
            <p>Sorry, we can't find information about the requested topic.</p>
            {p.suggestions && (
              <div className="mb-10 mt-4 border-y pb-3 pt-2 dark:border-gray-700">
                <p className="text-left text-xl">Check out these topics:</p>
                {p.suggestions.map((one) => (
                  <Link
                    key={one.replace(" ", "-")}
                    to={`/topic?q=${one}`}
                    className="text-primary mx-3 tracking-tight duration-100 hover:mx-5 hover:tracking-wide hover:underline hover:brightness-125"
                  >
                    {one}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            to="/"
            className="gradient-secondary mt-4 rounded-lg px-5 py-2.5 text-center font-serif font-semibold text-white focus:outline-none focus:ring-4 focus:ring-rose-300 dark:text-gray-900 dark:focus:ring-cyan-400/20"
          >
            Try Another Topic
          </Link>
        </div>
      </div>
    </section>
  );
}
