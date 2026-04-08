import TaskBoard from '@/components/TaskBoard';

// Main page wrapper
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <TaskBoard />
    </main>
  );
}