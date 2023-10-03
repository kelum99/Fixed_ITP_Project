const router = require("express").Router();
const Contact = require("../Models/Contact");
const Review = require("../Models/Review");
const log4js = require('log4js');

const logger = log4js.getLogger();
logger.level = 'info';

/*Insert Contact us form details */
router.post("/contact", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const savedContact = await contact.save();
    if (savedContact) {
      res.status(201).send({ message: "success", data: savedContact });
    } else {
      res.status(400).send({ message: "Failed" });
    }
    logger.info("result , ", savedContact);
  } catch (err) {
   logger.error("error in Contact details ", err);
    res.status(500).send({ message:"Internal Server Error"});
  }
});

/*Add review for course */
router.post("/review", async (req, res) => {
  try {
    const review = new Review(req.body);
    const savedReview = await review.save();
    if (savedReview) {
      res.status(201).send({ message: "success", data: savedReview });
    } else {
      res.status(400).send({ message: "failed", data: savedReview });
    }
   logger.info("result , ", savedReview);
  } catch (err) {
   logger.error("error in reviews ", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

/*Retreive  review details for lecturer */
router.get("/review/findAll", async (req, res) => {
  try {
    const findAll = await Review.find(req.params);
    res.json(findAll);
  } catch (err) {
   logger.error("error in get data", err);
    res.status(204).send({ message: "Operation Failed" });
  }
});

// Retreive own review details for student
router.get("/review/findAll/:stid", async (req, res) => {
  try {
    const findAll = await Review.find(req.params);
    res.json(findAll);
  } catch (err) {
    logger.error("error in geting review details", err);
    res.status(204).send({ message: "Operation Failed" });
  }
});

//Get specific review
router.get("/review/:id", async (req, res) => {
  try {
      const review = await Review.findById(req.params.id);
      res.json(review);
      logger.info("result , ", review);
  } catch (err) {
      logger.error("error in getting marks", err);
      res.status(204).send({ message: "Operation Failed" });
  }
});

/*Edit reviews */
router.put("/review/:id", async (req, res) => {
  try {
    const UpdateReview = await Review.findByIdAndUpdate(req.params.id,req.body, {new:true});
    res.json(UpdateReview);
    logger.info("result, ", UpdateReview);
  } catch (err) {
    logger.error("error in getting review details", err);
    res.status(204).send({ message: "Operation Failed" });
  }
});

/*delete specific review */
router.delete("/review/:id", async (req, res) => {
  try {
    const deleteReview = await Review.findByIdAndRemove(req.params.id);
    res.json(deleteReview);
    logger.info("Deleted!");
  } catch (err) {
    logger.error("error in get data", err);
    res.status(204).send({ message: "Operation Failed" });
  }
});

/*Retreive coustomer issue details for admin */
router.get("/contact/findAll", async (req, res) => {
  try {
    const findAll = await Contact.find(req.params);
    res.json(findAll);
  } catch (err) {
    logger.error("error in get data", err);
    res.status(204).send({ message: "Operation Failed" });
  }
});

/*delete specific issue */
router.delete("/contact/:id", async (req, res) => {
  try {
    const deleteContact= await Contact.findByIdAndRemove(req.params.id);
    res.json(deleteContact);
    logger.info("Deleted!");
  } catch (err) {
    logger.error("error in get data", err);
    res.status(204).send({ message: "Operation Failed" });
  }
});

module.exports = router;