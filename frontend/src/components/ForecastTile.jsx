import { formatDate, iconUrl } from '../utils/format';

export default function ForecastTile({ day }) {
  return (
    <div className="p-3 rounded-lg bg-slate-800/60 flex items-center justify-between">
      <div className="text-sm">
        <div className="font-medium">{formatDate(day.date)}</div>
        <div className="text-slate-300 capitalize">{day.description}</div>
      </div>
      <img src={iconUrl(day.icon)} alt={day.description} className="w-12 h-12" />
      <div className="text-right">
        <div className="text-lg font-semibold">{day.max}°C</div>
        <div className="text-slate-300 text-sm">{day.min}°C</div>
      </div>
    </div>
  );
}
