// COMPONENT: TaskBoard
// PURPOSE:  The "Source of Truth" for the beach task app. 
//      Manages task array, persistence, and filtering.
// TYPE:     Client Component

'use client';

import { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';
import TaskStats from './TaskStats';

export default function TaskBoard() {
  // STATE: Using the Lazy Initializer to prevent hydration errors
  const [tasks, setTasks] = useState(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState('all');

  // EFFECT: Keep localStorage in sync with React state
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // HANDLERS
  function handleAdd(title) {
    setTasks([...tasks, { id: crypto.randomUUID(), title, done: false }]);
  }

  function handleToggle(id) {
    setTasks(tasks.map((t) => t.id === id ? { ...t, done: !t.done } : t));
  }

  function handleDelete(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function handleClearDone() {
    setTasks(tasks.filter((t) => !t.done));
  }

  // DERIVED VALUES
  const total = tasks.length;
  const completed = tasks.filter(t => t.done).length;
  const active = tasks.filter(t => !t.done).length;

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.done;
    if (filter === 'done') return t.done;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-blue-200 flex justify-center p-4 sm:p-8">
      <div className="w-full max-w-xl bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-white p-6 h-fit">
        
        {/* Header Block */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cyan-600 mb-2">🌊 Beach Focus Board</h1>
          <p className="text-sm text-gray-500 italic uppercase tracking-widest">stay productive, stay relaxed</p>
        </div>

        {/* Stats Row */}
        <div className="flex justify-between items-center mb-6 bg-cyan-50/50 p-4 rounded-2xl border border-cyan-100">
          <div className="text-center">
            <p className="text-[10px] font-black text-cyan-800 uppercase">Total</p>
            <p className="text-xl font-bold text-slate-700">{total}</p>
          </div>
          <div className="text-center border-x border-cyan-100 px-6">
            <p className="text-[10px] font-black text-cyan-800 uppercase">Active</p>
            <p className="text-xl font-bold text-slate-700">{active}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-black text-cyan-800 uppercase">Done</p>
            <p className="text-xl font-bold text-slate-700">{completed}</p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6">
          {['all', 'active', 'done'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === f 
                ? 'bg-cyan-500 text-white shadow-md' 
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Action Components */}
        <AddTaskForm onAdd={handleAdd} />

        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />

        {completed > 0 && (
          <button
            onClick={handleClearDone}
            className="w-full mt-6 py-2 text-xs font-bold text-orange-400 hover:text-red-500 transition-colors bg-orange-50 rounded-xl"
          >
            CLEAR COMPLETED TASKS
          </button>
        )}
      </div>
    </div>
  );
}