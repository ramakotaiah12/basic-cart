const mongoose = require('mongoose');
const env = require('dotenv');
env.config();
const colors = require('colors')
mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex : true,
    useFindAndModify : false,
    useNewUrlParser : true,
    useUnifiedTopology : true
}, ()=>{
    console.log("MONGODB Connected".cyan.inverse)
})