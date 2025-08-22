import { useState } from 'react';

export default function AddCityForm({ onAdd }) {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({ name: name.trim(), country: country.trim() || undefined });
    setName('');
    setCountry('');
  };

  return (
    <form onSubmit={submit} className="card p-4 flex flex-col gap-3">
      <div className="text-sm text-slate-300">Add a city (optionally include ISO country code)</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input className="input" placeholder="City (e.g., London)" value={name} onChange={(e)=>setName(e.target.value)} />
        <input className="input" placeholder="Country code (e.g., GB)" value={country} onChange={(e)=>setCountry(e.target.value)} />
        <button className="btn" type="submit">Add City</button>
      </div>
    </form>
  );
}
