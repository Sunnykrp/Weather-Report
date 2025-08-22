export const normalizeCityKey = (name, country) => {
  const n = (name || '').trim().toLowerCase();
  const c = (country || '').trim().toLowerCase();
  return c ? `${n},${c}` : n;
};

export const makeDisplayName = (name, country, sysCountryFromAPI) => {
  const code = country || sysCountryFromAPI || '';
  return code ? `${name}, ${code}` : name;
};
