const dotenv = require('dotenv');
const express = require('express');
const colors = require('colors');
const ConnectedDB = require('./config/db.js');
const router = require('./routes/userRoutes.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require("cookie-parser");

const corsorigin = process.env.CORS_ORIGIN;

dotenv.config();
ConnectedDB(); 

const app = express();
app.use(cookieParser());

app.use(bodyParser.json());
app.use(cors({
    origin: corsorigin, // replace with your frontend origin
    credentials: true,
  }));

const port = process.env.PORT || 4000;


app.get('/', (req, res) => {
    res.json('Api is working...!')
});


app.use('/Api/user', router);

app.listen(port, (err) => {
    if (err) {
        console.error(`Error starting the server: ${err.message}`.bgRed.bold);
    } else {
        console.log(`Server Started at port ${port}`.bgYellow.bold);
    }
});