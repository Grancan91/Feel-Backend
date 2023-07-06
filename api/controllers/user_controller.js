const User = require("../models/user_model");


// GET all users
const getUsers = async (req, res) => {
    try {
        const userList = await User.find();
        if (userList.length > 0) {
            res.json(userList);
        } else {
            console.log('No users found');
            res.json({ 'User': 'No users available' });
        }
    } catch (error) {
        console.error('Error retrieving users:');
        console.log(error)
        res.status(500).json({ error: 'Error retrieving users' });
    }
};

const createUser = () => {
    try {
        const user = new User({
            name: 'Silence',
            age: 25,
            genre: 'Male',
            email: 'silence5@example.com',
            password: 'mypassword',
            professional_email: 'professional@example.com',
            reminder_day: 1,
            reminder_hour: '08:00',
            reminder_send: new Date()
        });
        console.log(user.reminder_send);
        
        try {
            user.save()
            console.log('User Saved')
        } catch (error) {
            throw new Error('Error saving the User:', error);
        }
      } catch (error) {
        throw new Error('Error creating the User:', error);
      }
}

module.exports = { getUsers, createUser };
