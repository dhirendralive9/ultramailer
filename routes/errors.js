const fs = require("fs");
const axios = require('axios');
var ip;
var errors = JSON.parse(fs.readFileSync("./data/errors.json"));
var failed = JSON.parse(fs.readFileSync("./data/failed.json"));
var ids = JSON.parse(fs.readFileSync("./data/id_failed.json"));
var relist = JSON.parse(fs.readFileSync("./data/relist.json"));
var data = require("./data");
const chalk = require("chalk");



axios.get('https://api.ipify.org?format=json')
  .then(function (response) {
    // handle success
    
    ip = response.data.ip;
  })
  .catch(function (error) {
    // handle error
    console.log(chalk.red("Error on getting the ip address on error.js",error));
  })
  .then(function () {
    // always executed
    
  });

module.exports.write = (err,user,pass)=>{
    var id = errors.length;
    var newError = {"id":id,"server":ip,"user":user,"pass":pass,"status":"error","message":err};
    console.log(chalk.bgRedBright(JSON.stringify(newError)));
    console.log(chalk.bgRed(JSON.stringify(err)));
    errors.push(newError);
    fs.writeFile(`./data/errors.json`,JSON.stringify(errors),error => console.log(error));
 }

module.exports.errorfetch = (req,res)=>{
    res.status(200).json({...errors})
} 
 
 
module.exports.email = (user,pass,email,fname,lname)=>{
    var newData = {"user":user,"pass":pass,"fname":fname,"lname":lname,"email":email}
    relist.push(newData);
    fs.writeFile(`./data/relist.json`,JSON.stringify(relist),error => console.log(error));
}

module.exports.emailfetch = (req,res)=>{
    res.status(200).json({...relist});
} 
 
 module.exports.emaillist = (email,fname,lname)=>{
    var newData = {"fname":fname,"lname":lname,"email":email};
    failed.push(newData);
    fs.writeFile(`./data/failed.json`,JSON.stringify(failed),error => console.log(error));
 }
 
 module.exports.listfetch = (req,res)=>{
    res.status(200).json({...failed});
} 
 


 module.exports.id = (user,pass)=>{
    var newData = {"user":user,"pass":pass};
    ids.push(newData);
    fs.writeFile(`./data/id_failed.json`,JSON.stringify(ids),error => console.log(error));
    data.queueWriter();
    data.response("start");
 };

 module.exports.idfetch = (req,res)=>{
    res.status(200).json({...ids});
};
 
 