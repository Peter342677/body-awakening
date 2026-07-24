import clsx from "clsx";

export default function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={clsx("eyebrow", className)}>{children}</p>;
}
