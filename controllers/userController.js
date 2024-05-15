var db = require("../models");
var User = db.user;

exports.addUser = async (req, res) => {
  const jane = await User.create({
    firstName: "UmairNewOne",
    lastName: "Ul HassanNewOne",
  });
  // const jane = User.build({ firstName: 'Jane12' ,lastName: 'Jane3214' });
  console.log(jane instanceof User); // true
  console.log(jane.firstName); // "Jane"
  // await jane.save();
  console.log("Jane was saved"); // This is good!
  console.log(jane.toJSON()); // This is also good!
  res.status(200).json(jane.toJSON()); // Here, you need to pass data to the json method
};

//get users

exports.getUsers = async (req, res) => {
  const data = await User.findAll({});
  res.status(200).json({ data: data });
};
//get user
exports.getUser = async (req, res) => {
  const data = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ data: data });
};

//post users
exports.postUsers = async (req, res) => {
  try {
    var postData = req.body;
    if (postData.length > 1) {
      // if more than one data (array handle )
      var data = await User.bulkCreate(postData); // for bulk data
    } else {
      var data = await User.create(postData);
    }

    res.status(200).json({ data: data });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// for delete
exports.deleteUsers = async (req, res) => {
  const data = await User.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ data: data });
};

// for update
exports.patchUsers = async (req, res) => {
  try {
    var updatedData = req.body;
    const data = await User.update(updatedData, {
      where: {
        id: req.params.id,
      },
    });
    if (data[0] === 0) {
      return res
        .status(404)
        .json({ message: "User not found or no changes made" });
    }
    res.status(200).json({ message: "User updated successfully", data: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// for check and update
exports.putUser = async (req, res) => {
  try {
    var updatedData = req.body;
    const userId = req.params.id;

    // Find the user by ID first
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Replace the entire user data with the new data
    await user.update(updatedData);

    res.status(200).json({ message: "User updated successfully", data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
