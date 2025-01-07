import clsx from "clsx";
import { Position } from "./Dashboard";

export default function Highlight({
  className,
  topLeft,
  bottomRight,
}: Readonly<{
  className?: string;
  topLeft: Position;
  bottomRight: Position;
}>) {
  const width = bottomRight.x - topLeft.x;
  const height = bottomRight.y - topLeft.y;

  return (
    <div
      className={clsx("highlight", className)}
      style={{
        position: "absolute",
        top: topLeft.y,
        left: topLeft.x,
        width,
        height,
        border: "2px solid rgba(255, 0, 0, 0.8)",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
      }}
    />
  );
}
