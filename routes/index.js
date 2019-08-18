const express = require('express');
const router = express.Router();
const Workshop = require('../models/workshop.js');
const Conference = require('../models/conference');
const Journal = require('../models/journal');
const multer = require('multer');
const Path = require('path');

const firebase = require('firebase');
const gcloud = require('@google-cloud/storage');

const cStorage = new gcloud.Storage({
    projectId: 'faculty-research',
    keyFilename: './faculty-research-firebase-adminsdk-dr8sf-766dc72e46.json'
});

const bucket = cStorage.bucket('gs://faculty-research.appspot.com/');

//initialize multer
const storage = multer.memoryStorage();

//for multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    }
});

router.route('/workshop')
    .post( upload.single('file'), async (req,res) => {
        console.log(req.body);
        console.log(req.file);

        const filePath = await uploadFileToCloud(req.file);

        let date = req.body.date.split('/');
        let dd = date[0];
        if(dd/10 < 1)   dd = "0"+dd
        let mm = date[1];
        let yyyy = date[2];
        let param={
            userId:req.body.userId,
            userName:req.body.userName,
            workshopName:req.body.workshopName,
            venue:req.body.venue,
            dd,
            mm,
            yyyy,
            count:req.body.count,
            certificate: filePath,
        }
        Workshop.createWorkshop(param)
            .then(() =>{
                res.status(200).json({
                    message: 'Workshop Sucessfully updated'
                });
            })
            .catch( err =>{
                res.status(500).json({
                    message: `Fucked up!`
                });
            })
    })

router.route('/conference')
    .post((req,res) =>{
        let date = req.body.date.split('/');
        let dd = date[0];
        if(dd/10 < 1)   dd = "0"+dd
        let mm = date[1];
        let yyyy = date[2];
        let param={
            userId:req.body.userId,
            userName:req.body.userName,
            title:req.body.title,
            venue:req.body.venue,
            dd,
            mm,
            yyyy,
            indexed:req.body.indexed,
        }
        Conference.createConference(param)
            .then(() =>{
                res.status(200).json({
                    message: 'Conference Sucessfully updated'
                });
            })
            .catch( err =>{
                res.status(500).json({
                    message: `Fucked up!`
                });
            })
    })

router.route('/journal')
    .post((req,res)=>{
        let date = req.body.date.split('/');
        let dd = date[0];
        if(dd/10 < 1)   dd = "0"+dd
        let mm = date[1];
        let yyyy = date[2];
        let param={
            userId:req.body.userId,
            userName:req.body.userName,
            journalTitle:req.body.journalTitle,
            paperTitle:req.body.paperTitle,
            volume:req.body.volume,
            dd,
            mm,
            yyyy,
            issue:req.body.issue,
        }
        Journal.createJournal(param)
            .then(() =>{
                res.status(200).json({
                    message: 'Jouranal Sucessfully updated'
                });
            })
            .catch( err =>{
                res.status(500).json({
                    message: `Fucked up!`
                });
            })
    })

const uploadFileToCloud = (file) => {
    let prom = new Promise((resolve, reject) => {
        console.log(file);
        const fileName = `attachments-${Date.now()}${Path.extname(file.originalname)}`;
        const fileUpload = bucket.file(fileName);

        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        });

        blobStream.on('error', (err) => {
            console.log(err);
            throw new Error(err);
        });

        blobStream.on('finish', () => {
            const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileUpload.name}?alt=media`;
            resolve(url);
        });

        blobStream.end(file.buffer);
    });
    return prom;
}    

module.exports = router;