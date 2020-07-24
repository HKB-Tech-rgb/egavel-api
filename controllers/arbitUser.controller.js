const userRole = require("../status-enums/roletypes");
const { Op } = require("sequelize");

module.exports = {
  async create(ctx) {
    try {
      ctx.body = await ctx.db.ArbitUser.create({
        firstname: ctx.request.body.firstname,
        lastname: ctx.request.body.lastname,
        email: ctx.request.body.email,
        pword: hashPassword,
        cellnumber: ctx.request.body.cellNumber,
        initialLogin: ctx.request.body.initialLogin,
        signFilename: ctx.request.body.signFilename,
        signDiskname: ctx.request.body.signDiskname,
        CompanyId: ctx.request.body.CompanyId,
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async find(ctx) {
    try {
      ctx.body = await ctx.db.ArbitUser.findAll();
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async findArbiters(ctx) {
    try {
      ctx.body = await ctx.db.ArbitUser.findAll({
        include: [
          {
            model: ctx.db.UserRole,
            where: {
              id: {
                [Op.eq]: [userRole.ARBITOR],
              },
            },
          },
        ],
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async findAdmin(ctx) {
    try {
      ctx.body = await ctx.db.ArbitUser.findAll({
        include: [
          {
            model: ctx.db.UserRole,
            where: {
              id: {
                [Op.eq]: [userRole.ADMIN],
              },
            },
          },
        ],
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async findCoyUser(ctx) {
    try {
      ctx.body = await ctx.db.ArbitUser.findAll({
        where: {
          CompanyId: ctx.params.coyId,
        },
        include: [
          {
            model: ctx.db.UserRole,
            where: {
              id: {
                [Op.eq]: [userRole.PARTICIPANT],
              },
            },
          },
        ],
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async findUser(ctx) {
    try {
      ctx.body = await ctx.db.ArbitUser.findByPk(ctx.params.id);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async findUserByEmail(ctx) {
    try {
      ctx.body = await ctx.db.ArbitUser.findOne({
        where: { email: ctx.request.body.email },
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async destroy(ctx) {
    try {
      var result = await ctx.db.ArbitUser.destroy({
        where: {
          id: ctx.params.id,
        },
      });
      result === 0
        ? ctx.throw(500, "invalid id provided")
        : (ctx.body = "record deleted with id " + ctx.params.id);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async update(ctx) {
    try {
      var result = await ctx.db.ArbitUser.update(
        {
          firstname: ctx.request.body.firstname,
          lastname: ctx.request.body.lastname,
          email: ctx.request.body.email,
          pword: hashPassword,
          cellnumber: ctx.request.body.cellNumber,
          initialLogin: ctx.request.body.initialLogin,
          signFilename: ctx.request.body.signFilename,
          signDiskname: ctx.request.body.signDiskname,
          CompanyId: ctx.request.body.CompanyId,
        },
        {
          where: {
            id: ctx.params.id,
          },
        }
      );
      result === 0
        ? ctx.throw(500, "invalid id provided")
        : (ctx.body = "record updated with id " + ctx.params.id);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};
