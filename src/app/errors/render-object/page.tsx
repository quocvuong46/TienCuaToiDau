"use client";

import { useEffect, useState } from "react";

export default function RenderObjectPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div>Loading...</div>;

  const data = { name: "test", value: 42 };
  return <div>{data as any}</div>;
}
