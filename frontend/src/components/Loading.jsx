export default function Loading({ label = 'Loading...' }) {
  return (
    <div className="text-slate-300 flex items-center gap-3">
      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" strokeWidth="4" opacity="0.25"></circle>
        <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" fill="none"></path>
      </svg>
      {label}
    </div>
  );
}
