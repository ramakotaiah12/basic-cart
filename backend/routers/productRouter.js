const express = require("express");
const router = new express.Router();
const Product = require("../models/productModel");
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

//create the products private route
//@ /api/products/create
router.post(
  "/products/create",
  auth,
  admin,
  upload.single("image"),
  async (req, res) => {
    try {
      const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
        .png()
        .toBuffer();
      const product = new Product({
        user: req.user._id,
        image: buffer,
        name: req.body.name,
        brand: req.body.brand,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        countInStock: req.body.countInStock,
      });
      await product.save();
      res.status(201).json({ product });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ Error: "Server error" });
    }
  }
);
//get all products public route
//@ /api/products
router.get("/products", async (req, res) => {
  try {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    if (!products) {
     return  res.status(500).json({ Error: "Server error" });
    }
    res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: "Server error" });
  }
});
//get all products public route
//@ /api/products
router.get("/products/low-price", async (req, res) => {
  try {
    
    const products = await Product.find({}).sort({ price : -1}).limit(3)
      res.json({products})
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: "Server error" });
  }
});
//update product private admin only
//@ /api/admin/product/:id
router.put(
  "/products/:id",
  auth,
  admin,
  upload.single("image"),
  async (req, res) => {
    try {
      const product = await Product.findById({ _id: req.params.id });
      if (!product) {
        return res.status(500).json({ Error: "Product not found" });
      }
      if (req.file) {
        product.image = await sharp(req.file.buffer)
          .resize({ width: 250, height: 250 })
          .png()
          .toBuffer();
      }
      (product.name = req.body.name || product.name),
        (product.brand = req.body.brand || product.brand),
        (product.category = req.body.category || product.category),
        (product.description = req.body.description || product.description),
        (product.price = req.body.price || product.price),
        (product.countInStock = req.body.countInStock || product.countInStock),
        await product.save();
      res.status(200).json({ product });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ Error: "Server error" });
    }
  }
);
//get all productspublic route
//@ /api/product/:id
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params.id });
    if (!product) {
      return res.status(500).json({ Error: "Server error" });
    }
    res.status(200).json({ product });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: "Server error" });
  }
});
//get all productspublic route
//@ /api/product/:id
router.delete("/products/:id", auth, admin, async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params.id });
    if (!product) {
      res.status(500).json({ Error: "Server error" });
    }
    await product.remove();
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: "Server error" });
  }
});
module.exports = router;
