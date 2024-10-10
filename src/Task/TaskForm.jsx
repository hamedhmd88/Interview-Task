import React, { useState, useEffect } from "react";

const TaskForm = ({ addTask, editTask, closeModal, editingTask }) => {
  const [taskText, setTaskText] = useState("");
  const [deadline, setDeadline] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [error, setError] = useState("");
  const [textError, setTextError] = useState("");
  const [animationClass, setAnimationClass] = useState("modal-enter"); // Initial animation class

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10); // Automatically set today's date
    if (editingTask) {
      setTaskText(editingTask.text);
      setDeadline(editingTask.deadline);
      setCreationDate(editingTask.creationDate); // Use the existing creation date for editing
    } else {
      setCreationDate(today); // Set creation date to today's date when adding a new task
    }
  }, [editingTask]);

  // Function to capitalize the first letter of each word
  const capitalizeFirstLetter = (text) => {
    return text.replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  const handleTextChange = (e) => {
    const capitalizedText = capitalizeFirstLetter(e.target.value);
    setTaskText(capitalizedText);
  };

  const handleCloseModal = () => {
    setAnimationClass("modal-exit"); // Set the exit animation class
    setTimeout(() => {
      closeModal(); // Close the modal after the animation ends
    }, 300); // Duration of the exit animation in milliseconds
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setTextError("");

    // Error handling logic
    if (!taskText || !deadline) {
      setError("Both task text and deadline are required.");
      return;
    }

    // Check if the task text exceeds 25 characters
  if (taskText.length > 25) {
    setTextError("Task text must be less than 25 characters.");
    return;
  }

    // If editing an existing task or adding a new one
    if (taskText.trim() && deadline) {
        addTask(taskText, deadline)
    }

    // Clear the form and close the modal after submission
    setTaskText("");
    setDeadline("");
    handleCloseModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 w-full">
      {/* Overlay to close the modal when clicked */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={handleCloseModal}
      ></div>
      <div
        className={`bg-white rounded-lg shadow-lg p-5 z-10 relative w-1/3 ${animationClass}`}
      >
        {/* Close button for the modal */}
        <button
          className="absolute top-2 right-2 text-red-700 font-bold"
          onClick={handleCloseModal}
        >
          ✖
        </button>
        <h3 className="text-lg font-bold mb-4 text-center">
          {editingTask ? "Edit Task" : "Add a New Task"}
        </h3>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {textError && <p className="text-red-500 text-center mb-4">{textError}</p>}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full"
        >
          <label htmlFor="taskText" className="w-full text-left mb-1">
            Task Text:
          </label>
          <input
            id="taskText"
            type="text"
            placeholder="Enter task text..."
            value={taskText}
            onChange={handleTextChange}
            className={`border p-4 mb-4 w-full ${
              error ? "border-red-600" : ""
            }`}
          />

          <label htmlFor="creationDate" className="w-full text-left mb-1">
            Creation Date:
          </label>
          <input
            id="creationDate"
            type="date"
            value={creationDate}
            readOnly
            className="border p-4 mb-4 w-full bg-gray-200 cursor-not-allowed"
          />

          <label htmlFor="deadline" className="w-full text-left mb-1">
            Deadline:
          </label>
          <input
            id="deadline"
            type="date"
            value={deadline}
            min={creationDate}
            onChange={(e) => setDeadline(e.target.value)}
            className={`border p-4 mb-4 w-full ${
              error ? "border-red-600" : ""
            }`}
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded text-xl hover:bg-slate-300 hover:text-blue-500 transition"
          >
            {editingTask ? "Save Changes" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
