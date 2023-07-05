const mongoose = require('mongoose');
const userSchema = require('../schemas/userSchema')

const User = mongoose.model('User', userSchema);

const createUser = () => {
    try {
        const user = new User({
            name: 'Silence',
            age: 25,
            genre: 'Male',
            email: 'silence3@example.com',
            password: 'mypassword',
            professional_email: 'professional@example.com',
            reminder_day: 1,
            reminder_hour: '08:00',
            reminder_send: new Date()
        });
        console.log(user.reminder_send);
        user.welcome()
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

module.exports = createUser;
