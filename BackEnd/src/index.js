const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
dotenv.config();

const app = express();
const port = process.env.PORT || 3001

app.use(express.json()); 
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, // Cho phép gửi cookie từ FE
}));
app.use(express.json({ limit: '50mb' })); // Tăng giới hạn
app.use(express.urlencoded({ limit: '50mb', extended: true }));
routes(app);

// connect to database
mongoose.connect(`${process.env.MONGOOSE_DB}`)
.then (() =>{
    console.log("Connected to MongoDB")
})
.catch ((err) => console.log(err))

// running port
app.listen(port, () => {
    console.log("Server is running on port " + port)
}    
);