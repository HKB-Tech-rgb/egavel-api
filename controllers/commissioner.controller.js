module.exports = {
    async create (ctx){
        try{
            ctx.body = await ctx.db.Comissioner.create({
                name: ctx.request.body.name,
                email: ctx.request.body.email,
                contactNumber: ctx.request.body.contactNumber,
                status: ctx.request.body.status,
                ArbitCaseId: ctx.request.body.ArbitCaseId,
            });
           
        }catch(err){
            ctx.throw(500, err)
           
        }
    },
    async find (ctx) {
        try{
            ctx.body = await ctx.db.Comissioner.findAll();
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async findCommissioner (ctx) {
        try{
            ctx.body = await ctx.db.Comissioner.findByPk(ctx.params.id);
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async findCommissioners (ctx) {
        try{
            ctx.body = await ctx.db.Comissioner.findAll({
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
            var result  = await ctx.db.Comissioner.destroy({
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
            var result = await ctx.db.Comissioner.update({
                name: ctx.request.body.fullName,
                email: ctx.request.body.email,
                contactNumber: ctx.request.body.contactNumber,
                status: ctx.request.body.status,
                ArbitCaseId: ctx.request.body.ArbitCaseId,

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