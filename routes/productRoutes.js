const ProductController = require("../controllers/productController");

const router = require("express").Router();

router.get("/allProduct", ProductController.Product);
router.post("/createProduct", ProductController.CreateProduct);
router.get("/Productdetail/:id", ProductController.ProductDetail);
router.put("/Productupdate/:id", ProductController.updateProduct);
router.delete("/Productdelete/:id", ProductController.deleteProduct);

module.exports = router;
