// Connect to MongoDB
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const dbClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectID;
const dbUrl = 'mongodb://localhost/students';
const Router = require('./routes/router');


let db;
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/'));
//connected to the mongoDBs
app.use((req, res, next) => {
    if (db) {
        req.db = db;
        return next();
    } else {
        dbClient.connect(dbUrl, (err, db) => {
            if (err) return res.send(err);
            req.db = db;
            console.log("connected to the mongoDB !");
            return next();
        });
    }
});


app.use(Router);
app.listen(8888);
