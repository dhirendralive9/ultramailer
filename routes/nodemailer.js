const status = require("./status");
const errors = require("./errors");


const mailMaker = (data)=>{
    console.log(data);
   status.writeStatus(data);
}


module.exports.mailMaker = mailMaker;