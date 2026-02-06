"use client";

import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import mapTreeToFlow, { type GoalNode } from './TreeToFlow';

const data = {
        "name": "Eve",
        "children": [
          {
            "name": "Cain",
            "children": [
              {
                "name": "Enoch",
                "children": [
                  {"name": "Irad"},
                  {"name": "Mehujael"}
                ]
              }
            ]
          },
          {
            "name": "Seth",
            "children": [
              {
                "name": "Enos",
                "children": [
                  {"name": "Kenan"},
                  {"name": "Mahalalel"}
                ]
              },
              {"name": "Noam"}
            ]
          },
          {"name": "Abel"},
          {
            "name": "Awan",
            "children": [
              {
                "name": "Enoch",
                "children": [
                  {"name": "Irad"},
                  {
                    "name": "Mehujael",
                    "children": [
                      {"name": "Methushael"},
                      {"name": "Lamech"}
                    ]
                  }
                ]
              }
            ]
          },
        {"name": "Azura"}
    ]
}

const dataTwo: GoalNode = {
    goal: "Lose Weight",
    status: "unlocked",
    subgoals: [
      {
        goal: "Diet",
        status: "complete",
        subgoals: [
          { goal: "Track Calories", status: "complete" },
          { goal: "Eat More Protein", status: "complete" },
          { goal: "Reduce Sugar", status: "unlocked" },
        ],
      },
      {
        goal: "Cardio",
        status: "unlocked",
        subgoals: [
          { goal: "Run 3x/Week", status: "unlocked" },
          { goal: "Cycling 2x/Week", status: "locked" },
        ],
      },
      {
        goal: "Weight-Lifting",
        status: "locked",
        subgoals: [
          { goal: "Upper Body", status: "locked" },
          { goal: "Lower Body", status: "locked" },
          { goal: "Core", status: "locked" },
        ],
      },
    ],
  };
  
      

export default function App() {
    const { nodes, edges } = mapTreeToFlow(dataTwo);
    return (
      <div style={{ height: '100%', width: '100%', display: "flex", justifyContent: "center", alignItems: "center" }}>
        <ReactFlow colorMode="dark" nodes={nodes} edges={edges} fitView> <Controls> </Controls><Background/>
        </ReactFlow>
      </div>
    );
  }
