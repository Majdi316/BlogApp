const express = require("express");
const connectToDb = require("./config/connectToDb");
const xss = require("xss-clean");
const rateLimiting = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
const { errorHandler, notFound } = require("./middlewares/error");
const cors = require("cors");
/*CORS requests refers to the method that allows you to make requests to
 the server deployed at a different domain.
 As a reference, if the frontend and backend are at two different domains,
 we need CORS there.*/
require("dotenv").config();

//Connection To Db
connectToDb();

//Init App
const app = express();

//Middlewares
app.use(express.json());
//Security Headers
app.use(helmet());
//Prevent Http Param Pollution
app.use(hpp());
//Prevent XSS
app.use(xss());
//Rate Limiting
app.use(
  rateLimiting({
    windowMs: 10 * 60 * 1000, //10 minutes
    max: 200,
  })
);

//Cors Policy
app.use(
  cors({
    origin: "http://localhost:3000", //give serves just to this domain
  })
);

//Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/posts", require("./routes/postsRoute"));
app.use("/api/comments", require("./routes/commentsRoute"));
app.use("/api/categories", require("./routes/categoriesRoute"));
app.use("/api/password", require("./routes/passwordRoute"));

//Error Handler Middleware
app.use(notFound);
app.use(errorHandler);

//Running The Server
const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(
    `Server Is Running in ${process.env.NODE_ENV} mode on port ${PORT} `
  )
);
