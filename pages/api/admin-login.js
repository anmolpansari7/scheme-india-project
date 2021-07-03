import { MongoClient } from "mongodb";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import cookie from "cookie";

// /api/admin-login
// POST /api/admin-login

async function Loginhandler(req, res) {
  if (req.method === "POST") {
    const userPassword = process.env.MONGODB_PASSWORD;

    const client = new MongoClient(
      `mongodb+srv://anmol-pansari_7:${userPassword}@scheme-india-cluster.yvivi.mongodb.net/schemes?retryWrites=true&w=majority`,
      { useUnifiedTopology: true }
    ).connect();

    const db = (await client).db();

    const adminsCollection = db.collection("admins");

    const admin = await adminsCollection.findOne({
      adminName: req.body.adminName,
    });

    (await client).close;

    await compare(
      req.body.adminPassword,
      admin.adminPassword,
      function (err, result) {
        if (!err && result) {
          const claims = { sub: admin._id, adminName: admin.adminName };
          const jwt = sign(claims, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });

          res.setHeader(
            "Set-Cookie",
            cookie.serialize("auth", jwt, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              sameSite: "strict",
              maxAge: 3600,
              path: "/",
            })
          );
          res.json({ message: "Welcome back to the app." });
        } else {
          res.status(401).json({ message: "Oops! Something went wrong." });
        }
      }
    );
  } else {
    res.status(405).json({ message: "We only accept post messages." });
  }
}

export default Loginhandler;
