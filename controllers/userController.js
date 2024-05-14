var db = require ('../models')
var User = db.user;


var addUser = async (req, res) => {

    const jane = await User.create({ firstName: 'UmairNewOne' ,lastName: 'Ul HassanNewOne' });
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
var postUsers = async (req, res) => {
    try {

        
        var postData = req.body;
        if (postData.length> 1){  // if more than one data (array handle )
          var data = await User.bulkCreate(postData); // for bulk data
        }else {
            var data = await User.create(postData);
        }
        
        res.status(200).json({ data: data });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// for delete 
var deleteUsers = async (req,res) =>{
    const data = await User.destroy({
        where:{
            id:req.params.id
        }
      });
    res.status(200).json({data:data});
}

module.exports = {
    addUser,
    getUsers,
    getUser,
    postUsers,
    deleteUsers
}