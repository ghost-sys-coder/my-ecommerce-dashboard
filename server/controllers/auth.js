import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import sendEmailVerification from "../lib/nodemailer.js";
import { createToken, maxAge } from "../lib/token.js";

/**
 * ! Register New User
 */
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    /** check if user exists */
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(401).json({ message: "User already exists!" });
    }

    const user = await User.create({
      name,
      email,
      password,
      verificationToken: crypto.randomBytes(20).toString("hex"),
    });

    /** send verification email */
    await sendEmailVerification(user.email, user.verificationToken);

    return res.status(200).json({ message: "User registration successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

/**
 * ? Verify verification token
 */
const verifyToken = async (req, res) => {
  try {
    const { token } = req.params;

    /** find user with the given verification token */
    const user = await User.findOneAndUpdate(
      { verificationToken: token },
      { $set: { verified: true, verificationToken: "" } },
      { new: true, multi: true }
    );
    if (!user) {
      return res.status(401).json({ message: "Invalid verification token!" });
    }

    res.status(200).json({ message: "User token has been verified!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Token verification failed!" });
  }
};

/**
 * ! Login User;
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    /** check if user is verified */
    const user = await User.login(email, password);

    const token = await createToken(
      user._id,
      user.email,
      user.Admin,
      user.name
    );
    res.cookie("authToken", token, {
      maxAge: maxAge * 1000,
      sameSite: "None",
      secure: true,
    });
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

/**
 * ? Logout user
 */
const logoutUser = async (req, res) => {
  res.cookie("authToken", "", { maxAge: 1 }).json({ message: "Logged Out" });
};

const userProfile = async (req, res) => {
  const { authToken } = req.cookies;
  if (authToken) {
    jwt.verify(
      authToken,
      process.env.AUTH_SECRET,
      {},
      async (err, userInfo) => {
        if (err) throw err;
        const { _id, name, email, Admin } = await User.findById(userInfo.id);
        return res.status(200).json({ _id, name, email, Admin });
      }
    );
  } else {
    return res.status(500).json(null);
  }
};

export { registerUser, verifyToken, loginUser, logoutUser, userProfile };
