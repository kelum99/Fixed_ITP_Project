const router = require("express").Router();
const Contact = require("../Models/Contact");
const Review = require("../Models/Review");


/*Insert Contact us form details */
router.post("/contact", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const savedContact = await contact.save();
    if (savedContact) {
      res.status(201).send({ message: "success", data: savedContact });
    } else {
      res.status(400).send({ message: "failed", data: savedContact });
    }
    console.log("result , ", savedContact);
  } catch (err) {
    console.log("error in Contact details ", err);
    res.status(500).send({ message: "failed", data: err });
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
    console.log("result , ", savedReview);
  } catch (err) {
    console.log("error in reviews ", err);
    res.status(500).send({ message: "failed", data: err });
  }
});

/*Retreive  review details for lecturer */
router.get("/review/findAll", async (req, res) => {
  try {
    const findAll = await Review.find(req.params);
    res.json(findAll);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

// Retreive own review details for student
router.get("/review/findAll/:stid", async (req, res) => {
  try {
    const findAll = await Review.find(req.params);
    res.json(findAll);
  } catch (err) {
    console.log("error in geting review details", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

//Get specific review
router.get("/review/:id", async (req, res) => {
  try {
      const review = await Review.findById(req.params.id);
      res.json(review);
      console.log("result , ", review);
  } catch (err) {
      console.log("error in getting marks", err);
      res.status(204).send({ message: "failed", data: err });
  }
});

/*Edit reviews */
router.put("/review/:id", async (req, res) => {
  try {
    const UpdateReview = await Review.findByIdAndUpdate(req.params.id,req.body, {new:true});
    res.json(UpdateReview);
    console.log("result, ", UpdateReview);
  } catch (err) {
    console.log("error in getting review details", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

/*delete specific review */
router.delete("/review/:id", async (req, res) => {
  try {
    const deleteReview = await Review.findByIdAndRemove(req.params.id);
    res.json(deleteReview);
    console.log("Deleted!");
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

/*Retreive coustomer issue details for admin */
router.get("/contact/findAll", async (req, res) => {
  try {
    const findAll = await Contact.find(req.params);
    res.json(findAll);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

/*delete specific issue */
router.delete("/contact/:id", async (req, res) => {
  try {
    const deleteContact= await Contact.findByIdAndRemove(req.params.id);
    res.json(deleteContact);
    console.log("Deleted!");
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

module.exports = router;