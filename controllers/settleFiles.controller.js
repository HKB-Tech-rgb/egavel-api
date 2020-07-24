module.exports = {
    async create (ctx){
        try{
            ctx.body = await ctx.db.SettleFiles.create({
                filename: ctx.request.body.filename,
                diskname: ctx.request.body.diskname,
                SettleId: ctx.request.body.SettleId
            });
            
        }catch(err){
            ctx.throw(500, err)
        }
    },
    async find (ctx) {
        try{
            ctx.body = await ctx.db.SettleFiles.findAll({
                where:{
                    SettleId: ctx.params.settleId
                }
            });
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async bulkCreate (ctx) {
        console.log('Settle files create ' + JSON.stringify(ctx.request.body));
        ctx.body = await ctx.db.SettleFiles.bulkCreate(ctx.request.body).then(() => { 
            return ctx.db.SettleFiles.findAll({
                where: {
                    SettleId: ctx.params.settleId
                }
            });
          }).then(files => {
            console.log('bulk create ' +JSON.stringify(files)) // ... in order to get the array of user objects
          }).catch(err => {
              console.log('Bulk create - kuk '+ err);
          })
        
    },
    async findOne (ctx) {
        try{
            ctx.body = await ctx.db.SettleFiles.findByPk(ctx.params.id);
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async destroy (ctx) {
        try{
            var result  = await ctx.db.SettleFiles.destroy({
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
            var result = await ctx.db.SettleFiles.update({
                filename: ctx.request.body.filename,
                diskname: ctx.request.body.diskname,
                SettleId: ctx.request.body.SettleId
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