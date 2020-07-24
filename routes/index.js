const Router = require("@koa/router");
const fs = require("fs");
const path = require("path");
const uniqueId = require("really-unique-id");
const sgMail = require("@sendgrid/mail");

const router = new Router();

const {
  CompanyController,
  ArbiterCaseController,
  ClaimantController,
  DefendantController,
  ArbitUserController,
  LocusStandiController,
  LocusStandiFilesController,
  CoaController,
  CoaFilesController,
  MeritController,
  MeritFilesController,
  ReliefSoughtController,
  ReliefSoughtFilesController,
  AuthController,
  DefenseController,
  ApportionmentController,
  DefenseFilesController,
  ApportionFilesController,
  CommissionerController,
  QuantumController,
  QuantumFilesController,
  JurisdictionController,
  SettleController,
  SettleFilesController,
  AuditTrailController,
  DefLocusStandiController,
  DefLocusStandiFilesController,
  CoaControllerCC,
  CoaFilesControllerCC,
  MeritControllerCC,
  MeritFilesControllerCC,
  ReliefSoughtControllerCC,
  ReliefSoughtFilesControllerCC,
  QuantumControllerCC,
  QuantumFilesControllerCC,
  UserRoleController,
  StatusController,
  ArbitAllocateController,
  ResolutionController,
  ResolutionFilesController,
  PocController,
  CoDefendantController,
  UserToUserRoleController,
} = require("../controllers");

router.post("/companies", CompanyController.create);
router.get("/companies", CompanyController.find);
router.get("/companies/:id", CompanyController.findOne);
router.delete("/companies/:id", CompanyController.destroy);
router.put("/companies/:id", CompanyController.update);

router.post("/cases", AuthController.authPolicy, ArbiterCaseController.create);
router.get(
  "/cases/:CompanyId",
  AuthController.authPolicy,
  ArbiterCaseController.findArbitCases
);
router.get("/case/:id", ArbiterCaseController.findArbitCase);
router.put("/cases/:id", ArbiterCaseController.update);
router.get("/cases", ArbiterCaseController.find);
router.get("/claimcases/:userId", ArbiterCaseController.findClaimantCases);
router.get(
  "/claimcases/:userId/:statusId",
  ArbiterCaseController.findClaimantCaseStatus
);
router.get("/pendingarbit", ArbiterCaseController.findPendingArbit);
//findDemoCase
router.get("/democase/:id", ArbiterCaseController.findDemoCase);

router.post("/claimants", ClaimantController.create);
router.put("/claimants/:id", ClaimantController.update);
router.get(
  "/claimants/:id",
  AuthController.authPolicy,
  ClaimantController.findClaimant
);
router.get(
  "/claimants/case/:caseId",
  AuthController.authPolicy,
  ClaimantController.findCaseClaimants
);

router.post("/defendants", DefendantController.create);
router.get("/defendants/arbit", DefendantController.findCasesForArbit);
router.get(
  "/defendants/allcases/:userId",
  DefendantController.findDefendantCases
);
router.get(
  "/defendants/allcases/:userId/:statusId",
  DefendantController.findDefendantCaseStatus
);
router.put(
  "/defendants/:id",
  AuthController.authPolicy,
  DefendantController.update
);
router.get(
  "/defendants/:id",
  AuthController.authPolicy,
  DefendantController.findDefendant
);
router.get("/defendants/case/:caseId", DefendantController.findDefendants);
router.post("/defendants/:caseId", DefendantController.bulkCreate);
router.put(
  "/defendants/bulk",
  AuthController.authPolicy,
  DefendantController.updateBulk
);
router.delete("/defendants/:id", DefendantController.destroy);
router.get("/defendants/liab/:coyId", DefendantController.findLiabAllocs);
router.get("/defendants/coy/:caseId", DefendantController.findDefendantsWCoy);

router.post(
  "/codefendants",
  AuthController.authPolicy,
  CoDefendantController.create
);
router.post(
  "/codefendants/:defendId",
  AuthController.authPolicy,
  CoDefendantController.bulkCreate
);
router.put(
  "/codefendants/:id",
  AuthController.authPolicy,
  CoDefendantController.update
);
router.get(
  "/codefendants/:id",
  AuthController.authPolicy,
  CoDefendantController.findCoDefendant
);
router.get(
  "/codefendant/list/:defendId",
  CoDefendantController.findCoDefendants
);

router.post(
  "/locistatements",
  AuthController.authPolicy,
  LocusStandiController.create
);
router.put(
  "/locistatements/:id",
  AuthController.authPolicy,
  LocusStandiController.update
);
router.get(
  "/locistatements/claimant/:claimId",
  AuthController.authPolicy,
  LocusStandiController.findStatement
);
router.get(
  "/locistatements/:id",
  AuthController.authPolicy,
  LocusStandiController.findOne
);
router.get(
  "/locistatements",
  AuthController.authPolicy,
  LocusStandiController.find
);
router.post("/locifiles/:lociId", LocusStandiFilesController.bulkCreate);
router.put(
  "/locifiles/:id",
  AuthController.authPolicy,
  LocusStandiFilesController.update
);
router.get(
  "/locifiles/:id",
  AuthController.authPolicy,
  LocusStandiFilesController.findOne
);
router.delete(
  "/locifiles/:id",
  AuthController.authPolicy,
  LocusStandiFilesController.destroy
);
router.get(
  "/locifiles/claimant/:lociId",
  AuthController.authPolicy,
  LocusStandiFilesController.find
);

router.post("/coastatements", AuthController.authPolicy, CoaController.create);
router.put(
  "/coastatements/:id",
  AuthController.authPolicy,
  CoaController.update
);
router.get(
  "/coastatements/claimant/:claimId",
  AuthController.authPolicy,
  CoaController.findStatement
);
router.get(
  "/coastatements/cclaim/:claimId/:defendId",
  AuthController.authPolicy,
  CoaController.findStatement
);
router.get(
  "/coastatements/:id",
  AuthController.authPolicy,
  CoaController.findOne
);

router.post(
  "/coafiles/:coaId",
  AuthController.authPolicy,
  CoaFilesController.bulkCreate
);
router.put(
  "/coafiles/:id",
  AuthController.authPolicy,
  CoaFilesController.update
);
router.get(
  "/coafiles/:id",
  AuthController.authPolicy,
  CoaFilesController.findOne
);
router.delete(
  "/coafiles/:id",
  AuthController.authPolicy,
  CoaFilesController.destroy
);
router.get("/coafiles/claimant/:coaId", CoaFilesController.find);

router.post(
  "/meritstatements",
  AuthController.authPolicy,
  MeritController.create
);
router.put(
  "/meritstatements/:id",
  AuthController.authPolicy,
  MeritController.update
);
router.get(
  "/meritstatements/claimant/:claimId",
  AuthController.authPolicy,
  MeritController.findStatement
);
router.get(
  "/meritstatements/:id",
  AuthController.authPolicy,
  MeritController.findOne
);
router.get("/meritstatements", AuthController.authPolicy, MeritController.find);

router.post(
  "/meritfiles/:meritId",
  AuthController.authPolicy,
  MeritFilesController.bulkCreate
);
router.put(
  "/meritfiles/:id",
  AuthController.authPolicy,
  MeritFilesController.update
);
router.get(
  "/meritfiles/:id",
  AuthController.authPolicy,
  MeritFilesController.findOne
);
router.get(
  "/meritfiles/claimant/:meritId",
  AuthController.authPolicy,
  MeritFilesController.find
);
router.delete(
  "/meritfiles/:id",
  AuthController.authPolicy,
  MeritFilesController.destroy
);

router.post("/quantumstatements", QuantumController.create);
router.put("/quantumstatements/upd/:id", QuantumController.update);
router.get(
  "/quantumstatements/claimant/:claimId",
  QuantumController.findStatement
);
router.get("/quantumstatements/:id", QuantumController.findOne);
router.get("/quantumstatements", QuantumController.find);

router.post("/quantumfiles/:quantaId", QuantumFilesController.bulkCreate);
router.put("/quantumfiles/:id", QuantumFilesController.update);
router.get("/quantumfiles/:id", QuantumFilesController.findOne);
router.get("/quantumfiles/claimant/:quantaId", QuantumFilesController.find);
router.delete("/quantumfiles/:id", QuantumFilesController.destroy);

router.post("/reliefstatements", ReliefSoughtController.create);
router.put("/reliefstatements/:id", ReliefSoughtController.update);
router.get(
  "/reliefstatements/claimant/:claimId",
  ReliefSoughtController.findStatement
);
router.get("/reliefstatements/:id", ReliefSoughtController.findOne);
router.get("/reliefstatements", ReliefSoughtController.find);

router.post("/relieffiles/:reliefId", ReliefSoughtFilesController.bulkCreate);
router.put("/relieffiles/:id", ReliefSoughtFilesController.update);
router.get("/relieffiles/:id", ReliefSoughtFilesController.findOne);
router.get("/relieffiles/claimant/:reliefId", ReliefSoughtFilesController.find);
router.delete("/relieffiles/:id", ReliefSoughtFilesController.destroy);

router.post("/defensestatements", DefenseController.create);
router.put("/defensestatements/:id", DefenseController.update);
router.get(
  "/defensestatements/defendant/:defendId",
  DefenseController.findStatement
);
router.get("/defensestatements/:id", DefenseController.findOne);
router.get("/defensestatements", DefenseController.find);

router.get("/defensefiles", DefenseFilesController.find);
router.post("/defensefiles", DefenseFilesController.create);
router.post("/defensefiles/:defenseId", DefenseFilesController.bulkCreate);
router.put("/defensefiles/:id", DefenseFilesController.update);
router.get("/defensefiles/:id", DefenseFilesController.findOne);
router.get("/defensefiles/defendant/:defenseId", DefenseFilesController.find);
router.delete("/defensefiles/:id", DefenseFilesController.destroy);

router.post("/apportionstatements", ApportionmentController.create);
router.put("/apportionstatements/:id", ApportionmentController.update);
router.get(
  "/apportionstatements/defendant/:defendId/:claimId",
  ApportionmentController.findStatement
);
router.get("/apportionstatements/:id", ApportionmentController.findOne);
router.get("/apportionstatements", ApportionmentController.find);

//router.get('/apportionfiles', ApportionFilesController.find);
router.post("/apportionfiles", ApportionFilesController.create);
router.post(
  "/apportionfiles/:apportionId",
  ApportionFilesController.bulkCreate
);
router.put("/apportionfiles/:id", ApportionFilesController.update);
router.get("/apportionfiles/:id", ApportionFilesController.findOne);
router.get(
  "/apportionfiles/defendant/:apportionId",
  ApportionFilesController.find
);
router.delete("/apportionfiles/:id", ApportionFilesController.destroy);

router.post("/settlestatements", SettleController.create);
router.put("/settlestatements/:id", SettleController.update);
router.get(
  "/settlestatements/defend/:defendId",
  SettleController.findStatement
);
router.get("/settlestatements/:id", SettleController.findOne);
router.get("/settlestatements", SettleController.find);

//router.get('/settlefiles', SettleFilesController.find);
//router.post('/settlefiles', SettleFilesController.create);
router.post("/settlefiles/:settleId", SettleFilesController.bulkCreate);
router.put("/settlefiles/:id", SettleFilesController.update);
router.get("/settlefiles/:id", SettleFilesController.findOne);
router.get("/settlefiles/defendant/:settleId", SettleFilesController.find);
router.delete("/settlefiles/:id", SettleFilesController.destroy);

router.post("/resolutions", ResolutionController.create);
router.put("/resolutions/:id", ResolutionController.update);
router.get("/resolutions/arbitor/:arbitId", ResolutionController.findStatement);
router.get("/resolutions/:id", ResolutionController.findOne);
router.get("/resolutions", ResolutionController.find);

//router.get('/resolvefiles', ResolutionFilesController.find);
//router.post('/resolvefiles', ResolutionFilesController.create);
router.post(
  "/resolvefiles/:resolutionId",
  ResolutionFilesController.bulkCreate
);
router.put("/resolvefiles/:id", ResolutionFilesController.update);
router.get("/resolvefiles/:id", ResolutionFilesController.findOne);
router.get(
  "/resolvefiles/arbitor/:resolutionId",
  ResolutionFilesController.find
);
router.delete("/resolvefiles/:id", ResolutionFilesController.destroy);

router.post("/commissioners", CommissionerController.create);
router.put("/commissioners/:id", CommissionerController.update);
router.get(
  "/commissioners/case/:caseId",
  CommissionerController.findCommissioners
);
router.get("/commissioners/:id", CommissionerController.findCommissioner);
router.get("/commissioners/", CommissionerController.find);
router.delete("/commissioners/:id", CommissionerController.destroy);

router.post("/arbitusers", ArbitUserController.create);
router.post(
  "/arbitregister",
  AuthController.authPolicy,
  AuthController.register
);
router.get(
  "/arbitusers/:id",
  AuthController.authPolicy,
  ArbitUserController.findUser
);
router.post("/userrolemap", UserToUserRoleController.create);
router.post("/userrolemap/bulk/:userId", UserToUserRoleController.bulkCreate);
router.post("/useronemail", UserToUserRoleController.findUserAttribs);
router.put("/userrolemap/:id", UserToUserRoleController.update);

router.get("/arbitrators", ArbitUserController.findArbiters);
router.post("/userbyemail", ArbitUserController.findUserByEmail);

router.post("/arbitusers/login", AuthController.login);
router.get("/arbitrators", ArbitUserController.findArbiters);
router.get("/admins", ArbitUserController.findAdmin);
router.put("/arbitusers/update/:id", AuthController.updateUser);
router.get("/arbitusers/coy/:coyId", ArbitUserController.findCoyUser);

router.post("/jurisdictions", JurisdictionController.create);
router.get("/jurisdictions/findall", JurisdictionController.findJurisdictions);
router.post("/jurisdictions/:id", JurisdictionController.update);

router.post("/audits", AuditTrailController.create);

router.post("/locistatementsDef", DefLocusStandiController.create);
router.put("/locistatementsDef/:id", DefLocusStandiController.update);
router.get(
  "/locistatementsDef/defend/:defendId",
  DefLocusStandiController.findStatement
);
router.get("/locistatementsDef/:id", DefLocusStandiController.findOne);
router.get("/locistatementsDef", DefLocusStandiController.find);

router.post("/locifilesDef/:lociId", DefLocusStandiFilesController.bulkCreate);
router.put("/locifilesDef/:id", DefLocusStandiFilesController.update);
router.get("/locifilesDef/:id", DefLocusStandiFilesController.findOne);
router.delete("/locifilesDef/:id", DefLocusStandiFilesController.destroy);
router.get("/locifilesDef/defend/:lociId", DefLocusStandiFilesController.find);

router.post("/coastatementsCC", CoaControllerCC.create);
router.put("/coastatementsCC/:id", CoaControllerCC.update);
router.get("/coastatementsCC/defend/:defendId", CoaControllerCC.findStatement);
router.get("/coastatementsCC/:id", CoaControllerCC.findOne);

router.post("/coafilesCC/:coaId", CoaFilesControllerCC.bulkCreate);
router.put("/coafilesCC/:id", CoaFilesControllerCC.update);
router.get("/coafilesCC/:id", CoaFilesControllerCC.findOne);
router.delete("/coafilesCC/:id", CoaFilesControllerCC.destroy);
router.get("/coafilesCC/defend/:coaId", CoaFilesControllerCC.find);

router.post("/meritstatementsCC", MeritControllerCC.create);
router.put("/meritstatementsCC/:id", MeritControllerCC.update);
router.get(
  "/meritstatementsCC/defend/:defendId",
  MeritControllerCC.findStatement
);
router.get("/meritstatementsCC/:id", MeritControllerCC.findOne);
router.get("/meritstatementsCC", MeritControllerCC.find);

router.post("/meritfilesCC/:meritId", MeritFilesControllerCC.bulkCreate);
router.put("/meritfilesCC/:id", MeritFilesControllerCC.update);
router.get("/meritfilesCC/:id", MeritFilesControllerCC.findOne);
router.get("/meritfilesCC/defend/:meritId", MeritFilesControllerCC.find);
router.delete("/meritfilesCC/:id", MeritFilesControllerCC.destroy);

router.post("/quantumstatementsCC", QuantumControllerCC.create);
router.put("/quantumstatementsCC/:id", QuantumControllerCC.update);
router.get(
  "/quantumstatementsCC/defend/:defendId",
  QuantumControllerCC.findStatement
);
router.get("/quantumstatementsCC/:id", QuantumControllerCC.findOne);
router.get("/quantumstatementsCC", QuantumControllerCC.find);

router.post("/quantumfilesCC/:quantaId", QuantumFilesControllerCC.bulkCreate);
router.put("/quantumfilesCC/:id", QuantumFilesControllerCC.update);
router.get("/quantumfilesCC/:id", QuantumFilesControllerCC.findOne);
router.get("/quantumfilesCC/defend/:quantaId", QuantumFilesControllerCC.find);
router.delete("/quantumfilesCC/:id", QuantumFilesControllerCC.destroy);

router.post("/reliefstatementsCC", ReliefSoughtControllerCC.create);
router.put("/reliefstatementsCC/:id", ReliefSoughtControllerCC.update);
router.get(
  "/reliefstatementsCC/defend/:defendId",
  ReliefSoughtControllerCC.findStatement
);
router.get("/reliefstatementsCC/:id", ReliefSoughtControllerCC.findOne);
router.get("/reliefstatementsCC", ReliefSoughtControllerCC.find);

router.post(
  "/relieffilesCC/:reliefId",
  ReliefSoughtFilesControllerCC.bulkCreate
);
router.put("/relieffilesCC/:id", ReliefSoughtFilesControllerCC.update);
router.get("/relieffilesCC/:id", ReliefSoughtFilesControllerCC.findOne);
router.get(
  "/relieffilesCC/defend/:reliefId",
  ReliefSoughtFilesControllerCC.find
);
router.delete("/relieffilesCC/:id", ReliefSoughtFilesControllerCC.destroy);

router.post("/statuses", StatusController.create);
router.get("/statuses", StatusController.find);
router.put("/statuses/:id", StatusController.update);
router.get("/statuses/:id", StatusController.findStatus);
router.delete("/statuses/:id", StatusController.destroy);

router.post("/roles", UserRoleController.create);
router.get("/roles", UserRoleController.find);
router.put("/roles/:id", UserRoleController.update);
router.get("/roles/:id", UserRoleController.findRole);
router.delete("/roles/:id", UserRoleController.destroy);

router.post("/pocs", PocController.create);
router.get("/pocs", PocController.find);
router.put("/pocs/:id", PocController.update);
router.get("/pocs/:id", PocController.findPoc);
router.delete("/pocs/:id", PocController.destroy);

router.post("/arbitallocs", ArbitAllocateController.create);
router.put(
  "/arbitallocs/:id",
  AuthController.authPolicy,
  ArbitAllocateController.update
);
router.get(
  "/arbitallocs",
  AuthController.authPolicy,
  ArbitAllocateController.find
);
router.delete(
  "/arbitallocs/:id",
  AuthController.authPolicy,
  ArbitAllocateController.destroy
);
router.get("/arbitallocs/:userId", ArbitAllocateController.findArbiterAllocs);

router.post("/upload", (ctx) => {
  var count = 0;
  if (!fs.existsSync(path.join(__dirname, "/uploads/"))) {
    fs.mkdirSync(path.join(__dirname, "/uploads"));
    fs.chmodSync(path.join(__dirname, "/uploads", parseInt("777", 8)));
  }

  filesArray = [];
  fileObj = {};

  if (ctx.request.body.singleFile === "true") {
    var count = 1;
    var file = ctx.request.files.upFiles;
    filesArray.push(processFile(file));
  } else {
    count = ctx.request.files.upFiles.length;
    ctx.request.files.upFiles.forEach((file) => {
      filesArray.push(processFile(file));
    });
  }
  var retObj = { msg: `${count} Files uploaded`, files: filesArray };
  ctx.response.body = retObj;
});
router.post("/sendmail", async (ctx) => {
  const sendGridAPIKey =
    "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";
  sgMail.setApiKey(sendGridAPIKey);
  var link = "http://localhost:8080/defendant/actions";
  const msg = {
    to: ctx.request.body.to,
    from: ctx.request.body.from,
    subject: ctx.request.body.subject,
    content: [
      {
        type: "text/html",
        value:
          "<html><head></head><body>Click to join<a href=\"http://www.egavel.co.za\"><img src='/routes/egavel.jpg' height='40px' width='60px'></a></body></html>",
      },
    ],
  };
  try {
    //console.log('email ' + JSON.stringify(msg));
    sgMail.send(msg);
    ctx.body = `Message sent to ${msg.to}`;
  } catch (err) {
    console.log("error sending msg " + err);
  }
});
function processFile(file) {
  var fileObj = {};
  //console.log('file name '+ path.extname(file.name));
  const reader = fs.createReadStream(file.path);
  //console.log('file extension '+ path.extname(file.name));
  var ext = path.extname(file.name);

  var fileOnDisk = uniqueId().toString() + ext;
  const stream = fs.createWriteStream(
    path.join(__dirname, "/uploads/" + fileOnDisk)
  );
  reader.pipe(stream);

  fileObj = { filename: file.name, diskname: fileOnDisk };
  console.log("uploading %s -> %s", file.name, stream.path);

  return fileObj;
}

module.exports = router;
