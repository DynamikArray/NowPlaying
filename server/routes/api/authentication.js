const passport = require("passport");
require("../../middleware/authentication/spotify");
const token = require("../../util/token");

// Generate the Token for the user authenticated in the request
// send that token as a cookie back to main app
function generateUserToken(req, res, next) {
  const accessToken = token.generateAccessToken(req.user.id);
  //set expire time 1 minute from now
  var date = new Date();
  date.setTime(date.getTime() + 60 * 1000);
  res.cookie("jwt", accessToken, { expire: date });

  if (process.env.NODE_ENV == "development") {
    //
    //FOR REACT CLIENT SERVED OUT OF WEBPACK
    //
    res.redirect("http://localhost:" + 8888 + "/spotify/" + req.user.id);
  } else {
    //redirect to homepage or uesr page soon
    res.redirect("/spotify/" + req.user.id);
  }
}

module.exports = app => {
  app.get(
    "/auth/spotify",
    passport.authenticate("spotify", {
      scope: ["user-read-email", "user-read-private"],
      showDialog: true
    }),
    function(req, res) {
      // The request will be redirected to spotify for authentication, so this
      // function will not be called.
    }
  );

  app.get(
    "/auth/spotify/callback",
    passport.authenticate("spotify", { failureRedirect: "/failedLogin" }),
    generateUserToken
  );
};
