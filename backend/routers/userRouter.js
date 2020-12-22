const express = require("express");
const router = new express.Router();
const User = require("../models/userModel");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const multer = require("multer");
const sharp = require("sharp");

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  },
});

//create the users public route
//@ /api/users/register

router.post("/users/register", upload.single("avatar"), async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ Error: "User already found" });
    }
    let buffer;
    if (req.file) {
      console.log(req.file);
      buffer = await sharp(req.file.buffer)
        .resize({ width: 250, height: 250 })
        .png()
        .toBuffer();
    }

    user = new User({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
      avatar: buffer,
    });
    if (!user) {
      return res.status(404).json({ Error: "Unable to create the user" });
    }
    const token = await user.generateAuthToken();
    await user.save();

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      avatar: user.avatar,
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: "Server error" });
  }
});
//login the users public route
//@ /api/users/login
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    if (!user) {
      return res.status(404).json({ Error: "Invalid credentials" });
    }
    const token = await user.generateAuthToken();

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      avatar: user.avatar,
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: "Server error" });
  }
});
//get the user profile  private route
//@ /api/users/profile
router.get("/users/profile", auth, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ Error: "No profile" });
    }
    res.status(200).json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      isAdmin: req.user.isAdmin,
      avatar: req.user.avatar,
      token: req.token,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: "Server error" });
  }
});
//update the user profile  private route
//@ /api/users/profile
router.put(
  "/users/profile",
  upload.single("avatar"),
  auth,
  async (req, res) => {
    try {
      let user = await User.findById(req.user._id);

      if (!user) {
        return res.status(400).json({ Error: "User not found" });
      }
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      let buffer;
      if (req.file) {
        console.log(req.file);
        buffer = await sharp(req.file.buffer)
          .resize({ width: 250, height: 250 })
          .png()
          .toBuffer();
      }
      user.avatar = buffer || user.avatar;

      await user.save();
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        avatar: user.avatar,
        token: req.token,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ Error: "Server error" });
    }
  }
);
//update all the users private only by admin
//@ /api/admin/users/
router.get("/admin/users", auth, admin, async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({ users });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: "Server error" });
  }
});
// delete user by admin private admin only
///api/admin/user/:id
router.delete("/admin/user/:id", auth, admin, async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "User Deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: "Server error" });
  }
});
// make user as admin private admin only
///api/admin/user/:id
router.put("/admin/user/:id", auth, admin, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(400).json({ Error: "User not found" });
    }
    user.isAdmin = !user.isAdmin;
    await user.save();
    res
      .status(200)
      .json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: "Server error" });
  }
});
module.exports = router;
