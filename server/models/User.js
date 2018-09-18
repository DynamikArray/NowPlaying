const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * [userSchema description]
 *
 * @type {Schema}
 */
const userSchema = new Schema(
  {
    name: String,
    avatar: String,
    email: String,
    providers: []
  },
  {
    timestamps: true
  }
);

var User = mongoose.model("User", userSchema);
async function createSpotifyUser(
  profile,
  access_token,
  refresh_token,
  expires_in,
  provider,
  id
) {
  const avatar = profile.profileUrl;
  const name = profile.displayName;
  const email = "";

  return (user = await new User({
    name,
    avatar,
    email,
    providers: [
      {
        provider: provider,
        id: id,
        access_token: access_token,
        refresh_token: refresh_token,
        expires_in: expires_in
      }
    ]
  }).save());
}

//get a single usser by there external provider id
async function getUserByExternalId(provider, id) {
  return (user = await User.findOne({
    providers: { $elemMatch: { provider: provider, id: id } }
  }));
}

// Get a single user by their Internal ID
async function getUserById(id) {
  return (user = await User.findOne({
    _id: id
  }));
}

async function updateByUserId(id, fields) {
  return (user = await User.findOneAndUpdate(
    { _id: id },
    { $set: { ...fields } },
    { new: true }
  ));
}

async function updateProviderById(id, provider) {
  return (user = await User.findOneAndUpdate(
    { _id: id },
    { $set: { "providers.1": provider } },
    { new: true }
  ));
}

async function updateRefreshToken(id, token) {
  return (user = await User.findOneAndUpdate(
    { _id: id, "providers.provider": "spotify" },
    { $set: { "providers.$.access_token": token } },
    { new: false }
  ));
}

module.exports = {
  User,
  getUserByExternalId,
  getUserById,
  updateByUserId,

  createSpotifyUser,
  updateProviderById,
  updateRefreshToken
};
