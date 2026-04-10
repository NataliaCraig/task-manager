
// COMPONENT: AddTaskForm
// PURPOSE:  Controlled form that allows the user to type
//           and submit a new task. It does NOT store tasks
//           itself — it sends data UP to TaskBoard.
// TYPE:     Client Component — uses useState for input
// PATTERN:  Controlled Component (input value tied to state)
'use client';

import { useState } from 'react';

// Props:
//   onAdd — callback function passed from TaskBoard.
//           This allows this component to send the new
//           task title upward (lifting state up pattern).
export default function AddTaskForm({ onAdd }) {

  // Local state tracks what the user is typing.
  // This state is kept here (not in TaskBoard) because
  // no other component needs access to the input value.
  const [title, setTitle] = useState('');

  function handleSubmit(e) {
    // Prevents the default browser behavior of reloading
    // the page when a form is submitted.
    e.preventDefault();

    // .trim() removes whitespace so blank inputs like "   "
    // are not accepted as valid tasks.
    if (!title.trim()) return;

    // Send the cleaned task title UP to TaskBoard.
    // TaskBoard owns the tasks array, so it must handle adding.
    onAdd(title.trim());

    // Reset input field after submission so user can type again.
    setTitle('');
  }

  return (
    // onSubmit handles BOTH button click and Enter key press,
    // making the form more accessible than using onClick alone.
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      
      {/* Controlled input:
          value is always synced with state (title).
          onChange updates state on every keystroke. */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a task..."
className="flex-1 border border-blue-100 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"      />

      {/* Button triggers form submission */}
      <button
        type="submit"
className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-lg"      >
        Add
      </button>
    </form>
  );
}