const userController = require("../controllers/userController");

const Joi = require('joi');
const validateRequest = require('../Middleware/validate-request');
const authorize = require('../Middleware/authorize')




const router = require("express").Router();

router.post("/add", userController.addUser);
router.get("/users", userController.getUsers);
/////
router.post("/register", userController.registers);
// router.post('/authenticate', authenticateSchema, userController.authenticate);
// router.post('/register', userController.registerSchema, userController.register);
// router.get('/', userController.authorize(), userController.getAll);
// router.get('/current', userController.authorize(), userController.getCurrent);
// router.get('/:id', userController.authorize(), userController.getById);
// router.put('/:id', userController.authorize(), userController.updateSchema, update);
// router.delete('/:id', userController.authorize(),userController._delete);


module.exports = router;



// function authenticateSchema(req, res, next) {
//     const schema = Joi.object({
//         username: Joi.string().required(),
//         password: Joi.string().required()
//     });
//     validateRequest(req, next, schema);
// }

// function authenticate(req, res, next) {
//     userController.authenticate(req.body)
//         .then(user => res.json(user))
//         .catch(next);
// }

// function registerSchema(req, res, next) {
//     const schema = Joi.object({
//         firstName: Joi.string().required(),
//         lastName: Joi.string().required(),
//         username: Joi.string().required(),
//         password: Joi.string().min(6).required()
//     });
//     validateRequest(req, next, schema);
// }

// function register(req, res, next) {
//     userController.create(req.body)
//         .then(() => res.json({ message: 'Registration successful' }))
//         .catch(next);
// }

// function getAll(req, res, next) {
//     userController.getAll()
//         .then(users => res.json(users))
//         .catch(next);
// }

// function getCurrent(req, res, next) {
//     res.json(req.user);
// }

// function getById(req, res, next) {
//     userController.getById(req.params.id)
//         .then(user => res.json(user))
//         .catch(next);
// }

// function updateSchema(req, res, next) {
//     const schema = Joi.object({
//         firstName: Joi.string().empty(''),
//         lastName: Joi.string().empty(''),
//         username: Joi.string().empty(''),
//         password: Joi.string().min(6).empty('')
//     });
//     validateRequest(req, next, schema);
// }

// function update(req, res, next) {
//     userController.update(req.params.id, req.body)
//         .then(user => res.json(user))
//         .catch(next);
// }

// function _delete(req, res, next) {
//     userController.delete(req.params.id)
//         .then(() => res.json({ message: 'User deleted successfully' }))
//         .catch(next);
// }