import express from 'express';
const Router = express.Router();
import pool from '../config/config.js';
import config from '../config.js';
import  query from '../utils/query.js';
import {isAuth} from '../utils/authsup.js';

Router.post('/seo', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const instHash = req.body.inst_hash;
              const sql = `SELECT * from web_seo WHERE inst_hash="${instHash}"`;
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

Router.post('/addseo',isAuth,async (req,res) => {
    pool.getConnection(async (err,conn) => {
        if(err){
            console.log(err);
            res.status(500).send('Server Error');
        }
        else{
            const instHash = req.body.inst_hash;
            const page_name = req.body.page;
            const title = req.body.title;
            const meta = req.body.meta_desc;
            const keyword = req.body.keywords;
            const sql = `INSERT INTO web_seo (inst_hash,page,title,meta_desc,keywords) VALUES ('${instHash}','${page_name}','${title}','${meta}','${keyword}')`;
            const result = await query(sql, conn);
              if(result){
                  res.send("success");
              }
              else{
                  res.send({result:"Something went wrong"});
              }
            //   poolconnection.releaseConnection(conn);
        }
    })
})

Router.post('/updateseo',isAuth,async(req,res) => {
    pool.getConnection(async(err,conn) => {
        if(err){
            console.log(err);
            res.status(500).send('Server Error');
        }
        else{
            const ID = req.body.id;
            const page_name = req.body.page;
            const title = req.body.title;
            const meta = req.body.meta_desc;
            const keyword = req.body.keywords;
            const sql = `UPDATE web_seo SET page="${page_name}", title="${title}", meta_desc="${meta}",keywords="${keyword}" WHERE id=${ID}`;
            const result = await query(sql, conn);
              if(result){
                  res.send("success");
              }
              else{
                  res.send({result:"Something went wrong"});
              }
            //   poolconnection.releaseConnection(conn);
        }
    })
})

Router.post('/delseo',isAuth,async(req,res) => {
    pool.getConnection(async(err,conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          }
          else{
            const ID = req.body.id;
            const instHash = req.body.inst_hash;
            const sql = `UPDATE web_seo SET inst_hash="del+${instHash}" WHERE id=${ID}`;
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