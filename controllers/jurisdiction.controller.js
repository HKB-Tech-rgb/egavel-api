const caseStatus = require('../status-enums/caseStatus');
module.exports = {
    async create (ctx){
        try{
            ctx.body = await ctx.db.Jurisdiction.create({
                description: ctx.request.body.description,
            });
           
        }catch(err){ 
            ctx.throw(500, err)
        }
    },
    async findJurisdiction (ctx) {
        try{
            ctx.body = await ctx.db.Jurisdiction.findByPk(ctx.params.id);
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async findJurisdictions (ctx) {
        try{
            ctx.body = await ctx.db.Jurisdiction.findAll();
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async destroy (ctx) {
        try{
            var result  = await ctx.db.Jurisdiction.destroy({
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
            console.log('update on key '+JSON.stringify(ctx.params.id));
            var result = await ctx.db.Jurisdiction.update({
                description: ctx.request.body.description
               
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

