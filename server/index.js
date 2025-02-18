let express = require("express");
let mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
require("dotenv").config();
let cors = require('cors')
const enquiryRoutes = require("./routes/enquiryRoutes");
const router = require('./routes/auth');
const userRoutes = require("./routes/userRoutes");

const app = express();
// app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));


app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"], // Allow both frontend origins
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  exposedHeaders: ["Set-Cookie"]
}));
app.use(express.json());

// crud api
app.use('/api',enquiryRoutes); 
app.use('/api', router);
app.use('/api', userRoutes);



// database connection
mongoose.promise = global.Promise;
mongoose.set("strictQuery",false);
mongoose.connect(process.env.DBurl).then(() => {
  console.log("Database connection established");
  app.listen(process.env.PORT || 3000, function (req, res) {
    console.log("server is running on the port " + process.env.PORT);
  });
});
