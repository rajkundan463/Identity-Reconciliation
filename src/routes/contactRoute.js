const router =
require("express").Router();

const controller =
require("../controllers/contactController");


router.get(
  "/contacts",
  controller.getAll
);


router.get(
  "/contacts/:id",
  controller.getById
);


module.exports = router;