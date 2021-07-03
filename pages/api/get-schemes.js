import { MongoClient } from "mongodb";
import authenticated from "./middleware/authenticated";

const getSchemesHandler = async (req, res) => {
  if (req.method === "GET") {
    const userPassword = process.env.MONGODB_PASSWORD;

    const client = new MongoClient(
      `mongodb+srv://anmol-pansari_7:${userPassword}@scheme-india-cluster.yvivi.mongodb.net/schemes?retryWrites=true&w=majority`,
      { useUnifiedTopology: true }
    ).connect();

    const db = (await client).db();

    const schemesCollection = db.collection("schemes");

    const schemes = await schemesCollection.find({}, { type: 1 }).toArray();

    (await client).close;

    res.json({ message: schemes });
  } else {
    res.status(405).json({ message: "We only accept get method." });
  }
};

export default authenticated(getSchemesHandler);
