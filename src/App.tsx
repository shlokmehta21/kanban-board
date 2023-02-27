import { useState } from "react";
import "./App.css";
import { Columns } from "./components/columns/Columns";
import { rowData } from "./dataSoruce";
import { Task } from "./models/task";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import DashboardIcon from "@mui/icons-material/Dashboard";

const App: React.FC = () => {
  const [todo, setTodo] = useState<Task[]>(rowData);
  const [inProgress, setInProgress] = useState<Task[]>([]);
  const [completed, setCompleted] = useState<Task[]>([]);

  const OnDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    console.log(result);

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      active = todo,
      progress = inProgress,
      complete = completed;

    if (source.droppableId === "Todo") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else if (source.droppableId === "InProgress") {
      add = progress[source.index];
      progress.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "Todo") {
      active.splice(destination.index, 0, add);
    } else if (destination.droppableId === "InProgress") {
      progress.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setTodo(active);
    setInProgress(progress);
    setCompleted(complete);
  };

  return (
    <DragDropContext onDragEnd={OnDragEnd}>
      <div className="App">
        <h1 className="title">
          <DashboardIcon fontSize="large" /> Kanban Board
        </h1>
        <Columns todo={todo} inProgress={inProgress} completed={completed} />
      </div>
    </DragDropContext>
  );
};

export default App;
