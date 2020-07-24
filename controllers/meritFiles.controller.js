module.exports = {
    async create (ctx){
        try{
            ctx.body = await ctx.db.MeritFiles.create({
                filename: ctx.request.body.filename,
                diskname: ctx.request.body.diskname,
                MeritId: ctx.request.body.MeritId
            });
            
        }catch(err){
            ctx.throw(500, err)
        }
    },
    async find (ctx) {
        try{
            ctx.body = await ctx.db.MeritFiles.findAll({
                where:{
                    MeritId: ctx.params.meritId
                }
            });
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async bulkCreate (ctx) {
        console.log('Merit files create ' + JSON.stringify(ctx.request.body));
        //await ctx.db.MeritFiles.bulkCreate(ctx.request.body)
        ctx.body = await ctx.db.MeritFiles.bulkCreate(ctx.request.body).then(() => { 
            return ctx.db.MeritFiles.findAll({
                where: {
                    MeritId: ctx.params.meritId
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
            ctx.body = await ctx.db.MeritFiles.findByPk(ctx.params.id);
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async destroy (ctx) {
        try{
            var result  = await ctx.db.MeritFiles.destroy({
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
            var result = await ctx.db.MeritFiles.update({
                filename: ctx.request.body.filename,
                diskname: ctx.request.body.diskname,
                MeritId: ctx.request.body.MeritId
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