"use client";

import { useState, useEffect } from "react";
import { ReactFlow, Background, Controls, BackgroundVariant } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import mapTreeToFlow, { type GoalNode } from "./TreeToFlow";

async function getGoals(): Promise<GoalNode> {
  const response = await fetch("http://127.0.0.1:8000/api/goals");
  return response.json();
}

type UpdateMode = "base" | "update" | "neither";

type FlowProps = {
  update: UpdateMode;
  onReady?: () => void;
};

export default function App({ update, onReady }: FlowProps) {
  const [goals, setGoals] = useState<GoalNode | null>(null);

  useEffect(() => {
    if (update === "base" || update === "update") {
      getGoals()
        .then((data) => {
          setGoals(data);
          if (update === "base") {
            onReady?.();
          } else {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => onReady?.());
            });
          }
        })
        .catch(() => onReady?.());
    }
  }, [update, onReady]);

  if (!goals) {
    return <div style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af" }}>Loading goals...</div>;
  }

  const { nodes, edges } = mapTreeToFlow(goals);

  return (
    <div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <ReactFlow colorMode="dark" nodes={nodes} edges={edges} fitView>
        <Controls />
        <Background variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </div>
  );
}
