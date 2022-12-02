const jwt = require("jsonwebtoken");
const SECRET = "token_secret";
const userModel = require("../models/user");

checkToken = async (req) => {
  let token = req.header("Authorization");
  let userInfo = await jwt.verify(token, SECRET);

  let resMsg = { success: false, message: "Access denied. Please login" };
  if (userInfo && userInfo.id && userInfo.role) {
    user = await userModel.findOne({ _id: userInfo.id });
    if (user) resMsg = { success: true, message: "Access granted.", user: user, role: userInfo.role };
  }
  return resMsg;
};

getUserFromToken = async (req) => {
  let token = req.header("Authorization");
  let userInfo = await jwt.verify(token, SECRET);

  if (userInfo && userInfo.id && userInfo.role) {
    user = await userModel.findOne({ _id: userInfo.id });
    return user;
  }
  throw new Error("The toke is incorrect from getUserFromToken");  
};  

checkRole = (resMsg, role) => {
  let isValidRole = false;
  if (resMsg.success) {
    let user = resMsg.user;
    if (user && user.role === role && resMsg.role === role) {
      isValidRole = true;
    }
  }
  return isValidRole;
};

isLogin = async (req, res, next) => {
  let resMsg = await checkToken(req);

  if (resMsg.success) next();
  else res.status(402).send(resMsg);
};

isNormal = async (req, res, next) => {
  let resMsg = await checkToken(req);

  if (checkRole(resMsg, "normal")) {
    next();
  } else res.status(401).send({success:false,message:"Access denied. The user has not a normal role"});
};

isAdmin = async (req, res, next) => {
  let resMsg = await checkToken(req);

  if (checkRole(resMsg, "admin")) {
    next();
  } else res.status(401).send({success:false,message:"Access denied. The user has not an admin role"});
};

const auth = {
  isAdmin: isAdmin,
  isNormal: isNormal,
  isLogin: isLogin,
  getUserFromToken:getUserFromToken
};
module.exports = auth;
