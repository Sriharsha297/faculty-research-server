const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
        
    },
    userName:{
        type:String,
        required:true,
    },
    workshopStack:{
        type:[String],
        required:true,
    }
}
);


const User = mongoose.model('User',userSchema);
module.exports = User;

async function findUserFunction({userId,userName})
{
    try{
        const userObject = await User.findOneAndUpdate({
            userId
        },
        { $setOnInsert:{
            userId,
            userName,
            workshopStack:[]}
        },{
            returnOriginal: false,
            upsert:true,
        }).exec();
        return userObject;
    }
    catch (err){
        console.log(`Following error occurred while finding the user : ${err}`);
        throw err;
    }

}
module.exports.findUser = findUserFunction;






