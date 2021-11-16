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
        const database4 = client.db('moreServices')
        const ratingData = client.db('reviewData')
        const usersData = client.db('users')
        const servicesCollection =database.collection('services')
        const servicesCollection1 =database1.collection('speciallist')
        const servicesCollection2 =database2.collection('managementt')
        const servicesCollection3 =database3.collection('orders')
        const servicesCollection4 =database4.collection('moreServices')
        const ratingCollection = ratingData.collection('reviewData')
        const usersCollection = usersData.collection('users')
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
        app.get('/orders', async(req,res) =>{
            const cursor3 =servicesCollection3.find({});
            const services3 =await cursor3.toArray();
            res.send(services3);
        })
        app.get('/moreServices', async(req,res) =>{
            const cursor4 =servicesCollection4.find({});
            const services4 =await cursor4.toArray();
            // console.log(services4)
            res.send(services4);
        })
        app.get('/reviewData', async(req,res) =>{
            const cursor5 =ratingCollection.find({});
            const services5 =await cursor5.toArray();
            // console.log(services4)
            res.send(services5);
        })
        app.get('/users/:email',async(req,res)=>{
            const email =req.params.email;
            const query={email: email};
            const user = await usersCollection.findOne(query);
            let isAdmin = false;
            if(user?.role== 'admin'){
                isAdmin = true;
            }
            res.json({admin : isAdmin});
        })

        //Post Api
        app.post('/services', async(req,res)=>{
            const service =req.body;
            console.log('hit the post',service)
            const result = await servicesCollection.insertOne(service);
            // console.log(result);
            res.json(result)
        });
        app.post('/speciallist', async(req,res)=>{
            const service1 =req.body;
            console.log('hit the post',service1)
            const result = await servicesCollection1.insertOne(service1);
            // console.log(result);
            res.json(result)
        });
        app.post('/orders', async(req,res)=>{
            const service3 =req.body;
            console.log('hit the post',service3)
            const result = await servicesCollection3.insertOne(service3);
            // console.log(result);
            res.json(result)
        });
        app.post('/reviewData', async(req,res)=>{
            const service4 =req.body;
            console.log('hit the post',service4)
            const result = await ratingCollection.insertOne(service4);
            // console.log(result);
            res.json(result)
        });
        app.post('/users', async(req,res) => {
            const user = req.body;
            console.log(user)
            const result =await usersCollection.insertOne(user);
            res.json(result);
        })
        app.put('/users',async (req,res)=>{
            const user = req.body;
            const filter = {email: user.email};
            const options = {upsert: true};
            const updateDoc ={$set:user}
            const result = await usersCollection.updateOne(filter,updateDoc,options);
            res.json(result);
        })
        app.put('/users/admin', async(req,res) =>{
            const user =req.body;
            const filter ={email: user.email};
            const updateDoc = {$set: {role: 'admin'}};
            const result =await usersCollection.updateOne(filter, updateDoc);
            res.json(result);
        })


        //Delete Api
        app.delete('/orders/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id:(id)};
            // console.log(query)
            result =await servicesCollection3.deleteOne(query);
            res.json(result);
            // console.log(result)

        })
        app.delete('/moreServices/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id:(id)};
            // console.log(query)
            result =await servicesCollection4.deleteOne(query);
            res.json(result);
            // console.log(result)

        })


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