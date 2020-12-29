const express = require("express");
const env = require("dotenv");
const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter");
const orderRouter = require("./routers/orderRouter");
const bodyParser = require("body-parser");
const path = require("path");

env.config();
require("./config/db");
const app = express();

const PORT = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(express.json());
app.use("/api", userRouter);
app.use("/api", productRouter);
app.use("/api", orderRouter);
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/" , (req, res)=>{
    res.send("API is running....")
  })
}
app.listen(PORT, () => {
  console.log(`Server is running on port - ${PORT}`.cyan.inverse);
});
