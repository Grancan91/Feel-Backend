const router = require("express").Router();
//Methods from controller to use in endPoints
const { loadStrategy, createStrategy } = require("../controllers/strategy_controller");
const { checkAuth } = require("../middleware/auth");

router
    // Get to Load Strategy List
    .get('/', checkAuth, loadStrategy )   
    // Post to Create Strategy
    .post('/', checkAuth, createStrategy )

module.exports = router;
