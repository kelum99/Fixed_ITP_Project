const router = require("express").Router();
const productDetails = require("../Models/productDetails");
const Cart = require("../Models/Cart");
const extractToken = require("../TokenExtract");
const jwt_decode = require('jwt-decode');


router.post("/productDetails", async (req, res) => {
  try {
    const decodeHeader = jwt_decode(extractToken(req));
    const userID = decodeHeader.data._id;
    console.log("ID :", userID);
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
      res.status(400).send({ message: "failed", data: savedproductDetails });
    }
    console.log("result , ", savedproductDetails);
  } catch (err) {
    console.log("error in store ", err);
    res.status(500).send({ message: "failed", data: err });
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
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

router.get("/product/find/:productName", async (req, res) => {
  try {
    const findByName = await productDetails.findOne(req.params);
    res.json(findByName);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

router.get("/product/findAll/:userID", async (req, res) => {
  try {
    const findAll = await productDetails.find(req.params);
    res.json(findAll);
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
  }
});

router.delete("/product/:id", async (req, res) => {
  try {
    const deleteproductDetails = await productDetails.deleteOne(req.params);
    res.json(deleteproductDetails);
    console.log("Deleted!");
  } catch (err) {
    console.log("error in get data", err);
    res.status(204).send({ message: "failed", data: err });
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
            console.log("Success ", result);
            res.status(201).send({ message: "success", data: result});
        }
    else{
        res.status(204).send({ message: "update data can not be empty!" });
    }
    }catch (err){
        console.log("error in get data", err);
        res.status(204).send({ message: "failed", data: err });
    }
});



router.post("/Cart", async (req, res) => {
    try {
      const Cart = new Cart(req.body);
      const savedCart = await Cart.save();
      if (savedCart) {
        res.status(201).send({ message: "success", data: savedCart });
      } else {
        res.status(400).send({ message: "failed", data: savedCart });
      }
      console.log("result , ", savedCart);
    } catch (err) {
      console.log("error in store ", err);
      res.status(500).send({ message: "failed", data: err });
    }
  });

module.exports = router;
