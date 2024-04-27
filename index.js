const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { json } = require('express');
require('dotenv').config();

const app = express()
const port = process.env.PORT || 5000

// midle ware
app.use(cors())
app.use(json())

// password : 5Hm4mHrLGYsve5NI
// name :travelmate 



const uri = "mongodb+srv://travelmate:5Hm4mHrLGYsve5NI@cluster0.8dssgfd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const uri = "mongodb+srv://<username>:<password>@cluster0.8dssgfd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const travelCollection = client.db('travelDB').collection('travel');
    const touristSportCollection = client.db('touristDB').collection('tourist');

// touristSportCollection

app.get('/sport', async (req, res) => {
  const cursor = touristSportCollection.find();
  const result = await cursor.toArray();
  res.send(result);
})
app.get('/sport/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) }
  const result = await touristSportCollection.findOne(query);
  res.send(result);
})
    app.post('/sport', async (req, res) => {
      const newsport = req.body;
      console.log(newsport)
      const result = await touristSportCollection.insertOne(newsport);
      res.send(result);
  })

// touristSportCollection

    // travel collection

    app.get('/tour', async (req, res) => {
        const cursor = travelCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

  //   app.get('/tour/:id', async (req, res) => {
  //     const id =req.params.id
  //     console.log(typeof id) 
  //     const query = { _id: new ObjectId(id) }
  //     const result = await travelCollection.findOne(query);
  //     res.send(result);
  // })
    app.get('/tour/:email', async (req, res) => {
     console.log(req.params.email)
     const result = await travelCollection.find({email:req.params.email}).toArray()
     res.send(result)
  })
    app.post('/tour', async (req, res) => {
        const newtour = req.body;
        console.log(newtour)
        const result = await travelCollection.insertOne(newtour);
        res.send(result);
    })
    app.delete('/tour/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await travelCollection.deleteOne(query);
      res.send(result);
  })

// travel collection 



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('travel mate agency server is running')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})