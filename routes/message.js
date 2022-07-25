import express from 'express';
const Router = express.Router();
import pool from '../config/config.js';
import config from '../config.js';
import  query from '../utils/query.js';
import {isAuth} from '../utils/authsup.js';


Router.post('/message',isAuth,async(req,res)=>{
    pool.getConnection(async(err,conn) => {
        if(err) {
            console.log(err);
            res.status(500).send('Server Error');
        }
        else{
            const instHash = req.body.inst_hash;
            const sql = `SELECT * from web_message WHERE inst_hash="${instHash}"`;
            const result = await query(sql, conn);
            if(result){
                res.send(result);
            }
            else{
                res.send({result:"Something went wrong"});
            }
            // poolconnection.releaseConnection(conn);
        }
    })
})

Router.post('/addmessage',isAuth,async(req,res)=>{
    pool.getConnection(async(err,conn) =>{
        if(err) {
            console.log(err);
            res.status(500).send('Server Error');
        }
        else{
            const instHash = req.body.inst_hash;
            const messageBy = req.body.message_by;
            const message = req.body.message;
            const image = req.body.img;
            const sql = `INSERT INTO web_message (inst_hash,message_by,message,img) VALUES ('${instHash}','${messageBy}','${message}','${image}')`
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
Router.post('/updatemessage',isAuth,async(req,res) => {
    pool.getConnection(async(err,conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          }
          else{
            const ID = req.body.id;
            const messageBy = req.body.message_by;
            const message = req.body.message;
            const image = req.body.img;
            const sql = `UPDATE web_message SET message_by="${messageBy}", message="${message}",img="${image}"  WHERE id=${ID}`;
            const result = await query(sql, conn);
              if(result){
                  res.send("success");
              }
              else{
                  res.send({result:"Something went wrong"});
              }
          }
        //   poolconnection.releaseConnection(conn);
    })
})


Router.post('/delmessage',isAuth,async(req,res)=>{
    pool.getConnection(async(err,conn) =>{
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          }
          else{
            const ID = req.body.id;
            const instHash = req.body.inst_hash;
            console.log(ID);
            const sql = `UPDATE web_message SET inst_hash="del+${instHash}" WHERE id=${ID}`;
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