const express = require('express');
const Redis = require('ioredis');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();
app.use(express.json());

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

const BANNER_KEY = "app:banners";


app.post('/banners', async (req, res) => {
    console.log("In the request");
    await redis.set(BANNER_KEY, req.body.message || "Welcome to our website!");
    res.status(201).json({ message: 'Banner created successfully' });
});


app.get('/banners', async (req, res) => {
    const banner = await redis.get(BANNER_KEY);
    res.status(200).json({ message: banner || "No banner set" });
}); 

app.delete('/banners', async (req, res) => {
    await redis.del(BANNER_KEY);
    res.status(200).json({ message: 'Banner deleted successfully' });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});