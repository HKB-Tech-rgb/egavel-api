module.exports = {
    async create (ctx){
        try{

            ctx.body = await ctx.db.ReliefSoughtFiles.create({
                filename: ctx.request.body.filename,
                diskname: ctx.request.body.diskname,
                ReliefSoughtId: ctx.request.body.ReliefSoughtId
            });
            
        }catch(err){
            ctx.throw(500, err)
           
        }
    },
    async find (ctx) {
        try{
            ctx.body = await ctx.db.ReliefSoughtFiles.findAll({
                where:{
                    ReliefSoughtId: ctx.params.reliefId
                }
            });
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async bulkCreate (ctx) {
        console.log('relief sought files create ' + JSON.stringify(ctx.request.body));
        ctx.body = await ctx.db.ReliefSoughtFiles.bulkCreate(ctx.request.body).then(() => { 
            return ctx.db.ReliefSoughtFiles.findAll({
                where: {
                    ReliefSoughtId: ctx.params.reliefId
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
            ctx.body = await ctx.db.ReliefSoughtFiles.findByPk(ctx.params.id);
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async destroy (ctx) {
        try{
            var result  = await ctx.db.ReliefSoughtFiles.destroy({
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
            var result = await ctx.db.ReliefSoughtFiles.update({
                filename: ctx.request.body.filename,
                diskname: ctx.request.body.diskname,
                ReliefSoughtId: ctx.request.body.ReliefSoughtId
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