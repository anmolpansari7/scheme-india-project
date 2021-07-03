import { verify } from "jsonwebtoken";

const authenticated = (handler) => async (req, res) => {
  if (req.cookies.auth || process.env.JWT_SECRET) {
    verify(
      req.cookies.auth,
      process.env.JWT_SECRET,
      async function (err, decoded) {
        if (!err && decoded) {
          return await handler(req, res);
        }

        res.status(401).json({ message: "Sorry! you are not authenticated." });
      }
    );
  } else {
    res.status(405).json({ message: "Something is wrong" });
  }
};

export default authenticated;
