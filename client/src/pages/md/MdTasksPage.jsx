import { useState } from 'react';
import { useDemo } from '../../demo/DemoContext.jsx';
import { PRIORITY_TONE, TASK_STATUS_LABELS } from '../../demo/labels.js';
import Button from '../../components/ui/Button.jsx';
import StatusBadge from '../../components/ui/StatusBadge.jsx';
import Field, { inputClass } from '../../components/ui/Field.jsx';

const PRIORITIES = ['High', 'Medium', 'Low'];

export default function MdTasksPage() {
  const { data, addTask } = useDemo();
  const today = new Date().toISOString().slice(0, 10);

  const [form, setForm] = useState({
    projectId: data.projects[0]?.id || '',
    title: '',
    assignedTo: '',
    priority: 'Medium',
    weight: 20,
    startDate: today,
    deadline: '',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const engineers = data.users.filter(
    (user) => user.role === 'site_engineer' && user.projectId === form.projectId
  );
  const setField = (field) => (event) => setForm({ ...form, [field]: event.target.value });

  function submit() {
    setMessage('');
    if (!form.title.trim()) return setError('Please enter the task name.');
    if (!form.deadline) return setError('Please choose a deadline.');
    if (form.deadline < form.startDate) return setError('Deadline cannot be before the start date.');
    if (Number(form.weight) < 1 || Number(form.weight) > 100) return setError('Weight must be between 1 and 100.');

    addTask({
      projectId: form.projectId,
      title: form.title.trim(),
      assignedTo: form.assignedTo || null,
      priority: form.priority,
      weight: Number(form.weight),
      startDate: form.startDate,
      deadline: form.deadline,
      status: form.assignedTo ? 'assigned' : 'pending',
    });
    setError('');
    setMessage('Task created.');
    setForm({ ...form, title: '', assignedTo: '', deadline: '' });
  }

  const nameOf = (list, id) => list.find((item) => item.id === id)?.name || 'Not assigned';

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4 rounded-2xl bg-white p-5 shadow">
        <h2 className="text-2xl font-bold">Create Task</h2>

        <Field label="Project">
          <select
            className={inputClass}
            value={form.projectId}
            onChange={(event) => setForm({ ...form, projectId: event.target.value, assignedTo: '' })}
          >
            {data.projects.map((project) => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
        </Field>

        <Field label="Task name">
          <input className={inputClass} value={form.title} onChange={setField('title')} />
        </Field>

        <Field label="Assign to">
          <select className={inputClass} value={form.assignedTo} onChange={setField('assignedTo')}>
            <option value="">Assign later</option>
            {engineers.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </Field>

        <div>
          <span className="mb-1 block text-base font-semibold">Priority</span>
          <div className="grid grid-cols-3 gap-2">
            {PRIORITIES.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setForm({ ...form, priority: level })}
                className={`min-h-12 rounded-xl border text-base font-semibold ${
                  form.priority === level ? 'border-blue-700 bg-blue-700 text-white' : 'border-slate-300 bg-white'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Start date">
            <input type="date" className={inputClass} value={form.startDate} onChange={setField('startDate')} />
          </Field>
          <Field label="Deadline">
            <input type="date" className={inputClass} value={form.deadline} onChange={setField('deadline')} />
          </Field>
        </div>

        <Field label="Weight (importance, 1 to 100)">
          <input type="number" className={inputClass} value={form.weight} onChange={setField('weight')} />
        </Field>

        {error && <p className="text-sm font-semibold text-red-700">{error}</p>}
        {message && <p className="text-sm font-semibold text-green-700">{message}</p>}

        <Button fullWidth onClick={submit}>Create Task</Button>
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-bold">All Tasks</h2>
        {data.tasks.map((task) => (
          <div key={task.id} className="rounded-2xl bg-white p-4 shadow">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-bold">{task.title}</p>
                <p className="text-sm text-slate-500">
                  {nameOf(data.projects, task.projectId)} | {nameOf(data.users, task.assignedTo)}
                </p>
              </div>
              <StatusBadge label={task.priority} tone={PRIORITY_TONE[task.priority]} />
            </div>
            <p className="mt-2 text-sm text-slate-600">
              {TASK_STATUS_LABELS[task.status]} | {task.completion}% done | Deadline {task.deadline}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}