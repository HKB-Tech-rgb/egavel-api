const { Op } = require("sequelize");
const caseStatus = require("../status-enums/caseStatus");

async function updEachDefend(ctx, callback) {
  for (var index = 0; index < ctx.request.body.length; index++) {
    await callback(ctx.request.body[index]);
  }
}
module.exports = {
  async bulkCreate(ctx) {
    //console.log('co defends create ' + JSON.stringify(ctx.request.body));
    ctx.body = await ctx.db.Defendant.bulkCreate(ctx.request.body)
      .then(() => {
        return ctx.db.Defendant.findAll({
          where: {
            ArbitCaseId: ctx.params.caseId,
          },
        });
      })
      .then((defends) => {
        console.log("bulk create " + JSON.stringify(defends)); // ... in order to get the array of user objects
      })
      .catch((err) => {
        console.log("Bulk create - kuk " + err);
      });
  },
  async create(ctx) {
    try {
      ctx.body = await ctx.db.Defendant.create({
        fullName: ctx.request.body.fullName,
        contactPerson: ctx.request.body.contactPerson,
        address: ctx.request.body.address,
        telephone: ctx.request.body.telephone,
        email: ctx.request.body.email,
        policyNumber: ctx.request.body.policyNumber,
        StatusId: caseStatus.OPENED,
        CompanyId: ctx.request.body.CompanyId,
        ArbitUserId: ctx.request.body.ArbitUserId,
        ArbitCaseId: ctx.request.body.ArbitCaseId,
        timeLapsed: ctx.request.body.timeLapsed,
        noticeEmailSent: false,
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async find(ctx) {
    try {
      ctx.body = await ctx.db.Defendant.findAll();
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async findDefendants(ctx) {
    try {
      ctx.body = await ctx.db.Defendant.findAll({
        where: {
          ArbitCaseId: ctx.params.caseId,
        },
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async findDefendantsWCoy(ctx) {
    try {
      ctx.body = await ctx.db.Defendant.findAll({
        where: {
          ArbitCaseId: ctx.params.caseId,
        },
        order: [["id", "ASC"]],
        include: [
          {
            model: ctx.db.Company,
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
  async findDefendant(ctx) {
    try {
      ctx.body = await ctx.db.Defendant.findByPk(ctx.params.id);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async findDefendantCases(ctx) {
    try {
      ctx.body = await ctx.db.Defendant.findAll({
        where: {
          ArbitUserId: ctx.params.userId,
          StatusId: {
            [Op.lt]: [caseStatus.OFFERTOSETTLE],
          },
        },
        order: [["id", "DESC"]],
        include: [
          {
            model: ctx.db.ArbitCase,
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
            ],
          },
          {
            model: ctx.db.Company,
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
  async findDefendantCaseStatus(ctx) {
    try {
      ctx.body = await ctx.db.Defendant.findAll({
        where: {
          ArbitUserId: ctx.params.userId,
          StatusId: ctx.params.statusId,
        },
        order: [["id", "DESC"]],
        include: [
          {
            model: ctx.db.ArbitCase,
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
            ],
          },
          {
            model: ctx.db.Company,
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
  async findCasesForArbit(ctx) {
    try {
      ctx.body = await ctx.db.Defendant.findAll({
        where: {
          StatusId: {
            [Op.eq]: [caseStatus.PENDINGARBIT],
          },
        },
        include: [
          {
            model: ctx.db.ArbitCase,
            include: [
              {
                model: ctx.db.Claimant,
              },
              {
                model: ctx.db.Poc,
              },
            ],
          },
          {
            model: ctx.db.Company,
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
  async findLiabAllocs(ctx) {
    try {
      ctx.body = await ctx.db.Defendant.findAll({
        where: {
          ArbitUserId: null,
          CompanyId: ctx.params.coyId,
          StatusId: {
            [Op.eq]: [caseStatus.PENDINGTHIRD],
          },
        },
        include: [
          {
            model: ctx.db.ArbitCase,
            include: [
              {
                model: ctx.db.Claimant,
              },
              {
                model: ctx.db.Poc,
              },
            ],
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
      var result = await ctx.db.Defendant.destroy({
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
      var result = await ctx.db.Defendant.update(
        {
          fullName: ctx.request.body.fullName,
          contactPerson: ctx.request.body.contactPerson,
          address: ctx.request.body.address,
          telephone: ctx.request.body.telephone,
          email: ctx.request.body.email,
          policyNumber: ctx.request.body.policyNumber,
          StatusId: ctx.request.body.StatusId,
          CompanyId: ctx.request.body.CompanyId,
          ArbitUserId: ctx.request.body.ArbitUserId,
          ArbitCaseId: ctx.request.body.ArbitCaseId,
          noticeEmailSent: ctx.request.body.noticeEmailSent,
          timeLapsed: ctx.request.body.timeLapsed,
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
  async updateBulk(ctx) {
    this.updEachDefend(ctx, (updRec) => {
      this.update(updRec);
    });
  },
};
