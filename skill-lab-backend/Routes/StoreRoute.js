const router = require("express").Router();
const productDetails = require("../Models/productDetails");
const Cart = require("../Models/Cart");
const extractToken = require("../TokenExtract");
const jwt_decode = require('jwt-decode');
const log4js = require('log4js');

const logger = log4js.getLogger();
logger.level = 'info';


router.post("/productDetails", async (req, res) => {
  try {
    const decodeHeader = jwt_decode(extractToken(req));
    const userID = decodeHeader.data._id;
    logger.info("ID :", userID);
    const product = new productDetails({
      productId: req.body.productId,
      productName: req.body.productName,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
      userID: userID
    });
    const savedproductDetails = await product.save();
    if (savedproductDetails) {
      res.status(201).send({ message: "success", data: savedproductDetails });
    } else {
      res.status(400).send({ message: "Failed" });
    }
    logger.info("result , ", savedproductDetails);
  } catch (err) {
    logger.error("error in store ", err);
    res.status(500).send({ message: "Internal Server Error"});
  }
});


router.get("/productDetails", async (_, res)=> 
{
    res.json(await productDetails.find({}));
});

router.get("/product/:id", async (req, res) => {
  try {
    const findById = await productDetails.findById(req.params.id);
    res.json(findById);
  } catch (err) {
    logger.error("error in get data", err);
    res.status(204).send({ message: "Operation Failed" });
  }
});

router.get("/product/find/:productName", async (req, res) => {
  try {
    const findByName = await productDetails.findOne(req.params);
    res.json(findByName);
  } catch (err) {
    logger.error("error in get data", err);
    res.status(204).send({ message: "Operation Failed" });
  }
});

router.get("/product/findAll/:userID", async (req, res) => {
  try {
    const findAll = await productDetails.find(req.params);
    res.json(findAll);
  } catch (err) {
    logger.error("error in get data", err);
    res.status(204).send({ message: "Operation Failed" });
  }
});

router.delete("/product/:id", async (req, res) => {
  try {
    const deleteproductDetails = await productDetails.deleteOne(req.params);
    res.json(deleteproductDetails);
    logger.info("Deleted!");
  } catch (err) {
    logger.error("error in get data", err);
    res.status(204).send({ message: "Operation Failed" });
  }
});

router.put("/product/update/:id", async(req, res) => {
    try{
        const data = req.body;
        if(data){
            const result = await productDetails.updateOne(
                { _id: req.params.id },
                { ...data}
            );
            logger.info("Success ", result);
            res.status(201).send({ message: "success", data: result});
        }
    else{
        res.status(204).send({ message: "update data can not be empty!" });
    }
    }catch (err){
        logger.error("error in get data", err);
        res.status(204).send({ message: "Operation Failed" });
    }
});



router.post("/Cart", async (req, res) => {
    try {
      const Cart = new Cart(req.body);
      const savedCart = await Cart.save();
      if (savedCart) {
        res.status(201).send({ message: "success", data: savedCart });
      } else {
        res.status(400).send({ message: "Failed"});
      }
      logger.info("result , ", savedCart);
    } catch (err) {
      logger.error("error in store ", err);
      res.status(500).send({ message: "Internal Server Error"});
    }
  });

module.exports = router;
