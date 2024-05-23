const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(express.json());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const multer = require("multer");

app.use(cors());

// MongoDB connection
const mongoUrl =
  "mongodb+srv://2rreiyhes:8ZMnihKsIShl5F39@cluster0.4ct5meb.mongodb.net/Kopi";
const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe";
mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.error("Database Connection Error:", err));

// User model
require("./UserDetails");
const User = mongoose.model("users");

// Admin model

// Routes
app.get("/", (req, res) => {
  res.send({ status: "Started" });
});
// Login route
app.post("/login-user", async (req, res) => {
  const { username, password, userType } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).send({ error: "Invalid Credentials" });
  }

  if (password !== user.password) {
    return res.status(400).send({ error: "Invalid Credentials" });
  }

  const token = jwt.sign({ username: user.username }, JWT_SECRET);
  res.send({
    status: "ok",
    data: token,
    userType: user.userType,
  });
});

// else if (password === user.password) {
//   const token = jwt.sign({ username: user.username }, JWT_SECRET);
//   if (res.status(201)) {
//     return res.send({
//       status: "ok",
//       data: token,
//       userType: user.userType,
//     });
//   } else {
//     return res.status(400).send({ error: "Invalid password" });
//   }
// }
// userdata route
app.post("/userdata", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const username = user.username;

    User.findOne({ username: username }).then((data) => {
      return res.send({ status: "Ok", data: data });
    });
  } catch (error) {
    return res.send({ error: error });
  }
});
// update-user route //
app.post("/update-user", async (req, res) => {
  const { username, password, userType, email } = req.body;
  console.log(req.body);
  try {
    await User.updateOne(
      { username: username },
      {
        $set: {
          username,
          password,
          userType,
          email,
        },
      }
    );
    res.send({ status: "Ok", data: "Updated" });
  } catch (error) {
    return res.send({ error: error });
  }
});
// get-all-user route //
app.get("/get-all-user", async (req, res) => {
  try {
    const userType = req.query.userType;

    let data;
    if (userType === "user") {
      data = await User.find({ userType: userType });
    } else {
      data = await User.find({});
    }

    res.send({ status: "Ok", data: data });
  } catch (error) {
    return res.send({ error: error });
  }
});

// delete-user route //
app.post("/delete-user", async (req, res) => {
  const { id } = req.body;
  try {
    await User.deleteOne({ _id: id });
    res.send({ status: "Ok", data: "User Deleted" });
  } catch (error) {
    return res.send({ error: error });
  }
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// PRODUCT SECTION //
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/images"); // Store images in "assets/images" directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use original file name
  },
});

const upload = multer({ storage: storage });

// Product model //
require("./ProductDetails");
const product = mongoose.model("product");

app.post("/addproducts", async (req, res) => {
  const { prodname, price, quantity, category, image } = req.body;
  console.log(req.body);

  try {
    const existingProduct = await product.findOne({ prodname: prodname });

    if (existingProduct) {
      return res
        .status(400)
        .json({ success: false, error: "Product already exists" });
    }

    const newProduct = await product.create({
      prodname: prodname,
      price: price,
      quantity: quantity,
      category: category,
      image: image,
    });

    res.status(200).json({
      success: true,
      message: "Product added successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      success: false,
      error: "Failed to add product. Please try again.",
    });
  }
});

app.get("/getproducts", async (req, res) => {
  try {
    const products = await product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

app.delete("/removeproduct/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Received request to remove product with ID:", id); // Add this line for logging
  try {
    await product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    console.error("Error removing product:", error.message); // Log any errors that occur during removal
    res.status(500).json({ error: "Failed to remove product" });
  }
});

app.put("/editproduct/:id", async (req, res) => {
  const { id } = req.params;
  const { prodname, price, quantity, category } = req.body;

  try {
    await product.findByIdAndUpdate(id, {
      prodname,
      price,
      quantity,
      category,
    });
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

// ORDERS //
require("./OrderDetails");
const Order = mongoose.model("orders");

app.post("/placeorder", async (req, res) => {
  const { productNames, quantities, totalAmount } = req.body;
  console.log(req.body);
  try {
    const newOrder = await Order.create({
      productNames: productNames,
      quantities: quantities,
      amount: totalAmount,
    });
    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      data: newOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      success: false,
      error: "Failed to place order. Please try again.",
    });
  }
});
app.get("/getorders", async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
