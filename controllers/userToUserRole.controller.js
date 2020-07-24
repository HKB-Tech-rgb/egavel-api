const caseStatus = require("../status-enums/caseStatus");
module.exports = {
  async bulkCreate(ctx) {
    //console.log('files create ' + JSON.stringify(ctx.request.body));
    ctx.body = await ctx.db.UserToUserRole.bulkCreate(ctx.request.body)
      .then(() => {
        return ctx.db.UserToUserRole.findAll({
          where: {
            ArbitUserId: ctx.params.userId,
          },
        });
      })
      .then((roles) => {
        console.log("bulk create " + JSON.stringify(roles)); // ... in order to get the array of user objects
      })
      .catch((err) => {
        console.log("Bulk create - kuk " + err);
      });
  },
  async create(ctx) {
    try {
      ctx.body = await ctx.db.UserToUserRole.create({
        StatusId: caseStatus.USER_ACTIVE,
        ArbitUserId: ctx.request.body.ArbitUserId,
        UserRoleId: ctx.request.body.UserRoleId,
        StatusId: caseStatus.USER_ACTIVE,
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async findUserStatus(userId) {
    try {
      userRoles = await ctx.db.UserToUserRole.findAll({
        where: {
          ArbitUserId: userId,
        },
        order: [["UserRoleId", "DESC"]],
        include: [
          {
            model: ctx.db.Status,
          },
        ],
      });
      return userRoles;
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async findUserAttribs(ctx) {
    try {
      ctx.body = await ctx.db.UserToUserRole.findAll({
        order: [["UserRoleId", "DESC"]],
        include: [
          {
            model: ctx.db.ArbitUser,
            where: {
              email: ctx.request.body.email,
            },
          },
          {
            model: ctx.db.UserRole,
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
  async destroy(ctx) {
    try {
      var result = await ctx.db.UserToUserRole.destroy({
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
      var result = await ctx.db.UserToUserRole.update(
        {
          StatusId: caseStatus.USER_ACTIVE,
          ArbitUserId: ctx.request.body.ArbitUserId,
          UserRoleId: ctx.request.body.UserRoleId,
          StatusId: caseStatus.USER_ACTIVE,
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
