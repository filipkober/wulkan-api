import { client } from './../util/client';
import express from 'express';

require('dotenv').config();

const { TOKEN, SYMBOL, PIN } = process.env;

const router = express.Router();

router.get('/week', async (req, res) => {
    const today = new Date();
    const day = today.getDay();
    const monday = new Date();
    const friday = new Date();
    if(day === 0) {
        monday.setDate(today.getDate() + 1);
        friday.setDate(today.getDate() + 5);
    } else if(day === 6) {
        monday.setDate(today.getDate() + 2);
        friday.setDate(today.getDate() + 4);
    } else {
        monday.setDate(today.getDate() - day + 1);
        friday.setDate(today.getDate() - day + 5);
    }

    res.send(await client.getLessons(monday, friday));
});
router.get(['/day/:offset', '/day'], async (req, res) => {
    const offset = parseInt(req.params.offset || '0');
    if(isNaN(offset)) return res.status(400).send({ error: 'Offset must be a number' });
    const today = new Date();
    today.setDate(today.getDate() + offset);
    res.send(await client.getLessons(today, today));
});

export default router;