class ClassesController {
    constructor() {}

    getMonogoDB(req, res, next) {
        //use middleware to get your mongoDB data
        req.classes = req.db.collection('classes');
        next();
    }

    find(req, res, next) {
        console.log("find className");
        req.classes.find({
            className: req.params.className
        }).toArray((err, result) => {
            if (err) {
                res.status(404).send(err);
            } else {
                if (req.method != "POST" && result == '') {
                    res.send('no match');
                } else {
                    req.target = result;
                    next();
                }
            }
        });
    }

    get(req, res) {
        req.classes.find({}).toArray((err, results) => {
            if (err) {
                req.status(500).send(err);
            } else {
                res.send(results);
            }
        });
    }

    getOne(req, res) {
        res.send(req.target);
    }

    post(req, res) {
        req.classes.insert({
            className: req.params.className,
            student_ids: req.body.student_ids
        }, (err, results) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(results);
            }
        });
    }

    put(req, res) {
        req.classes.update({ className: req.params.className }, {
            className: req.body.className,
            student_ids: req.body.student_ids,
        }, (err, results) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(results);
            }
        });
    }

    delete(req, res) {
        req.classes.remove({ className: req.params.className }, (err, results) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(results);
            }
        });
    }

    addStudent(req, res) {
        req.classes.update({
            className: req.target.className
        }, { $push: { student_ids: req.params.studentId } }, (err, results) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(results);
            }
        });
    }

    removeStudent(req, res) {
        req.classes.update({
            className: req.target.className
        }, { $pull: { student_ids: { $in: [req.params.studentId] } } }, (err, results) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(results);
            }
        });
    }
}

module.exports = new ClassesController();
