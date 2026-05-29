const express = require('express');
const Redis = require('ioredis');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();

const PORT = process.env.PORT || 3000

const redis = new Redis({
    url: process.env.REDIS_URL
});
// console.log(redis);

app.get('/redis-health', async (req, res) => {
    try {
        const reply = await redis.ping();
        res.status(200).json({ status: 'OK', message: 'Redis is healthy',
            data: reply
         });
    } catch (error) {
        res.status(500).json({ status: 'Error', message: 'Redis is not healthy' });
    }
});

app.get("/health" , (req,res) => {
    return res.status(200).json({ status: 'OK', message: 'Server is healthy' });
})




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});