const User = require("../../models/User");
const requireLogin = require("../../middleware/requireLogin");

const SpotifyWebApi = require("spotify-web-api-node");

const spotifyHelper = require("../../util/spotifyHelper");

module.exports = app => {
  /**
   * [userId description]
   * @type {[type]}
   */
  app.get("/spotify/:userId/player", async (req, res) => {
    const userId = req.params.userId;

    await User.getUserById(userId)
      .then(user => {
        //get the spotify provider info
        let spotifyProvider = user.providers.filter(provider => {
          return (provider.provider = "spotify");
        });

        var spotifyApi = new SpotifyWebApi({
          accessToken: spotifyProvider[0].access_token
        });

        spotifyApi
          .getMyCurrentPlaybackState()
          .then(data => {
            res.json(data.body);
          })
          .catch(err => {
            if (err.statusCode === 401) {
              res.redirect(`/spotify/${userId}/refresh`);
            }
          });
      })
      .catch(err => {
        console.error(err);
      });
  });

  app.get("/spotify/:userId/refresh", async (req, res) => {
    const userId = req.params.userId;

    await User.getUserById(userId)
      .then(user => {
        //get the spotify provider info
        let spotifyProvider = user.providers.filter(provider => {
          return (provider.provider = "spotify");
        });

        spotifyHelper.refreshMyToken(
          user.id,
          spotifyProvider[0],
          (results, err) => {
            if (results) {
              res.redirect(`/spotify/${user.id}/player`);
            }
            if (err) res.json(err);
          }
        );
      })
      .catch(err => {
        console.error(err);
      });
  });

  /*
  app.get("/", function(req, res) {
    if (req.user) {
      res.json(req.user);
    } else {
      res.json({ user: false, login: "http://localhost:8888/auth/spotify" });
    }
  });

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
  */

  app.get("/spotify/:userId", async (req, res) => {
    const userId = req.params.userId;
    await User.getUserById(userId)
      .then(user => {
        //get the spotify provider info
        let spotifyProvider = user.providers.filter(provider => {
          return (provider.provider = "spotify");
        });

        var spotifyApi = new SpotifyWebApi({
          accessToken: spotifyProvider[0].access_token
        });

        spotifyApi
          .getMe()
          .then(data => {
            res.json(data.body);
          })
          .catch(err => {
            if (err.statusCode === 401) {
              spotifyHelper.refreshMyToken(
                user.id,
                spotifyProvider[0],
                (results, err) => {
                  if (results) {
                    res.redirect(`/spotify/${user.id}`);
                  }
                  if (err) res.json(err);
                }
              );
            }
          });
      })
      .catch(err => {
        console.error(err), res.json(err);
      });
  });
}; //end module exports
