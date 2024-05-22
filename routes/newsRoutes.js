const NewsController = require("../controllers/NewsController");
const isAuthenticated = require("../middlewares/auth");
const AuthenticatedRoles = require("../middlewares/authrole");
const router = require("express").Router();

router.get("/allnews", NewsController.News);
router.post(
  "/createnews",
  isAuthenticated,
  AuthenticatedRoles("admin"),
  NewsController.CreateNews
);
router.get("/newsdetail/:id", NewsController.newsDetail);
router.put("/newsupdate/:id", isAuthenticated, NewsController.updateNews);
router.delete("/newsdelete/:id", isAuthenticated, NewsController.deleteNews);

module.exports = router;
