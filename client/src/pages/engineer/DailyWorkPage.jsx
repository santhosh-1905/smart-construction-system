import { useState } from 'react';
import { useDemo } from '../../demo/DemoContext.jsx';
import Button from '../../components/ui/Button.jsx';
import Field, { inputClass } from '../../components/ui/Field.jsx';
import SuccessMessage from '../../components/ui/SuccessMessage.jsx';

export default function DailyWorkPage() {
  const { data, currentUser, submitReport } = useDemo();
  const myTasks = data.tasks.filter(
    (task) => task.assignedTo === currentUser.id && task.status !== 'completed' && task.status !== 'cancelled'
  );

  const [taskId, setTaskId] = useState(myTasks[0]?.id || '');
  const task = myTasks.find((item) => item.id === taskId);
  const [percent, setPercent] = useState(task?.completion || 0);
  const [workers, setWorkers] = useState('');
  const [note, setNote] = useState('');
  const [photoName, setPhotoName] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  if (done) return <SuccessMessage message="Work sent to the Site Manager." />;
  if (myTasks.length === 0) return <p className="text-slate-500">You have no open tasks.</p>;

  function changeTask(event) {
    const next = myTasks.find((item) => item.id === event.target.value);
    setTaskId(next.id);
    setPercent(next.completion);
  }

  function submit() {
    if (percent < task.completion) return setError('Progress cannot be lower than before.');
    if (!workers || Number(workers) < 0) return setError('Please enter how many workers worked today.');
    submitReport({ taskId, percent: Number(percent), workers: Number(workers), note: note.trim(), hasPhoto: Boolean(photoName) });
    setDone(true);
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Daily Work</h2>

      <Field label="Which task?">
        <select className={inputClass} value={taskId} onChange={changeTask}>
          {myTasks.map((item) => (
            <option key={item.id} value={item.id}>{item.title}</option>
          ))}
        </select>
      </Field>

      <div className="rounded-2xl bg-white p-4 shadow">
        <p className="text-base font-semibold">How much is complete?</p>
        <p className="my-2 text-center text-4xl font-bold text-blue-800">{percent}%</p>
        <input
          type="range"
          min={task.completion}
          max="100"
          step="5"
          value={percent}
          onChange={(event) => setPercent(Number(event.target.value))}
          className="h-8 w-full"
        />
        <p className="text-sm text-slate-500">Last verified: {task.completion}%</p>
      </div>

      <Field label="Workers today">
        <input
          className={inputClass}
          inputMode="numeric"
          value={workers}
          onChange={(event) => setWorkers(event.target.value.replace(/\D/g, ''))}
        />
      </Field>

      <Field label="Note (optional)">
        <textarea className={`${inputClass} py-3`} rows={3} value={note} onChange={(event) => setNote(event.target.value)} />
      </Field>

      <Field label="Photo (optional)">
        <input
          type="file"
          accept="image/*"
          capture="environment"
          className={inputClass}
          onChange={(event) => setPhotoName(event.target.files[0]?.name || '')}
        />
      </Field>

      {error && <p className="text-sm font-semibold text-red-700">{error}</p>}
      <Button fullWidth onClick={submit}>Send Work</Button>
    </div>
  );
}