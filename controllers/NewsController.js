var db = require("../models");
var News = db.news;
const multer = require("multer");

const Storage = multer.diskStorage({
  destination: "uploads/News",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("testImage");

// add News
exports.CreateNews = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error uploading image: " + err.message,
      });
    }

    const { Title, Description } = req.body;

    // Check if the image file is uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required.",
      });
    }

    // Create news object with image file data
    const newsData = {
      Title,
      Description,
      Image: {
        data: req.file.filename,
        contentType: req.file.mimetype,
      },
    };
    try {
      const result = await News.create(newsData);
      return res.status(200).json({
        success: true,
        message: "The news was created successfully",
      });
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        return res.status(400).json({
          message: "Validation error: " + err.message,
        });
      }
      return res.status(500).json({
        message: err.message,
      });
    }
  });
};

// get all news
exports.News = async (req, res) => {
  await News.findAll()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "News not found",
        });
      }
      return res.status(200).json({
        success: true,
        result: result,
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).json({
          message: "Resource not found",
        });
      }
      return res.status(500).json({
        message: err.message,
      });
    });
};

// get news detail
exports.newsDetail = async (req, res) => {
  let id = req.params.id;
  await News.findOne({
    where: { id: id },
  })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "News not found",
        });
      }
      return res.status(200).json({
        success: true,
        result: result,
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).json({
          message: "Resource not found",
        });
      }
      return res.status(500).json({
        message: err.message,
      });
    });
};

// Update news
exports.updateNews = async (req, res) => {
  try {
    const { Title, Description } = req.body;
    const id = req.params.id;
    const [updatedRowsCount, updatedRows] = await News.update(
      { Title, Description },
      { where: { id: id } }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({
        success: false,
        message: "News not found or no changes were made.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "News successfully updated.",
      updatedRowsCount,
      updatedRows,
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({
        message: "Invalid parameter type.",
      });
    }
    return res.status(500).json({
      message: "An error occurred while updating the news.",
      error: err.message,
    });
  }
};

// Delete News
exports.deleteNews = async (req, res) => {
  let id = req.params.id;
  await News.destroy({
    where: { id: id },
  })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "An error occurred while deleting the news.",
        });
      }
      return res.status(200).json({
        success: true,
        message: "The news was successfully deleted",
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).json({
          message: "Resource not found",
        });
      }
      return res.status(500).json({
        message: err.message,
      });
    });
};



