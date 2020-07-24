async function writeEachFile(ctx, callback) {
    for (var index = 0; index < ctx.request.body.length; index++) {
      await callback(ctx.request.body[index], ctx);
    }
}
module.exports = {
    async create (ctx){
        //console.log('files create ' + JSON.stringify(ctx.request.body));
        var params = {}
        try{
            ctx.body = await writeEachFile(ctx, async (file, ctx) => {
                ctx.db.auditTrail.create({
                    tableName: file.tableName,
                    action: file.action,
                    dataBefore: file.dataBefore,
                    dataAfter: file.dataAfter,
                    createdBy: file.createdBy
                });
            });
                      
        }catch(err){
            ctx.throw(500, err)
        }
    },
    async find (ctx) {
        try{
            ctx.body = await ctx.db.auditTrail.findAll();

        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async findUser (ctx) {
        try{
            ctx.body = await ctx.db.auditTrail.findByPk(ctx.params.id);
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async destroy (ctx) {
        try{
            var result  = await ctx.db.AuditTrail.destroy({
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
            var result = await ctx.db.AuditTrail.update({
                tableName: file.tableName,
                action: file.action,
                dataBefore: file.dataBefore,
                dataAfter: file.dataAfter,
                createdBy: file.createdBy
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
