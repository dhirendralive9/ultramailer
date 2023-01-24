const fs = require("fs");
var system = JSON.parse(fs.readFileSync("./data/system.json"));
var toggle;
//console.log(system)
const system_switch = ()=>{
    if(system.mailer == "stop"){
        system.mailer = "start";
        toggle = system.mailer;
        console.log("Status changed:",system.mailer);
    }else {
        system.mailer = "stop";
        console.log("Status changed:",system.mailer);
        fs.writeFileSync("./data/system.json",JSON.stringify(system),error=> console.log(error));
    }
    toggle = system.mailer;
    fs.writeFileSync("./data/system.json",JSON.stringify(system),error=> console.log(error));
}

const system_stop = ()=>{
    system.mailer = "stop";
    toggle = "stop";
    fs.writeFileSync("./data/system.json",JSON.stringify(system),error=> console.log(error));
}

toggle = system.mailer;
module.exports.system_switch = system_switch;
module.exports.toggle = toggle;
module.exports.system_stop = system_stop;