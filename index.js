const express = require('express'); 
const app = express(); 
require('dotenv').config({}); 
const session = require('express-session'); 
const cookieParser = require('cookie-parser'); 
const MongoStore = require('connect-mongo');


const connectDB = require('./db'); 

app.use(express.static('public')); 
app.use(express.json())
app.use(cookieParser())

app.use(session({
    resave: false,
    secret: 'secret',
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    store: MongoStore.create({ mongoUrl: process.env.URI, collection: 'sessions' }),
    
}))

connectDB()






const kidsrouter = require('./routes/kidroutes'); 
const userrouter = require('./routes/userroutes'); 

app.use('/', kidsrouter); 
app.use('/', userrouter);




app.listen(process.env.PORT, function () {
    console.log(`server @ ${process.env.PORT}`)
})
