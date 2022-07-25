import express from 'express';
const Router = express.Router();
import pool from '../config/config.js';
import config from '../config.js';
import  query from '../utils/query.js';
import {isAuth} from '../utils/authsup.js';

//GET
Router.post('/socialLinks', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const instHash = req.body.inst_hash;
              const sql = `SELECT * from web_sociallinks WHERE inst_hash="${instHash}"`;
              const result = await query(sql, conn);
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

Router.post('/addsociallinks', isAuth, async(req,res) => {
    pool.getConnection(async(err,conn)=>{
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
        else{
            const instHash = req.body.inst_hash;
            const page = req.body.title;
            const link = req.body.content;
            const sql = `INSERT INTO web_sociallinks (inst_hash, title, content ) VALUES ('${instHash}','${page}','${link}')`;
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

Router.post('/updatesociallinks',isAuth, async(req,res) =>{
    pool.getConnection(async(err,conn) =>{
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
        else{
            const ID = req.body.id;
            const page = req.body.title;
            const link = req.body.content; 
            const sql = `UPDATE web_sociallinks SET title="${page}", content="${link}" WHERE id=${ID}`;
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


Router.post('/delsociallinks',isAuth, async(req,res)=>{
    pool.getConnection(async(err,conn) =>{
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          }
        else{
            const ID = req.body.id;
            const instHash = req.body.inst_hash;
            const sql = `UPDATE web_sociallinks SET inst_hash="del+${instHash}" WHERE id=${ID}`;
              const result = await query(sql, conn);
              
              if(result){
                  res.send("successfully deleted");
              }
              else{
                  res.send({result:"Something went wrong"});
              }
            //   poolconnection.releaseConnection(conn);
        }
    })
})

export default Router;