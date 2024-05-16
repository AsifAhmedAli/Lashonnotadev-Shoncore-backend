var db = require("../models");
var User = db.user;
// const { USER_ROLE } = require('../models/utils');
const Joi = require('joi');
const validateRequest = require('../Middleware/validate-request');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const secret  = require('..config/');
const dotenv = require("dotenv");
dotenv.config({ path: "../Lashonnotadev-Shoncore/config/config.env" });

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


// generate jwt tokens
function generateJwtToken(user) {
  // create a jwt token containing the user id ,role that expires in 7 days
  return jwt.sign(
    {
      sub: user.id,
      role: user.role,  
      country: user.country,   
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  );
}
function getRefreshToken(token) {
  const refreshToken =  db.RefreshToken.findOne({ where: { token } });
  if (!refreshToken || !refreshToken.isActive) throw 'Invalid token';
  return refreshToken;
}


/////////////////added ///////////////////

// router.post('/authenticate', authenticateSchema, authenticate);


function authenticateSchema(req, res, next) {
  const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required()
  });
  validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
  userService.authenticate(req.body)
      .then(user => res.json(user))
      .catch(next);
}

function registerSchema(req, res, next) {
  const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().min(6).required()
  });
  validateRequest(req, next, schema);
}



///////////////////////////////////////////////////

// module.exports = {
//   authenticate,
//   getAll,
//   getById,
//   create,
//   update,
//   delete: _delete
// };

async function authenticate({ username, password }) {
  const user = await db.User.scope('withHash').findOne({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.hash)))
      throw 'Username or password is incorrect';

  // authentication successful
  const token = jwt.sign({ sub: user.id }, secret, { expiresIn: '7d' });
  return { ...omitHash(user.get()), token };
}

// async function getAll() {
//   return await db.User.findAll();
// }

// async function getById(id) {
//   return await getUser(id);
// }

// async function create(params) {
//   // validate
//   if (await db.User.findOne({ where: { username: params.username } })) {
//       throw 'Username "' + params.username + '" is already taken';
//   }

//   // hash password
//   if (params.password) {
//       params.hash = await bcrypt.hash(params.password, 10);
//   }

//   // save user
//   await db.User.create(params);
// }

// async function update(id, params) {
//   const user = await getUser(id);

//   // validate
//   const usernameChanged = params.username && user.username !== params.username;
//   if (usernameChanged && await db.User.findOne({ where: { username: params.username } })) {
//       throw 'Username "' + params.username + '" is already taken';
//   }

//   // hash password if it was entered
//   if (params.password) {
//       params.hash = await bcrypt.hash(params.password, 10);
//   }

//   // copy params to user and save
//   Object.assign(user, params);
//   await user.save();

//   return omitHash(user.get());
// }

// async function _delete(id) {
//   const user = await getUser(id);
//   await user.destroy();
// }

// // helper functions

// async function getUser(id) {
//   const user = await db.User.findByPk(id);
//   if (!user) throw 'User not found';
//   return user;
// }

// function omitHash(user) {
//   const { hash, ...userWithoutHash } = user;
//   return userWithoutHash;
// }




exports.registers =async (req, res) => {
  await User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        res.status(402).json({
          message: "This user is already exist",
        });
      } else {
        if (req.body.password === req.body.confirmPassword) {
          bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
              res.status(500).json({
                error: err.message,
              });
            } else {
              const users =await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                role: req.body.role,
              });
              const data = {
                user: {
                  id: users.id,
                },
              };
              const authToken = jwt.sign(data, process.env.SECRET);
              // const verifyEmailURL = `${req.protocol}://${req.get(
              //   "host"
              // )}/api/v1/verify/${users.id}`;
              // const message = `Please click here :- \n\n ${verifyEmailURL} \n\n to veirfy your email...`;
              // sendEmail({
              //   email: req.body.email,
              //   subject: `AXXO CARE Email verification `,
              //   message,
              // });
              
                res
                  .status(200)
                  // .cookie("token", authToken, {
                  //   expires: new Date(Date.now() + 25892000000),
                  //   httpOnly: true,
                  // })
                  .json({
                    message: `User registered successfully please verify yout email at : ${req.body.email}`,
                    users,
                  });
             
            }
          });
        } else {
          res.status(400).json({
            message: "Password not matched",
          });
        }
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).json({
          message: "Resource not found",
        });
      }
      return res.status(500).json(err);
    });}