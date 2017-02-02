const PORT = process.env.PORT || 3000;
const serverApp = require('express')();
serverApp.set('port', PORT);

const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, 'students.json');

const addnew_filePath = path.join(__dirname, 'newstudent.json');
//Middleware
var studentDatas = "";
//middleware
serverApp.use('/', (req, res, next) => {
	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err){
      return err;
    }
		studentDatas = JSON.parse( data );
		next();
	});
});

const checkIdIsExist = (numId) => {
	var newstudent = studentDatas[numId];
  if(newstudent === undefined ){
    	return false;
  }else{
    	return true;
  }
};

const saveFile = () => {
	fs.writeFile(filePath, JSON.stringify(studentDatas, null, 4));
};

//Show lists of all students.
serverApp.get('/', (req, res) => {
  res.send(JSON.stringify(studentDatas));	
});

//Add detail of new students.
serverApp.post('/addStudent', (req, res) => {
  fs.readFile(addnew_filePath, 'utf8', (err, data) => {
    if (err){
      return err;
    }
	  var newStudent = JSON.parse( data );
    //If post student isn't exist, push to the file
    if(!checkIdIsExist(newStudent[0]["_id"])){
      studentDatas.push(newStudent[0]);
      //If post student is exist, replace it
    }else{
      studentDatas[newId] = newStudent[0];
    }
    saveFile();
    res.end(JSON.stringify(studentDatas));
  });
});

//Show detail of a student.
serverApp.put('/id/:id', (req, res) => {
 	var numId = req.params.id;
 	//If student is exist, show it
 	if(checkIdIsExist(numId)){
		res.send(JSON.stringify(studentDatas[numId]));
  }else{
	//if student isn't exist, show not exist
  	res.send('Not exist');
  }
});

//Delete an existing student.
serverApp.delete('/id/:id', (req, res) => {
  var numId = req.params.id;
  //If student is exist, delete it
  if(checkIdIsExist(numId)){
    delete studentDatas[numId];
    saveFile();
    res.end('deleted/n' + JSON.stringify(studentDatas));
	}else{
	  //if student isn't exist, show not exist
		res.send('Not exist');
	}
});

serverApp.listen(serverApp.get('port'), () => {
  console.log('serverApp listening on port ' + serverApp.get('port'));
});