import express from 'express';
const Router = express.Router();
import pool from '../config/config.js';
import config from '../config.js';
import  query from '../utils/query.js';
import {isAuth} from '../utils/authsup.js';


//GET
Router.post('/institute_detail',isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const instHash = req.body.inst_hash;
              const sql = `SELECT * from web_institute_detail WHERE inst_hash="${instHash}" AND status = 1`;
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
Router.post('/addinstitute_detail',isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
            const instHash = req.body.inst_hash;
              const title = req.body.title;
              const content = req.body.content;
              const sql = `INSERT INTO web_institute_detail (inst_hash, title, content)
              VALUES ('${instHash}','${title}' , '${content}')`;
              console.log(sql)
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
//POST METHOD
Router.post('/updateinstitute_detail',isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const detail_id = req.body.detail_id;
              const title = req.body.title;
              const content = req.body.content;
              const sql = `UPDATE web_institute_detail SET title="${title}", content="${content}"  WHERE detail_id=${detail_id}`;
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
//POST METHOD
Router.post('/deleteinstitute_detail',isAuth, async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const detail_id = req.body.detail_id;
              console.log(detail_id);
              const sql = `UPDATE web_institute_detail SET status = 0 WHERE detail_id=${detail_id}`;
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