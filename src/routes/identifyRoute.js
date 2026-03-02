
const router = require("express").Router();
const controller = require("../controllers/identifyController");
router.post("/identify", controller.identify);
module.exports = router;