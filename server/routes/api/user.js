const passport = require("passport");
require("../../middleware/authentication/jwt");

//const userValidator = require("../../middleware/validators/api/user");
const User = require("../../models/User");

module.exports = app => {
  app.get(
    "/api/user/account",
    passport.authenticate(["jwt"], { session: false }),
    (req, res) => {
      res.json({ result: req.user });
    }
  );

  //UPDATE - update user
  /*
  app.put(
    "/api/user/account",
    passport.authenticate(["jwt"], { session: false }),
    userValidator.checkUserResourceBody,
    userValidator.buildUserResourceFields,
    async (req, res) => {
      const user = await User.updateByUserId(req.user.id, req.resourceFields);
      res.json({ result: user });
    }
  );
  */
  //DELETE - delete user handled ???
};
