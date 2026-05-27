"use client";

export default function EventHandlerErrorPage() {
  const handleClick = () => {
    throw new Error("click handler exploded");
  };
  return <button onClick={handleClick}>Click me</button>;
}
