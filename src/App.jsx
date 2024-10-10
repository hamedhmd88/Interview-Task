import React, { useState } from "react";
import TaskForm from "./Task/TaskForm";
import TaskList from "./Task/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Function to add a new task to the list
  const addTask = (text, deadline) => {
    const creationDate = new Date().toISOString().slice(0, 10); // Set the creation date to today's date
    setTasks([
      ...tasks,
      { id: Date.now().toString(), text, creationDate, deadline }, // Add new task to the task list
    ]);
  };

  // Function to delete a task from the list based on its id
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id)); // Remove the task with the specified id
  };

  // Function to edit a task's text and deadline
  const editTask = (id, updatedText, updatedDeadline) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, text: updatedText, deadline: updatedDeadline } // Update task if ids match
          : task
      )
    );
  };

  return (
    <div className={`App ${isModalOpen ? "bg-slate-900 h-full w-full" : ""}`}>
      {/* Header section */}
      <h2 className="text-5xl text-gray-800 font-bold text-center py-5 text-shadow">
        Task Board
      </h2>

      {/* Button to open the modal for adding a new task */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => {
            setIsModalOpen(true); // Open the modal
            setEditingTask(null); // Reset editing task
          }}
          className="bg-blue-500 text-white px-5 py-2 rounded-lg text-lg hover:bg-white hover:text-blue-500 transition"
        >
          Add +
        </button>
      </div>

      {/* Render the TaskForm component if the modal is open */}
      {isModalOpen && (
        <TaskForm
          addTask={addTask}
          editTask={editTask}
          closeModal={() => setIsModalOpen(false)} // Function to close the modal
          editingTask={editingTask} // Pass the task being edited to the form
        />
      )}

      {/* Render the TaskList component */}
      <TaskList tasks={tasks} setTasks={setTasks} deleteTask={deleteTask} editTask={editTask} />
    </div>
  );
}

export default App;
