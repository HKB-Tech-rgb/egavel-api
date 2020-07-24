const caseStatus = require('../status-enums/caseStatus');
module.exports = {
    async create (ctx){
        try{
            ctx.body = await ctx.db.CoDefendant.create({
                fullName: ctx.request.body.fullName,
                contactPerson: ctx.request.body.contactPerson,
                address: ctx.request.body.address,
                telephone: ctx.request.body.telephone,
                email: ctx.request.body.email,
                policyNumber: ctx.request.body.policyNumber,
                CompanyId: ctx.request.body.CompanyId,
                DefendantId: ctx.request.body.DefendantId,
                noticeEmailSent: false
            });
           
        }catch(err){
            ctx.throw(500, err)
           
        }
    },
    async bulkCreate (ctx) {
        //console.log('co defends create ' + JSON.stringify(ctx.request.body));
        ctx.body = await ctx.db.CoDefendant.bulkCreate(ctx.request.body).then(() => { 
            return ctx.db.CoDefendant.findAll({
                where: {
                    DefendantId: ctx.params.defendId
                }
            });
          }).then(coDefends => {
            console.log('bulk create ' +JSON.stringify(coDefends)) // ... in order to get the array of user objects
          }).catch(err => {
              console.log('Bulk create - kuk '+ err);
          })
       
    },
    async find (ctx) {
        try{
            ctx.body = await ctx.db.CoDefendant.findAll();
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async findCoDefendant (ctx) {
        try{
            ctx.body = await ctx.db.CoDefendant.findByPk(ctx.params.id);
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async findCoDefendants (ctx) {
        try{
            ctx.body = await ctx.db.CoDefendant.findAll({
                where:{
                    DefendantId: ctx.params.defendId
                }
            });
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async destroy (ctx) {
        try{
            var result  = await ctx.db.CoDefendant.destroy({
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
            var result = await ctx.db.CoDefendant.update({
                fullName: ctx.request.body.fullName,
                contactPerson: ctx.request.body.contactPerson,
                address: ctx.request.body.address,
                telephone: ctx.request.body.telephone,
                email: ctx.request.body.email,
                policyNumber: ctx.request.body.policyNumber,
                CompanyId: ctx.request.body.CompanyId,
                DefendantId: ctx.request.body.DefendantId,
                noticeEmailSent: false
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