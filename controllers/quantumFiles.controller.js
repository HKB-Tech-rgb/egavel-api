module.exports = {
    async create (ctx){
        try{
            ctx.body = await ctx.db.QuantumFiles.create({
                filename: ctx.request.body.filename,
                diskname: ctx.request.body.diskname,
                QuantumId: ctx.request.body.QuantumId
            });
            
        }catch(err){
            ctx.throw(500, err)
        }
    },
    
    async find (ctx) {
        try{
            ctx.body = await ctx.db.QuantumFiles.findAll({
                where:{
                    QuantumId: ctx.params.quantaId
                }
            });
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async bulkCreate (ctx) {
        //console.log('files create ' + ctx.request.body);
        //await ctx.db.QuantumFiles.bulkCreate(ctx.request.body)
        ctx.body = await ctx.db.QuantumFiles.bulkCreate(ctx.request.body).then(() => { 
            return ctx.db.QuantumFiles.findAll({
                where: {
                    QuantumId: ctx.params.quantaId
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
            ctx.body = await ctx.db.QuantumFiles.findByPk(ctx.params.id);
        }
        catch(err){
            ctx.throw(500, err);
        }
    },
    async destroy (ctx) {
        try{
            var result  = await ctx.db.QuantumFiles.destroy({
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
            var result = await ctx.db.QuantumFiles.update({
                filename: ctx.request.body.filename,
                diskname: ctx.request.body.diskname,
                QuantumId: ctx.request.body.QuantumId
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