const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const bcrypt = require("bcrypt")
//@desc Register user
//@route post /user/register
//@access public

const registeruser = asyncHandler(async (req,res) =>{
    const{username,email,password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    const availableuser = await User.findOne({email})
    if(availableuser){
        res.status(400);
        throw new Error("User already available");
    }

    // create hashed pass using bcrypt
    const hashedpass = await bcrypt.hash(password,10);
    console.log("hashed password : ",hashedpass);

    const user = await User.create({
        username,
        email,
        password:hashedpass,
     });
     console.log(`User created ${user}`);
    if(user){
        res.status(200).json({
            _id:user.id,
            email:user.email
        });
    }else{
        res.status(400);
        throw new Error("User not created");

    }
    res.json({message:"register User"});
});

//@desc Login user
//@route post /user/Login
//@access public

const Loginuser= asyncHandler(async (req,res) =>{
    const{email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields mandatory");
    }
const user = await User.findOne({email});
//compare pass with hashed pass;
if(user && (await bcrypt.compare(password,user.password))){
    const accessToken = jwt.sign({
        user:{
            username : user.username,
            email:user.email,
            id: user._id,
        },
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:"1m"}
);
    res.status(200).json({accessToken});
}else{
    res.status(401);
    throw new Error("Email or password is not valid ");
}
});

//@desc current user
//@route get/user/current
//@access private

const currentuser = asyncHandler(async (req,res) =>{
    res.json({message:"Current User"});
});

module.exports = {registeruser,Loginuser,currentuser};