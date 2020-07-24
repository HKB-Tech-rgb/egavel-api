const userRole = require("../status-enums/roletypes");
const { Op } = require("sequelize");

module.exports = {
  async create(ctx) {
    try {
      ctx.body = await ctx.db.ArbitAlloc.create({
        comments: ctx.request.body.comments,
        ArbitUserId: ctx.request.body.ArbitUserId,
        ArbitCaseId: ctx.request.body.ArbitCaseId,
        StatusId: ctx.request.body.StatusId,
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async find(ctx) {
    try {
      ctx.body = await ctx.db.ArbitAlloc.findAll();
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async findArbiterAllocs(ctx) {
    try {
      ctx.body = await ctx.db.ArbitAlloc.findAll({
        where: {
          ArbitUserId: {
            [Op.eq]: [ctx.params.userId],
          },
        },
        order: [["id", "DESC"]],
        include: [
          {
            model: ctx.db.ArbitCase,
            include: [
              {
                model: ctx.db.Poc,
              },
              {
                model: ctx.db.Claimant,
              },
              {
                model: ctx.db.Status,
              },
            ],
          },
        ],
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async destroy(ctx) {
    try {
      var result = await ctx.db.ArbitAlloc.destroy({
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
      var result = await ctx.db.ArbitAlloc.update(
        {
          comments: ctx.request.body.comments,
          ArbitUserId: ctx.request.body.ArbitUserId,
          ArbitCaseId: ctx.request.body.ArbitCaseId,
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
