import { useState } from 'react';
import { useDemo } from '../../demo/DemoContext.jsx';
import Button from '../../components/ui/Button.jsx';
import Field, { inputClass } from '../../components/ui/Field.jsx';
import SuccessMessage from '../../components/ui/SuccessMessage.jsx';

const MATERIALS = [
  { name: 'Cement', unit: 'bags' },
  { name: 'Steel', unit: 'kg' },
  { name: 'Sand', unit: 'tons' },
  { name: 'Bricks', unit: 'pieces' },
  { name: 'Aggregate', unit: 'tons' },
];

export default function MaterialRequestPage() {
  const { requestMaterial } = useDemo();
  const [material, setMaterial] = useState(MATERIALS[0].name);
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  if (done) return <SuccessMessage message="Request sent to the MD." />;

  const unit = MATERIALS.find((item) => item.name === material).unit;

  function submit() {
    if (!quantity || Number(quantity) <= 0) return setError('Please enter the quantity.');
    requestMaterial({ material, quantity: Number(quantity), unit });
    setDone(true);
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Request Material</h2>

      <Field label="Material">
        <select className={inputClass} value={material} onChange={(event) => setMaterial(event.target.value)}>
          {MATERIALS.map((item) => (
            <option key={item.name} value={item.name}>{item.name}</option>
          ))}
        </select>
      </Field>

      <Field label={`Quantity (${unit})`}>
        <input
          className={inputClass}
          inputMode="numeric"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value.replace(/\D/g, ''))}
        />
      </Field>

      {error && <p className="text-sm font-semibold text-red-700">{error}</p>}
      <Button fullWidth onClick={submit}>Send Request</Button>
    </div>
  );
}