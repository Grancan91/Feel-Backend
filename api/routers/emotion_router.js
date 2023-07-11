const router = require("express").Router();
//Methods from controller to use in endPoints
const { loadEmotions } = require("../controllers/emotion_controller");

router
    // Get to Load Emotions List
    .get('/', loadEmotions ) //checkAuth don't needed.
  

module.exports = router;
