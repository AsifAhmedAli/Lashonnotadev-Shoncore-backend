var db = require ('../models')
var User = db.user;


var addUser = async (req, res) => {

    const jane = await User.create({ firstName: 'Umair' ,lastName: 'Ul Hassan' });
    // const jane = User.build({ firstName: 'Jane12' ,lastName: 'Jane3214' });
    console.log(jane instanceof User); // true
    console.log(jane.firstName); // "Jane" 
    // await jane.save();
    console.log("Jane was saved"); // This is good!
    console.log(jane.toJSON()); // This is also good!
    res.status(200).json(jane.toJSON()); // Here, you need to pass data to the json method
};


//get users
var getUsers = async (req,res) =>{
    const data = await User.findAll({  });
    res.status(200).json({data:data});
}
//get user
var getUser = async (req,res) =>{
    const data = await User.findOne({
        where:{
            id:req.params.id
        }
      });
    res.status(200).json({data:data});
}

//post users
var postUsers = async (req,res) =>{
    var postData =  req.body;
    const data = await User.create(postData);
    res.status(200).json({data:data});
}

module.exports = {
    addUser,
    getUsers,
    getUser,
    postUsers
}