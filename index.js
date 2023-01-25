const express = require('express');
const app = express();
const port = 2000;
const data = require("./routes/data");
const errors = require("./routes/errors");
const status = require("./routes/status");

const cors = require('cors');

app.use(cors());
 
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



app.listen(port,()=>{
    console.log("Mailing is runing on port:",port);
});