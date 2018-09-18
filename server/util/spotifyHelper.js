const env = require("dotenv").config();
const axios = require("axios");
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const querystring = require("querystring");

/*
async function getMyDetails(userId, cb) {
  //look me up in mongo
  await User.getUserById(userId)
    .then(user => {
      //get the spotify provider info
      let spotifyProvider = user.providers.filter(provider => {
        return (provider.provider = "spotify");
      });

      //maybe put the expires in here, and if the code is set to expire in the next 30
      //get new code first, before doing this ????

      axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: "Bearer " + spotifyProvider[0].access_token
          }
        })
        .then(response => {
          cb(response.data, false);
        })
        .catch(err => {
          if ((err.status = 401)) {
            refreshMyToken(userId, spotifyProvider[0], (user, err) => {
              if (user) {
                //return false or err
                getMyDetails(userId, cb);
              }
              if (err) {
                cb(false, { error: "Could not refresh token" });
              }
            });
          }
        });
    })
    .catch(err => {
      console.error("getMyDetails:".err);
      cb(false, error);
    });
}
*/

function refreshMyToken(userId, provider, cb) {
  axios
    .post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: provider.refresh_token
      }),
      {
        headers: {
          Authorization:
            "Basic " +
            CryptoJS.enc.Base64.stringify(
              CryptoJS.enc.Utf8.parse(
                `${process.env.SPOTIFY_CLIENT_ID}:${
                  process.env.SPOTIFY_CLIENT_SECRET
                }`
              )
            )
        }
      }
    )
    .then(response => {
      const data = response.data;
      if ((data || {}).access_token) {
        User.updateRefreshToken(userId, data.access_token).then(user => {
          cb(user, false);
        });
      }
    })
    .catch(err => {
      cb(false, err);
    });
}

module.exports = {
  refreshMyToken
};
