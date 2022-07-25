import express from 'express';
const Router = express.Router();
import pool from '../config/config.js';
import config from '../config.js';
import  query from '../utils/query.js';
import {isAuth} from '../utils/authsup.js';

Router.post('/color', isAuth,async(req, res) => {
    pool.getConnection(async(err, conn) => {
        if(err){
            console.log(err);
            res.status(500).send('Server Error');
        }
        else{
            const instHash = req.body.inst_hash;
            const sql = `SELECT * from web_colour WHERE inst_hash="${instHash}"`;
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

Router.post('/addcolor',isAuth,async(req,res)=>{
    pool.getConnection(async(err,conn) =>{
        if(err){
            console.log(err);
            res.status(500).send('Server Error');
        }
        else{
            const instHash = req.body.inst_hash;
            const type = req.body.title;
            const color = req.body.content;
            const sql = `INSERT INTO web_colour (inst_hash,title,content) VALUES ('${instHash}','${type}','${color}')`;
            const result = await query(sql, conn);
              if(result){
                  res.send({result:'added successfully'});
              }
              else{
                  res.send({result:"Something went wrong"});
              }
            //   poolconnection.releaseConnection(conn);
        }
    })
})


Router.post('/updatecolor',isAuth,async(req,res) => {
    pool.getConnection(async(err,conn) => {
        if(err){
            console.log(err);
            res.status(500).send('Server Error');
        }
        else{
            const ID = req.body.id;
            const type = req.body.title;
            const color = req.body.content;
            const sql = `UPDATE web_colour SET title="${type}", content="${color}" WHERE id=${ID}`;
            const result = await query(sql, conn);
              if(result){
                  res.send({result:'updates successfully'});
              }
              else{
                  res.send({result:"Something went wrong"});
              }
            //   poolconnection.releaseConnection(conn);
        }
    })
})


Router.post('/delcolor',isAuth,async(req,res) =>{
    pool.getConnection(async(err,conn) => {
        if(err){
            console.log(err);
            res.status(500).send('Server Error');
        }
        else{
            const ID = req.body.id;
            const instHash = req.body.inst_hash;
            const sql = `UPDATE web_colour SET inst_hash="del+${instHash}" WHERE id=${ID}`;
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