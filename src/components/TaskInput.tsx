import { useState, type FormEvent, type Dispatch, type SetStateAction } from "react";

interface TaskInputProp {
  addTask: (text: string) => void;
  taskInput: string;
  setTaskInput: Dispatch<SetStateAction<string>>;
}

export function TaskInput({ addTask, taskInput, setTaskInput }: TaskInputProp) {
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask(taskInput);
    setTaskInput("");
    setShowForm(false);
  };

  const taskInputBtnStyle: string =
    "text-right p-2 cursor-pointer text-zinc-500 hover:text-zinc-900 mt-4";
  const taskInputFieldStyle: string =
    "bg-zinc-100 text-zinc-700 p-2 outline outline-neutral-400 w-full";

  return (
    <>
      <button onClick={() => setShowForm((prev) => !prev)} className={`${taskInputBtnStyle}`}>
        {showForm ? null : "+ Add Task"}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className={`${taskInputFieldStyle}`}
            autoFocus
          />
        </form>
      )}
    </>
  );
}
