import React, { useState } from "react";
import { FaTrash, FaPen, FaSave } from "react-icons/fa";

const TaskItem = ({
  task,
  index, // Receive the index of the item
  deleteTask,
  editTask,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const [editedDeadline, setEditedDeadline] = useState(task.deadline);
  const [isDragging, setIsDragging] = useState(false);

  // Calculate the number of days remaining until the deadline
  const today = new Date().toISOString().slice(0, 10);
  const daysRemaining = Math.ceil(
    (new Date(task.deadline) - new Date(today)) / (1000 * 60 * 60 * 24)
  );
  // Check if the deadline has passed
  const isDeadlinePassed = daysRemaining <= 0;

  return (
    <div
      className={` relative task-item p-4 rounded-lg shadow-md flex flex-col justify-between ${
        isDeadlinePassed ? "card-2" : "card-1"
      } ${isDragging ? "dragging" : ""}`} // Dynamically add the "dragging" class when dragging
      draggable
      onDragStart={(e) => {
        setIsDragging(true); // Set the dragging state to true when dragging starts
        onDragStart(index); // Trigger the drag start event with the item's index
      }}
      onDragEnd={() => setIsDragging(false)} // Remove the "dragging" class when dragging ends
      onDragOver={onDragOver} // Allow the item to be dragged over
      onDrop={() => {
        setIsDragging(false); // Remove the "dragging" class when the item is dropped
        onDrop(index); // Trigger the drop event with the item's index
      }}
      style={{ cursor: "move" }} // Change the cursor style to indicate the item can be moved
    >
      <div className="flex flex-col gap-2">
        {isEditing ? (
          <>
            {/* Input fields for editing the task text and deadline */}
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="date"
              value={editedDeadline}
              min={task.creationDate}
              onChange={(e) => setEditedDeadline(e.target.value)}
              className="border p-2 mb-2 w-full"
            />
          </>
        ) : (
          <>
            {/* Display the task text and details if not in edit mode */}
            <p
              className={`font-semibold text-2xl ${
                isDeadlinePassed ? "line-through" : ""
              }`}
            >
              {task.text}
            </p>
            <p className="text-sm">Created: {task.creationDate}</p>
            <p className="text-sm">Deadline: {task.deadline}</p>
            {isDeadlinePassed ? (
              <p className="text-gray-800 font-semibold">
                The deadline has passed!
              </p>
            ) : (
              <p className="text-teal-600 text-center text-xs mt-4 font-semibold">
                {daysRemaining} days left until the deadline.
              </p>
            )}
          </>
        )}
      </div>
      <div className="flex items-center justify-end mt-2 gap-3">
        {isEditing ? (
          <button
            onClick={() => {
              editTask(task.id, editedText, editedDeadline); // Save the changes to the task
              setIsEditing(false); // Exit the edit mode
            }}
            className="text-green-500"
          >
            <FaSave />
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="text-blue-500">
            <FaPen />
          </button>
        )}
        <button onClick={() => deleteTask(task.id)} className={`${isDeadlinePassed ? "text-white" : "text-red-500"}`}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
