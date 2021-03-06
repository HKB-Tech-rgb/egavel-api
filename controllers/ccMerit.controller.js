module.exports = {
  async create(ctx) {
    try {
      ctx.body = await ctx.db.ccMerit.create({
        description: ctx.request.body.description,
        DefendantId: ctx.request.body.DefendantId,
        totalUploads: ctx.request.body.totalUploads,
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async findStatement(ctx) {
    try {
      ctx.body = await ctx.db.ccMerit.findAll({
        where: {
          DefendantId: ctx.params.defendId,
        },
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async find(ctx) {
    try {
      ctx.body = await ctx.db.ccMerit.findAll();
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async findOne(ctx) {
    try {
      ctx.body = await ctx.db.ccMerit.findByPk(ctx.params.id);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async destroy(ctx) {
    try {
      var result = await ctx.db.ccMerit.destroy({
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
      var result = await ctx.db.ccMerit.update(
        {
          description: ctx.request.body.description,
          DefendantId: ctx.request.body.DefendantId,
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
