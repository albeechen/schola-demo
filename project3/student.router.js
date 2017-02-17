const express = require('express');
const router = express.Router();
const StudentController = require('./student.controller');

router.use(StudentController.getMonogoDB.bind(StudentController));
router.get('/test', StudentController.get.bind(StudentController));
router.get('/test/:studentId', StudentController.getId.bind(StudentController));
router.post('/test/:studentId', StudentController.postId.bind(StudentController));
router.put('/test/:studentId', StudentController.putId.bind(StudentController));
router.delete('/test/:studentId', StudentController.deleteId.bind(StudentController));
module.exports = router;
