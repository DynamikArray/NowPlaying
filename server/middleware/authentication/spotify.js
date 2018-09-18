const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const User = require("../../models/User");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  console.log(obj);
  done(null, obj);
});

/*
passport.serializeUser((user, done) => {
  done(null, user._id);
});
//async await this since its outbound to mongo?
passport.deserializeUser((id, done) => {
  User.getUserByExternalId("spotify",id).then(user => {
    done(null, user);
  });
});
*/

var strategy = new SpotifyStrategy(
  {
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_CALLBACK_URL
  },
  async function(accessToken, refreshToken, expires_in, profile, done) {
    let user = await User.getUserByExternalId("spotify", profile.id);
    if (!user) {
      user = await User.createSpotifyUser(
        profile,
        accessToken,
        refreshToken,
        expires_in,
        "spotify",
        profile.id
      );
    }
    return done(null, user);
  }
);

passport.use(strategy);
