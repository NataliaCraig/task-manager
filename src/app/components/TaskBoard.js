'use client';

import { useState } from 'react';

// TaskBoard component handles task creation and display
export default function TaskBoard() {
  // stores all tasks in an array
  const [tasks, setTasks] = useState([]);

  // stores current input value
  const [input, setInput] = useState('');

  // adds a new task to the list
  function addTask() {
    // prevents empty tasks from being added
    if (input.trim() === '') return;

    // updates task list with new task
    setTasks([...tasks, input]);

    // clears input field after adding
    setInput('');
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      {/* input and button section */}
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task..."
        />

        <button
          className="bg-blue-500 text-white px-4 rounded"
          onClick={addTask}
        >
          Add
        </button>
      </div>

      {/* renders list of tasks */}
      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <li key={index} className="border p-2 rounded">
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
}