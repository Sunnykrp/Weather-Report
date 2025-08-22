export default function Header() {
  return (
    <header className="sticky top-0 z-10 backdrop-blur border-b border-slate-800 bg-slate-950/70">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">🌦️ Weather Dashboard</h1>
        <a
          className="text-sm text-slate-300 hover:text-white underline"
          href="https://openweathermap.org/"
          target="_blank" rel="noreferrer"
        >Data: OpenWeatherMap</a>
      </div>
    </header>
  );
}
