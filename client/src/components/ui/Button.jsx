import Spinner from './Spinner.jsx';

const VARIANTS = {
  primary: 'bg-blue-700 text-white hover:bg-blue-800',
  secondary: 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-50',
  danger: 'bg-red-600 text-white hover:bg-red-700',
};

export default function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  loading = false,
  type = 'button',
  fullWidth = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 text-base font-semibold
        transition-all duration-150 enabled:hover:-translate-y-0.5 enabled:hover:shadow-md enabled:active:scale-95
        disabled:cursor-not-allowed disabled:opacity-50
        ${VARIANTS[variant]} ${fullWidth ? 'w-full' : ''}`}
    >
      {loading && <Spinner size={18} />}
      {children}
    </button>
  );
}