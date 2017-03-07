class StudentController {
    constructor() {}

    getMonogoDB(req, res, next) {
        //use middleware to get your mongoDB data
        req.students = req.db.collection('students');
        next();
    }

    find(req, res, next) {
        //use middleware to get your mongoDB data
        req.students.find({
            studentId: req.params.studentId
        }).toArray((err, result) => {
            if (err) {
                res.status(404).send(err);
            } else {
                if (result == '' && req.method != "POST") {
                    res.send('no match');
                } else if (result != '' && req.method == "POST") {
                    res.send('existed. Please use update');
                } else {
                    req.target = result;
                    next();
                }
            }
        });
    }

    showAlldata(req, res) {
        req.students.aggregate([{
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
        req.students.aggregate([{
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

    get(req, res) {
        return this.showAlldata(req, res);
    }

    getOne(req, res) {
        return this.showOnedata(req, res);
    }

    post(req, res) {
        req.students.insert(req.body, (err, results) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                return this.showOnedata(req, res);
            }
        });
    }

    put(req, res) {
        req.students.update({ studentId: req.params.studentId }, {
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

    delete(req, res) {
        req.students.remove({ studentId: req.params.studentId }, (err, results) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                return this.showAlldata(req, res);
            }
        });
    }
}

module.exports = new StudentController();
