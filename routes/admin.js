const express = require('express');
const router = express.Router();
const Workshop =require('./../models/workshop');
const Conference = require('./../models/conference');
const Journal = require('./../models/journal');
const Key = require('./../models/key');
const mongoose = require('mongoose');
const fs = require('fs');

router.route('/login')
    .post((req,res) => {
        console.log(req.body)
        if(req.body.username==="harsha" && req.body.password === "harsha"){
            
        }
        res.status(200).json({
            message:"Successful"
        })
    })

router.route('/generateKey')
.get((req,res) => {
    const key = Math.floor(100000 + Math.random() * 900000).toString();
    Key.collection.drop().then((ok) => {
        Key.create({key: key}).then((ok) => {
            res.status(200).json({
                message:"Successful",
                key: key,
            })
        })
        .catch((err) => {
            throw new Error(err);
        })
    })
    .catch((err) => {
        res.status(500).json({
            message:"Internal Server Error"
        })
    });
})

router.route('/generateworkshopCSV')
    .get((req, res) => {
        queryObj = {}

        mm = req.query.month;
        yyyy = req.query.year;

        if(mm !== undefined) {
            queryObj['mm'] = parseInt(mm);
        }
        if (yyyy !== undefined) {
            queryObj['yyyy'] = parseInt(yyyy);
        }

        console.log(typeof mm, typeof yyyy);

        Workshop.find(queryObj)
            .exec()
            .then(workshops=>{
                createWorkshopCSV().then(async () => {
                    let promises = workshops.map(async workshop =>{
                        let row = `${workshop.userId},${workshop.userName},${workshop.workshopName},${workshop.venue},${workshop.dd},${workshop.mm},${workshop.yyyy},${workshop.count}\n`;
                        await writeRow(row);
                    });
                    await Promise.all(promises);
                    res.download("./mycsv.csv");
                })
            })
    })

router.route('/generateconferenceCSV')
.get((req, res) => {
    queryObj = {}

    mm = req.query.month;
    yyyy = req.query.year;
    
    if(mm !== undefined) {
        queryObj['mm'] = mm;
    }
    if (yyyy !== undefined) {
        queryObj['yyyy'] = yyyy;
    }

    Conference.find(queryObj)
        .exec()
        .then(conferences=>{
            createConferenceCSV().then(async () => {
                let promises = conferences.map(async conference =>{
                    let row = `${conference.userId},${conference.userName},${conference.title},${conference.venue},${conference.indexed},${conference.dd},${conference.mm},${conference.yyyy}\n`;
                    await writeRow(row);
                });
                await Promise.all(promises);
                res.download("./mycsv.csv");
            })
        })
})
router.route('/generatejournalCSV')
.get((req, res) => {
    queryObj = {}

    mm = req.query.month;
    yyyy = req.query.year;
    
    if(mm !== undefined) {
        queryObj['mm'] = mm;
    }
    if (yyyy !== undefined) {
        queryObj['yyyy'] = yyyy;
    }

    Journal.find(queryObj)
        .exec()
        .then(journals=>{
            createJournalCSV().then(async ()=> {
                let promises = journals.map(async journal =>{
                    let row = `${journal.userId},${journal.userName},${jouranal.journalTitle},${journal.paperTitle},${journal.volume},${journal.issue},${journal.dd},${journal.mm},${journal.yyyy}\n`;
                    await writeRow(row);
                });
                await Promise.all(promises);
                res.download("./mycsv.csv");
            })
        })
})

//Workshop
async function createWorkshopCSV() {
    await fs.writeFileSync('./mycsv.csv', 'ID,NAME,WORKSHOP NAME,WORKSHOP VENUE,DATE,MONTH,YEAR,NUMBER OF DAYS\n'); 
}

//conference
async function createConferenceCSV() {
    await fs.writeFileSync('./mycsv.csv', 'ID,NAME,TITLE,VENUE,INDEXED,DATE,MONTH,YEAR\n'); 
}


//journal
async function createJournalCSV() {
    await fs.writeFileSync('./mycsv.csv', 'ID,NAME,JOURNAL TITLE,PAPER TITLE,VOLUME,ISSUE,DATE,MONTH,YEAR\n'); 
}

//row

async function writeRow(row) {
    await fs.appendFileSync('./mycsv.csv', row);
}

module.exports = router;