//Controllers interact with MongoDB Database via Mongoose library and send HTTP 

const { verifySignUp, authJwt } = require("../middlewares");
const authController = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/v1/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    authController.signup
  );

  app.post("/api/v1/auth/signin", authController.signin);
};
