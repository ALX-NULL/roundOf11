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
            className="mt-8 gradient-secondary text-invert min-w-96 text-center mx-auto py-3 px-4 rounded-xl text-xl font-semibold hover:brightness-90 disabled:brightness-90">
          {
            p.spin?
            <div className="flex space-x-4 items-center justify-center">
            <Spinner /><span> {p.spinLabel || "Loading..."}</span>
            </div>
              : <span>{p.children}</span>
          }
          </button>

  );
}
