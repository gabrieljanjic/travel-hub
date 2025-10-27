const bcrypt = require("bcryptjs");
const User = require("../models/AuthModel");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

exports.login = async (req, res) => {
  try {
    const { email, password, action } = req.body;

    if (!email || !password || !action) {
      return res.status(400).json({
        status: "fail",
        message: "Email, password and action are required",
      });
    }

    if (action === "register") {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ status: "fail", message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ email, password: hashedPassword });

      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.json({
        status: "success",
        message: "User registered",
        data: { userId: user._id, email: user.email },
      });
    } else if (action === "login") {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.json({ status: "success", message: "Logged in" });
    } else {
      return res.status(400).json({ message: "Unknown action" });
    }
  } catch (err) {
    return res.status(500).json({ status: "fail", message: err.message });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
  });

  return res.json({ status: "success", message: "Logged out" });
};

exports.checkAuth = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json({ authenticated: false });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    return res.json({
      authenticated: true,
      user: { id: decoded.id, email: decoded.email },
    });
  } catch (err) {
    return res.json({ authenticated: false });
  }
};

exports.requireAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You have to be loged in",
      });
    }
    jwt.verify(token, JWT_SECRET);

    next();
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: "Invalid token. Please log in again.",
    });
  }
};
