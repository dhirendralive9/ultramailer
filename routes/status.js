var fs = require("fs");
var data = require("./data");
var system = require("./system");

const axios = require('axios');
var ip;
var status = JSON.parse(fs.readFileSync("./data/status.json"));

axios.get('https://api.ipify.org?format=json')
  .then(function (response) {
    // handle success
    
    ip = response.data.ip;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
    
  });


module.exports.writeStatus = (info)=>{
    var id = status.length;
   var newStatus = {"id":id,"server":ip,"status":"mail-sent","message":info};
  //  console.log(newStatus);
   status.push(newStatus);
   fs.writeFile(`./data/status.json`,JSON.stringify(status),error => console.log(error));
   data.queueWriter();
   data.response("start");
   
}


module.exports.statusFetch = (req,res)=>{
    res.status(200).json({...status});
}