const NewsController = require("../controllers/NewsController");

const router = require("express").Router();

router.get("/allnews", NewsController.News);
router.post("/createnews", NewsController.CreateNews);
router.get("/newsdetail/:id", NewsController.newsDetail);
router.put("/newsupdate/:id", NewsController.updateNews);
router.delete("/newsdelete/:id", NewsController.deleteNews);

module.exports = router;
