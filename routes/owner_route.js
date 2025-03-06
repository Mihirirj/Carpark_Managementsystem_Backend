const express = require('express')
const router = express.Router()
const add_park = require('../operations/owner/add_park')
const get_all_parks = require('../operations/owner/get_all_parks')
const get_income_report = require('../operations/owner/get_income_report')
const get_feedbacks = require('../operations/owner/getFeedbacks')
const get_reservations = require('../operations/owner/getReservations')
const get_faviorite_parks = require('../operations/owner/get_faviorite_parks')

router.get('/home' ,async (req,res,next)=>{
    res.send("owners_home")
})

router.post('/add_park' ,async (req,res,next)=>{
    add_park(req , res)
})

router.get('/get_all_parks' ,async (req,res,next)=>{
    get_all_parks(req , res)
})

router.get('/get_feedbacks' ,async (req,res,next)=>{
    get_feedbacks(req , res)
})

router.get('/get_reservations' ,async (req,res,next)=>{
    get_reservations(req , res)
})

router.get('/get_income_report' ,async (req,res,next)=>{
    get_income_report(req , res)
})

router.get('/get_favorite_parks' ,async (req,res,next)=>{
    get_faviorite_parks(req , res)
})


module.exports = router
