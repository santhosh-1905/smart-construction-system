import { Link } from 'react-router-dom';

export default function SuccessMessage({ message, backTo = '/engineer' }) {
  return (
    <div className="rounded-2xl bg-green-50 p-6 text-center shadow">
      <p className="text-5xl">✅</p>
      <p className="mt-3 text-xl font-bold text-green-800">{message}</p>
      <Link
        to={backTo}
        className="mt-6 block min-h-12 rounded-xl bg-blue-700 px-6 py-3 text-base font-semibold text-white"
      >
        Back to Home
      </Link>
    </div>
  );
}