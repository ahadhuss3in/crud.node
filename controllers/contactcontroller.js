const Contact = require("../models/contactmodel");

const asyncHandler = require("express-async-handler")
//@desc Get all contacts
//@route Get /api/contacts
//@access public

const getContact = asyncHandler(async(req,res)=>{
    console.log("Req recieved to get Contacts");
    const contacts = await Contact.find();
    //console.log("Contacts retrieved:", contacts);
    res.status(200).json(contacts);
});

//@desc create new contacts
//@route post/api/contacts
//@access public

const CreateContact = asyncHandler(async(req,res)=>{
    console.log(`The request body is: `,req.body);
    const {name,email,phone} = req.body;
    if( !name || !email || !phone ){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
const contact = await Contact.create({
            name,
            email,
            phone,
});    
res.status(201).json({message:contact});
});

//@desc get specific
//@route Get /api/contacts
//@access public

const getContactSpecific = asyncHandler(async(req,res)=>{
       const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404).json({message:"User not found"})
        //throw new Error("Please check ID")
    }
    else
        //console.log("User :", contact);
        res.status(200).json({ message: "User details", contact });
    });
    

//@desc update contact
//@route put /api/contacts
//@access public

const UpdateContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404).json({message:"User not found"})
        throw new Error("Please check ID")
    }

    const updatedInfo = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    //res.status(200).json({message:`update contacts for ${req.params.id}`});
    console.log(`Contacts updated , new contacts is ${updatedInfo}`);
    res.status(200).json(updatedInfo)
});
//@desc dellete contacts
//@route Delete/api/contacts
//@access public

const DeleteContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404).json({message:"User not found"})
        throw new Error("Please check ID")
    }
    await Contact.findOneAndDelete(req.params.id);
    res.status(200).json(contact);
});


module.exports = {
 getContact,
 CreateContact,
 getContactSpecific,
 UpdateContact,
 DeleteContact,
};