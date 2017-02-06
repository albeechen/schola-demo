const PORT = process.env.PORT || 3000;
const serverApp = require('express')();
serverApp.set('port', PORT);

const bodyParser = require('body-parser')
const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, 'students.json');
const addnew_filePath = path.join(__dirname, 'newstudent.json');

//middleware
serverApp.use(bodyParser.json());
serverApp.use('/', (req, res, next) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.send(err);
        }
        req.studentDatas = JSON.parse(data);
        next();
    });
});

serverApp.use('/student/:id', (req, res, next) => {
    const matchResult = req.studentDatas.find((element) => {
        if (element._id == req.params.id) {
            req.selectedStudentIndex = req.studentDatas.indexOf(element);
            return element._id == req.params.id;
        }
    });
    if (matchResult && req.method === "POST")
        return res.send('existed. Please use put');
    if (!matchResult && req.method != "POST") {
        return res.send('no match');
    } else {
        next();
    }
});

const saveFile = (allstudentDatas) => {
    fs.writeFile(filePath, JSON.stringify(allstudentDatas, null, 4), (err) =>{
        if(err)
            return res.send('write file fail');
    });
};

//Show lists of all students.
serverApp.get('/', (req, res) => {
    res.send(JSON.stringify(req.studentDatas));
});

//Show detail of a student.
serverApp.get('/student/:id', (req, res) => {
    res.send(JSON.stringify(req.studentDatas[req.selectedStudentIndex]));
});

//Add detail of new students.
serverApp.post('/student/:id', (req, res) => {
    req.studentDatas.push(req.body);
    saveFile(req.studentDatas);
    res.end(JSON.stringify(req.studentDatas[req.selectedStudentIndex]));
});

//Modified of a student.
serverApp.put('/student/:id', (req, res) => {
    req.studentDatas[req.selectedStudentIndex] = req.body;
    saveFile(req.studentDatas);
    res.end(JSON.stringify(req.studentDatas[req.selectedStudentIndex]));
});

//Delete an existing student.
serverApp.delete('/student/:id', (req, res) => {
    req.studentDatas.splice(req.selectedStudentIndex, 1);
    saveFile(req.studentDatas);
    res.end('deleted successfully!');
});

serverApp.listen(serverApp.get('port'), () => {
    console.log('serverApp listening on port ' + serverApp.get('port'));
});
