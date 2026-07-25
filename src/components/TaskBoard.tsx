// import { useState } from "react";
import { TaskColumn } from "./TaskColumn";
import useLocalStorage from "../utils/useLocalStorage";

export interface Task {
  id: string;
  text: string;
  status: string;
}

export function TaskBoard() {
  const [tasks, setTasks] = useLocalStorage('taskListStorage',[]);

  const taskColumns = [
    {id: 1, title: "To-do", status: "todo"},
    {id: 2, title: "In-progess", status: "progress"},
    {id: 3, title: "Done", status: "done"},
  ];

  const moveTask = (taskId: string, status: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, status } : task))
    );
  };

  const addTask = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      text: trimmed,
      status: "todo",
    };

    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <>
      <div className="p-4 my-2 grid grid-cols-1 md:grid-cols-3 justify-evenly gap-4">
        {taskColumns.map((column) => {
          return <TaskColumn 
            key={column.id}
            title={column.title}
            status={column.status}
            taskList={tasks.filter((task) => task.status === column.status)}
            addTask={addTask}
            moveTask={moveTask}
            setTasks={setTasks}
          />
        })}
      </div>
    </>
  );
}
