'use client';

import { useState } from 'react';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';

export default function TaskBoard() {

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  function handleAdd(title) {
    setTasks([
      ...tasks,
      { id: crypto.randomUUID(), title, done: false }
    ]);
  }

  function handleToggle(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function handleDelete(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  
  const total = tasks.length;
  const completed = tasks.filter(t => t.done).length;
  const active = tasks.filter(t => !t.done).length;

  const filteredTasks =
    filter === 'all'
      ? tasks
      : filter === 'active'
      ? tasks.filter((t) => !t.done)
      : tasks.filter((t) => t.done);

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      <div className="flex gap-4 mb-4 text-sm">
        <p>Total: {total}</p>
        <p>Active: {active}</p>
        <p>Completed: {completed}</p>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('done')}>Done</button>
      </div>

      <AddTaskForm onAdd={handleAdd} />

      <TaskList
        tasks={filteredTasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  );
}