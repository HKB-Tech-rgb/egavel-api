module.exports = {
  async create(ctx) {
    try {
      ctx.body = await ctx.db.Quantum.create({
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
      ctx.body = await ctx.db.Quantum.findAll({
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
      ctx.body = await ctx.db.Quantum.findAll();
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async findOne(ctx) {
    try {
      ctx.body = await ctx.db.Quantum.findByPk(ctx.params.id);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async destroy(ctx) {
    try {
      var result = await ctx.db.Quantum.destroy({
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
      var result = await ctx.db.Quantum.update(
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
