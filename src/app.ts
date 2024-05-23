import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';
import './models';
import { apiLimiter } from './middleware/rateLimiter';
import { globalErrorHandler, notFoundHandler } from './middleware/errorHandler';


const app = express();


app.use(apiLimiter)
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api', routes);

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(globalErrorHandler);

export default app;
