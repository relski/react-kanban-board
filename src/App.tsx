import { TaskBoard } from "./components/TaskBoard";

function App() {
  return (
    <>
      <div className="kanban-board">
        <div className="flex justify-between items-center gap-8 my-4">
          <h1>Kanban Board</h1>
        </div>
        <TaskBoard />
      </div>
    </>
  );
}

export default App;
