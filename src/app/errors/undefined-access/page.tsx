"use client";

import { useEffect, useState } from "react";

export default function UndefinedAccessPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div>Loading...</div>;

  const obj: any = undefined;
  return <p>{obj.key}</p>;
}
