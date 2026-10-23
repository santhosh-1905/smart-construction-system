export const inputClass =
  'min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-base';

export default function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-base font-semibold">{label}</span>
      {children}
    </label>
  );
}