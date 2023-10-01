const router = require("express").Router();
const CourseCreate = require("../Models/CourseCreate");
const  lessonsCreated = require("../Models/lessonsCreated");
const ImageUpload = require("../Models/ImageUpload");
const extractToken = require("../TokenExtract");
const jwt_decode = require('jwt-decode');
  

//post the data from the course  created form to db
router.post("/coursecreate", async (req, res) => {
  try {
    const decodeHead = jwt_decode(extractToken(req));
    const userID = decodeHead.data._id;
    console.log("header",decodeHead);
    console.log("ID : ", userID);
    const coursecreate = new CourseCreate({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      paid: req.body.paid,
      category:req.body.category,
      userID: userID
    });
    
    const savedcourse = await coursecreate.save();
    if (savedcourse) {
      res.status(201).send({ message: "success", data: savedcourse });
    } else {
      res.status(400).send({ message: "failed", data: savedcourse });
    }
    console.log("result , ", savedcourse);
  } catch (err) {
    console.log("error in coursecreate ", err);
    res.status(500).send({ message: "failed", data: err });
  }
});




//edit  course (UPDATE)

router.put("/coursecreate/:id", async (req, res) => {
  try {
    const Updatecourse = await CourseCreate.findByIdAndUpdate(req.params.id,req.body, {new:true});
    res.json(Updatecourse);
    console.log("result, ", Updatecourse);
  } catch (err) {
    console.log("error in updating coursing  details", err);
    res.status(204).send({ message: "failed", data: err });
  }
});
 
// get one course for update & to retrieve a particular lesson
router.get("/coursecreate/:id", async (req, res) => {
  try {
      const courseone = await  CourseCreate.findById(req.params.id);
      res.json(courseone);
      console.log("result , ", courseone);
  } catch (err) {
      console.log("error in getting courses", err);
      res.status(204).send({ message: "failed", data: err });
  }
});



//find all courses created 
router.get("/coursecreate/", async (_, res) => {
  res.json(await CourseCreate.find({}));
});

//Find All  courses by UserID
router.get("/coursecreate/findAll/:userID", async (req, res) => {
  try {
    const findAll = await CourseCreate.find(req.params);
    res.json(findAll);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});







//Retrive all  data  for lecturer created courses 

router.get("/coursecreate/findAll", async (req, res) => {
  try {
    const findAll = await CourseCreate.find(req.params);
    res.json(findAll);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});





//post the data from the lessons created form to db
router.post("/lessonscreated", async (req, res) => {
  try {
    const lessonscreated = new lessonsCreated(req.body);
    const savedcourse = await lessonscreated.save();
    if (savedcourse) {
      res.status(201).send({ message: "success", data: savedcourse });
    } else {
      res.status(400).send({ message: "failed", data: savedcourse });
    }
    console.log("result , ", savedcourse);
  } catch (err) {
    console.log("error in  lessons Created  ", err);
    res.status(500).send({ message: "failed", data: err });
  }
});





//Retrive all  course content for a particular courses 
 
router.get("/lessonscreated/findAll", async (req, res) => {
  try {
    const findAll = await lessonsCreated.find(req.params);
    res.json(findAll);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

// find a leson by course id 
router.get("/lessonscreated/findAll/:cid", async (req, res) => {
  try {
    const findAll = await  lessonsCreated.find(req.params);
    res.json(findAll);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

//Find a lesson by  lesson ID
router.get("/lessonscreated/:id", async (req, res) => {
  try {
    const findByIdc = await lessonsCreated.findById(req.params.id);
    res.json(findByIdc);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});
//delete  by id 

 router.delete("/coursecreate/:id", async (req, res) => {
  try {
    const deleteCourseCreate = await CourseCreate.findByIdAndRemove(req.params.id);
    res.json(deleteCourseCreate);
    console.log("Deleted!");
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});



























module.exports = router;