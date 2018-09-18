const jwt = require("jsonwebtoken");

// Generate an Access Token for the given User ID
function generateAccessToken(userId) {
  const expiresIn = "1 hour";
  const audience = process.env.JWT_AUDIENCE;
  const issuer = process.env.JWT_ISSUER;
  const secret = process.env.JWT_SIGNING_KEY;

  const token = jwt.sign({}, secret, {
    expiresIn: expiresIn,
    audience: audience,
    issuer: issuer,
    subject: userId
  });

  return token;
}

module.exports = {
  generateAccessToken: generateAccessToken
};
