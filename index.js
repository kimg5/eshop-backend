require("dotenv").config();

const express = require("express");
require('express-async-errors');
const bodyParser = require("body-parser");
const cors = require("cors"); //cross-orign resource sharing

const app = express();
app.use(cors()); // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://root:" + process.env.MONGODB_PWD + "@cluster0.srty3iw.mongodb.net/myFirstDb?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(express.json()); // Allows express to read a request body
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const productRouter = require('./routes/product');
const filtersRouter = require('./routes/filters');
const normalRouter = require('./routes/normal');

app.use('/admin', adminRouter);
app.use('/normal', normalRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/filters', filtersRouter);

const exceptionHandler = require('./middlewares/exceptionHandler');
app.use(exceptionHandler);

const port = 3001; // Must be different than the port of the React app
app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
