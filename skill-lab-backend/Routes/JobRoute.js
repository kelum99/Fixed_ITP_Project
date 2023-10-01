const router = require("express").Router();
const { findById } = require("../Models/Applicant");
const Applicant = require("../Models/Applicant");
const Careere = require("../Models/Careere");

//-------------------------careere-----------------------------------//

//insert Data
router.post("/job", async (req, res) => {
  try {
    const careere = new Careere(req.body);
    const savedCareere = await careere.save();
    if (savedCareere) {
      res.status(201).send({ message: "success", data: savedCareere });
    } else {
      res.status(400).send({ message: "failed", data: savedCareere });
    }
    console.log("result , ", savedCareere);
  } catch (err) {
    console.log("error in careere ", err);
    res.status(500).send({ message: "failed", data: err });
  }
});


//search for data using an ID
router.get("/job/:id", async (req, res) => {
    try {
      const findById = await Careere.findById(req.params.id);
      res.json(findById);
    } catch (err) {
      console.log("error in get data", err);
      res.status(204).send({ message: "failed", data: err });
    }
  });

  //search for data using name
  router.get("/job/find/:name", async (req, res) => {
    try {
      const findByName = await Careere.findOne(req.params);
      res.json(findByName);
    } catch (err) {
      console.log("error in get data", err);
      res.status(204).send({ message: "failed", data: err });
    }
  });

  //retriew all data from db
  router.get("/careereview", async (req, res) => {
    try {
        const careereview = await Careere.find(req.params);
        res.json(careereview);
        console.log("result , ", careereview);
    } catch (err) {
        console.log("error in get career view", err);
        res.status(204).send({ message: "failed", data: err });
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
      console.log("Deleted!");
    } catch (err) {
      console.log("error in get data", err);
      res.status(204).send({ message: "failed", data: err });
    }
  });




router.put("/updatejob/:id", async (req, res) => {
  try {
      const deleteCareere = await Careere.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(deleteCareere);
      console.log("result , ", deleteCareere);
  } catch (err) {
      console.log("error in getting career details", err);
      res.status(204).send({ message: "failed", data: err });
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
        res.status(400).send({ message: "failed", data: savedApplicant });
      }
      console.log("result , ", savedApplicant);
    } catch (err) {
      console.log("error in Apply ", err);
      res.status(500).send({ message: "failed", data: err });
    }
  });

  //search using id
  router.get("/apply/:id", async (req, res) => {
    try {
      const findById = await Applicant.findById(req.params.id);
      res.json(findById);
    } catch (err) {
      console.log("error in get data", err);
      res.status(204).send({ message: "failed", data: err });
    }
  });

  //search for data using name
  router.get("/apply/find/:name", async (req, res) => {
    try {
      const findByName = await Applicant.findOne(req.params);
      res.json(findByName);
    } catch (err) {
      console.log("error in get data", err);
      res.status(204).send({ message: "failed", data: err });
    }
  });

    //retriew all data from db
    router.get("/apply/findAll", async (req, res) => {
      try {
        const findAll = await Applicant.find(req.params);
        res.json(findAll);
      } catch (err) {
        console.log("error in get data", err);
        res.status(204).send({ message: "failed", data: err });
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
        console.log("Deleted!");
      } catch (err) {
        console.log("error in get data", err);
        res.status(204).send({ message: "failed", data: err });
      }
    });


    //Update enroll
router.put("/updateapplicant/:id", async (req, res) => {
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

module.exports = router;