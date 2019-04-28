const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const rank = require("./controllers/rank");

const app = express();

const db = knex({
        client: 'pg',
        connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'test',
        database : 'knowface'
    }
});


app.use(bodyParser.json());
app.use(cors());

//ROOT
app.get('/', (req,res) => {res.send("Its working!")});

// SIGN IN
app.post('/signin',(req,res) => { signin.handleSignin(req,res,db,bcrypt)});

// Register
app.post('/register',(req,res) => {register.handleRegister(req,res,db,bcrypt)} );

//Profile
app.get('/profile/:id',(req,res) => { profile.handleProfile(req,res,db) });


//Rank
app.put('/image', (req,res) => { rank.handleRank(req,res,db) });


//Server
app.listen( process.env.PORT || 3000 ,() =>{
    console.log(`App is running on port ${process.env.PORT}!`);
})
