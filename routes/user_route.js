const express = require('express')
const router = express.Router()
const add_reservation = require('../operations/user/addResearvation')
const add_feedback = require('../operations/user/add_feedback')
const cancelReservation = require('../operations/user/cancelReservation')
const enterToPark = require('../operations/user/enterToPark')
const enterToPark_researved = require('../operations/user/enterToPark_researved')
const exit_from_park = require('../operations/user/exit_from_park')
const getReservation = require('../operations/user/getReservation')
const rate_park = require('../operations/user/rate_park')
const get_all_parks = require('../operations/user/get_all_parks')
const get_slots = require('../operations/user/get_available_slots')
const get_park_map = require('../operations/user/get_park_map')

router.get('/home' ,async (req,res,next)=>{
    res.send("home")
})

router.post('/add_reservation' ,async (req,res,next)=>{
    add_reservation(req , res)
})

router.post('/add_feedback' ,async (req,res,next)=>{
    add_feedback(req , res)
})

router.get('/cancelReservation/:booking_id' ,async (req,res,next)=>{
    cancelReservation(req , res)
})

router.post('/enterToPark' ,async (req,res,next)=>{
    enterToPark(req , res)
})

router.post('/enterToPark_researved' ,async (req,res,next)=>{
    enterToPark_researved(req , res)
})

router.post('/exit_from_park' ,async (req,res,next)=>{
    exit_from_park(req , res)
})

router.get('/getReservation' ,async (req,res,next)=>{
    getReservation(req , res)
})

router.get('/rate_park/:park_id/:rate' ,async (req,res,next)=>{
    rate_park(req , res)
})

router.get('/get_all_parks' ,async (req,res,next)=>{
    get_all_parks(req , res)
})

router.get('/get_map_park' ,async (req,res,next)=>{
    get_park_map(req , res)
})

router.get('/get_available_slots/:park_id' ,async (req,res,next)=>{
    get_slots(req , res)
})

module.exports = router
