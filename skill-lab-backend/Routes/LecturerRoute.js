const router = require("express").Router();
const Question = require("../Models/Question");
const Notice = require("../Models/Notice");
const log4js = require('log4js');

const logger = log4js.getLogger();
logger.level = 'info';

//insert Question
router.post("/question", async (req, res) => {
  try {
    const question = new Question(req.body);
    const savedQuestion = await question.save();
    if (savedQuestion) {
      res.status(201).send({ message: "success", data: savedQuestion });
    } else {
      res.status(400).send({ message: "Failed" });
    }
    logger.info("result , ", savedQuestion);
  } catch (err) {
    logger.error("error in question", err);
    res.status(500).send({ message: "Internal Server Error" });
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
      res.status(400).send({ message: "Failed" });
    }
    logger.info("result , ", savedNotice);
  } catch (err) {
    logger.error("error in notice ", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Get all Questions
router.get("/question/findAll", async (req, res) => {
  try {
    const findAll = await Question.find(req.params);
    res.json(findAll);
    logger.info("result," ,findAll);
  } catch (err) {
    logger.error("error in get data", err);
    res.status(204).send({ message: "Operation Failed" });
  }
});

//Get all Notices
router.get("/notice/findAll", async (req, res) => {
  try {
    const findAll = await Notice.find(req.params);
    res.json(findAll);
   logger.info("result," ,findAll);
  } catch (err) {
    logger.error("error in get data", err);
    res.status(204).send({ message: "Operation Failed" });
  }
});

//Get Specific question
router.get("/question/:id", async (req, res) => {
  try {
      const question = await Question.findById(req.params.id);
      res.json(question);
      logger.info("result , ", question);
  } catch (err) {
      logger.error("error in getting marks", err);
      res.status(204).send({ message: "Operation Failed" });
  }
});

//Delete Questions List
router.delete("/question/:id", async (req, res) => {
  try {
    const deleteQuestion = await Question.findByIdAndRemove(req.params.id);
    res.json(deleteQuestion);
    logger.info("Deleted!");
  } catch (err) {
    logger.error("error in get data", err);
    res.status(204).send({ message: "Operation Failed" });
  }
});

//Delete Notices
router.delete("/notice/:id", async (req, res) => {
  try {
    const deleteNotice = await Notice.findByIdAndRemove(req.params.id);
    res.json(deleteNotice);
    logger.info("Deleted!");
  } catch (err) {
    logger.error("error in get data", err);
    res.status(204).send({ message: "Operation Failed" });
  }
});

//update Question
router.put("/question/:id", async (req, res) => {
  try {
    const updateQuestion = await Question.findByIdAndUpdate(req.params.id,req.body, {new:true});
    res.json(updateQuestion);
    logger.info("result,",updateQuestion);
  } catch (err) {
    logger.error("error in getting review details", err);
    res.status(204).send({ message: "Operation Failed" });
  }
});


module.exports = router;
