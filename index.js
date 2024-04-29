const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express()
const port = process.env.PORT || 5000

// midle ware
app.use(cors())
// app.use(cors({
//   origin : ['http://localhost:5173/']
// }))
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8dssgfd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
  console.log(uri)
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
    // await client.connect();

    const travelCollection = client.db('travelDB').collection('travel');
    const touristSportCollection = client.db('touristDB').collection('tourist');

// touristSportCollection start

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
   

// touristSportCollection end

    // travel collection  start

   

    app.get('/tour', async (req, res) => {
        const cursor = travelCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    }) 


    app.get('/tour/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email: email }; 
      const cursor = travelCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
   })

   
 

app.get('/tourdetail/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id)
  const query = { _id: new ObjectId(id) }
  const result = await travelCollection.findOne(query);
  res.send(result);
})

  
app.get('/updatetour/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id)
  const query = { _id: new ObjectId(id) }
  const result = await travelCollection.findOne(query);
  res.send(result);
})

  
app.post('/tour', async (req, res) => {
  const newtour = req.body;
  console.log(newtour)
  const result = await travelCollection.insertOne(newtour);
  res.send(result);
})


  app.put('/updatetour/:id', async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) }
    const options = { upsert: true };
    const updatesport = req.body;
    console.log(updatesport)
    const sport = {
        $set: {
            name: updatesport.name,
            country:updatesport.country,
            location:updatesport.location,
            description:updatesport.description,
            cost:updatesport.cost,
            traveltime:updatesport.traveltime,
            visitor:updatesport.visitor,
            Photo:updatesport.Photo,
            
        }
    }

    const result = await travelCollection.updateOne(filter, sport, options);
    res.send(result);
  })


    app.delete('/tour/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await travelCollection.deleteOne(query);
      res.send(result);
  })

// travel collection end



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