const mongoose = require('mongoose');

const conferenceSchema = new mongoose.Schema({
    userId:{
        type: String,
    },
    userName:{
        type:String,

    },
    title: {
        type: String,
    },
    venue: {
        type: String,
    },
    indexed:{
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
});

const Conference = mongoose.model('Conference',conferenceSchema);
module.exports = Conference;


async function createConference(conference)
{
    try{
        conferenceExists = await getConference(conference);
        if(!conferenceExists){
            await Conference.create(conference);
        }
        return;
    }
    catch (err){
        console.log(`Following error occurred while finding the creatconferenceFunction : ${err}`);
        throw err;
    }

}
module.exports.createConference = createConference;

async function getConference(conference)
{
    try{
        const obj = await Conference.findOne({
            userId:conference.userId,
            title:conference.title,
            dd:conference.dd,
            mm:conference.mm,
            yyyy:conference.yyyy,
        });
        return obj;
    }
    catch(err){
        console.log(`Following error occurred while finding the getConferenceFunction : ${err}`);
        throw err;
    }
}

module.exports.getConference = getConference;