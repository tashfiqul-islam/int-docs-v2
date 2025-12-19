"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Section = "rest-api" | "webhooks" | null;

export default function VersionSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [section, setSection] = useState<Section>(null);
  const [currentVersion, setCurrentVersion] = useState<string>("");

  useEffect(() => {
    if (pathname.includes("/rest-api/")) {
      setSection("rest-api");
      setCurrentVersion("v2");
    } else if (pathname.includes("/webhooks/")) {
      setSection("webhooks");
      setCurrentVersion("v3");
    } else {
      setSection(null);
    }
  }, [pathname]);

  if (!section) {
    return null;
  }

  const handleVersionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newVersion = e.target.value;
    setCurrentVersion(newVersion);

    if (section === "rest-api") {
      router.push(`/docs/rest-api/${newVersion}/introduction`);
    } else {
      router.push(`/docs/webhooks/${newVersion}/introduction`);
    }
  };

  return (
    <select
      aria-label="Select version"
      className="w-auto rounded-md border border-fd-border bg-fd-background px-1 py-1 text-center text-fd-primary text-sm hover:bg-fd-accent focus:border-fd-primary focus:outline-none"
      onChange={handleVersionChange}
      style={{
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888888' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 0.3rem center",
        paddingRight: "1.25rem",
        minWidth: "48px",
      }}
      value={currentVersion}
    >
      {section === "rest-api" ? (
        <option value="v2">v2</option>
      ) : (
        <option value="v3">v3</option>
      )}
    </select>
  );
}
