import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import * as path from 'path';

//routes
import streamRouter from './modules/stream/stream.controller';
import contentRouter from './modules/content/content.controller';

//Middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use(logger('dev'))

//endpoints
app.use('/stream', streamRouter);
app.use('/content', contentRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Начинаем стримить');
    console.log(`http://127.0.0.1:${PORT}`)
})