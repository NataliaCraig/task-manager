// COMPONENT: TaskList
// PURPOSE:  Maps through the filtered tasks array and renders a TaskCard for each. It acts as a bridge between the 'brain' (Board) and the 'UI' (Card).
// TYPE:     Client Component
// PROPS:    tasks (array), onToggle (func), onDelete (func)
'use client';

import TaskCard from './TaskCard';

export default function TaskList({ tasks, onToggle, onDelete }) {

  // CONDITIONAL RENDER: If the array is empty, we show a feedback message. This prevents a confusing blank screen for the user when no tasks match the filter.
  if (tasks.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-400 italic">No tasks found in this view...</p>
      </div>
    );
  }

  return (
    <ul className="mt-6 space-y-3">      
      {tasks.map((task) => (
        /* KEY PROP: Use task.id so React can identify 
           each element. This allows React to optimize the 
           reconciliation process and only re-render the specific 
           item that changed, instead of the whole list. 
        */
        <TaskCard
          key={task.id} 
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