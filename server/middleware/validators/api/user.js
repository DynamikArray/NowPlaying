//Checks endpoint resourceIds to be proper ObjectIds when needed
const { check, validationResult } = require("express-validator/check");

//handles paramater part of this resource for User
exports.checkUserResourceBody = [
  check("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Not a valid username, must be at least 3 charachters"),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Not a valid email format"),
  check("avatar")
    .optional()
    .isURL()
    .withMessage("Not a valid URL format"),
  /*
  check("position.lat")
    .optional()
    .isLatLong()
    .withMessage("Not a valid Lat"),
  check("position.lng")
    .optional()
    .isLatLong()
    .withMessage("Not a valid Lng"),
    */
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.mapped() });
    } else {
      next();
    }
  }
];

/*


*/
exports.buildUserResourceFields = (req, res, next) => {
  //Cleans up the body object with only the fields we have/want
  // email, name, avatar
  var fields = {};
  if (req.body.email) fields.email = req.body.email;
  if (req.body.name) fields.name = req.body.name;
  if (req.body.avatar) fields.avatar = req.body.avatar;
  if (req.body.position) fields.position = req.body.position;

  req.resourceFields = fields;
  next();
};
