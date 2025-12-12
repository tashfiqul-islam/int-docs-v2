import { createAPIPage } from "fumadocs-openapi/ui";

import { openapi } from "@/lib/openapi";
import client from "./api-page.client";

export const APIPage = createAPIPage(openapi, {
  client,
  content: {
    // Layout: main content left, interactive rail right (sticky on desktop)
    renderOperationLayout: (slots) => (
      <div className="fd-api-shell space-y-6">
        <div className="fd-api-header space-y-3">
          {slots.header}
          {slots.description}
        </div>

        <div className="fd-api-playground">{slots.apiPlayground}</div>

        <div className="fd-api-grid gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="fd-api-main min-w-0 space-y-8">
            {slots.authSchemes}
            {slots.paremeters}
            {slots.body}
            {slots.callbacks}
          </div>

          <div className="fd-api-rail space-y-4">
            <div className="fd-api-card fd-api-code">{slots.apiExample}</div>
            <div className="fd-api-card">{slots.responses}</div>
          </div>
        </div>
      </div>
    ),
  },
});
