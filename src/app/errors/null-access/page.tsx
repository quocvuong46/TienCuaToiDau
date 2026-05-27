"use client";

import { useEffect, useState } from "react";

export default function NullAccessPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div>Loading...</div>;

  const obj: any = null;
  return <p>{obj.key}</p>;
}
