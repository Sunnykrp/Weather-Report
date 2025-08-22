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
    <form onSubmit={submit} className="card p-6 flex flex-col gap-4 bg-slate-900 rounded-lg shadow-lg">
      <div className="text-sm text-slate-400">Add a city (optionally include ISO country code)</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input 
          className="input p-3 rounded-md border border-slate-700 bg-slate-800 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" 
          placeholder="City (e.g., London)" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          className="input p-3 rounded-md border border-slate-700 bg-slate-800 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" 
          placeholder="Country code (e.g., GB)" 
          value={country} 
          onChange={(e) => setCountry(e.target.value)} 
        />
        <button 
          className="btn p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
          type="submit"
        >
          Add City
        </button>
      </div>
    </form>
  );
}
