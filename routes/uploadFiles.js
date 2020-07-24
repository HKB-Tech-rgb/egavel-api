const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const uniqueId = require('really-unique-id');

const uploadRouter = new Router();

uploadRouter.post('/upload', ctx => {
    var count = ctx.request.files.upFiles.length;
    console.log('in upload Router');    
    if (!fs.existsSync(path.join(__dirname,'/uploads/'))){
        fs.mkdirSync(path.join(__dirname,'/uploads'));
        fs.chmodSync(path.join(__dirname,'/uploads',parseInt("777",8)));
    }
    filesArray = [];
    fileObj = {};

    ctx.request.files.upFiles.forEach(file => {
        const reader = fs.createReadStream(file.path);
        //console.log(file.path);
        var fileOnDisk =  uniqueId().toString() + '.pdf';
        const stream = fs.createWriteStream(path.join(__dirname,'/uploads/'+fileOnDisk));
        reader.pipe(stream);
        fileObj = {"filename":file.name, "diskname":fileOnDisk};
        filesArray.push(fileObj);
        console.log('uploading %s -> %s', file.name, stream.path);
    });  
        
    retObj = {msg:`${count} Files uploaded!!`, files:filesArray}
    ctx.response.body = retObj;
    
});
module.exports = uploadRouter;