module.exports = {
    async create (ctx){
        try{
            ctx.body = await ctx.db.Apportionment.create({
                description: ctx.request.body.description,
                ClaimantId: ctx.request.body.ClaimantId,
                DefendantId: ctx.request.body.DefendantId,
                totalUploads: ctx.request.body.totalUploads
            });
            
        }catch(err){
            ctx.throw(500, err)
           
        }
    },  //ArbitCaseId: ctx.params.arbitCaseId  
    async findStatement (ctx) {
        //console.log('find apportionment ' + JSON.stringify(ctx.params));
        try{
            ctx.body = await ctx.db.Apportionment.findAll({
                where: {
                    ClaimantId: ctx.params.claimId,
                    DefendantId: ctx.params.defendId,
                }
            });

        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async find (ctx) {
        try{
            ctx.body = await ctx.db.Apportionment.findAll();
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async findOne (ctx) {
        try{
            ctx.body = await ctx.db.Apportionment.findByPk(ctx.params.id);
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async destroy (ctx) {
        try{
            var result  = await ctx.db.Apportionment.destroy({
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
            var result = await ctx.db.Apportionment.update({
                description: ctx.request.body.description,
                ClaimantId: ctx.request.body.ClaimantId,
                DefendantId: ctx.request.body.DefendantId,
                totalUploads: ctx.request.body.totalUploads
               
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