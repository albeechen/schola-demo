const express = require('express');
const classesRouter = express.Router();
const ClassesController = require('./classes.controller');

// return array
classesRouter.use(ClassesController.getMonogoDB.bind(ClassesController));
classesRouter.get('/class(es)', ClassesController.get.bind(ClassesController));

// return single object
classesRouter.use('/class(es)?/:className', ClassesController.find.bind(ClassesController));
classesRouter.get('/class(es)?/:className', ClassesController.getOne.bind(ClassesController));
classesRouter.post('/class(es)/:className', ClassesController.post.bind(ClassesController));
classesRouter.put('/class(es)/:className', ClassesController.put.bind(ClassesController));
classesRouter.delete('/class(es)/:className', ClassesController.delete.bind(ClassesController));

classesRouter.put('/class(es)/:className/add/:studentId', ClassesController.addStudent.bind(ClassesController));
classesRouter.put('/class(es)/:className/remove/:studentId', ClassesController.removeStudent.bind(ClassesController));

module.exports = classesRouter;
