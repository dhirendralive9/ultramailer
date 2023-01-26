const fs = require("fs");
const nodemailer = require("nodemailer");
const axios = require('axios');
const date = require('date-and-time');

const status = require("./status");
const errors = require("./errors");
const datajs = require('./data');
const chalk = require("chalk");



var temp;
var orderno = () => {
  return Math.floor(Math.random() * 99999999);
}

const sender = async (data,num,tmp)=>{
  try {
  
    // let transport = nodemailer.createTransport({
    //   host: "postal.freedomnewsusa.net",
    //   port: 25,
    //   secure: false, // true for 465, false for other ports
    //   auth: {
    //     user: 'freedom-news-usa/server-one', // generated ethereal user
    //     pass: 'gunN3UBeLkCSDFYtYuU2R1YG', // generated ethereal password
    //   },
    // }); 

  //   let transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     auth: {
  //      user: data.sender,
  //      pass: data.pass
  //     }
  //  });    
   
  // let transporter = nodemailer.createTransport({
  //   host: "smtp.mail.me.com",
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //     user: user, // generated ethereal user
  //     pass: pass, // generated ethereal password
  //   },
  // }); 
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "aron.stroman5@ethereal.email", // generated ethereal user
      pass: "XTvtaDrnZNuQtQjVVV", // generated ethereal password
    },
  });
    
    const mailOptions = {
      from: `${tmp.name} <${data.sender}>`,
      to: `${data.email}`,
      subject: `Hi ${data.fname},${tmp.subject}`,
      text: `${tmp.temp}`,
      html: `${tmp.temp}`,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(chalk.bgGreenBright(...result));
    status.writeStatus(result,num,tmp);

   } catch (error) {
     //console.log(error)
     errors.write(error,data.sender,data.pass);
     errors.email(data.sender,data.pass,data.email,data.fname,data.lname);
     errors.emaillist(data.email,data.fname,data.lname);
     errors.id(data.sender,data.pass);
   }


  //console.log(data,num,tmp.name)
  //status.writeStatus(data,num,tmp);
}


const mailMaker = (data,num,tmp)=>{
  //console.log(data,num,tmp);
    axios.get(`${tmp.template}`)
         .then(res => {
          let name = `${data.fname} ${data.lname}`;
          temp = res.data.toString().replace(/#name/g,name).replace(/#orderno/g,`${orderno()}`).replace(/#email/g,`${data.email}`).replace(/#date/g,date.format(new Date(), 'MM/DD/YYYY')).replace(/#phone/g,num);
          data.name = name; 
          tmp.temp=temp;
          sender(data,num,tmp);
         }).catch(error =>{
          console.log(error)
         })
  
}


module.exports.mailMaker = mailMaker;