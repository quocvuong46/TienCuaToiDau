"use client";

import { useEffect } from "react";

export default function UnhandledPromisePage() {
  useEffect(() => {
    fetch("/unknown"); // rejection with no catch
  }, []);
  return <div>unhandled promise</div>;
}
