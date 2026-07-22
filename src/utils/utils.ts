import type { DragEvent } from "react";

export const handleDragStart = (e: DragEvent<HTMLDivElement>, taskId: string) => {
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("taskId", taskId);
};

// export const dragEnter = (
//   e: DragEvent<HTMLDivElement>,
//   draggingIdx: number | null
// ) => {
//   e.preventDefault();
//   // If there is no currently dragged item, exit early.
//   if (draggingIdx === null) return;
//   // Finds the closest ancestor element with class task_item from the event target
//   const targetEl = (e.target as HTMLElement | null)?.closest(".task_column");
//   // If no matching task element is found, exit early
//   if (!targetEl) return;
//   if (targetEl.dataset.coltype === 'progress') console.log(targetEl);
//   // console.log('dragging over column ' + targetEl.dataset.coltype);
// }

export const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
  e.preventDefault();
};

export const handleDrop = (
  e: DragEvent<HTMLDivElement>,
  moveTask: (taskId: string, status: string) => void,
  status: string
) => {
  e.preventDefault();
  const taskId = e.dataTransfer.getData("taskId");
  if (!taskId) return;
  moveTask(taskId, status);
};

// export const dragEnd = (e: DragEvent<HTMLDivElement>) => {
//   e.preventDefault();
// }