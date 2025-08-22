import { iconUrl } from '../utils/format';

export default function CityCard({ data, onRemove }) {
  const { current, forecast, cityKey } = data;
  return (
    <div className="card p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xl font-semibold">{current.location}</div>
          <div className="text-slate-400 text-sm">Feels like {current.feelsLike}°C • Humidity {current.humidity}% • Wind {current.windSpeed ?? 0} m/s</div>
        </div>
        <button className="badge hover:bg-red-600 hover:text-white" onClick={() => onRemove(cityKey)} title="Remove city">Remove</button>
      </div>

      <div className="flex items-center gap-5">
        <img src={iconUrl(current.icon)} alt={current.conditions} className="w-16 h-16" />
        <div className="text-5xl font-bold">{current.temperature}°C</div>
        <div className="capitalize text-slate-300">{current.conditions}</div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {forecast.map((d) => (
          <Forecast key={d.date} day={d} />
        ))}
      </div>
    </div>
  );
}

function Forecast({ day }) {
  return (
    <div className="p-4 rounded-lg bg-slate-800/60 flex flex-col items-center gap-2">
      <img src={iconUrl(day.icon)} alt={day.description} className="w-12 h-12" />
      <div className="text-center text-sm">
        <div className="font-medium">{new Date(day.date).toLocaleDateString(undefined, { weekday: 'short' })}</div>
        <div className="text-slate-300 capitalize">{day.description}</div>
      </div>
      <div className="text-center">
        <div className="text-base font-semibold">{day.max}°</div>
        <div className="text-slate-300 text-xs">{day.min}°</div>
      </div>
    </div>
  );
}
