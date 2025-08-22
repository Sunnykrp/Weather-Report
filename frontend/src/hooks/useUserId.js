import { v4 as uuid } from 'uuid';
import { useEffect, useState } from 'react';
import api from '../api';

export default function useUserId() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    let id = localStorage.getItem('userId');
    if (!id) {
      id = uuid();
      localStorage.setItem('userId', id);
    }
    setUserId(id);
  }, []);

  useEffect(() => {
    if (!userId) return;
    // Initialize user on backend (idempotent)
    api.post('/users', { userId }).catch(() => {});
  }, [userId]);

  return userId;
}
