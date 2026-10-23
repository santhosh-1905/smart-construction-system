import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDemo } from '../../demo/DemoContext.jsx';
import { ROLE_LABELS, homePathFor } from '../../demo/labels.js';
import Button from '../../components/ui/Button.jsx';
import Field, { inputClass } from '../../components/ui/Field.jsx';

const DEMO_CODE = '123456';

export default function LoginPage() {
  const { data, currentUser, login, resetDemo } = useDemo();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState('phone');
  const [error, setError] = useState('');

  if (currentUser) return <Navigate to={homePathFor(currentUser.role)} replace />;

  function sendCode() {
    if (!data.users.some((user) => user.phone === phone)) {
      setError('This number is not in the demo. Use a quick login button below.');
      return;
    }
    setError('');
    setStep('code');
  }

  function checkCode() {
    if (code !== DEMO_CODE) {
      setError(`Wrong code. The demo code is ${DEMO_CODE}.`);
      return;
    }
    login(data.users.find((user) => user.phone === phone).id);
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center p-4">
      <div className="rounded-2xl bg-white p-6 shadow">
        <h1 className="text-2xl font-bold text-blue-900">Smart Construction</h1>
        <p className="mb-6 text-slate-500">Log in with your phone number</p>

        {step === 'phone' ? (
          <div className="space-y-4">
            <Field label="Phone number">
              <input
                className={inputClass}
                inputMode="numeric"
                maxLength={10}
                placeholder="10 digit number"
                value={phone}
                onChange={(event) => setPhone(event.target.value.replace(/\D/g, ''))}
              />
            </Field>
            <Button fullWidth onClick={sendCode} disabled={phone.length !== 10}>Send Code</Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Field label={`Enter the 6 digit code (demo code: ${DEMO_CODE})`}>
              <input
                className={inputClass}
                inputMode="numeric"
                maxLength={6}
                value={code}
                onChange={(event) => setCode(event.target.value.replace(/\D/g, ''))}
              />
            </Field>
            <Button fullWidth onClick={checkCode} disabled={code.length !== 6}>Log In</Button>
            <Button fullWidth variant="secondary" onClick={() => setStep('phone')}>Change Number</Button>
          </div>
        )}

        {error && <p className="mt-4 text-sm font-semibold text-red-700">{error}</p>}
      </div>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-3 text-lg font-bold">Quick demo login</h2>
        <div className="space-y-3">
          {data.users.map((user) => (
            <Button key={user.id} fullWidth variant="secondary" onClick={() => login(user.id)}>
              {ROLE_LABELS[user.role]}: {user.name}
            </Button>
          ))}
        </div>
        <button onClick={resetDemo} className="mt-4 text-sm font-semibold text-slate-500 underline">
          Reset demo data
        </button>
      </div>
    </div>
  );
}