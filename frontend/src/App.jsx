import { useEffect, useMemo, useState } from 'react';
import api from './api';
import useUserId from './hooks/useUserId';
import Header from './components/Header';
import AddCityForm from './components/AddCityForm';
import CityCard from './components/CityCard';
import Loading from './components/Loading';
import ErrorToast from './components/ErrorToast';

function normalizeKey(name, country) {
  const n = (name || '').trim().toLowerCase();
  const c = (country || '').trim().toLowerCase();
  return c ? `${n},${c}` : n;
}

export default function App() {
  const userId = useUserId();
  const [cities, setCities] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const cityKeys = useMemo(() => cities.map(c => normalizeKey(c.name, c.country)), [cities]);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        const res = await api.get(`/preferences/${userId}`);
        if (res.data.ok) {
          setCities(res.data.data);
        } else {
          setCities([]);
        }
      } catch {
        setCities([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  useEffect(() => {
    if (!cityKeys.length) return;
    // Fetch batch for speed (still supports individual fetches)
    (async () => {
      try {
        const qs = cityKeys.map(k => {
          const [name, country] = k.split(',');
          return country ? `${name}|${country}` : name;
        }).join(',');
        const res = await api.get(`/weather/batch`, { params: { cities: qs }});
        if (res.data.ok) {
          const next = {};
          for (const r of res.data.results) {
            if (r.data) {
              next[r.data.cityKey] = r.data;
            }
          }
          setWeather(next);
        }
      } catch (e) {
        setErrorMsg('Failed to load weather');
        setTimeout(() => setErrorMsg(''), 4000);
      }
    })();
  }, [cityKeys.join(',')]); // re-run when cities change

  const addCity = async ({ name, country }) => {
    try {
      const res = await api.post(`/preferences/${userId}/cities`, { name, country });
      if (res.data.ok) {
        setCities(res.data.data);
      } else throw new Error(res.data.error?.message || 'Failed to add city');
    } catch (e) {
      setErrorMsg(e.message || 'Failed to add city');
      setTimeout(() => setErrorMsg(''), 4000);
    }
  };

  const removeCity = async (cityKey) => {
    try {
      const res = await api.delete(`/preferences/${userId}/cities/${cityKey}`);
      if (res.data.ok) {
        setCities(res.data.data);
        setWeather(prev => {
          const cp = { ...prev };
          delete cp[cityKey];
          return cp;
        });
      } else throw new Error(res.data.error?.message || 'Failed to remove city');
    } catch (e) {
      setErrorMsg(e.message || 'Failed to remove city');
      setTimeout(() => setErrorMsg(''), 4000);
    }
  };

  return (
    <div className="min-h-screen text-white">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-6">
        <AddCityForm onAdd={addCity} />
        {loading && <Loading label="Fetching your cities..." />}
        {!loading && cities.length === 0 && (
          <div className="text-slate-300">
            You have no cities yet. Try adding: <span className="badge">London, GB</span> <span className="badge">Paris, FR</span> <span className="badge">New York, US</span>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.values(weather).map((w) => (
            <CityCard key={w.cityKey} data={w} onRemove={removeCity} />
          ))}
        </div>
      </main>
      <ErrorToast message={errorMsg} />
    </div>
  );
}
