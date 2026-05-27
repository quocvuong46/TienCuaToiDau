"use client";

import { useState, useEffect } from "react";

export default function InfiniteRenderLoopPage() {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div>Loading...</div>;

  setCount(count + 1);
  return <div>{count}</div>;
}
