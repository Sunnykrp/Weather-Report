import { Router } from 'express';
import { getWeather, getBatchWeather } from '../controllers/weatherController.js';

const router = Router();

router.get('/', getWeather);
router.get('/batch', getBatchWeather);

export default router;
