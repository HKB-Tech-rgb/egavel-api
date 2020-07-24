const jwt = require("jsonwebtoken");
const config = require("../config/authConfig");
const utilService = require("../services/util.service");
//const jwtService = require('../services/jwt.service');

async function jwtUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  const ONE_DAY = 60 * 60 * 24;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_DAY,
  });
}
async function jwtVerify(token) {
  return jwt.verify(token, config.authentication.jwtSecret);
}
module.exports = {
  async register(ctx) {
    try {
      var hashPassword = await utilService.hashPassword(ctx.request.body.pword);
      //console.log('register request ' + JSON.stringify(ctx.request.body));
      ctx.body = await ctx.db.ArbitUser.create({
        firstname: ctx.request.body.firstname,
        lastname: ctx.request.body.lastname,
        email: ctx.request.body.email,
        pword: hashPassword,
        cellnumber: ctx.request.body.cellnumber,
        CompanyId: ctx.request.body.CompanyId,
        initialLogin: ctx.request.body.initialLogin,
        signFilename: ctx.request.body.signFilename,
        signDiskname: ctx.request.body.signDiskname,
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async login(ctx) {
    try {
      const { email, pword } = ctx.request.body;
      var arbitUser = await ctx.db.ArbitUser.findOne({
        where: {
          email: email,
        },
        include: [
          {
            model: ctx.db.Company,
          },
          {
            model: ctx.db.UserRole,
          },
        ],
      });
      if (!arbitUser) {
        ctx.throw(403, "Invalid Login Credentials");
      }
      const isValidPassword = await utilService.comparePassword(
        pword,
        arbitUser.pword
      );
      if (!isValidPassword) {
        ctx.throw(403, "Invalid Login Credentials");
      }
      const token = await jwtUser({
        payload: {
          user: arbitUser.id,
        },
      });
      ctx.body = {
        arbitUser: arbitUser,
        arbitToken: token,
      };
    } catch (err) {
      ctx.throw(500, "invalid password!");
    }
  },
  async authPolicy(ctx, next) {
    let token = "";
    if (ctx.req.headers && ctx.req.headers.authorization) {
      token = ctx.req.headers.authorization;
    } else {
      ctx.throw("401", "Authorization header token not found!");
    }
    const decodedToken = await jwtVerify(token);
    var arbitUser = await ctx.db.ArbitUser.findOne({
      where: {
        id: decodedToken.payload.user,
      },
    });
    if (arbitUser) {
      ctx.state.arbitUser = arbitUser.id;
      await next();
    } else {
      ctx.error("401", "User Unauthorized");
    }
  },
  async updateUser(ctx) {
    try {
      var hashPassword = await utilService.hashPassword(ctx.request.body.pword);
      var result = await ctx.db.ArbitUser.update(
        {
          firstname: ctx.request.body.firstname,
          lastname: ctx.request.body.lastname,
          email: ctx.request.body.email,
          pword: hashPassword,
          cellnumber: ctx.request.body.cellNumber,
          CompanyId: ctx.request.body.CompanyId,
          initialLogin: ctx.request.body.initialLogin,
          signFilename: ctx.request.body.signFilename,
          signDiskname: ctx.request.body.signDiskname,
        },
        {
          returning: true,
          where: {
            id: ctx.params.id,
          },
        }
      ).then(function ([rowsUpdate, [updatedUser]]) {
        result = updatedUser;
      });
      result === 0
        ? ctx.throw(500, "invalid id provided")
        : (ctx.body = "record updated with id " + ctx.params.id);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};
