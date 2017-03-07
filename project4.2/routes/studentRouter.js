const express = require('express');
const studentRouter = express.Router();
const StudentController = require('./student.controller');

// return array
studentRouter.use(StudentController.getMonogoDB.bind(StudentController));
studentRouter.get('/students?', StudentController.get.bind(StudentController));
//router.post('/students?', StudentController.post.bind(StudentController));

// return single object
studentRouter.use('/students?/:studentId', StudentController.find.bind(StudentController));
studentRouter.get('/students?/:studentId', StudentController.getOne.bind(StudentController));
studentRouter.post('/students?/:studentId', StudentController.post.bind(StudentController));
studentRouter.put('/students?/:studentId', StudentController.put.bind(StudentController));
studentRouter.delete('/students?/:studentId', StudentController.delete.bind(StudentController));

module.exports = studentRouter;
