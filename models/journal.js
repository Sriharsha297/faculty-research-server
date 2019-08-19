const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    userId:{
        type: String,
    },
    userName:{
        type:String,

    },
    journalTitle: {
        type: String,
    },
    paperTitle: {
        type: String,
    },
    volume:{
        type: Number,
    },
    issue:{
        type: Number,
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
const Journal = mongoose.model('Journal',journalSchema);
module.exports = Journal;


async function createJournal(journal)
{
    try{
        journalExists = await getJournal(journal);
        if(!journalExists){
            await Journal.create(journal);
        }
        return;
    }
    catch (err){
        console.log(`Following error occurred while finding the creatJournalFunction : ${err}`);
        throw err;
    }

}
module.exports.createJournal = createJournal;

async function getJournal(journal)
{
    try{
        const obj = await Journal.findOne({
            userId:journal.userId,
            journalTitle:journal.journalTitle,
            paperTitle:journal.paperTitle,
            dd:journal.dd,
            mm:journal.mm,
            yyyy:journal.yyyy,
        });
        return obj;
    }
    catch(err){
        console.log(`Following error occurred while finding the getJournalFunction : ${err}`);
        throw err;
    }
}

module.exports.getJournal = getJournal;