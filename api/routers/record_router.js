const router = require("express").Router();
const { createRecord, loadRecords } = require("../controllers/record_controller");
//Methods from controller to use in endPoints
const {} = require("../controllers/record_controller"); 


router
    // Get to Load All Records
    .get('/', loadRecords) // loadRecords
    // Post to create Record
    .post('/', createRecord )
    // Put to Update Record
    .put('/:recordId', )
    // Delete to Delete a Record
    .delete('/:recordId',)

module.exports = router;