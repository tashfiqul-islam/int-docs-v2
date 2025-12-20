"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ClientRedirect({ to }: { to: string }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(to);
  }, [router, to]);

  return (
    <>
      <meta content={`0;url=${to}`} httpEquiv="refresh" />
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground text-sm">Redirecting to {to}...</p>
      </div>
    </>
  );
}
