import { useState, type DragEvent, type SetStateAction, type Dispatch } from "react";
import { TaskInput } from "./TaskInput";
import type { Task } from "./TaskBoard.js";

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
  const [overIdx, setOverIdx] = useState<number | null>(null);
  const [isEditingTask, setIsEditingTask] = useState<boolean>(false);

  const taskItemStyles: string =
    "flex justify-between bg-zinc-200 text-zinc-600 p-3 border-t-indigo-300 border-t-2 my-1 drop-shadow-zinc-400 drop-shadow-xs";

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    if (!taskId) return;
    moveTask(taskId, status);
    setDraggingIdx(null);
    setOverIdx(null);
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  }

  const editTask = (taskId: string, text: string) => {
    const currentText = text;
    setTasks(prev => prev.map(task => task.id === taskId ? {...task, text: currentText}: task));
    setIsEditingTask((prev) => !prev);
  }

  const showEditInput = () => {
    setIsEditingTask((prev) => !prev);
  }

  return (
    <>
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
              ${overIdx === idx ? "over" : ""}
              `}
              key={item.id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("taskId", item.id);
                setDraggingIdx(idx);
              }}
              onDragEnd={() => {
                setDraggingIdx(null);
                setOverIdx(null);
              }}
              onClick={() => showEditInput()}
            >
              {isEditingTask ? 
                <input
                  type="text"
                  value={item.text}
                  onChange={() => editTask(item.text, item.id)}
                  autoFocus
                />
               : item.text}
              {/* Add edit icon here upon hover
                  Once clicked, change element to input field
                  Take current text as input value
                  New text will replace this tasks text
                  Update state array again? */}
              <button 
                onClick={() => deleteTask(item.id)}
                className="text-zinc-300 hover:text-red-600 hover:cursor-pointer"
              >[X]</button>
            </div>
          ))
        ) : (
          <i className="text-zinc-400">You have no tasks available</i>
        )}
        {status === "todo" ? (
          <TaskInput addTask={addTask} />
        ) : null}
      </div>
    </>
  );
}
