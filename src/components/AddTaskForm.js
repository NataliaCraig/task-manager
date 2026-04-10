// ══════════════════════════════════════════════════════
// COMPONENT: AddTaskForm
// PURPOSE:  Lets the user type and submit a new task.
//           Does NOT store tasks — sends data up to TaskBoard.
// TYPE:     Client Component (uses state for input)
// ══════════════════════════════════════════════════════

'use client';

import { useState } from 'react';

export default function AddTaskForm({ onAdd }) {

  // Local state stores what the user is typing.
  // This does NOT need to be in TaskBoard because
  // no other component cares about the input value.
  const [title, setTitle] = useState('');

  function handleSubmit(e) {
    // Prevents page refresh (default form behavior)
    e.preventDefault();

    // Prevent blank tasks
    if (!title.trim()) return;

    // Send data UP to TaskBoard
    onAdd(title.trim());

    // Reset input after submission
    setTitle('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      {/* Controlled input: value always matches state */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a task..."
        className="flex-1 border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 rounded"
      >
        Add
      </button>
    </form>
  );
}