import { MongoClient } from "mongodb";
import { hash } from "bcrypt";

// /api/register-admin
// POST /api/register-admin

async function handler(req, res) {
  if (req.method === "POST") {
    hash(req.body.password, 10, async function (err, hash) {
      // Store hash in your password DB.
      const data = {
        adminName: req.body.name,
        adminPassword: hash,
      };
      const userPassword = process.env.MONGODB_PASSWORD;

      const client = new MongoClient(
        `mongodb+srv://anmol-pansari_7:${userPassword}@scheme-india-cluster.yvivi.mongodb.net/schemes?retryWrites=true&w=majority`,
        { useUnifiedTopology: true }
      ).connect();

      const db = (await client).db();

      const adminsCollection = db.collection("admins");

      await adminsCollection.insertOne(data);

      (await client).close;

      res.status(201).json({ message: "admin Successfully registered." });
    });
  } else {
    res.status(405).json({ message: "We only accept post messages." });
  }
}

export default handler;
