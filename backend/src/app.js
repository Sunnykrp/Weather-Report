import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';

const app = express();

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://weather-report-frontend.onrender.com/';
const corsOptions = {
  origin: CLIENT_ORIGIN,
  credentials: true,
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
};

// 1) Enable CORS for all routes
app.use(cors(corsOptions));

// 2) Handle all preflights WITHOUT using "*" path
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(morgan('dev'));

// routes (keep these after CORS)
import weatherRoutes from './routes/weather.js';
import preferencesRoutes from './routes/preferences.js';

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use('/api/weather', weatherRoutes);
app.use('/api', preferencesRoutes);

// 404 catcher (no "*"!)
app.use((req, res) => res.status(404).json({ ok: false, error: { message: 'Route not found' } }));

// error handler...
export default app;
