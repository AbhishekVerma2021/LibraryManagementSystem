const mongoose =require('mongoose');
const db ='mongodb://127.0.0.1:27017/LIBRARYDATA';
mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true

}).then(()=>{
     console.log('Database connected !!!');
}).catch((e)=>{
     console.log('error=>', e);
})