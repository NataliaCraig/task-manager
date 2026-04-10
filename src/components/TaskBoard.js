// COMPONENT: TaskBoard
// PURPOSE: Owns ALL application state. This is the single source of truth.
// All child components receive data via props and send events back up.
// This follows React’s unidirectional data flow (parent → child → parent).
// TYPE: Client Component because it uses state, effects, and browser APIs.

'use client';

import { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';

export default function TaskBoard() {

  // STATE 
// We intentionally start with an EMPTY array so the server
// and client render the SAME initial HTML. This prevents
// hydration errors in Next.js.
const [tasks, setTasks] = useState([]);

  // Filter is separate state because it changes independently
  // from tasks (UI view state vs actual data state)
const [filter, setFilter] = useState('all');

// ── EFFECT: Load tasks from localStorage ───────────
// This runs ONLY after the first render on the client.
// We avoid running this during initial render because
// the server cannot access localStorage, which would
// cause a hydration mismatch error.
useEffect(() => {
  try {
    const saved = localStorage.getItem('tasks');

    if (saved) {
setTasks(saved ? JSON.parse(saved) : []); 
   }

  } catch (error) {
    // If parsing fails, fall back safely
    setTasks([]);
  }
}, []);
  // ── EFFECT: Persist tasks to localStorage ──────────
  // This runs AFTER every render where "tasks" changes.
  // Dependency array [tasks] ensures it only runs when needed.
  // This keeps browser storage in sync with React state.
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // HANDLERS (callbacks passed DOWN to children) 

  function handleAdd(title) {
    // Spread operator creates a NEW array instead of mutating.
    // React relies on new references to detect state changes.
    setTasks([
      ...tasks,
      { id: crypto.randomUUID(), title, done: false }
    ]);
  }

  function handleToggle(id) {
    // .map() returns a NEW array — required for React re-render.
    // Only the matching task is updated (immutability pattern).
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function handleDelete(id) {
    // .filter() removes the selected task by creating a new array
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function handleClearDone() {
    // Removes all completed tasks at once
    // Uses .filter() to keep only tasks that are NOT done
    setTasks(tasks.filter((task) => !task.done));
  }

  // ── DERIVED VALUES (NOT stored in state) ───────────
  // These are recalculated every render from tasks.
  // Storing them separately would risk inconsistent data.
  const total = tasks.length;
  const completed = tasks.filter(t => t.done).length;
  const active = tasks.filter(t => !t.done).length;

  // Determines which tasks to show based on filter state.
  // This is conditional logic, not separate state.
  const filteredTasks =
    filter === 'all'
      ? tasks
      : filter === 'active'
      ? tasks.filter((t) => !t.done)
      : tasks.filter((t) => t.done);

  return (
<div className="min-h-screen bg-gradient-to-b from-[#fdf6ec] to-[#dbeafe] flex justify-center p-8">
  <div className="w-full max-w-xl bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6">
   <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
  🌊 Beach Focus Board
</h1>
<p className="text-center text-sm text-gray-500 mb-4">
  stay productive, stay relaxed
</p>

      {/* Stats automatically update because they are derived from state */}
      <div className="flex gap-4 mb-4 text-sm">
        
        <p>Total: {total}</p>
        <p>Active: {active}</p>
        <p>Completed: {completed}</p>
      </div>

      {/* Filter buttons update the filter state.
          This triggers a re-render and recalculates visible tasks */}
      <div className="flex gap-2 mb-4">
       <button
  onClick={() => setFilter('all')}
  className="px-3 py-1 rounded-full bg-blue-100 hover:bg-blue-200"
>
  All
</button>

<button
  onClick={() => setFilter('active')}
  className="px-3 py-1 rounded-full bg-emerald-100 hover:bg-emerald-200"
>
  Active
</button>

<button
  onClick={() => setFilter('done')}
  className="px-3 py-1 rounded-full bg-sky-100 hover:bg-sky-200"
>
  Done
</button>
      </div>

      {/* Controlled form sends new task title UP to TaskBoard */}
      <AddTaskForm onAdd={handleAdd} />

      {/* Task list receives filtered tasks + action callbacks */}
      <TaskList
        tasks={filteredTasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />

      {/* Clear completed button appears only if there are completed tasks */}
      {completed > 0 && (
        <button
          onClick={handleClearDone}
          className="mt-4 text-sm text-red-500"
        >
          Clear Completed
        </button>
      )}
</div>  
</div>
);
}