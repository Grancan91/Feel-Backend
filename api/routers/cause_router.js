const router = require("express").Router();
//Methods from controller to use in endPoints
const { loadCauses, createCause } = require("../controllers/cause_controller");
const { checkAuth } = require("../middleware/auth");
router
    // Get to Load Causes List
    .get('/', checkAuth, loadCauses )
    // Get to Load Causes List
    .post('/', checkAuth, createCause )
    // Get to Load Causes List
    .delete('/', checkAuth, )
  

module.exports = router;
