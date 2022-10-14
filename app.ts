import express from 'express';
import {client, initClient} from './util/client';
import lessonsRouter from './routes/lessons';

require('dotenv').config();


const { TOKEN, SYMBOL, PIN } = process.env;
if(!TOKEN || !SYMBOL || !PIN) {
    throw new Error('Missing environment variables');
}

const app = express();
const port = process.env.PORT || 3000;

initClient();

app.use('/lessons', lessonsRouter);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});