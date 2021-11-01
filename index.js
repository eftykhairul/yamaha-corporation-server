const express = require('express');
const app =express();
const port =process.env.PORT|| 5000;
const { MongoClient } = require('mongodb');
const cors=require('cors');
require('dotenv').config()

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.m4b3s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();
        // console.log('connected')
        const database = client.db('tourism')
        const database1 = client.db('speciallist')
        const database2 = client.db('management')
        const database3 = client.db('orders')
        const servicesCollection =database.collection('services')
        const servicesCollection1 =database1.collection('speciallist')
        const servicesCollection2 =database2.collection('managementt')
        const servicesCollection3 =database3.collection('order')
        // Get Api
        app.get('/services', async(req,res) =>{
            const cursor =servicesCollection.find({});
            const services =await cursor.toArray();
            res.send(services);
        })
        app.get('/speciallist', async(req,res) =>{
            const cursor1 =servicesCollection1.find({});
            const services1 =await cursor1.toArray();
            res.send(services1);
        })
        app.get('/management', async(req,res) =>{
            const cursor2 =servicesCollection2.find({});
            const services2 =await cursor2.toArray();
            res.send(services2);
        })
        app.get('/orders', async(req,res) =>{
            const cursor3 =servicesCollection3.find({});
            const services3 =await cursor3.toArray();
            res.send(services3);
        })

        //Post Api
        app.post('/services', async(req,res)=>{
            const service =req.body;
            console.log('hit the post',service)
            const result = await servicesCollection.insertOne(service);
            console.log(result);
            res.json(result)
        });
        app.post('/speciallist', async(req,res)=>{
            const service1 =req.body;
            console.log('hit the post',service1)
            const result = await servicesCollection1.insertOne(service1);
            console.log(result);
            res.json(result)
        });
        app.post('/management', async(req,res)=>{
            const service2 =req.body;
            console.log('hit the post',service2)
            const result = await servicesCollection2.insertOne(service2);
            console.log(result);
            res.json(result)
        });
        app.post('/orders', async(req,res)=>{
            const service3 =req.body;
            console.log('hit the post',service3)
            const result = await servicesCollection3.insertOne(service3);
            console.log(result);
            res.json(result)
        });
    }
    finally{
        // await client.close();
    }
}

run().catch(console.dir);





app.get('/',(req,res)=>{
    res.send('server is running')
})
app.listen(port, ()=>{
    console.log('runing the port',port);
})