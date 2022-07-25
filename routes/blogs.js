import express from 'express';
const Router = express.Router();
import pool from '../config/config.js';
import config from '../config.js';
import  query from '../utils/query.js';
import {isAuth} from '../utils/authsup.js';

Router.post('/blogs', isAuth, async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const instHash = req.body.inst_hash;
              const sql = `SELECT * from web_institute_blogs WHERE inst_hash="${instHash}"`;
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
Router.post('/addblogs', isAuth, async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
             const instHash = req.body.inst_hash;
              const title = req.body.post_title;
              const first_name = req.body.user_first_name;
              const last_name = req.body.user_last_name;
              const description = req.body.post_description;
              const image = req.body.post_image;
              const date = req.body.add_date;
              const sql = `INSERT INTO web_institute_blogs (inst_hash, post_title, user_first_name,user_last_name, post_description,add_date, post_image)
              VALUES ('${instHash}','${title}' , '${first_name}', '${last_name}','${description}','${date}', '${image}')`;
              const result = await query(sql, conn);
              if(result){
                  res.send({result:"successfully added"});
              }
              else{
                  res.send({result:"Something went wrong"});
              }
            //   poolconnection.releaseConnection(conn);
          }
    })
})
//PUT METHOD
Router.post('/updateblogs', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const blog_id = req.body.blog_id;
              const title = req.body.post_title;
              const first_name = req.body.user_first_name;
              const last_name = req.body.user_last_name;
              const description = req.body.post_description;
              const image = req.body.post_image;
              const date = req.body.add_date;
              const sql = `UPDATE  web_institute_blogs SET post_title="${title}", user_first_name="${first_name}" ,user_last_name="${last_name}" ,post_description="${description}",add_date="${date}", post_image="${image}" WHERE blog_id=${blog_id}`;
              const result = await query(sql, conn);
              if(result){
                  res.send({result:"successfully updated"});
              }
              else{
                  res.send({result:"Something went wrong"});
              }
            //   poolconnection.releaseConnection(conn);
          }
    })
})
//DEL METHOD
Router.post('/deleteblogs', isAuth, async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
            const instHash = req.body.inst_hash;
              const blog_id = req.body.blog_id;
            //   const sql = `UPDATE web_institute_blogs SET status = 0 WHERE blog_id=${blog_id}`;
              const sql = `UPDATE web_institute_blogs SET inst_hash="del+${instHash}" WHERE blog_id=${blog_id}`;

              const result = await query(sql, conn);
              
              if(result){
                  res.send({result:"successfully deleted"});
              }
              else{
                  res.send({result:"Something went wrong"});
              }
              
          }
    })
})





export default Router;