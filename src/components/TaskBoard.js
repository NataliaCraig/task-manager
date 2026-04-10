import AddTaskForm from './AddTaskForm';
// Adds a new task using immutable update
function handleAdd(title) {
  setTasks([
    ...tasks,
    {
      id: crypto.randomUUID(),
      title,
      done: false
    }
  ]);
}
<AddTaskForm onAdd={handleAdd} />