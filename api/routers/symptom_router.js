const router = require("express").Router();
//Methods from controller to use in endPoints
const { loadSymptoms, createSymptom } = require("../controllers/symptom_controller");
const { checkAuth } = require("../middleware/auth");

router
    // Get to Load Symptoms List
    .get('/', checkAuth, loadSymptoms)
    // Post to create Symptom
    .post('/', checkAuth, createSymptom)
  

module.exports = router;
