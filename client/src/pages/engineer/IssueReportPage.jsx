import { useState } from 'react';
import { useDemo } from '../../demo/DemoContext.jsx';
import Button from '../../components/ui/Button.jsx';
import Field, { inputClass } from '../../components/ui/Field.jsx';
import SuccessMessage from '../../components/ui/SuccessMessage.jsx';

const SEVERITIES = ['High', 'Medium', 'Low'];

export default function IssueReportPage() {
  const { reportIssue } = useDemo();
  const [text, setText] = useState('');
  const [severity, setSeverity] = useState('Medium');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  if (done) return <SuccessMessage message="Issue sent to the Site Manager." />;

  function submit() {
    if (!text.trim()) return setError('Please describe the problem.');
    reportIssue({ text: text.trim(), severity });
    setDone(true);
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Report Issue</h2>

      <Field label="What is the problem?">
        <textarea className={`${inputClass} py-3`} rows={4} value={text} onChange={(event) => setText(event.target.value)} />
      </Field>

      <div>
        <span className="mb-1 block text-base font-semibold">How serious?</span>
        <div className="grid grid-cols-3 gap-2">
          {SEVERITIES.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setSeverity(level)}
              className={`min-h-12 rounded-xl border text-base font-semibold ${
                severity === level ? 'border-blue-700 bg-blue-700 text-white' : 'border-slate-300 bg-white'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-sm font-semibold text-red-700">{error}</p>}
      <Button fullWidth onClick={submit}>Send Issue</Button>
    </div>
  );
}