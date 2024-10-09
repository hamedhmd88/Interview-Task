import React, { useState } from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, deleteTask, editTask, setTasks }) => {
  const [draggedIndex, setDraggedIndex] = useState(null);

  // Function to handle when a drag event starts
  const handleDragStart = (index) => {
    setDraggedIndex(index); // Store the index of the item being dragged
  };

  // Function to handle the drag over event
  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default behavior to allow drop
  };

  // Function to handle when the item is dropped
  const handleDrop = (index) => {
    if (draggedIndex === null || draggedIndex === index) return; // Prevent dropping on itself

    // Create a copy of the tasks array to work with
    const updatedTasks = [...tasks];
    const [draggedItem] = updatedTasks.splice(draggedIndex, 1); // Remove the dragged item from its original position
    updatedTasks.splice(index, 0, draggedItem); // Insert the dragged item at the new position

    setTasks(updatedTasks); // Update the state with the new task order
    setDraggedIndex(null); // Reset the dragged index state
  };

  return (
    <div className="task-list grid grid-cols-3 gap-4 p-4">
      {/* Render each task using the TaskItem component */}
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          index={index}
          onDragStart={() => handleDragStart(index)} // Pass the drag start event to the item
          onDragOver={handleDragOver} // Allow the item to be dragged over
          onDrop={() => handleDrop(index)} // Handle the drop event when an item is released
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
