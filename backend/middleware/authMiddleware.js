const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.cookies.token; // cookies mai humare token pda hoga

  if (!token) {
    // Agr token nhi hai to yeh show krdo
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  // Ab check krege ki token shi hai ki nhi
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // yeh jwt key k sath token verify krega

    // Agr token shi rehta hai to decode mai vo value jayegi jo ki token geneate krte time humne us object mai pass ki hogi
    // e.g :  const token = jwt.sign(
    //   {
    //     userId: user._id,  // yeh saari object k andr vali value aa jayegi decoded mai
    //     email: user.email,
    //     username: user.username,
    //   },

    req.user = decoded; // fr vo saari value hum dal denge req.user mai

    return next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
}

module.exports = auth;
