import fs from 'fs';
import express from 'express';
import * as dotenv from 'dotenv';
import { getLoggerInstance } from './logger.js';
import { connectToDatabase } from './database.js';
import { getData } from './routes/getData.js';  
import https from 'https';
import cors from 'cors';


const port = 8080
dotenv.config();

connectToDatabase();

const httpsOptions = {
    key: fs.readFileSync('./ssl//key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem')
}

const app = express();
const logger = getLoggerInstance();
const server = https.createServer(httpsOptions,app);

app.use(cors());
app.use(express.json());
app.use('/', getData);

server.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
}); 

