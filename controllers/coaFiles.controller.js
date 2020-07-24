module.exports = {
    async create (ctx){
        try{
            ctx.body = await ctx.db.CoaFiles.create({
                filename: ctx.request.body.filename,
                diskname: ctx.request.body.diskname,
                CoaId: ctx.request.body.CoaId
            });
            
        }catch(err){
            ctx.throw(500, err)
        }
    },
    async find (ctx) {
        try{
            ctx.body = await ctx.db.CoaFiles.findAll({
                where:{
                    CoaId: ctx.params.coaId
                }
            });
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async bulkCreate (ctx) {
        console.log('files create ' + ctx.request.body);
        ctx.body = await ctx.db.CoaFiles.bulkCreate(ctx.request.body).then(() => { 
            return ctx.db.CoaFiles.findAll({
                where: {
                    CoaId: ctx.params.coaId
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
            ctx.body = await ctx.db.CoaFiles.findByPk(ctx.params.id);
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async destroy (ctx) {
        try{
            var result  = await ctx.db.CoaFiles.destroy({
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
            var result = await ctx.db.CoaFiles.update({
                filename: ctx.request.body.filename,
                diskname: ctx.request.body.diskname,
                CoaId: ctx.request.body.CoaId
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