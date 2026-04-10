// COMPONENT: TaskCard
// PURPOSE:  Displays an individual task item. It acts as a 
//           'presentational' component that bubbles user 
//           actions back up to the main TaskBoard state.
// TYPE:     Client Component ('use client')
// PROPS:    id (string), title (string), done (boolean), 
//           onToggle (func), onDelete (func)
'use client';

export default function TaskCard({ id, title, done, onToggle, onDelete }) {

  // CONDITIONAL RENDER: We use a ternary operator to apply 
  // styling dynamically. This is better than manual DOM 
  // manipulation because React handles the class update 
  // when the 'done' prop changes state.
  const textStyle = done 
    ? "line-through text-gray-400 opacity-60" 
    : "text-gray-700 font-medium";

  return (
    <li className="bg-white shadow-sm rounded-lg p-3 flex justify-between items-center hover:shadow-md transition">
      
      {/* CALLBACK PROP: onToggle is owned by TaskBoard. We call it 
          here with the specific 'id' so the parent knows EXACTLY 
          which object in the array needs to be flipped. 
      */}
      <span
        onClick={() => onToggle(id)}
        className={`cursor-pointer transition ${textStyle}`}
      >
        {title}
      </span>

      <button
        onClick={() => onDelete(id)}
        className="text-red-400 hover:text-red-600 font-bold text-xs uppercase tracking-tight"
      >
        Delete
      </button>
    </li>
  );
}