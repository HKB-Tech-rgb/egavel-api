module.exports = {
    async create (ctx){
        try{

            ctx.body = await ctx.db.ccReliefSoughtFiles.create({
                filename: ctx.request.body.filename,
                diskname: ctx.request.body.diskname,
                ccReliefSoughtId: ctx.request.body.ccReliefSoughtId
            });
            
        }catch(err){
            ctx.throw(500, err)
           
        }
    },
    async find (ctx) {
        try{
            ctx.body = await ctx.db.ccReliefSoughtFiles.findAll({
                where:{
                    ccReliefSoughtId: ctx.params.reliefId
                }
            });
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async bulkCreate (ctx) {
        console.log('ccrelief sought files create ' + JSON.stringify(ctx.request.body));
        ctx.body = await ctx.db.ccReliefSoughtFiles.bulkCreate(ctx.request.body).then(() => { 
            return ctx.db.ccReliefSoughtFiles.findAll({
                where: {
                    ccReliefSoughtId: ctx.params.reliefId
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
            ctx.body = await ctx.db.ccReliefSoughtFiles.findByPk(ctx.params.id);
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async destroy (ctx) {
        try{
            var result  = await ctx.db.ccReliefSoughtFiles.destroy({
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
            var result = await ctx.db.ccReliefSoughtFiles.update({
                filename: ctx.request.body.filename,
                diskname: ctx.request.body.diskname,
                ccReliefSoughtId: ctx.request.body.ccReliefSoughtId
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