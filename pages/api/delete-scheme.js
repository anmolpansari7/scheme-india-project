import { MongoClient, ObjectId } from "mongodb";

// /api/delete-scheme
// POST /api/delete-scheme

async function handler(req, res) {
  if (req.method === "DELETE") {
    const data = req.body;
    const schemeId = data.id;

    const userPassword = process.env.MONGODB_PASSWORD;

    const client = new MongoClient(
      `mongodb+srv://anmol-pansari_7:${userPassword}@scheme-india-cluster.yvivi.mongodb.net/schemes?retryWrites=true&w=majority`,
      { useUnifiedTopology: true }
    ).connect();

    const db = (await client).db();

    const schemesCollection = db.collection("schemes");

    const result = await schemesCollection.deleteOne({
      _id: ObjectId(schemeId),
    });

    (await client).close;

    res.status(201).json({ message: "Schemes deleted" });
  }
}

export default handler;
