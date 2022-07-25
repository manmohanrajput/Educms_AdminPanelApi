import express from 'express';
const Router = express.Router();
import pool from '../config/config.js';
import config from '../config.js';
import  query from '../utils/query.js';
import {isAuth} from '../utils/authsup.js';

//GET
Router.post('/resources', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const instHash = req.body.inst_hash;
              const sql = `SELECT * from resources WHERE inst_hash="${instHash}"`;
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

//POST
Router.post('/addresources', isAuth, async(req,res) => {
    pool.getConnection(async(err,conn)=>{
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
        else{
            const instHash = req.body.inst_hash;
            const name = req.body.tab_name;
            const link = req.body.link;
            const sql = `INSERT INTO resources (inst_hash, tab_name, link ) VALUES ('${instHash}','${name}','${link}')`;
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

//UPDATE
Router.post('/updateresources',isAuth, async(req,res) =>{
    pool.getConnection(async(err,conn) =>{
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
        else{
            const ID = req.body.id;
            const name = req.body.tab_name;
            const link = req.body.link;
            const sql = `UPDATE resources SET tab_name="${name}", link="${link}" WHERE id=${ID}`;
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

//DELETE
Router.post('/delresources',isAuth, async(req,res)=>{
    pool.getConnection(async(err,conn) =>{
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          }
        else{
            const ID = req.body.id;
            const instHash = req.body.inst_hash;
            const sql = `UPDATE resources SET inst_hash="del+${instHash}" WHERE id=${ID}`;
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