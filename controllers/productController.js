var db = require("../models");
var Product = db.products;
const multer = require("multer");

const Storage = multer.diskStorage({
  destination: "uploads/Product",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("testImage");

// add Product
exports.CreateProduct = async (req, res) => {
  let user = req.user.id;
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error uploading image: " + err.message,
      });
    }

    const { Name, Description, stock } = req.body;

    // Check if the image file is uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required.",
      });
    }

    // Create Product object with image file data
    const ProductData = {
      productowner: user,
      Name,
      Description,
      stock,
      Image: {
        data: req.file.filename,
        contentType: req.file.mimetype,
      },
    };
    try {
      const result = await Product.create(ProductData);
      return res.status(200).json({
        success: true,
        message: "The Product was created successfully",
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

// get all Product
exports.Product = async (req, res) => {
  await Product.findAll()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
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

// get owner products
exports.ownerProduct = async (req, res) => {
  let user = req.user.id;
  await Product.findAll({ where: { productowner: user } })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
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

// get Product detail
exports.ProductDetail = async (req, res) => {
  let id = req.params.id;
  await Product.findOne({
    where: { id: id },
  })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
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

// Update Product
exports.updateProduct = async (req, res) => {
  let id = req.params.id;
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error uploading image: " + err.message,
      });
    }

    const { Name, Description, stock } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required.",
      });
    }

    const ProductData = {
      Name,
      Description,
      stock,
      Image: {
        data: req.file.filename,
        contentType: req.file.mimetype,
      },
    };
    try {
      const [updatedRowsCount] = await Product.update(
        {
          Title,
          Description,
          Image: {
            data: req.file.filename,
            contentType: req.file.mimetype,
          },
        },
        { where: { id: id } }
      );
      if (updatedRowsCount === 0) {
        return res.status(400).json({
          success: false,
          message: "Error occur while updating product",
        });
      }
      return res.status(200).json({
        success: true,
        message: "The Product was updated successfully",
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

// Delete Product
exports.deleteProduct = async (req, res) => {
  let id = req.params.id;
  await Product.destroy({
    where: { id: id },
  })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "no product found with this id",
        });
      }
      return res.status(200).json({
        success: true,
        message: "The Product was successfully deleted",
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
