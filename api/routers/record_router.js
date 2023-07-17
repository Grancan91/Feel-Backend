const router = require("express").Router();
//Methods from controller to use in endPoints
const { createUserRecord, loadUserRecords, deleteUserRecord, calculateAverageEmotions, calculateAverageEmotionsPatient } = require("../controllers/record_controller");
const { checkAuth } = require("../middleware/auth");

router
    // CheckAuth save user.id in res.locals
    // Get to Load All Records
    .get('/', checkAuth, loadUserRecords ) //loadUserRecords need res.locals.user
    // Get to Load All Patients Records
    .get('/:patientId', checkAuth, calculateAverageEmotionsPatient) //loadUserRecords need res.locals.user
    // Get Average Emotions on Records
    .get('/average', checkAuth, calculateAverageEmotions ) //calculateAverageEmotions need res.locals.user
    // Post to create Record
    .post('/', checkAuth , createUserRecord ) //createUserRecord need res.locals.user
    // Delete to Delete a Record
    .delete('/:recordId', checkAuth, deleteUserRecord ) //deleteUserRecord need res.locals.user

module.exports = router;
