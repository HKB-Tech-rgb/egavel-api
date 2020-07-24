module.exports = {
    async create (ctx){
        try{
            ctx.body = await ctx.db.UserRole.create({
                RoleDescription: ctx.request.body.RoleDescription
            });
           
        }catch(err){
            ctx.throw(500, err)
        }
    },
    async find (ctx) {
        try{
            
            ctx.body = await ctx.db.UserRole.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });
           
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async findRole (ctx) {
        try{
            ctx.body = await ctx.db.UserRole.findByPk(ctx.params.id);
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async destroy (ctx) {
        try{
            var result  = await ctx.db.UserRole.destroy({
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
            var result = await ctx.db.UserRole.update({
                RoleDescription: ctx.request.body.RoleDescription
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
