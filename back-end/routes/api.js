let express = require('express');
const apiController = require("../controllers/api");
let router = express.Router();

router.get('/getTitles', apiController.getTitles);
router.get('/getCodeBlock/:title', apiController.getCodeBlock);

module.exports = router;