module.exports = {
    async create (ctx){
        try{
            ctx.body = await ctx.db.ccQuantumFiles.create({
                filename: ctx.request.body.filename,
                diskname: ctx.request.body.diskname,
                ccQuantumId: ctx.request.body.ccQuantumiId
            });
            
        }catch(err){
            ctx.throw(500, err)
        }
    },
    
    async find (ctx) {
        try{
            ctx.body = await ctx.db.ccQuantumFiles.findAll({
                where:{
                    ccQuantumId: ctx.params.quantaId
                }
            });
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async bulkCreate (ctx) {
        //console.log('files create ' + ctx.request.body);
        ctx.body = await ctx.db.ccQuantumFiles.bulkCreate(ctx.request.body).then(() => { 
            return ctx.db.ccQuantumFiles.findAll({
                where: {
                    ccQuantumId: ctx.params.quantaId
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
            ctx.body = await ctx.db.ccQuantumFiles.findByPk(ctx.params.id);
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async destroy (ctx) {
        try{
            var result  = await ctx.db.ccQuantumFiles.destroy({
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
            var result = await ctx.db.ccQuantumFiles.update({
                filename: ctx.request.body.filename,
                diskname: ctx.request.body.diskname,
                ccQuantumId: ctx.request.body.ccQuantumId
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