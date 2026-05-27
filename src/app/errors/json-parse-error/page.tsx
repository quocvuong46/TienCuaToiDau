"use client";

import { useEffect, useState } from "react";

export default function JsonParseErrorPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div>Loading...</div>;

  const data = JSON.parse("not valid json {{{");
  return <div>{data.name}</div>;
}
