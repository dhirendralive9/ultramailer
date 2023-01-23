const express = require('express');
const app = express();
const port = 1999;

app.get("/",(req,res)=>{
    res.json("This is the newest version of mailer");
});

app.listen(port,()=>{
    console.log("Mailing is runing on port:",port);
})