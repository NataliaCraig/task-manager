// COMPONENT: TaskList
// PURPOSE:  Displays a list of tasks passed down from
//           TaskBoard. Delegates rendering of each task
//           to TaskCard for better component separation.
// TYPE:     Client Component — needs onClick handlers
'use client';

import TaskCard from './TaskCard';

// Props:
//   tasks     — array of task objects to display
//   onToggle  — callback from TaskBoard to toggle a task
//   onDelete  — callback from TaskBoard to delete a task
export default function TaskList({ tasks, onToggle, onDelete }) {

  // Conditional rendering:
  // If there are no tasks, show a message instead of an empty list.
  if (tasks.length === 0) {
    return <p className="text-gray-500 mt-4">No tasks yet.</p>;
  }

  return (
<ul className="mt-6 space-y-3">      
      {/* Instead of rendering each task directly here,
          we delegate to TaskCard. This improves code
          organization and reusability. */}
      {tasks.map((task) => (
        <TaskCard
          key={task.id} // React uses key to track list changes efficiently
          id={task.id}
          title={task.title}
          done={task.done}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}