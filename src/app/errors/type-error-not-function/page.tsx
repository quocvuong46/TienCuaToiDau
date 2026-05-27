"use client";

import { useEffect, useState } from "react";

export default function TypeErrorNotFunctionPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div>Loading...</div>;

  const notAFunction: any = 42;
  return <p>{notAFunction()}</p>;
}
