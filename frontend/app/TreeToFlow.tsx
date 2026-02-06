"use client";
import { Node, Edge, MarkerType} from '@xyflow/react';

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
  locked: '#9ca3af',
  unlocked: '#3b82f6',
  complete: '#22c55e',
};

const STATUS_TEXT_COLORS: Record<GoalStatus, string> = {
  locked: '#e4e4e7',
  unlocked: '#ffffff',
  complete: '#ffffff',
};

export default function mapTreeToFlow(
  tree: GoalNode,
  options = {
    xSpacing: 300,
    ySpacing: 400,
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
      color: STATUS_TEXT_COLORS[item.status],
      border: '2px solid #374151',
      width: 150,
      height: 150,
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 13,
      fontWeight: 600,
      fontFamily: 'sans-serif',
    },
  }));

  const edges: Edge[] = layoutItems
    .filter((item): item is LayoutItem & { parentId: string } => !!item.parentId)
    .map((item) => ({
      id: `${item.parentId}-${item.id}`,
      source: item.parentId,
      target: item.id,
      type: 'simplebezier',
      style: {  strokeWidth: 4, stroke: '#FF0072'},
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: '#FF0072',
      },
    }));

  return { nodes, edges };
}
