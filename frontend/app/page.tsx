"use client";

import { useState, useCallback } from "react";
import Flow from "./flow";
import Sidebar from "./sidebar";

export type UpdateMode = "base" | "update" | "neither";

export default function Home() {
  const [update, setUpdate] = useState<UpdateMode>("base");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleFlowReady = useCallback(() => {
    setUpdate("neither");
  }, []);

  const handleLogsUpdated = useCallback(() => {
    setUpdate("update");
  }, []);

  return (
    <div className="flex h-screen w-full font-sans relative">
      <main className="min-w-0 flex-1">
        <Flow update={update} onReady={handleFlowReady} />
      </main>

      {sidebarOpen ? (
        <Sidebar
          onLogsUpdated={handleLogsUpdated}
          onHide={() => setSidebarOpen(false)}
        />
      ) : (
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="fixed right-2 top-3 z-10 rounded-md border border-zinc-600 bg-zinc-800 px-2 py-1.5 text-xs font-medium text-zinc-300 shadow hover:bg-zinc-700 hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Show chat"
        >
          Chat →
        </button>
      )}
    </div>
  );
}

