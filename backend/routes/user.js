import express from 'express';
import { saveUserInfo } from '../controllers/user';

const app = express();

app.post('/', saveUserInfo);

export default app;
