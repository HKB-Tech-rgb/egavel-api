module.exports = {
  async create(ctx) {
    try {
      ctx.body = await ctx.db.ReliefSought.create({
        description: ctx.request.body.description,
        ClaimantId: ctx.request.body.ClaimantId,
        totalUploads: ctx.request.body.totalUploads,
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  }, //ArbitCaseId: ctx.params.arbitCaseId
  async findStatement(ctx) {
    try {
      ctx.body = await ctx.db.ReliefSought.findAll({
        where: {
          ClaimantId: ctx.params.claimId,
        },
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async find(ctx) {
    try {
      ctx.body = await ctx.db.ReliefSought.findAll();
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async findOne(ctx) {
    try {
      ctx.body = await ctx.db.ReliefSought.findByPk(ctx.params.id);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async destroy(ctx) {
    try {
      var result = await ctx.db.ReliefSought.destroy({
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
      var result = await ctx.db.ReliefSought.update(
        {
          description: ctx.request.body.description,
          ClaimantId: ctx.request.body.ClaimantId,
          totalUploads: ctx.request.body.totalUploads,
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
