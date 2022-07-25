import express from 'express';
const Router = express.Router();
import jsdom from "jsdom";
const { JSDOM } = jsdom;
import pool from '../config/config.js';
import config from '../config.js';
import  query from '../utils/query.js';
import {isAuth} from '../utils/authsup.js';

//GET METHOD
Router.post('/notification', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const instHash = req.body.inst_hash;
              const sql = `SELECT * from web_notification WHERE inst_hash="${instHash}"`;
              const result = await query(sql, conn);
            //   console.log(result);
              if(result){
                  res.send(result);
              }
              else{
                  res.send({result:"Something went wrong"});
              }
            //   poolconnection.releaseConnection(conn);
          }
    })
})

//POST METHOD
Router.post('/addnotification',async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            
            today = yyyy + '-' + mm + '-.' + dd;
            global.document = new JSDOM(today).window.document;
            
              const instHash = req.body.inst_hash;
              const title = req.body.notify_title;
              const description = req.body.notify_description;
              const date = req.body.notify_date;
              const date_update = req.body.notify_date_update;
              const image = req.body.image
              const sql = `INSERT INTO web_notification (inst_hash, notify_title , notify_description, notify_date, notify_date_update,image)
              VALUES ('${instHash}' , '${title}', '${description}' , '${date}', '${date_update}','${image}')`;
              const result = await query(sql, conn);
              if(result){
                  res.send("success");
              }
              else{
                  res.send({result:"Something went wrong"});
              }
             
          }
    })
})

//uPDATE
Router.post('/updatenotification',isAuth,async(req,res) =>{
    pool.getConnection(async(err,conn) =>{
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
        else{
            const ID = req.body.notify_id;
            const title = req.body.notify_title;
            const description = req.body.notify_description;
            const date = req.body.notify_date;
            const date_update = req.body.notify_date_update;
            const image = req.body.image
            const sql = `UPDATE web_notification SET notify_title="${title}", notify_description="${description}", notify_date="${date}",notify_date_update="${date_update}",image="${image}" WHERE notify_id=${ID}`
            const result = await query(sql, conn);
            if(result){
                res.send("success");
            }
            else{
                res.send({result:"Something went wrong"});
            }
            // poolconnection.releaseConnection(conn);
        }
    })
})


//Delete
Router.post('/delnotfication',isAuth,async(req,res) =>{
    pool.getConnection(async(err,conn)=>{
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
            const ID = req.body.id;
            const instHash = req.body.inst_hash;
            console.log(ID);
            const sql = `UPDATE web_notification SET inst_hash="del+${instHash}" WHERE notify_id=${ID}`;
            const result = await query(sql, conn);
            if(result){
                res.send("successfully deleted");
            }
            else{
                res.send({result:"Something went wrong"});
            }
            // poolconnection.releaseConnection(conn);
          }
    })
})


export default Router;