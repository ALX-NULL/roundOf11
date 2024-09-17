import { MouseEventHandler, PropsWithChildren } from "react";
import Spinner from "./Spinner";

interface propsT extends PropsWithChildren {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "reset";
  spin: boolean;
  spinLabel?: string;
}

export default function SpinnerButton(p: propsT) {
  return (
    <button
      type={p.type}
      disabled={p.spin}
      onClick={p.onClick}
      className="gradient-secondary text-invert mx-auto mt-8 min-w-96 rounded-xl px-4 py-3 text-center text-xl font-semibold hover:brightness-90 disabled:brightness-90"
    >
      {p.spin ? (
        <div className="flex items-center justify-center space-x-4">
          <Spinner />
          <span> {p.spinLabel || "Loading..."}</span>
        </div>
      ) : (
        <span>{p.children}</span>
      )}
    </button>
  );
}
