import dotenv from 'dotenv';
dotenv.config();

process.on('uncaughtException', (err: any) => {
  process.exit(1);
});

// Packages
import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import xss from 'xss-clean';
import http from 'http';

// Files
import testRouter from './routes/test-route';
import AppError from './helpers/app-error';

const app = express();
const { PORT = 3000 } = process.env;

// Middlewares
app.use(helmet());
app.use(logger('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(xss());

app.use('/api/v1/test', testRouter);

app.get('/', (req: Request, res: Response) => {
  res.send({
    message: 'hello world jaa ssdfsfsd',
  });
});

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});

// true if file is executed
if (require.main === module) {
  const server = http.createServer(app).listen(PORT, () => {
    console.log('server started at ' + PORT);
  });

  process.on('unhandledRejection', (err: any) => {
    server.close(() => {
      process.exit(1);
    });
  });
}

export default app;
