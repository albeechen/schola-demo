// Connect to MongoDB
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const dbClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectID;
const dbUrl = 'mongodb://localhost/students';
const studentRouter = require('./student.router');


let db;
app.use(bodyParser.json());
//connected to the mongoDB
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


//get collection:testCollection from mongoDB
app.use('/test', (req, res, next) => {
    req.dbstudents = req.db.collection('students');
    next();
});


app.use('/test/:studentId', (req, res, next) => {
    req.dbstudents.findOne({
        studentId: req.params.studentId
    }, (err, result) => {
        if (err) {
            res.status(404).send(err);
        } else {
            if(req.method != "POST" && !result){
                res.send('no match');
            }else{
                req.target = result;
                next();
            }
        }
    });
});

app.get('/test', studentRouter);
app.get('/test/:studentId', studentRouter);
app.post('/test/:studentId', studentRouter);
app.put('/test/:studentId', studentRouter);
app.delete('/test/:studentId', studentRouter);

app.listen(8888);
