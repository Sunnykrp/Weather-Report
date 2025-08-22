import dayjs from 'dayjs';

export const formatDate = (isoDate) => dayjs(isoDate).format('ddd, MMM D');
export const iconUrl = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`;
