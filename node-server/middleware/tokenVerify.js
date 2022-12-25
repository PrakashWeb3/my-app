const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Getting JWT token from headers or body or query or Authorization
 * if valid the next method return
 */
const verifyJWTToken = (req, res, next) => {
   
    const token =
    req.body.token || req.query.token || req.headers["token"] || req.headers.authorization || req.headers.Authorization || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).json({error:"A token is required for authentication",errorCode:4003});
    }
    
    let tokenData = token.replace(/^Bearer\s+/, "");
    
    try {
        const decoded = jwt.verify(tokenData, process.env.ACCESS_SECRET_KEY);
        req.email = decoded.email; 
      } catch (err) {
        return res.status(401).json({error: 'InValid Token',errorCode:4004});
      }
      return next();
}

/**
 * Remove the token from headers or body or query or Authorization
 */
const removeJWTToken = (req, res, next) => {

  const token =
  req.body.token || req.query.token || req.headers["token"] || req.headers.authorization || req.headers.Authorization || req.headers["x-access-token"];

  if (!token) {
      return res.status(200).json({message:"Logged out successfully"});
  }
  
  token.replace(/^Bearer\s+/, "");
  return next();
}


module.exports = { verifyJWTToken ,removeJWTToken}