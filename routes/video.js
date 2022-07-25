import express from 'express';
const Router = express.Router();
import pool from '../config/config.js';
import config from '../config.js';
import  query from '../utils/query.js';
import {isAuth} from '../utils/authsup.js';

//GET
Router.post('/video', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const instHash = req.body.inst_hash;
              const sql = `SELECT * from web_video WHERE inst_hash="${instHash}" AND status = 1`;
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
Router.post('/addvideo', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
            const instHash = req.body.inst_hash;
              const title = req.body.video_title;
              const link = req.body.video_link;
              const description = req.body.video_description;
              const sql = `INSERT INTO web_video (inst_hash, video_title, video_link, video_description)
              VALUES ('${instHash}','${title}' , '${link}', '${description}')`;
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
//PUT METHOD
Router.post('/updatevideo', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const video_id = req.body.video_id;
              const title = req.body.video_title;
              const link = req.body.video_link;
              const description= req.body.video_description;
              const sql = `UPDATE web_video SET video_title="${title}", video_link="${link}" ,video_description="${description}"  WHERE video_id=${video_id}`;
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
//DEL METHOD
Router.post('/deletevideo', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const video_id = req.body.video_id;
              console.log(video_id);
              const sql = `UPDATE web_video SET status = 0 WHERE video_id=${video_id}`;
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