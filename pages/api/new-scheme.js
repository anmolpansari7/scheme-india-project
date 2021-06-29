import { MongoClient } from "mongodb";

// /api/new-scheme
// POST /api/new-scheme

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const userPassword = process.env.MONGODB_PASSWORD;

    const client = new MongoClient(
      `mongodb+srv://anmol-pansari_7:${userPassword}@scheme-india-cluster.yvivi.mongodb.net/schemes?retryWrites=true&w=majority`,
      { useUnifiedTopology: true }
    ).connect();

    const db = (await client).db();

    const schemesCollection = db.collection("schemes");

    await schemesCollection.insertOne(data);

    (await client).close;

    res.status(201).json({ message: "Schemes inserted" });
  }
}

export default handler;
