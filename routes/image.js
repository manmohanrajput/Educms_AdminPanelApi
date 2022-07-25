import express from 'express';
const Router = express.Router();
import pool from '../config/config.js';
import config from '../config.js';
import  query from '../utils/query.js';
import {isAuth} from '../utils/authsup.js';


// GET
Router.post('/image', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const instHash = req.body.inst_hash;
              const sql = `SELECT * from web_image WHERE inst_hash="${instHash}"`;
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

//POST METHOD
Router.post('/addimage', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const instHash = req.body.inst_hash;
              const title = req.body.image_title;
              const url = req.body.image;
              const sql = `INSERT INTO web_image (inst_hash, image_title,image)
              VALUES ('${instHash}' , '${title}','${url}')`;
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
//POST METHOD
Router.post('/updateimage', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const image_id = req.body.image_id;
              const title = req.body.image_title;
              const image = req.body.image;
              const sql = `UPDATE web_image SET image_title="${title}",image="${image}" WHERE image_id=${image_id}`;
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
Router.post('/deleteimage', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const image_id = req.body.image_id;
              const instHash = req.body.inst_hash;
            //   console.log(image_id);
              const sql = `UPDATE web_image SET  inst_hash="del+${instHash}" WHERE image_id=${image_id}`;
            //  const sql = `DELETE FROM web_image WHERE image_id=${image_id}`;
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