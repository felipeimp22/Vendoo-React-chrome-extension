import React from "react";
import { createRoot } from "react-dom/client";
import SyncPage from "@src/pages/sync/Sync";
import refreshOnUpdate from "virtual:reload-on-update-in-view";

refreshOnUpdate("pages/sync");

function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find #app-container");
  }
  const root = createRoot(appContainer);
  root.render(<SyncPage />);
}

init();
