module.exports = {
    async create (ctx){
        try{
            ctx.body = await ctx.db.ccCoaFiles.create({
                filename: ctx.request.body.filename,
                diskname: ctx.request.body.diskname,
                ccCoaId: ctx.request.body.ccCoaId
            });
            
        }catch(err){
            ctx.throw(500, err)
        }
    },
    async find (ctx) {
        try{
            ctx.body = await ctx.db.ccCoaFiles.findAll({
                where:{
                    ccCoaId: ctx.params.coaId
                }
            });
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async bulkCreate (ctx) {
        console.log('files create ' + ctx.request.body);
        ctx.body = await ctx.db.ccCoaFiles.bulkCreate(ctx.request.body).then(() => { 
            return ctx.db.ccCoaFiles.findAll({
                where: {
                    ccCoaId: ctx.params.coaId
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
            ctx.body = await ctx.db.ccCoaFiles.findByPk(ctx.params.id);
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async destroy (ctx) {
        try{
            var result  = await ctx.db.ccCoaFiles.destroy({
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
            var result = await ctx.db.ccCoaFiles.update({
                filename: ctx.request.body.filename,
                diskname: ctx.request.body.diskname,
                ccCoaId: ctx.request.body.ccCoaId
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