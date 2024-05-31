const ProductController = require("../controllers/productController");
const isAuthenticated = require("../middlewares/auth");
const AuthenticatedRoles = require("../middlewares/authrole");

const router = require("express").Router();

router.get("/allProduct", ProductController.Product);
router.post(
  "/createProduct",
  isAuthenticated,
  // AuthenticatedRoles("admin"),
  ProductController.CreateProduct
);
router.get("/Productdetail/:id", ProductController.ProductDetail);
router.get("/ownerProduct", ProductController.ownerProduct);
router.put(
  "/Productupdate/:id",
  isAuthenticated,
  AuthenticatedRoles("admin"),
  ProductController.updateProduct
);
router.delete(
  "/Productdelete/:id",
  isAuthenticated,
  AuthenticatedRoles("admin"),
  ProductController.deleteProduct
);

module.exports = router;
