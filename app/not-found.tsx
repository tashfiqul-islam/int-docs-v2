import { HomeLayout } from "fumadocs-ui/layouts/home";
import { Custom404 } from "@/app/components/ui/custom-404";
import { baseOptions } from "@/lib/layout.shared";

export default function NotFound() {
  const base = baseOptions();

  return (
    <HomeLayout {...base}>
      <Custom404 />
    </HomeLayout>
  );
}
