class StudentController {
    constructor() {}

    getMonogoDB(req, res, next) {
        //use middleware to get your mongoDB data
        console.log("enter classes getMonogoDB");
        req.dbstudents.classes = req.db.collection('classes');
        next();
    }

    showAlldata(req, res) {
        req.dbstudents.aggregate([{
            $lookup: {
                from: 'classes',
                localField: 'studentId',
                foreignField: 'student_ids',
                as: 'classes_docs'
            }
        }]).toArray((err, results) => {
            if (err) {
                req.status(500).send(err);
            } else {
                res.send(results);
            }
        });
    }

    showOnedata(req, res) {
        req.dbstudents.aggregate([{
            $lookup: {
                from: 'classes',
                localField: 'studentId',
                foreignField: 'student_ids',
                as: 'classes_docs'
            }
        }, {
            $match: {
                studentId: req.params.studentId
            }
        }]).toArray((err, results) => {
            if (err) {
                req.status(500).send(err);
            } else {
                res.send(results);
            }
        });
    }

    InsertClasses(req, res) {
        req.dbstudents.classes.insert({
            className: 'A',
            student_ids: [req.params.studentId]
        }, (err, results) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                return this.showOnedata(req, res);
            }
        });
    }

    UpdateClasses(req, res) {
        req.dbstudents.classes.update({ className: 'A' }, { $push: { student_ids: req.params.studentId } }, (err, results) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                return this.showOnedata(req, res);
            }
        });
    }

    FindClasses(req, res) {
        req.dbstudents.classes.findOne({ className: 'A' }, (err, results) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                if (!results) {
                    return this.InsertClasses(req, res);
                } else {
                    return this.UpdateClasses(req, res);
                }
            }
        });
    }

    DeleteClasses(req, res) {
        req.dbstudents.classes.update({ className: 'A' }, { $pull: { student_ids: { $in: [req.params.studentId] } } }, (err, results) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                return this.showAlldata(req, res);
            }
        });
    }


    get(req, res) {
        return this.showAlldata(req, res);
    }

    getId(req, res) {
        return this.showOnedata(req, res);
    }

    postId(req, res) {
        console.log("postId");
        req.dbstudents.insert(req.body, (err, results) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                return this.FindClasses(req, res);
            }
        });
    }

    //not change collection-classes's data
    putId(req, res) {
        console.log("postId");
        req.dbstudents.update({ studentId: req.params.studentId }, {
            firstName: req.body.firstName,
            lastname: req.body.lastname,
            studentId: req.body.studentId,
        }, (err, results) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                return this.showOnedata(req, res);
            }
        });
    }

    deleteId(req, res) {
        console.log("deleteId");
        req.dbstudents.remove({ studentId: req.params.studentId }, (err, results) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                return this.DeleteClasses(req, res);
            }
        });
    }
}

module.exports = new StudentController();
