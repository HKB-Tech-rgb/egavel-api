const Router = require('@koa/router');
const multer = require('@koa/multer');

const fileRouter = new Router();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});

const upload = multer({storage: storage});

fileRouter.post('/upload', upload.array('upFiles'), async ctx => {
    //const files = ctx.files;
    console.log('ctx.request.files', ctx.request.files);    
    console.log('ctx.files', ctx.files);

    if (!files) {
        ctx.throw(400, 'No files found ');
    }
   
    ctx.body(files.length + " Files uploaded to server");
});
module.exports = fileRouter;