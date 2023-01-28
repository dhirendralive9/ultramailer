const fs = require("fs");
const start = {"mailer":"stop"};
//const { v4: uuidv4 } = require('uuid');
const files = ['api.json','attach.json','errors.json','failed.json','id_failed.json','list.json','list_group.json','log.json','phone.json','queue.json','relist.json','status.json','stmp.json','stmp_groups.json','templates.json'];
fs.writeFileSync('./data/system.json',JSON.stringify(start),error=> console.log(error));

files.forEach(x =>{
    fs.writeFileSync(`./data/${x}`,JSON.stringify([]),error=>console.log(error));
});

