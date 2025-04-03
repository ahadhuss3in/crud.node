const {constants} = require("../constant")// importing the error codes from the js
const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500;

    // im using switch case here to handle various error codes in my file , 
    // the codes i have already defined in the "../constants.js" so same thingy 
    // being imported here rn ;

    switch(statusCode){
    case constants.NOT_FOUND:
    res.json({title: "Not found",message: err.message});
    break;
    case constants.Validation_error:
    res.json({title: "Validation failed",message: err.message});
    break;
    case constants.Forbidden:
        res.json({title: "Forbidden",message: err.message});
    break;
    case constants.Unauthorized:
        res.json({title: "Unauthorized",message: err.message});
    break;
    default:
        console.log(`No error All good !`);
// above switch case is handling various error code using the constants defined 

}
};
module.exports = errorHandler;
