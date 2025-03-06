const express = require('express')
const router = express.Router()
const confirm_park = require('../operations/admin/confirm_park')
const reject_park = require('../operations/admin/reject_park')
const get_all_parks = require('../operations/admin/get_all_parks')
const get_analyse = require('../operations/admin/get_analyse')

router.get('/home' ,async (req,res,next)=>{
    res.send("home")
})

router.put('/confirm_park/:park_id' ,async (req,res,next)=>{
    confirm_park(req , res)
})

router.put('/reject_park/:park_id' ,async (req,res,next)=>{
    reject_park(req , res)
})

router.get('/get_all_parks' ,async (req,res,next)=>{
    get_all_parks(req , res)
})

router.get('/get_analyse' ,async (req,res,next)=>{
    get_analyse(req , res)
})

module.exports = router
