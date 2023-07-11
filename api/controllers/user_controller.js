
const User = require('../models/user_model');

//Update user
const updateUser = async (req, res) => {
  try {
    //Set userId res.locals.user => checkAuth
   
    const userId = res.locals.user.id
    //Updated user Json
    const updateData = req.body;
    //Update userData of userId and {new: true} for return new userUpdated
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }); 

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
          }
          return res.status(200).json(updatedUser);
      
        } catch (error) {
          return res.status(500).json({ error: 'Error updating the user' });
        }
}

module.exports = { updateUser }