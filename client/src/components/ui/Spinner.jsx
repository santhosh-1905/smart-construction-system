export default function Spinner({ size = 24, className = '' }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={`inline-block animate-spin rounded-full border-4 border-current border-t-transparent ${className}`}
      style={{ width: size, height: size }}
    />
  );
}