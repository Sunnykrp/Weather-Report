import { Router } from 'express';
import { createUser, getPreferences, addCity, removeCity } from '../controllers/preferencesController.js';

const router = Router();

router.post('/users', createUser);
router.get('/preferences/:userId', getPreferences);
router.post('/preferences/:userId/cities', addCity);
router.delete('/preferences/:userId/cities/:cityKey', removeCity);

export default router;
