const express = require('express');
const router = express.Router();

router.route('/login')
    .post((req,res) => {
        console.log(req.body)
        if(req.body.username==="harsha" && req.body.password === "harsha"){
            
        }
        res.status(200).json({
            message:"Successful"
        })
    })

router.route('/generateCSV')
    .get((req, res) => {
        
    })

module.exports = router;