const User = require('./../models/user');
const Workshop =require('./../models/workshop');
const mongoose = require('mongoose');
const fs = require('fs');

async function connectToDatabase(){
    try{
        const connection = await mongoose.connect('mongodb://localhost:27017/frs',{
            useNewUrlParser: true
        }); 
        console.log(`connection established successfully`);
        return connection;
    }
    catch(err){
        console.log(`connection was unsucessfull ${err}`);
    }
};

connectToDatabase().then(conn => {
    User.find({})
    .exec()
    .then(users => {
        console.log(users);
        createCSV().then(() => {
            users.forEach((doc) => {
                console.log(doc.userId, doc.userName, doc.workshopStack);
                let userRow = `${doc.userName},${doc.userId},`;
                doc.workshopStack.forEach(async (id) => {
                    workshop = await Workshop.findById(id).exec();
                    //console.log(workshop);    
                    workshopRow = `${workshop.workshopName},${workshop.venue},${workshop.startDate},${workshop.endDate}\n`;
                    row = userRow + workshopRow;
                    await writeRow(row);
                    // make row empty
                    console.log(row);
                });
            });
        });
    });
});

async function createCSV() {
    await fs.writeFileSync('./mycsv.csv', 'NAME,ID,WORKSHOP NAME,WORKSHOP VENUE,START DATE,END DATE\n'); 
}

async function writeRow(row) {
    await fs.appendFileSync('./mycsv.csv', row);
}