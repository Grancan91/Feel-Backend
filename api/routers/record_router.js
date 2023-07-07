const router = require("express").Router();
//Methods from controller to use in endPoints
const {} = require("../controllers/record_controller"); 


router
    // Post to create Record
    .post('/', () => {console.log('hi record')}) //createRecord
    // Put to Update Record
    .put('/:recordId', ) //updateRecord
    // Delete to Delete a Record
    .delete('/:recordId',) // loadRecords
    // Get to Load All Records
    .get('/', ) // loadRecords

module.exports = router;
