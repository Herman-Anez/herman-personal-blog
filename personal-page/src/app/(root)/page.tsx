"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Basic redirect to default locale for statically exported sites
    router.replace("/es");
  }, [router]);

  // Fallback for no-js environments
  return (
    <head>
      <meta httpEquiv="refresh" content="0; url=/es" />
    </head>
  );
}
