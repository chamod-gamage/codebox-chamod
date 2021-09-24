import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index.js';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 80;

const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
};

app.use(express.json());

app.use(cors(corsOptions));

mongoose.connect(`${process.env.MONGO_CONNECTION}`, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', function (err) {
  console.log('Error: Could not connect to MongoDB.');
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
