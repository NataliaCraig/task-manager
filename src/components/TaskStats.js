// COMPONENT: TaskStats
// PURPOSE:  Displays the dashboard metrics (total, active, done) and provides the global 'Clear' action.
// TYPE: Client Component
// PROPS: total (num), active (num), completed (num), onClear (func)
'use client';

export default function TaskStats({ total, active, completed, onClear }) {
  
  // DERIVED LOGIC: Check completed > 0 here to determine if the clear button should even exist. This is a conditional render that keeps the UI clean.
  const hasCompleted = completed > 0;

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="flex justify-between items-center bg-cyan-50/50 p-4 rounded-2xl border border-cyan-100">
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

      {/* CONDITIONAL RENDER: The Clear button only shows if there 
          is actually something to clear. This prevents unnecessary 
          user interaction. 
      */}
      {hasCompleted && (
        <button
          onClick={onClear}
          className="w-full py-2 text-xs font-bold text-orange-400 hover:text-red-500 transition-colors bg-orange-50 rounded-xl"
        >
          CLEAR COMPLETED TASKS
        </button>
      )}
    </div>
  );
}