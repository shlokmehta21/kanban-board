import React from "react";
import "./Columns.css";
import { Task } from "../../models/task";
import { TaskCard } from "../taskcard/TaskCard";
import { Droppable } from "react-beautiful-dnd";
import Chip from "@mui/material/Chip";

interface Props {
  todo: Task[];
  inProgress: Task[];
  completed: Task[];
}

export const Columns: React.FC<Props> = ({ todo, inProgress, completed }) => {
  return (
    <div className="container">
      <Droppable droppableId="Todo">
        {(provided, snapshot) => (
          <div
            className={`todo ${snapshot.isDraggingOver ? "dragActive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className="columnTitle">
              <Chip label="TODO" color="info" />
            </div>
            {todo.map((todo, index) => (
              <TaskCard key={todo.id} task={todo} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="InProgress">
        {(provided, snapshot) => (
          <div
            className={`inProgress ${
              snapshot.isDraggingOver ? "dragActive" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className="columnTitle">
              <Chip label="IN PROGRESS" color="warning" />
            </div>
            {inProgress.map((progress, index) => (
              <TaskCard key={progress.id} task={progress} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="Completed">
        {(provided, snapshot) => (
          <div
            className={`completed ${
              snapshot.isDraggingOver ? "dragActive" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className="columnTitle">
              <Chip label="COMPLETED" color="success" />
            </div>
            {completed.map((complete, index) => (
              <TaskCard key={complete.id} task={complete} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
