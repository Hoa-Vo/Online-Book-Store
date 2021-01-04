const express = require("express"); 
const forgotPasswordController = require("../controllers/forgotPasswordController");
const router = express.Router(); 

router.get("/", forgotPasswordController.renderForgotPasswordPage);
router.get("/:id", forgotPasswordController.renderEnterNewPasswordPage); 


module.exports = router;