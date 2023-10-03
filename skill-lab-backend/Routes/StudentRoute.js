const router = require("express").Router();
const Enroll = require("../Models/StudentEnroll");
const Perform = require("../Models/Performance");
const log4js = require('log4js');

const logger = log4js.getLogger();
logger.level = 'info';


/*Start Enroll API*/

//Enroll a Student
router.post("/enroll", async (req, res) => {
    try {
        const enroll = new Enroll(req.body);
        const savedEnroll = await enroll.save();
        if (savedEnroll) {
            res.status(201).send({ message: "success", data: savedEnroll });
        } else {
            res.status(400).send({ message: "Failed" });
        }
        logger.info("result , ", savedEnroll);
    } catch (err) {
        logger.error("error in enrolling student ", err);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

//Get My Courses
router.get("/mycourses", async (req, res) => {
    try {
        const allMyCourses = await Enroll.find(req.params);
        res.json(allMyCourses);
        logger.info("result , ", allMyCourses);
    } catch (err) {
        logger.error("error in get enrolled courses", err);
        res.status(204).send({ message: "Operation Failed" });
    }
});

//Get specific enroll
router.get("/mycourses/:id", async (req, res) => {
    try {
        const mycourse = await Enroll.findById(req.params.id);
        res.json(mycourse);
        logger.info("result , ", mycourse);
    } catch (err) {
        logger.error("error in getting course details", err);
        res.status(204).send({ message: "Operation Failed" });
    }
});

//Update enroll
router.put("/mycourses/:id", async (req, res) => {
    try {
        const updateEnroll = await Enroll.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updateEnroll);
        logger.info("result , ", updateEnroll);
    } catch (err) {
        logger.error("error in getting course details", err);
        res.status(204).send({ message: "Operation Failed" });
    }

});

//Unenroll from a course - delete enroll
router.delete("/mycourses/:id", async (req, res) => {
    try {
        const Unenroll = await Enroll.findByIdAndRemove(req.params.id);
        res.json(Unenroll);
        logger.info("Deleted!");
    } catch (err) {
        logger.error("error in deleting", err);
        res.status(204).send({ message: "Operation Failed" });
    }
});

/*End Enroll API*/



/*Start Performance API*/

//Add a Mark
router.post("/performance", async (req, res) => {
    try {
        const perform = new Perform(req.body);
        const savedPerform = await perform.save();
        if (savedPerform) {
            res.status(201).send({ message: "success", data: savedPerform });
        } else {
            res.status(400).send({ message: "Failed" });
        }
        logger.info("result , ", savedPerform);
    } catch (err) {
        logger.error("error in adding marks ", err);
        res.status(500).send({ message: "Internal Server Error" });
    }
});


//Get all marks
router.get("/performance", async (req, res) => {
    try {
        const allMarks = await Perform.find(req.params);
        res.json(allMarks);
        logger.info("result , ", allMarks);
    } catch (err) {
        logger.error("error in get marks", err);
        res.status(204).send({ message: "Operation Failed" });
    }
});

//Get specific mark
router.get("/performance/:id", async (req, res) => {
    try {
        const mark = await Perform.findById(req.params.id);
        res.json(mark);
        logger.info("result , ", mark);
    } catch (err) {
        logger.error("error in getting marks", err);
        res.status(204).send({ message: "Operation Failed" });
    }
});

//Update Marks
router.put("/performance/:id", async (req, res) => {
    try {
        const updateMark = await Perform.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updateMark);
        logger.info("result , ", updateMark);
    } catch (err) {
        logger.error("error in getting course details", err);
        res.status(204).send({ message: "Operation Failed" });
    }

});

//Delete Marks
router.delete("/performance/:id", async (req, res) => {
    try {
        const deleteMark = await Perform.findByIdAndRemove(req.params.id);
        res.json(deleteMark);
        logger.info("Deleted Result Successfully!");
    } catch (err) {
        logger.error("error in deleting", err);
        res.status(204).send({ message: "Operation Failed" });
    }
});

/*End Performance API*/

module.exports = router;