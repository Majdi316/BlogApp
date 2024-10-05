const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require("../models/User");
const VerificationToken = require("../models/VerificationToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

/**-------------------------------------------------
 * @desc  Register new User
 * @route  /api/auth/register
 * @method  POST
 * @access public
 * 
 ---------------------------------------------------*/

module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
  //Validation
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
    //status 400 is bad request
  }
  //is user already exists
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "user already exists" });
  }
  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  //new user and save it in DB
  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  await user.save();
  //TODO sending email to verify
  //1. Creating new verificationToken & save it to DB
  const verificationToken = new VerificationToken({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"), //Random String
  });
  await verificationToken.save();
  //2. Making the Link
  const link = `http://localhost:3000/users/${user._id}/verify/${verificationToken.token}`;
  //3. Putting the link into html template
  const htmlTemplate = `
  <div>
    <p>Click on the link below to verify your email</p>
    <a href="${link}">Verify</a>
  </div>
  `;
  //4. Sending Email to the user
  await sendEmail(user.email, "Verify Your Email", htmlTemplate);

  //send the response to the client
  res.status(201).json({
    message: "We sent to you an Email,please verify your Email address",
  });
});

/**-------------------------------------------------
 * @desc  Login User
 * @route  /api/auth/login
 * @method  POST
 * @access public
 * 
 ---------------------------------------------------*/
module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
  //1.validation
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
    //status 400 is bad request
  }
  //2.is user exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password!!!!" });
  }
  //3. check the password
  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch) {
    return res
      .status(400)
      .json({ message: "Password is incorrect please try again " });
  }
  //TODO sending email to verify
  if (!user.isAccountVerified) {
    let verificationToken = await VerificationToken.findOne({
      userId: user._id,
    });
    if (!verificationToken) {
      verificationToken = new VerificationToken({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      });
    }
    await verificationToken.save();
    //2. Making the Link
    const link = `http://localhost:3000/users/${user._id}/verify/${verificationToken.token}`;
    //3. Putting the link into html template
    const htmlTemplate = `
  <div>
    <p>Click on the link below to verify your email</p>
    <a href="${link}">Verify</a>
  </div>
  `;
    //4. Sending Email to the user
    await sendEmail(user.email, "Verify Your Email", htmlTemplate);
    return res.status(400).json({
      message: "We sent to you an Email,please verify your Email address",
    });
  }
  //4. generate new token (jwt)
  const token = user.generateAuthToken();
  //5. response to client
  res.status(200).json({
    _id: user._id,
    username: user.username,
    isAdmin: user.isAdmin,
    profilePhoto: user.profilePhoto,
    token,
  });
});

/**-------------------------------------------------
 * @desc  Verify User Account
 * @route  /api/auth/:userId/verify/:token
 * @method  GET
 * @access public
 * 
 ---------------------------------------------------*/
module.exports.verifyUserAccountCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(400).json({
      message: "Invalid link",
    });
  }
  const verificationToken = await VerificationToken.findOne({
    userId: user._id,
    token: req.params.token,
  });
  if (!verificationToken) {
    return res.status(400).json({
      message: "Invalid link",
    });
  }
  user.isAccountVerified = true;
  await user.save();
  await verificationToken.deleteOne({
    userId: user._id,
    token: req.params.token,
  });
  res.status(200).json({
    message: "Your Account verified",
  });
});
