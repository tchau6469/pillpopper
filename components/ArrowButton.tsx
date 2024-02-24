import { MouseEventHandler, ReactNode } from "react";

export default function ArrowButton({
  onClick,
  children,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
