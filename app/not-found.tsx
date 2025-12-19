import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";
import { Custom404 } from "~/components/ui/custom-404";

export default function NotFound() {
  const base = baseOptions();

  return (
    <HomeLayout {...base}>
      <Custom404 />
    </HomeLayout>
  );
}
