const router = require("express").Router();
const Enroll = require("../Models/StudentEnroll");
const Perform = require("../Models/Performance");


/*Start Enroll API*/

//Enroll a Student
router.post("/enroll", async (req, res) => {
    try {
        const enroll = new Enroll(req.body);
        const savedEnroll = await enroll.save();
        if (savedEnroll) {
            res.status(201).send({ message: "success", data: savedEnroll });
        } else {
            res.status(400).send({ message: "failed", data: savedEnroll });
        }
        console.log("result , ", savedEnroll);
    } catch (err) {
        console.log("error in enrolling student ", err);
        res.status(500).send({ message: "failed", data: err });
    }
});

//Get My Courses
router.get("/mycourses", async (req, res) => {
    try {
        const allMyCourses = await Enroll.find(req.params);
        res.json(allMyCourses);
        console.log("result , ", allMyCourses);
    } catch (err) {
        console.log("error in get enrolled courses", err);
        res.status(204).send({ message: "failed", data: err });
    }
});

//Get specific enroll
router.get("/mycourses/:id", async (req, res) => {
    try {
        const mycourse = await Enroll.findById(req.params.id);
        res.json(mycourse);
        console.log("result , ", mycourse);
    } catch (err) {
        console.log("error in getting course details", err);
        res.status(204).send({ message: "failed", data: err });
    }
});

//Update enroll
router.put("/mycourses/:id", async (req, res) => {
    try {
        const updateEnroll = await Enroll.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updateEnroll);
        console.log("result , ", updateEnroll);
    } catch (err) {
        console.log("error in getting course details", err);
        res.status(204).send({ message: "failed", data: err });
    }

});

//Unenroll from a course - delete enroll
router.delete("/mycourses/:id", async (req, res) => {
    try {
        const Unenroll = await Enroll.findByIdAndRemove(req.params.id);
        res.json(Unenroll);
        console.log("Deleted!");
    } catch (err) {
        console.log("error in deleting", err);
        res.status(204).send({ message: "failed", data: err });
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
            res.status(400).send({ message: "failed", data: savedPerform });
        }
        console.log("result , ", savedPerform);
    } catch (err) {
        console.log("error in adding marks ", err);
        res.status(500).send({ message: "failed", data: err });
    }
});


//Get all marks
router.get("/performance", async (req, res) => {
    try {
        const allMarks = await Perform.find(req.params);
        res.json(allMarks);
        console.log("result , ", allMarks);
    } catch (err) {
        console.log("error in get marks", err);
        res.status(204).send({ message: "failed", data: err });
    }
});

//Get specific mark
router.get("/performance/:id", async (req, res) => {
    try {
        const mark = await Perform.findById(req.params.id);
        res.json(mark);
        console.log("result , ", mark);
    } catch (err) {
        console.log("error in getting marks", err);
        res.status(204).send({ message: "failed", data: err });
    }
});

//Update Marks
router.put("/performance/:id", async (req, res) => {
    try {
        const updateMark = await Perform.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updateMark);
        console.log("result , ", updateMark);
    } catch (err) {
        console.log("error in getting course details", err);
        res.status(204).send({ message: "failed", data: err });
    }

});

//Delete Marks
router.delete("/performance/:id", async (req, res) => {
    try {
        const deleteMark = await Perform.findByIdAndRemove(req.params.id);
        res.json(deleteMark);
        console.log("Deleted Result Successfully!");
    } catch (err) {
        console.log("error in deleting", err);
        res.status(204).send({ message: "failed", data: err });
    }
});

/*End Performance API*/

module.exports = router;