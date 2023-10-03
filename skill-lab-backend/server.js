const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const log4js = require('log4js');
const helmet = require("helmet");
// const cookieParser = require("cookie-parser");
// const csurf = require("csurf"); 

/* Initializing Logger */
const logger = log4js.getLogger();
logger.level = 'info';

dotenv.config();
const app = express();

/* Prevent Information Exposure */
app.use(helmet());

app.use(express.json());

/* Allow Trusted Origins */
const corsOptions = {
  origin: (origin, callback) => {
    const trustedOrigins = ['http://localhost:3000', 'https://www.google.com', 'https://mail.google.com'];

    if (trustedOrigins.includes(origin)) {
      callback(null, true); 
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
// app.use(cookieParser());

mongoose.connect(process.env.DB_CONNECT, err => {
  if (err) {
    logger.error("MongoDB Connection Error:", err);
  } else {
    logger.info("MongoDB Connection Success");
  }
});

// const csrfProtection = csurf({ cookie: true }); 

// app.use(csrfProtection); 

// app.use((req, res, next) => {
//   res.cookie("XSRF-TOKEN", req.csrfToken(), { httpOnly: false });
//   next();
// });

const routWallet = require("./Routes/FinanceRoute");
app.use("/api/finance", routWallet);

const routeProduct = require("./Routes/StoreRoute");
app.use("/api/store", routeProduct);

const routCareer = require("./Routes/JobRoute");
app.use("/api/job", routCareer);

const routEnroll = require("./Routes/StudentRoute");
app.use("/api/student",routEnroll);

const courseroute = require("./Routes/CourseRoute");
app.use("/api/course",courseroute);

const routQuestion = require("./Routes/LecturerRoute");
app.use("/api/lecturer", routQuestion);

const routAuthentication = require("./Routes/AuthenticationRoute");
app.use("/api/AuthenticationRoute", routAuthentication);

const routReview = require("./Routes/FeedbackRoute");
app.use("/api/feedback", routReview);

app.listen(4000, err => {
  if (!err) {
    logger.info("successfully connected to the port ", 4000)
  } else {
    logger.error("Error occured:", err);
  }
});
