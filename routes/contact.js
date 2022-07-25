import express from 'express';
const Router = express.Router();
import pool from '../config/config.js';
import config from '../config.js';
import  query from '../utils/query.js';
import {isAuth} from '../utils/authsup.js';

Router.post('/contact',isAuth,async(req,res) => {
    pool.getConnection(async(err,conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          }
        else{
            const instHash = req.body.inst_hash;
            const sql = `SELECT * from web_contact WHERE inst_hash="${instHash}"`;
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

Router.post('/addcontact',isAuth,async(req,res) => {
    pool.getConnection(async(err,conn)=>{
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          }
        else{
            const instHash = req.body.inst_hash;
            const name = req.body.title;
            const detail = req.body.content;
            const sql = `INSERT INTO web_contact (inst_hash, title, content) VALUES ('${instHash}','${name}','${detail}')`;
            const result = await query(sql, conn);
            if(result){
                res.send({result:"success"});
            }
            else{
                res.send({result:"Something went wrong"});
            }
            
            // poolconnection.releaseConnection(conn);
        }
    })
})


Router.post('/updatecontact',isAuth,async(req,res)=>{
    pool.getConnection(async(err,conn) =>{
        if(err){
            console.log(err);
            res.status(500).send('Server Error');
        }
        else{
            const ID = req.body.id;
            const name = req.body.title;
            const detail = req.body.content;
            const sql = `UPDATE web_contact SET title='${name}',content='${detail}' WHERE id=${ID}`;
            const result = await query(sql, conn);
              if(result){
                  res.send({result:"Updated"});
              }
              else{
                  res.send({result:"Something went wrong"});
              }
            //   poolconnection.releaseConnection(conn);
        }
    })
})

Router.post('/delcontact',isAuth,async(req,res) => {
    pool.getConnection(async(err,conn) => {
        if(err) {
            console.log(err);
            res.status(500).send('Server Error');
        }
        else{
            const ID = req.body.id;
            const instHash = req.body.inst_hash;
            const sql = `UPDATE web_contact SET inst_hash="del+${instHash}" WHERE id=${ID}`;
            const result = await query(sql, conn);
              if(result){
                  res.send({result:"successfully deleted"});
              }
              else{
                  res.send({result:"Something went wrong"});
              }
            //   poolconnection.releaseConnection(conn);
        }
    })
})

export default Router;