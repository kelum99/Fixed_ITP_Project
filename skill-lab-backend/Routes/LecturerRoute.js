const router = require("express").Router();
const Question = require("../Models/Question");
const Notice = require("../Models/Notice");

//insert Question
router.post("/question", async (req, res) => {
  try {
    const question = new Question(req.body);
    const savedQuestion = await question.save();
    if (savedQuestion) {
      res.status(201).send({ message: "success", data: savedQuestion });
    } else {
      res.status(400).send({ message: "failed", data: savedQuestion });
    }
    console.log("result , ", savedQuestion);
  } catch (err) {
    console.log("error in question", err);
    res.status(500).send({ message: "failed", data: err });
  }
});

//insert Notice
router.post("/notice", async (req, res) => {
  try {
    const notice = new Notice(req.body);
    const savedNotice = await notice.save();
    if (savedNotice) {
      res.status(201).send({ message: "success", data: savedNotice });
    } else {
      res.status(400).send({ message: "failed", data: savedNotice });
    }
    console.log("result , ", savedNotice);
  } catch (err) {
    console.log("error in notice ", err);
    res.status(500).send({ message: "failed", data: err });
  }
});

//Get all Questions
router.get("/question/findAll", async (req, res) => {
  try {
    const findAll = await Question.find(req.params);
    res.json(findAll);
    console.log("result," ,findAll);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

//Get all Notices
router.get("/notice/findAll", async (req, res) => {
  try {
    const findAll = await Notice.find(req.params);
    res.json(findAll);
    console.log("result," ,findAll);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

//Get Specific question
router.get("/question/:id", async (req, res) => {
  try {
      const question = await Question.findById(req.params.id);
      res.json(question);
      console.log("result , ", question);
  } catch (err) {
      console.log("error in getting marks", err);
      res.status(204).send({ message: "failed", data: err });
  }
});

//Delete Questions List
router.delete("/question/:id", async (req, res) => {
  try {
    const deleteQuestion = await Question.findByIdAndRemove(req.params.id);
    res.json(deleteQuestion);
    console.log("Deleted!");
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

//Delete Notices
router.delete("/notice/:id", async (req, res) => {
  try {
    const deleteNotice = await Notice.findByIdAndRemove(req.params.id);
    res.json(deleteNotice);
    console.log("Deleted!");
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

//update Question
router.put("/question/:id", async (req, res) => {
  try {
    const updateQuestion = await Question.findByIdAndUpdate(req.params.id,req.body, {new:true});
    res.json(updateQuestion);
    console.log("result,",updateQuestion);
  } catch (err) {
    console.log("error in getting review details", err);
    res.status(204).send({ message: "failed", data: err });
  }
});


module.exports = router;
