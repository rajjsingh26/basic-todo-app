require('dotenv').config();
const app = require('./app');
const connectDb = require('./config/dbConnection.js');

// connect with database
connectDb()

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running at port ${process.env.PORT}`)
})