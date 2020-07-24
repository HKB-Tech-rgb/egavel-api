const caseStatus = require('../status-enums/caseStatus');
module.exports = {
    async create (ctx){
        try{
            ctx.body = await ctx.db.Claimant.create({
                fullName: ctx.request.body.fullName,
                contactPerson: ctx.request.body.contactPerson,
                address: ctx.request.body.address,
                telephone: ctx.request.body.telephone,
                email: ctx.request.body.email,
                policyNumber: ctx.request.body.policyNumber,
                StatusId: caseStatus.OPENED,
                CompanyId: ctx.request.body.CompanyId
            });
           
        }catch(err){
            ctx.throw(500, err)
           
        }
    },
    async find (ctx) {
        try{
            ctx.body = await ctx.db.Claimant.findAll();
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async findClaimant (ctx) {
        try{
            ctx.body = await ctx.db.Claimant.findByPk(ctx.params.id);
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async findCaseClaimants (ctx) {
        try{
            ctx.body = await ctx.db.Claimant.findAll({
                where: {
                    ArbitCaseId: ctx.params.caseId
                },
                order: [
                    ['id', 'ASC']
                ]
            });
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async destroy (ctx) {
        try{
            var result  = await ctx.db.Claimant.destroy({
                where: {
                    id: ctx.params.id
                }    
            });
            result === 0 ? ctx.throw(500,'invalid id provided'): ctx.body = ('record deleted with id ' + ctx.params.id);
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async update (ctx) {
        try{
            var result = await ctx.db.Claimant.update({
                fullName: ctx.request.body.fullName,
                contactPerson: ctx.request.body.contactPerson,
                address: ctx.request.body.address,
                telephone: ctx.request.body.telephone,
                email: ctx.request.body.email,
                policyNumber: ctx.request.body.policyNumber,
                StatusId: ctx.request.body.StatusId

            },{
                where: {
                    id: ctx.params.id
                }    
            });
            result === 0 ? ctx.throw(500,'invalid id provided'): ctx.body = ('record updated with id ' + ctx.params.id);

        }
        catch(err){
            ctx.throw(500, err);
        }
    }

}