//const { query } = require("express");
const fs = require("fs");


var system = require("./system");
var nodemailer = require("./nodemailer");
//-----------------------------------------------------------------
var list = JSON.parse(fs.readFileSync("./data/list.json"));
var templates = JSON.parse(fs.readFileSync("./data/templates.json"));
var queue = JSON.parse(fs.readFileSync("./data/queue.json"));
var smtp = JSON.parse(fs.readFileSync("./data/stmp.json"));
var phone = JSON.parse(fs.readFileSync("./data/phone.json"));
//------------------------------------------------------------------

console.log("Mailer Status:",system.toggle)
var sitrap;
var code;
//console.log(list)

var startpoint=0;
var endpoint = 50;
var listCount = 0;
var i;
var interval = 1500;

const mailsent =(data) =>{
         nodemailer.mailMaker(data);
}


const queueWriter = ()=>{
    queue.splice(0,1);
    fs.writeFileSync("./data/queue.json",JSON.stringify(queue),error=>console.log(error));
    queue = JSON.parse(fs.readFileSync("./data/queue.json"));
}

const sendMail = ()=>{
    if(system.toggle == "start" ){
          if(queue.length !=0){
              setTimeout(()=>{
                mailsent(queue[0]);  
              },interval);
              
          }else{
            
            system.toggle = "stop";
            system.system_stop();
            setTimeout(()=>{
                console.log("All Mail delivered");
            },3000);
            
          }
    }
}

const start_mailer = ()=>{
  if(queue.length == 0 && smtp !=0){
    smtp.forEach(x => {
       for(i=startpoint;i<endpoint;i++){
           let sender = x.user;
           let pass = x.password;
           if(list[listCount]){
               let currEmail = list[listCount]?list[listCount]:"";
               let fname = currEmail['fname']?currEmail['fname']:"";
               let lname = currEmail['lname']?currEmail['lname']:""; 
               let email = currEmail['email']?currEmail['email']:"";
            if(fname){
             var newItem = {"sender":sender,"pass":pass,"fname":fname,"lname":lname,"email":email};
             queue.push(newItem);
            }
           }
           
           listCount++; 
       } 
       queueWriter();
    });
    sendMail();
    console.log("Data left in queue, please clear it");
  }
  sendMail();
}

//system.system_switch();
//start_mailer();






module.exports.listinfo = (req,res)=>{

    if(!req.query.src){
        res.status(200).json({"total_list_count":list.length});
    }
    
}

module.exports.templatesCheck = (req,res)=>{

    if(!req.query.src){
        res.status(200).json({"total_template_count":templates.length});
    }
    
}

module.exports.queuecheck = (req,res)=>{

    if(!req.query.src){
        res.status(200).json({"data_in_queue":queue.length});
    }

    
}

module.exports.smtpcheck = (req,res)=>{
    if(!req.query.src){
        res.status(200).json({"smtp_count":smtp.length});

    }
}

module.exports.phoneCheck = (req,res)=>{
    if(!req.query.src){
        res.status(200).json({...phone});
    }
    
}

module.exports.start = (req,res)=>{
   if(list.length>0 && templates.length>0 && smtp.length>0 && phone.length>0) {
     sitrap = "All Good, Mailer can work right now";
     code = "green";
   }else {
    sitrap = "Some information(s) is missing, please check, make sure the queue is empty";
    code = "red";
   }
   var response = {"list":list.length,"templates":templates.length,"smtp":smtp.length,"phone":phone.length,"queue":queue.length,"status":sitrap,"code":code,"mailer":system.toggle};

   if(req.query.mailer=="start" && code == "green"){
    if(system.toggle=="stop"){
        system.system_switch();
        system.toggle = "start";
       
        setTimeout(()=>{
            start_mailer();
        },3000);
        var response = {"list":list.length,"templates":templates.length,"smtp":smtp.length,"phone":phone.length,"queue":queue.length,"status":"Mailing will commence...","code":code,"mailer":system.toggle};
    }else if(system.toggle=="start") {
        var response = {"list":list.length,"templates":templates.length,"smtp":smtp.length,"phone":phone.length,"queue":queue.length,"status":"Mailing is in progresss...","code":code,"mailer":system.toggle};

    }
    res.status(200).json(response);
   }else if(req.query.mailer=="start" && code == "red") {
    res.status(200).json(response);
   
   }else if(req.query.mailer=="stop")
   {
    system.toggle = "stop";
    system.system_stop();
    var response = {"list":list.length,"templates":templates.length,"smtp":smtp.length,"phone":phone.length,"queue":queue.length,"status":"Mailing is stopped","code":code,"mailer":system.toggle};
    res.status(200).json(response);
   }
   else{
    res.status(200).json(response);
   }
   
   
}

const response = (recall)=>{
    if (recall == "start"){
        sendMail();
    }else{
        system.toggle = "stop";
        system.system_switch();
    }
}

module.exports.response = response;
module.exports.queueWriter = queueWriter;