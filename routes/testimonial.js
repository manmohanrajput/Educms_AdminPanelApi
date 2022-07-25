import express from 'express';
const Router = express.Router();
import pool from '../config/config.js';
import config from '../config.js';
import  query from '../utils/query.js';
import {isAuth} from '../utils/authsup.js';

Router.post('/testimonial', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const instHash = req.body.inst_hash;
              const sql = `SELECT * from web_testimonial WHERE inst_hash="${instHash}" AND status = 1`;
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

Router.post('/addtestimonial', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const instHash = req.body.inst_hash;
              const img_urls = req.body.image_url;
              const first_Name = req.body.first_name;
              const Last_Name = req.body.last_name;
              const titles = req.body.title;
              const descriptions = req.body.description;
              const sql = `INSERT INTO web_testimonial (inst_hash, image_url, first_name, last_name, title, description)
              VALUES ('${instHash}' , '${img_urls}', '${first_Name}', '${Last_Name}', '${titles}', '${descriptions}')`;
              console.log(sql)
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

Router.post('/updatetestimonial', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
            const testms_id = req.body.testm_id;
            const img_urls = req.body.image_url;
            const first_Name = req.body.first_name;
            const Last_Name = req.body.last_name;
            const titles = req.body.title;
            const descriptions = req.body.description;
            const video_urls = req.body.video_url;
              const sql = `UPDATE web_testimonial SET image_url="${img_urls}", first_name="${first_Name}",
               last_name="${Last_Name}", title="${titles}", description="${descriptions}", video_url="${video_urls}" WHERE testm_id=${testms_id}`
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

Router.post('/deltestimonial', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
            const testms_id = req.body.testm_id;
            const instHash = req.body.inst_hash;  
            console.log(testms_id);
              const sql = `UPDATE web_testimonial SET inst_hash="del+${instHash}" WHERE testm_id=${testms_id}`;
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