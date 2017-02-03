const PORT = process.env.PORT || 3000;
const serverApp = require('express')();
serverApp.set('port', PORT);

//const bodyParser = require('body-parser')
const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, 'students.json');
const addnew_filePath = path.join(__dirname, 'newstudent.json');

//middleware
//serverApp.use(bodyParser.json(addnew_filePath));
serverApp.use('/', (req, res, next) => {
	fs.readFile(filePath, 'utf8', (err, data) => {
		if(err){
      return res.send(err);
    }
		req.studentDatas = JSON.parse( data );
		next();
	});
});

serverApp.use('/student/:id', (req, res, next) => {
  req.dataposition = -1;
  for(var i = 0; i < req.studentDatas.length; i++){
    if(req.studentDatas[i]["_id"] == req.params.id){
      req.dataposition = i;
      break;
    }
  }
  //if(req.dataposition == -1){
    //res.send('not match');
  //}
  next();
});

const saveFile = (allstudentDatas) => {
	fs.writeFile(filePath, JSON.stringify(allstudentDatas, null, 4));
};

//Show lists of all students.
serverApp.get('/', (req, res) => {
  res.send(JSON.stringify(req.studentDatas));	
});

//Add detail of new students.
serverApp.post('/student/:id', (req, res) => {
  fs.readFile(addnew_filePath, 'utf8', (err, data) => {
    if(err){
      return res.send(err);
    }
	  var newstudent = JSON.parse( data );
    //if student isn't exist, req.dataposition will be -1
    if(req.dataposition === -1){
      req.studentDatas.push(newstudent);
    }else{
      req.studentDatas[req.dataposition] = newstudent;
    }
    saveFile(req.studentDatas);
    res.end("Add successfully!");
  });
});

//Show detail of a student.
serverApp.put('/student/:id', (req, res) => {
  if(req.dataposition === -1){
    //if student isn't exist, req.dataposition will be -1
    res.send('Not exist');
  }else{
	  res.send(JSON.stringify(req.studentDatas[req.dataposition]));
  }
});

//Delete an existing student.
serverApp.delete('/student/:id', (req, res) => {
  if(req.dataposition === -1){
    //if student isn't exist, req.dataposition will be -1
    res.send('Not exist');
	}else{
		req.studentDatas.splice(req.dataposition, 1);
    saveFile(req.studentDatas);
    res.end('deleted successfully!');
	}
});

serverApp.listen(serverApp.get('port'), () => {
  console.log('serverApp listening on port ' + serverApp.get('port'));
});