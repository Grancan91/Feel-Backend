const router = require("express").Router();
//Methods from controller to use in endPoints
const { createRecord, loadUserRecords } = require("../controllers/record_controller");
const { checkAuth } = require("../middleware/auth");

router
    // CheckAuth save user.id in res.locals
    // Get to Load All Records
    .get('/', checkAuth, loadUserRecords) //loadUserRecords need res.locals.user
    // Post to create Record
    .post('/', checkAuth , createRecord ) //createRecord need res.locals.user
    // Put to Update Record
    .put('/:recordId', )
    // Delete to Delete a Record
    .delete('/:recordId',)

module.exports = router;
