const router = require("express").Router();
const Wallet = require("../Models/Wallet");
const Bank = require("../Models/Bank");
const PaymentHistory = require("../Models/PaymentHistory");
const WithdrawHistory= require("../Models/WithdrawHistory");
const FinanceAnalysis= require("../Models/IncomeExpense");
const extractToken = require("../TokenExtract");
const jwt_decode = require('jwt-decode');

//Wallet Routing
//Insert
router.post("/wallet", async (req, res) => {
  try {
    const decodeHeader = jwt_decode(extractToken(req));
    const userID = decodeHeader.data._id;
    console.log("header",decodeHeader);
    const wallet = new Wallet({
      nickName: req.body.nickName,
      name: req.body.name,
      cardNumber: req.body.cardNumber,
      expireDate: req.body.expireDate,
      cvv: req.body.cvv,
      userID: userID
    });
    const savedWallet = await wallet.save();
    if (savedWallet) {
      res.status(201).send({ message: "success", data: savedWallet });
    } else {
      res.status(400).send({ message: "failed", data: savedWallet });
    }
    console.log("result , ", savedWallet);
  } catch (err) {
    console.log("error in wallet ", err);
    res.status(500).send({ message: "failed", data: err });
  }
});


//Find All by UserID
router.get("/wallet/findAll/:userID", async (req, res) => {
  try {
    const findAll = await Wallet.find(req.params);
    res.json(findAll);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

//Delet
router.delete("/wallet/:id", async (req, res) => {
  try {
    const deleteWallet = await Wallet.deleteOne(req.params);
    res.json(deleteWallet);
    console.log("Deleted!");
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

//Update
router.put("/wallet/update/:id", async (req, res) => {
  try {
    const data = req.body;
    if (data) {
      const result = await Wallet.updateOne(
        { _id: req.params.id },
        { ...data }
      );
      console.log("Success ", result);
      res.status(201).send({ message: "success", data: result });
    } else {
      res.status(204).send({ message: "update data can not be empty!" });
    }
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

//Bank Routing
//Insert
router.post("/bank", async (req, res) => {
  try {
    const decodeHeader = jwt_decode(extractToken(req));
    const userID = decodeHeader.data._id;
    console.log("header",decodeHeader);
    const bank = new Bank({
      name: req.body.name,
      accountNumber: req.body.accountNumber,
      bankName: req.body.bankName,
      branch: req.body.branch,
      userID: userID
    });
    const savedBank = await bank.save();
    if (savedBank) {
      res.status(201).send({ message: "success", data: savedBank });
    } else {
      res.status(400).send({ message: "failed", data: savedBank });
    }
    console.log("result , ", savedBank);
  } catch (err) {
    console.log("error in wallet ", err);
    res.status(500).send({ message: "failed", data: err });
  }
});

//Find All by Specific Parameter
router.get("/bank/findAll/:userID", async (req, res) => {
  try {
    const findAll = await Bank.find(req.params);
    res.json(findAll);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

//Update
router.put("/bank/update/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const data = req.body;

    if (data) {
      const result = await Bank.updateOne(
        { _id: id},
        { ...data }
      );
      console.log("Success ", result);
      res.status(201).send({ message: "success", data: result });
    } else {
      res.status(204).send({ message: "update data can not be empty!" });
    }
  
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

//delete
router.delete("/bank/:id", async (req, res) => {
  try {
    const deleteBank = await Bank.deleteOne(req.params);
    res.json(deleteBank);
    console.log("Deleted!");
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

//Payment History
router.post("/paymentHistory", async (req, res) => {
  try {
    const paymentHistory = new PaymentHistory(req.body);
    const savedPHistory = await paymentHistory.save();
    if (savedPHistory) {
      res.status(201).send({ message: "success", data: savedPHistory });
    } else {
      res.status(400).send({ message: "failed", data: savedPHistory });
    }
    console.log("result , ", savedPHistory);
  } catch (err) {
    console.log("error in wallet ", err);
    res.status(500).send({ message: "failed", data: err });
  }
});

//Withdraw History
router.post("/withdrawHistory", async (req, res) => {
  try {
    const withdrawHistory = new WithdrawHistory(req.body);
    const savedWHistory = await withdrawHistory.save();
    if (savedWHistory) {
      res.status(201).send({ message: "success", data: savedWHistory });
    } else {
      res.status(400).send({ message: "failed", data: savedWHistory });
    }
    console.log("result , ", savedWHistory);
  } catch (err) {
    console.log("error in wallet ", err);
    res.status(500).send({ message: "failed", data: err });
  }
});

//Income/Expense
router.post("/financeAnalysis", async (req, res) => {
  try {
    const financeAnalysis = new FinanceAnalysis(req.body);
    const savedFA = await financeAnalysis.save();
    if (savedFA) {
      res.status(201).send({ message: "success", data: savedFA});
    } else {
      res.status(400).send({ message: "failed", data: savedFA });
    }
    console.log("result , ", savedFA);
  } catch (err) {
    console.log("error in wallet ", err);
    res.status(500).send({ message: "failed", data: err });
  }
});

//Find All
router.get("/financeAnalysis", async (req, res) => {
  res.json(await FinanceAnalysis.find({}));
});

//find by month
router.get("/financeAnalysis/find/:month", async (req, res) => {
  try {
    const findByName = await FinanceAnalysis.find(req.params);
    res.json(findByName);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

module.exports = router;
