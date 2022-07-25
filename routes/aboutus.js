import express from 'express';
const Router = express.Router();
import pool from '../config/config.js';
import config from '../config.js';
import  query from '../utils/query.js';
import {isAuth} from '../utils/authsup.js';


Router.post('/aboutus',isAuth,async(req,res)=>{
    pool.getConnection(async(err,conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          }
          else{
            const instHash = req.body.inst_hash;
            const sql = `SELECT * from web_aboutus WHERE inst_hash="${instHash}"`;
            const result = await query(sql, conn);
            if(result){
                res.send(result);
            }
            else{
                res.send({result:"Something went wrong"});
            }
            
        } 
    })
})

Router.post('/addaboutus',isAuth,async(req,res)=>{
    pool.getConnection(async(err,conn)=>{
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
            const instHash = req.body.inst_hash;
            const img = req.body.about_img;
            const about = req.body.about_char;
            const mission = req.body.our_mission;
            const vision = req.body.our_vision;
            const why = req.body.why_us;
            const sql = `INSERT INTO web_aboutus (inst_hash,about_img,about_char,our_mission,our_vision,why_us) VALUES ('${instHash}','${img}','${about}','${mission}','${vision}','${why}')`;
            const result = await query(sql, conn);
            if(result){
                res.send({result:"added successfully"});
            }
            else{
                res.send({result:"Something went wrong"});
            } 
       
          }
    })
})


Router.post('/updateabout',async(req,res)=>{
    pool.getConnection(async(err,conn)=>{
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
        else
        {
            const ID = req.body.id;
            // const instHash = req.body.inst_hash;
            const img = req.body.about_img;
            const about = req.body.about_char;
            const mission = req.body.our_mission;
            const vision = req.body.our_vision;
            const why = req.body.why_us;
            const sql = `UPDATE web_aboutus SET about_img="${img}",about_char="${about}",our_mission="${mission}",our_vision="${vision}",why_us="${why}" WHERE id=${ID}`;
            const result = await query(sql, conn);
              if(result){
                  res.send({result:"updated succcessfully"});
              }
              else{
                  res.send({result:"Something went wrong"});
              }
             
        }
    })
})


Router.post('/delabout',isAuth,async(req,res)=>{
    pool.getConnection(async(err,conn) =>{
        if(err) {
            console.log(err);
            res.status(500).send('Server Error');
        }
        else{
            const ID = req.body.id;
            const instHash = req.body.inst_hash;
            const sql = `UPDATE web_aboutus SET inst_hash="del+${instHash}" WHERE id=${ID}`;
            const result = await query(sql, conn);
              if(result){
                  res.send({result:"successfully deleted"});
              }
              else{
                  res.send({result:"Something went wrong"});
              }
        }
    })
})

export default Router;