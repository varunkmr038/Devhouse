const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send(`Unauthorized`);
    }
    //  Extract user id from payload
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    //  saving user id to req
    req.userId = userId;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send(`Unauthorized`);
  }
};
