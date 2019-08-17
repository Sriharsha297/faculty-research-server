const express = require('express');
const router = express.Router();

const User = require('./../models/user');
const Workshop =require('./../models/workshop');

router.route('/')
    .post( (req,res) => {
        Workshop.getWorkshopId(req.body)
        .then((workshopId) =>{
            console.log("workshopId : "+workshopId)
            User.findUser(req.body)
            .then( (user) => {
                console.log("user : "+user);
                User.update({userId:user.userId}, { $push: { workshopStack: workshopId._id } })
                .then(()=>{
                    console.log(user.workshopStack);
                    res.status(200).json({
                        message: `successful`,
                    });
                })
            })
        })
        .catch(err =>{
            res.status(400).json({
                message: 'Internal server error, please try again after sometime.',
                stats: {}
            });
        })
    })


module.exports = router;