'use client';

import { useState } from 'react';

// Handles task state and UI logic
export default function TaskBoard() {
  const [tasks, setTasks] = useState([]); // stores all tasks

  return (
    <div>
      <h1>Task Manager</h1>
    </div>
  );
}