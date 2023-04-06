import * as dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3060;

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});

mongoose.Promise = Promise;
mongoose.connect(process.env.DB_URI);

try {
  mongoose.connection.on('connected', () =>
    console.log('MongoDB connection has been established')
  );
} catch (error) {
  console.error('Error connecting to MongoDB:', error.message);
}

app.use('/', router())