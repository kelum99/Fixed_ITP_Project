const router = require("express").Router();
const { findById } = require("../Models/Applicant");
const Applicant = require("../Models/Applicant");
const Careere = require("../Models/Careere");
const log4js = require('log4js');

const logger = log4js.getLogger();
logger.level = 'info';

//-------------------------careere-----------------------------------//

//insert Data
router.post("/job", async (req, res) => {
  try {
    const careere = new Careere(req.body);
    const savedCareere = await careere.save();
    if (savedCareere) {
      res.status(201).send({ message: "success", data: savedCareere });
    } else {
      res.status(400).send({ message: "Failed"});
    }
    logger.info("result , ", savedCareere);
  } catch (err) {
    logger.error("error in careere ", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});


//search for data using an ID
router.get("/job/:id", async (req, res) => {
    try {
      const findById = await Careere.findById(req.params.id);
      res.json(findById);
    } catch (err) {
      logger.error("error in get data", err);
      res.status(204).send({ message: "Operation Failed" });
    }
  });

  //search for data using name
  router.get("/job/find/:name", async (req, res) => {
    try {
      const findByName = await Careere.findOne(req.params);
      res.json(findByName);
    } catch (err) {
      logger.error("error in get data", err);
      res.status(204).send({ message: "Operation Failed" });
    }
  });

  //retriew all data from db
  router.get("/careereview", async (req, res) => {
    try {
        const careereview = await Careere.find(req.params);
        res.json(careereview);
        logger.info("result , ", careereview);
    } catch (err) {
        logger.error("error in get career view", err);
        res.status(204).send({ message: "Operation Failed" });
    }
});

 
  router.get("/jobview", async(_, res)=> {
    res.json(await Careere.find({}));
  })

  //Delete
  router.delete("/deletejob/:id", async (req, res) => {
    try {
      const deleteCareere = await Careere.findByIdAndRemove(req.params.id);
      res.json(deleteCareere);
      logger.info("Deleted!");
    } catch (err) {
      logger.error("error in get data", err);
      res.status(204).send({ message: "Operation Failed" });
    }
  });




router.put("/updatejob/:id", async (req, res) => {
  try {
      const deleteCareere = await Careere.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(deleteCareere);
      logger.info("result , ", deleteCareere);
  } catch (err) {
      logger.error("error in getting career details", err);
      res.status(204).send({ message: "Operation Failed" });
  }

});








  //------------------------Applicant--------------------// 

  //insert
  router.post("/apply", async (req, res) => {
    try {
      const applicant = new Applicant(req.body);
      const savedApplicant = await applicant.save();
      if (savedApplicant) {
        res.status(201).send({ message: "success", data: savedApplicant });
      } else {
        res.status(400).send({ message: "Failed" });
      }
      logger.info("result , ", savedApplicant);
    } catch (err) {
      logger.error("error in Apply ", err);
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

  //search using id
  router.get("/apply/:id", async (req, res) => {
    try {
      const findById = await Applicant.findById(req.params.id);
      res.json(findById);
    } catch (err) {
      logger.error("error in get data", err);
      res.status(204).send({ message: "Operation Failed" });
    }
  });

  //search for data using name
  router.get("/apply/find/:name", async (req, res) => {
    try {
      const findByName = await Applicant.findOne(req.params);
      res.json(findByName);
    } catch (err) {
      logger.error("error in get data", err);
      res.status(204).send({ message: "Operation Failed" });
    }
  });

    //retriew all data from db
    router.get("/apply/findAll", async (req, res) => {
      try {
        const findAll = await Applicant.find(req.params);
        res.json(findAll);
      } catch (err) {
        logger.error("error in get data", err);
        res.status(204).send({ message: "Operation Failed" });
      }
    });

    router.get("/applicationview", async(_, res)=> {
      res.json(await Applicant.find({}));
    })
  

    //Update



  
    //Delete
    router.delete("/deleteapplicant/:id", async (req, res) => {
      try {
        const deleteApplicant = await Applicant.findByIdAndRemove(req.params.id);
        res.json(deleteApplicant);
        logger.info("Deleted!");
      } catch (err) {
        logger.error("error in get data", err);
        res.status(204).send({ message: "Operation Failed" });
      }
    });


    //Update enroll
router.put("/updateapplicant/:id", async (req, res) => {
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

module.exports = router;