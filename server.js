const Koa = require("koa");
const cors = require("@koa/cors");
const bodyParser = require("koa-body");
const router = require("./routes");
const fs = require("fs");
const path = require("path");

const db = require("./models");

db.sequelize
  .sync()
  .then(() => console.log("db synced with models"))
  .catch((err) => console.log("error occured with sync " + err));

var corsOptions = {
  origin: "*",
};

var app = new Koa();
app.use(cors(corsOptions));
app.use(bodyParser({ multipart: true }));

app.use(router.routes());

app.use(async function (ctx) {
  const fpath = path.join(__dirname, ctx.path);
  //const fstat = await stat(fpath);
  //console.log('file path '+ ctx.path);
  if (ctx.path.indexOf(".pdf") > 0) {
    ctx.set("Content-Type", "application/pdf");
  }
  if (ctx.path.indexOf(".png") > 0) {
    ctx.set("Content-Type", "image/png");
  }
  if (ctx.path.indexOf(".jpg") > 0) {
    ctx.set("Content-Type", "image/jpg");
  }
  ctx.set("encoding", "base64");
  ctx.set("origin", "*");
  ctx.body = fs.createReadStream(fpath);
});

app.context.db = db;

const PORT = 3001;
app.listen(PORT);
console.log(`Server is listening on PORT ${PORT}`);
