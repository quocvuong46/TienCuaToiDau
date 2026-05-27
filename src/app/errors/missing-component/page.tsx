"use client";

import { useEffect, useState } from "react";
import * as helpers from "./helpers";

export default function MissingComponentPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div>Loading...</div>;

  const Widget = (helpers as any).DoesNotExist;
  return <div>{Widget()}</div>;
}
