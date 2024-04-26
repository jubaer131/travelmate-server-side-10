
const express = require('express')
const cors = require('cors')
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000

// midle ware
app.use(cors())
app.use(express.json())

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
    // const userCollection = client.db('coffeeDB').collection('user');

    app.post('/tour', async (req, res) => {
        const newtour = req.body;
        console.log(newtour)
        const result = await travelCollection.insertOne(newtour);
        res.send(result);
    })





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