

const mongoose = require('mongoose');


const workshopSchema = new mongoose.Schema({
    workshopId:{
        type: String,
    },
    workshopName:{
        type: String,
        required: true,
    },
    venue:{
        type: String,
        required:true,
    },
    startDate:{
        type:Number,
        required:true,
    },
    endDate:{
        type:Number,
        required:true,
    },
    certificate:{
        type:String,
    }
});

const Workshop = mongoose.model('Workshop',workshopSchema);
module.exports = Workshop;

async function getWorkshopIdFunction({workshopName,venue,startDate,endDate})
{
    try{
        console.log(workshopName);
        const workshopObject = await Workshop.findOneAndUpdate({
            workshopName,
            venue,
            startDate,
            endDate
        },
        {
            $setOnInsert: { workshopName,
                venue,
                startDate,
                endDate,
                },
        } ,{
            returnOriginal: false,
            upsert: true,
          }).select('workshopId').exec();
          //console.log(workshopObject);
        return workshopObject;
    }
    catch(err){
        console.log(`in models/workshop.js, ${err}`);
    }
    
}
module.exports.getWorkshopId = getWorkshopIdFunction;