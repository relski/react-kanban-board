import { useState, type DragEvent, type SetStateAction, type Dispatch } from "react";
import { TaskInput } from "./TaskInput";
import type { Task } from "./TaskBoard";

interface TaskColumnProp {
  title: string;
  status: string;
  taskList: Task[];
  addTask: (text: string) => void;
  moveTask: (taskId: string, status: string) => void;
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

export function TaskColumn({ title, status, taskList, addTask, moveTask, setTasks }: TaskColumnProp ) {
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editInput, setEditInput] = useState("");
  const [taskInput, setTaskInput] = useState("");

  const taskItemStyles: string =
    "flex justify-between bg-zinc-200 text-zinc-600 p-3 border-t-indigo-300 border-t-2 my-1 drop-shadow-zinc-400 drop-shadow-xs";

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    if (!taskId) return;
    moveTask(taskId, status);
    setDraggingIdx(null);
    setEditingTaskId(null);
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  }

  const editTask = (taskId: string, text: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, text } : task
    ));
    setEditingTaskId(null);
    setEditInput("");
  }

  return (
    <div
      className="task_column flex flex-col p-4 bg-zinc-100 min-w-2 shadow"
      data-coltype={status}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="flex justify-between">
        <h2 className="block mb-2">{title}</h2>
        <h2 className="block mb-2">{taskList.length}</h2>
      </div>
      {taskList.length > 0 ? (
        taskList.map((item, idx) => (
          <div
            className={`task_item
            ${taskItemStyles}
            ${draggingIdx === idx ? "dragging" : ""}
            `}
            key={item.id}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("taskId", item.id);
              setDraggingIdx(idx);
            }}
            onDragEnd={() => {
              setDraggingIdx(null);
              setEditingTaskId(null);
            }}
            onClick={() => {
              setEditingTaskId(item.id);
              setEditInput(item.text);
            }}
          >
            {editingTaskId === item.id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  editTask(item.id, editInput);
                }}
                className="flex-1"
              >
                <input
                  type="text"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                  autoFocus
                  className="w-full"
                />
              </form>
            ) : (
              <span className="flex-1">{item.text}</span>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteTask(item.id);
              }}
              className="text-zinc-300 hover:text-red-600 hover:cursor-pointer ml-2"
            >
              [X]
            </button>
          </div>
        ))
      ) : (
        <i className="text-zinc-400">You have no tasks available</i>
      )}
      {status === "todo" ? (
        <TaskInput addTask={addTask} taskInput={taskInput} setTaskInput={setTaskInput} />
      ) : null}
    </div>
  );
}
