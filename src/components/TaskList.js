'use client';

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <p className="text-gray-500 mt-4">No tasks yet.</p>;
  }

  return (
    <ul className="mt-4 space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="border p-2 rounded flex justify-between items-center"
        >
          {/* Click text to toggle done */}
          <span
            onClick={() => onToggle(task.id)}
            className={`cursor-pointer ${
              task.done ? "line-through text-gray-400" : ""
            }`}
          >
            {task.title}
          </span>

          {/* Delete button */}
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-500"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}