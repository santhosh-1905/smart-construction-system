import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDemo } from '../../demo/DemoContext.jsx';
import { ROLE_LABELS, homePathFor } from '../../demo/labels.js';
import Button from '../../components/ui/Button.jsx';
import Field, { inputClass } from '../../components/ui/Field.jsx';
import ThemeSwitcher from '../../components/ui/ThemeSwitcher.jsx';

const DEMO_CODE = '123456';

export default function LoginPage() {
  const { data, currentUser, login, resetDemo } = useDemo();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState('phone');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState('');

  if (currentUser) return <Navigate to={homePathFor(currentUser.role)} replace />;

  function sendCode() {
    if (!data.users.some((user) => user.phone === phone)) {
      setError('This number is not in the demo. Use a quick login button below.');
      return;
    }
    setError('');
    setBusy('send');
    setTimeout(() => {
      setBusy('');
      setStep('code');
    }, 800);
  }

  function checkCode() {
    if (code !== DEMO_CODE) {
      setError(`Wrong code. The demo code is ${DEMO_CODE}.`);
      return;
    }
    setError('');
    setBusy('check');
    setTimeout(() => login(data.users.find((user) => user.phone === phone).id), 800);
  }

  function quickLogin(userId) {
    setBusy(userId);
    setTimeout(() => login(userId), 600);
  }

  return (
    <div className="page-enter mx-auto flex min-h-screen max-w-md flex-col justify-center p-4">
      <div className="fixed right-4 top-4 z-40">
        <ThemeSwitcher />
      </div>

      <div className="rounded-2xl bg-white p-6 shadow">
        <div className="float mb-2 text-5xl">🏗️</div>
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
            <Button fullWidth onClick={sendCode} loading={busy === 'send'} disabled={phone.length !== 10}>
              Send Code
            </Button>
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
            <Button fullWidth onClick={checkCode} loading={busy === 'check'} disabled={code.length !== 6}>
              Log In
            </Button>
            <Button fullWidth variant="secondary" onClick={() => setStep('phone')} disabled={Boolean(busy)}>
              Change Number
            </Button>
          </div>
        )}

        {error && (
          <p key={error} className="shake mt-4 text-sm font-semibold text-red-700">
            {error}
          </p>
        )}
      </div>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-3 text-lg font-bold">Quick demo login</h2>
        <div className="stagger space-y-3">
          {data.users.map((user) => (
            <Button
              key={user.id}
              fullWidth
              variant="secondary"
              loading={busy === user.id}
              disabled={Boolean(busy)}
              onClick={() => quickLogin(user.id)}
            >
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