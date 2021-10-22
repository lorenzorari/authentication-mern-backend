const jwt = require("jsonwebtoken");

const { TOKEN_KEY } = process.env;

const verifyToken = (req, res, next) => {
  const { body, query, headers } = req;
  const token = body.token || query.token || headers["x-access-token"];

  if (!token)
    return res.status(403).send("A token is required for authentication");

  try {
    req.user = jwt.verify(token, TOKEN_KEY);
  } catch (err) {
    return res.status(401).send("Invalid token!");
  }

  return next();
};

module.exports = verifyToken;
