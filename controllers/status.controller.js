module.exports = {
    async create (ctx){
        try{
            ctx.body = await ctx.db.Status.create({
                StatusDescription: ctx.request.body.StatusDescription
            });
           
        }catch(err){
            ctx.throw(500, err)
        }
    },
    async find (ctx) {
        try{
            ctx.body = await ctx.db.Status.findAll();

        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async findStatus (ctx) {
        try{
            ctx.body = await ctx.db.Status.findByPk(ctx.params.id);
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async destroy (ctx) {
        try{
            var result  = await ctx.db.Status.destroy({
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
            var result = await ctx.db.Status.update({
                StatusDescription: ctx.request.body.StatusDescription
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
