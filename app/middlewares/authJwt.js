const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    console.log("Auth Failed. No token provided!");
    return res.status(403).send({ message: "No token provided!" });
  }

  //jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.log("Auth Failed. Unauthorized")
      return res.status(401).send({ message: "Unauthorized!" });
    }
    console.log("PRINT DECODED authJWT", decoded);
    req.userId = decoded.id; // returns eg. 5eb307d06d4aa124ffaa6df1
    //THIS PRINTS THE LOGGED IN USER verifyToken should be used every routes that requires user logged in
    console.log("Print Verified Token Logged In User", req.userId)

    //rjoshi find current user in DB SET CURRENT USER ID
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return
      }
      req.currentUser = user.username;
      console.log("req.currentUser:", req.currentUser)

      next();
    });

    // setTimeout(() => { console.log("World!"); }, 2000);

  });


};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
        console.log("Unauthorized. Require Admin Role!")
        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }
        console.log("Unauthorized. Require Mod Role!")
        res.status(403).send({ message: "Require Moderator Role!" });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
};
module.exports = authJwt;
