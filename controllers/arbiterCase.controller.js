const caseStatus = require("../status-enums/caseStatus");
const { Op } = require("sequelize");
module.exports = {
  async create(ctx) {
    try {
      ctx.body = await ctx.db.ArbitCase.create({
        createdBy: ctx.request.body.createdBy,
        updatedBy: ctx.request.body.updatedBy,
        ArbitUserId: ctx.request.body.ArbitUserId,
        PocId: ctx.request.body.PocId,
        ClaimantId: ctx.request.body.ClaimantId,
        StatusId: caseStatus.OPENED,
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async find(ctx) {
    try {
      ctx.body = await ctx.db.ArbitCase.findAll();
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async findClaimantCases(ctx) {
    try {
      ctx.body = await ctx.db.ArbitCase.findAll({
        where: {
          ArbitUserId: ctx.params.userId,
          StatusId: {
            [Op.lt]: caseStatus.OFFERTOSETTLE,
          },
        },
        order: [["id", "DESC"]],
        include: [
          {
            model: ctx.db.Poc,
          },
          {
            model: ctx.db.Status,
          },
          {
            model: ctx.db.ArbitUser,
            include: [
              {
                model: ctx.db.Company,
              },
            ],
          },
          {
            model: ctx.db.Claimant,
            include: [
              {
                model: ctx.db.Status,
              },
            ],
          },
          {
            model: ctx.db.Defendant,
            include: [
              {
                model: ctx.db.Status,
              },
              {
                model: ctx.db.Company,
              },
            ],
          },
        ],
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async findClaimantCaseStatus(ctx) {
    try {
      ctx.body = await ctx.db.ArbitCase.findAll({
        where: {
          ArbitUserId: ctx.params.userId,
          StatusId: ctx.params.statusId,
        },
        order: [["id", "DESC"]],
        include: [
          {
            model: ctx.db.Poc,
          },
          {
            model: ctx.db.Status,
          },
          {
            model: ctx.db.ArbitUser,
            include: [
              {
                model: ctx.db.Company,
              },
            ],
          },
          {
            model: ctx.db.Claimant,
            include: [
              {
                model: ctx.db.Status,
              },
            ],
          },
          {
            model: ctx.db.Defendant,
            include: [
              {
                model: ctx.db.Status,
              },
              {
                model: ctx.db.Company,
              },
            ],
          },
        ],
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async findPendingArbit(ctx) {
    try {
      ctx.body = await ctx.db.ArbitCase.findAll({
        where: {
          StatusId: {
            [Op.eq]: [caseStatus.PENDINGARBIT],
          },
        },
        include: [
          {
            model: ctx.db.Claimant,
            include: [
              {
                model: ctx.db.Company,
              },
            ],
          },
          {
            model: ctx.db.Poc,
          },
          {
            model: ctx.db.Status,
          },
        ],
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async findArbitCase(ctx) {
    try {
      ctx.body = await ctx.db.ArbitCase.findByPk(ctx.params.id);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async findDemoCase(ctx) {
    try {
      ctx.body = await ctx.db.ArbitCase.findByPk(ctx.params.id, {
        include: [
          {
            model: ctx.db.Claimant,
            include: [
              {
                model: ctx.db.Company,
              },
            ],
          },
          {
            model: ctx.db.Poc,
          },
          {
            model: ctx.db.Status,
          },
        ],
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async findArbitCases(ctx) {
    try {
      ctx.body = await ctx.db.ArbitCase.findAll({
        where: {
          CompanyId: ctx.params.CompanyId,
        },
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async destroy(ctx) {
    try {
      var result = await ctx.db.ArbitCase.destroy({
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
      var result = await ctx.db.ArbitCase.update(
        {
          updatedBy: ctx.request.body.updatedBy,
          ArbitUserId: ctx.request.body.ArbitUserId,
          PocId: ctx.request.body.PocId,
          ClaimantId: ctx.request.body.ClaimantId,
          StatusId: ctx.request.body.StatusId,
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
