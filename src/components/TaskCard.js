// COMPONENT: TaskCard
// PURPOSE:  Displays a single task item. Handles UI for
//           one task and sends user actions back up to
//           TaskBoard via callbacks.
// TYPE:     Client Component — needs onClick handlers
'use client';

// Props:
//   id       — unique identifier for the task
//   title    — task text
//   done     — boolean (true = completed)
//   onToggle — callback to toggle completion
//   onDelete — callback to delete task

function TaskCard({ id, title, done, onToggle, onDelete }) {

  return (
    <li className="bg-white shadow-sm rounded-lg p-3 flex justify-between items-center hover:shadow-md transition">

      {/* Clicking text toggles completion */}
      <span
        onClick={() => onToggle(id)}
        className={`cursor-pointer transition ${          // Conditional styling:
          // visually shows completed tasks differently
          done ? "line-through text-gray-400 opacity-60" : "text-gray-700"
        }`}
      >
        {title}
      </span>

      {/* Delete button */}
      <button
        onClick={() => onDelete(id)}
        className="text-red-500"
      >
        Delete
      </button>
    </li>
  );
}

export default TaskCard;