const router = require("express").Router();
const CommonSignup = require("../Models/CommonSignup");
const jwt = require("jsonwebtoken");


//User Data

//Insert
router.post("/CommonSignup", async (req, res) => {
  try {
    
    const commonSignup = new CommonSignup(req.body);
    const savedCommonSignup = await commonSignup.save();
    if (savedCommonSignup) {
      res.status(201).send({ message: "success", data: savedCommonSignup });
    } else {
      res.status(400).send({ message: "failed", data: savedCommonSignup });
    }
    console.log("result , ", savedCommonSignup);
  } catch (err) {
    console.log("error in CommonSignup ", err);
    res.status(500).send({ message: "failed", data: err });
  }
});

router.get("/CommonSignup/:id", async (req, res) => {
  try {
    const findById = await CommonSignup.findById(req.params.id);
    res.json(findById);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

router.get("/CommonSignup", async (_, res) => {
  res.json(await CommonSignup.find({}));
});


//Update

router.put("/CommonSignup/update/:id", async (req, res) => {
  try {
    const updateCommonSignup = await CommonSignup.findByIdAndUpdate(req.params.id,req.body, {new:true});
    res.json(updateCommonSignup);
    console.log("result,",updateCommonSignup);
  } catch (err) {
    console.log("error in getting review details", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

//Delete

router.delete("/CommonSignup/:id", async (req, res) => {
  try {
    const deleteCommonSignup = await CommonSignup.findByIdAndDelete(
      req.params.id
    );
    res.json(deleteCommonSignup);
    console.log("Deleted!");
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await CommonSignup.findOne({
      $and: [{ email }, { inputpw: password }]
    });
    if (result) {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: {
            _id: result._id,
            email: result.email,
            nic: result.nic,
            role: result.role
          }
        },
        "secret"
      );
      res
        .status(200)
        .send({
          message: "success",
          data: {
            token,
            _id: result._id,
            email: result.email,
            nic: result.nic,
            role: result.role
          }
        });
    } else {
      res.status(401).send({ message: "Check email or password" });
    }
    console.log("login succes ", result);
  } catch (err) {
    console.log("login requsee eror ", err);
    res.status(500).send({ message: "failed", data: err });
  }
});
module.exports = router;


