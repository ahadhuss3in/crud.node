const express= require("express");
const router = express.Router();
const {
    getContact,
    CreateContact,
    getContactSpecific,
    UpdateContact,
    DeleteContact,
   } = require("../controllers/contactcontroller")



// this is like if no id mentioned and if its get or post method i can call this to 
// either get a contact or post to make new contact 
router.route("/").get(getContact).post(CreateContact);
 
//if api calls come with values then i use this routes and go to the controller where i have declared the logic for each
router.route("/:id").get(getContactSpecific).put(UpdateContact).delete(DeleteContact);


module.exports = router;