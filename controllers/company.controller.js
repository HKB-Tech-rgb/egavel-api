module.exports = {
    async create (ctx){
        try{
            ctx.body = await ctx.db.Company.create({
                name: ctx.request.body.name,
                city: ctx.request.body.city,
                address: ctx.request.body.address

            });
           
        }catch(err){
            ctx.throw(500, err)
           
        }
    },
    async find (ctx) {
        try{
            ctx.body = await ctx.db.Company.findAll();

        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async findOne (ctx) {
        try{
            ctx.body = await ctx.db.Company.findByPk(ctx.params.id);
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async destroy (ctx) {
        try{
            var result  = await ctx.db.Company.destroy({
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
            var result = await ctx.db.Company.update({
                name: ctx.request.body.name,
                city: ctx.request.body.city,
                address: ctx.request.body.address
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