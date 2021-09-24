import express from 'express';
import UserRouter from './user.js';

const app = express();

app.use('/users', UserRouter);

export default app;
