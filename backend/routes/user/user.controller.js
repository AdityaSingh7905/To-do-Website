const User = require("../../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function signupUser(req, res) {
  console.log(req.body);
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists!" });
    }

    // console.log("Before Hashing: ", password);
    // const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("After Hashing: ", hashedPassword);

    const user = new User({ username, email, password });
    await user.save();

    //generate jwt token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res
      .status(201)
      .json({ success: true, message: "User registered successfully!", token });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
}

async function signinUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    // console.log("Entered Password:", password);
    // console.log("Stored Hashed Password:", user.password);

    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // console.log(isPasswordValid);

    const isPasswordValid = password === user.password;
    console.log(isPasswordValid);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    console.log(user);
    // generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong!" });
  }
}

module.exports = {
  signinUser,
  signupUser,
};
