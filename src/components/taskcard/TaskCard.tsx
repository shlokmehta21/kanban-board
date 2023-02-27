import React from "react";
import { Task } from "../../models/task";
import "./TaskCard.css";
import { Draggable } from "react-beautiful-dnd";
import personImg from "../../assets/person.png";

interface Props {
  task: Task;
  index: number;
}

export const TaskCard: React.FC<Props> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          className={`containerCard ${snapshot.isDragging ? "drag" : ""}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="top">
            <p className="taskTitle">{task.text}</p>
          </div>
          <div className="bottom">
            <p className="taskID">{task.taskID}</p>
            <img className="taskImg" src={personImg} alt="personImg" />
          </div>
        </div>
      )}
    </Draggable>
  );
};
