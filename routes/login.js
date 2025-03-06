const express = require('express')
const router = express.Router()
const utils = require ('./utils');
const con = require('../service/connection');
const login = require('../operations/public/login');
const register = require('../operations/public/register');
const signout = require('../operations/public/signout');

router.get('/sign-in' ,async (req,res,next)=>{
    try {
        res.redirect (utils.request_get_auth_code_url);
      } catch (error) {
        res.sendStatus (500);
        console.log (error.message);
      }
})

router.post('/login' ,async (req,res,next)=>{
  try {
      login(req , res)
    } catch (error) {
      res.sendStatus (500);
      console.log (error.message);
    }
})

router.post('/sign-up' ,async (req,res,next)=>{
    try {
        register(req , res)
      } catch (error) {
        res.sendStatus (500);
        console.log (error.message);
      }
})

// router.post('/sign-up-user' ,async (req,res,next)=>{
//     try {
//       register(req , res , 'user')
//       } catch (error) {
//         res.sendStatus (500);
//         console.log (error.message);
//       }
// })

router.get('/sign-out' ,async (req,res,next)=>{
  try {
      signout(req , res)
    } catch (error) {
      res.sendStatus (500);
      console.log (error.message);
    }
})

module.exports = router