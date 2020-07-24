async function writeEachFile(ctx, callback) {
    for (var index = 0; index < ctx.request.body.length; index++) {
      await callback(ctx.request.body[index], ctx);
    }
}
module.exports = {
    
    async create (file){
        try{
            await ctx.db.DefenseFiles.create({
                filename: ctx.request.body.filename,
                diskname: ctx.request.body.diskname,
                DefenseId: ctx.request.body.DefenseId
            });
            
        }catch(err){
            ctx.throw(500, err)
           
        }
    },
    async find (ctx) {
        try{
            ctx.body = await ctx.db.DefenseFiles.findAll({
                where:{
                    DefenseId: ctx.params.defenseId
                }
            });
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async bulkCreate (ctx) {
        console.log('files create ' + JSON.stringify(ctx.request.body));
        ctx.body = await ctx.db.DefenseFiles.bulkCreate(ctx.request.body).then(() => { 
            return ctx.db.DefenseFiles.findAll({
                where: {
                    DefenseId: ctx.params.defenseId
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
            ctx.body = await ctx.db.DefenseFiles.findByPk(ctx.params.id);
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async destroy (ctx) {
        try{
            var result  = await ctx.db.DefenseFiles.destroy({
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
            var result = await ctx.db.DefenseFiles.update({
                filename: ctx.request.body.filename,
                diskname: ctx.request.body.diskname,
                DefenseId: ctx.request.body.DefenseId
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