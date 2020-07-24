module.exports = {
  async create(ctx) {
    try {
      ctx.body = await ctx.db.Resolution.create({
        description: ctx.request.body.description,
        ArbitCaseId: ctx.request.body.ArbitCaseId,
        totalUploads: ctx.request.body.totalUploads,
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  }, //ArbitCaseId: ctx.params.arbitCaseId
  async findStatement(ctx) {
    try {
      ctx.body = await ctx.db.Resolution.findAll({
        where: {
          ArbitCaseId: ctx.params.arbitId,
        },
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async find(ctx) {
    try {
      ctx.body = await ctx.db.Resolution.findAll();
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async findOne(ctx) {
    try {
      ctx.body = await ctx.db.Resolution.findByPk(ctx.params.id);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async destroy(ctx) {
    try {
      var result = await ctx.db.Resolution.destroy({
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
      var result = await ctx.db.Resolution.update(
        {
          description: ctx.request.body.description,
          ArbitCaseId: ctx.request.body.ArbitCaseId,
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
