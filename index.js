const express = require('express');
const app = express();
const port = 2000;
const data = require("./routes/data");
const errors = require("./routes/errors");
const status = require("./routes/status");
var bodyParser = require('body-parser')
const chalk = require('chalk');
const cors = require('cors');

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
 
app.get("/",(req,res)=>{                  //home page
    res.json("Updated version of Ultramailer is running. New updates coming soon.");
});
//-------------------------------------
app.get("/list",data.listinfo);          //list related end point
app.get("/template",data.templatesCheck);  //template related end point
app.get("/queue",data.queuecheck);         //queue related end point
app.get("/smtp",data.smtpcheck);        //smtp end point
app.get("/phone",data.phoneCheck);    //phone end point
//-------------------------------------

app.get("/errors",errors.errorfetch);  //get all the errors

//-------------------------------------

app.get("/status",status.statusFetch);  //get all the status

//-------------------------------------
app.get("/start",data.start);

//-------------------------------------
app.get("/key",data.apikey);

//------MillionVerifierApi functions--------------
app.get('/api/ping',data.ping)

app.get('/api/get-lists',(req,res)=>{
    res.status(200).json({"message":"Get the lists of all the data list"});
})

app.get('/api/get-list-contacts',(req,res)=>{
    res.status(200).json({"message":"Get the lists of all the data list"});
})

app.post('/api/contacts-action',(req,res)=>{
    console.log(req.body);
    res.status(201).json();
})

//-----------------------------------------------------
app.listen(port,()=>{
    console.log(chalk.bgBlue("UltraMailer is runing on port:",port));
});