'use client';

import { useState } from 'react';

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);

  return (
    <div>
      <h1>Task Manager</h1>
    </div>
  );
}