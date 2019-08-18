const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema({
    userId:{
        type: String,
    },
    userName:{
        type:String,
    },
    workshopName:{
        type: String,
    },
    venue:{
        type: String,
    },
    dd:{
        type:Number,
    },
    mm:{
        type:Number,
    },
    yyyy:{
        type:Number,
    },
    count:{
        type:Number,
    },
    certificate:{
        type:String,
    }
}
);

/*
workshop {name, venue, startdate, enddate, certificate}
journal {journal title, paper title, volume, issue, date, ugc listed}
conferences {title, venue, date, index}
*/


const Workshop = mongoose.model('Workshop',workshopSchema);
module.exports = Workshop;

async function createWorkshop(workshop)
{
    try{
        workshopExists = await getWorkshop(workshop);
        if(!workshopExists){
            await Workshop.create(workshop);
        }
        return;
    }
    catch (err){
        console.log(`Following error occurred while finding the creatWorkshopFunction : ${err}`);
        throw err;
    }

}
module.exports.createWorkshop = createWorkshop;

async function getWorkshop(workshop)
{
    try{
        const obj = await Workshop.findOne({
            userId:workshop.userId,
            workshopName:workshop.workshopName,
            dd:workshop.dd,
            mm:workshop.mm,
            yyyy:workshop.yyyy,
        });
        return obj;
    }
    catch(err){
        console.log(`Following error occurred while finding the getWorkshopFunction : ${err}`);
        throw err;
    }
}

module.exports.getWorkshop = getWorkshop;





