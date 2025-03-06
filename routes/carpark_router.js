const express = require('express')
const router = express.Router()
const get_park_slots = require('../operations/carpark/get_park_slots')
const register_park = require('../operations/carpark/register_park')
const generate_uri = require('../operations/qrOperation/generate_uri')

router.get('/home' ,async (req,res,next)=>{
    res.send("home")
})

router.get('/get_park_slots/:park_id' ,async (req,res,next)=>{
    get_park_slots(req , res)
})

router.get('/get_qr_uri/:park_id' ,async (req,res,next)=>{
    generate_uri(req , res)
})

router.post('/register_park' ,async (req,res,next)=>{
    register_park(req , res)
})


module.exports = router
