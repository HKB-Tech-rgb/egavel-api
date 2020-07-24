module.exports = {
    async create (ctx){
        try{
            ctx.body = await ctx.db.ResolutionFiles.create({
                filename: ctx.request.body.filename,
                diskname: ctx.request.body.diskname,
                ResolutionId: ctx.request.body.ResolutionId
            });
            
        }catch(err){
            ctx.throw(500, err)
        }
    },
    async find (ctx) {
        try{
            ctx.body = await ctx.db.ResolutionFiles.findAll({
                where:{
                    ResolutionId: ctx.params.resolutionId
                }
            });
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async bulkCreate (ctx) {
        console.log('Resolution files create ' + JSON.stringify(ctx.request.body));
        ctx.body = await ctx.db.ResolutionFiles.bulkCreate(ctx.request.body).then(() => { 
            return ctx.db.ResolutionFiles.findAll({
                where: {
                    ResolutionId: ctx.params.resolutionId
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
            ctx.body = await ctx.db.ResolutionFiles.findByPk(ctx.params.id);
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async destroy (ctx) {
        try{
            var result  = await ctx.db.ResolutionFiles.destroy({
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
            var result = await ctx.db.ResolutionFiles.update({
                filename: ctx.request.body.filename,
                diskname: ctx.request.body.diskname,
                ResolutionId: ctx.request.body.ResolutionId
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