"use client";
import { Node, Edge } from '@xyflow/react';

export type GoalStatus = 'locked' | 'unlocked' | 'complete';

export type GoalNode = {
  goal: string;
  status: GoalStatus;
  subgoals?: GoalNode[];
};

type LayoutItem = {
  id: string;
  goal: string;
  status: GoalStatus;
  depth: number;
  leftSlot: number;
  rightSlot: number;
  parentId?: string;
};

const STATUS_COLORS: Record<GoalStatus, string> = {
  locked: '#6b7280',
  unlocked: '#2563eb',
  complete: '#16a34a',
};

export default function mapTreeToFlow(
  tree: GoalNode,
  options = {
    xSpacing: 300,
    ySpacing: 220,
  }
): { nodes: Node[]; edges: Edge[] } {
  const layoutItems: LayoutItem[] = [];
  let idCounter = 1;
  let nextSlot = 0;

  function assignSlots(
    node: GoalNode,
    depth: number,
    parentId?: string
  ): { leftSlot: number; rightSlot: number } {
    const id = `n${idCounter++}`;
    const children = node.subgoals ?? [];

    if (children.length === 0) {
      const slot = nextSlot++;
      layoutItems.push({
        id,
        goal: node.goal,
        status: node.status,
        depth,
        leftSlot: slot,
        rightSlot: slot,
        parentId,
      });
      return { leftSlot: slot, rightSlot: slot };
    }

    const childRanges = children.map((child) =>
      assignSlots(child, depth + 1, id)
    );
    const leftSlot = childRanges[0].leftSlot;
    const rightSlot = childRanges[childRanges.length - 1].rightSlot;

    layoutItems.push({
      id,
      goal: node.goal,
      status: node.status,
      depth,
      leftSlot,
      rightSlot,
      parentId,
    });

    return { leftSlot, rightSlot };
  }

  assignSlots(tree, 0);

  const nodes: Node[] = layoutItems.map((item) => ({
    id: item.id,
    position: {
      x: ((item.leftSlot + item.rightSlot) / 2) * options.xSpacing,
      y: item.depth * options.ySpacing,
    },
    data: { label: item.goal },
    type: item.parentId === undefined ? 'input' : undefined,
    style: {
      backgroundColor: STATUS_COLORS[item.status],
      color: '#ffffff',
      border: '4px solid #1f2937',
      width: 150,
      height: 150,
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 13,
      fontWeight: 600,
    },
  }));

  const edges: Edge[] = layoutItems
    .filter((item): item is LayoutItem & { parentId: string } => !!item.parentId)
    .map((item) => ({
      id: `${item.parentId}-${item.id}`,
      source: item.parentId,
      target: item.id,
      type: 'bezier',
      style: { stroke: '#ffffff', strokeWidth: 1 },
    }));

  return { nodes, edges };
}
