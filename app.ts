import express from 'express';
import {client, initClient} from './util/client';
import lessonsRouter from './routes/lessons';
import fs from 'fs';
import https from 'https';
import http from 'http';
import rateLimit from 'express-rate-limit';

require('dotenv').config();

const privateKey = fs.existsSync('./cert/key.pem') ? fs.readFileSync('./cert/key.pem') : undefined;
const certificate = fs.existsSync('./cert/cert.pem') ? fs.readFileSync('./cert/cert.pem') : undefined;

const { TOKEN, SYMBOL, PIN } = process.env;
if(!TOKEN || !SYMBOL || !PIN) {
    throw new Error('Missing environment variables');
}

const app = express();
const port = process.env.PORT || 3000;
const logRequests = process.env.LOG_REQUESTS === 'true' || false;
const creds = {key: privateKey, cert: certificate};
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

http.createServer(app).listen(Number(port) + 1, () => {
    console.log(`HTTP Server running on port ${Number(port) + 1}`);
});

if(privateKey && certificate){
https.globalAgent.options.ca = require('ssl-root-cas/latest').create();
https.createServer(creds, app).listen(port, async () => {
    console.log(`Server listening on port ${port}`);
});
}
initClient();

app.use(limiter);
app.use('/lessons', lessonsRouter);

if(logRequests) 
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});