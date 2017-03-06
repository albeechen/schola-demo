const express = require('express');
const router = express.Router();
const StudentController = require('./student.controller');
const ClassesController = require('./classes.controller');

// return array
router.use(StudentController.getMonogoDB.bind(StudentController));
router.get('/students?', StudentController.get.bind(StudentController));
//router.post('/students?', StudentController.post.bind(StudentController));

// return single object
router.use('/students?/:studentId', StudentController.find.bind(StudentController));
router.get('/students?/:studentId', StudentController.getOne.bind(StudentController));
router.post('/students?/:studentId', StudentController.post.bind(StudentController));
router.put('/students?/:studentId', StudentController.put.bind(StudentController));
router.delete('/students?/:studentId', StudentController.delete.bind(StudentController));

// put one different router.js file
// return array
router.use(ClassesController.getMonogoDB.bind(ClassesController));
router.get('/class(es)', ClassesController.get.bind(ClassesController));

// return single object
router.use('/class(es)?/:className', ClassesController.find.bind(ClassesController));
router.get('/class(es)?/:className', ClassesController.getOne.bind(ClassesController));
router.post('/class(es)/:className', ClassesController.post.bind(ClassesController));
router.put('/class(es)/:className', ClassesController.put.bind(ClassesController));
router.delete('/class(es)/:className', ClassesController.delete.bind(ClassesController));

router.put('/class(es)/:className/add/:studentId', ClassesController.addStudent.bind(ClassesController));
router.put('/class(es)/:className/remove/:studentId', ClassesController.removeStudent.bind(ClassesController));


module.exports = router;
