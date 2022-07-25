import express from 'express';
const Router = express.Router();
import pool from '../config/config.js';
import config from '../config.js';
import  query from '../utils/query.js';
import {isAuth} from '../utils/authsup.js';

Router.post('/imagePop', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const instHash = req.body.inst_hash;
              const sql = `SELECT * from image_popup WHERE inst_hash="${instHash}" AND status = 1`;
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

Router.post('/addimagePop', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const instHash = req.body.inst_hash;
              const titles = req.body.title;
              const contents = req.body.content;
              const urls = req.body.url;
              const expiry_dates = req.body.expiry_date;
              const sql = `INSERT INTO image_popup (inst_hash, title, content, url, expiry_date)
              VALUES ('${instHash}' , '${titles}', '${contents}', '${urls}', '${expiry_dates}')`;
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

Router.post('/updateimagePop', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const image_id = req.body.id;
              const titles = req.body.title;
              const images = req.body.url;
              const contents = req.body.content;
              const expiry_dates = req.body.expiry_date;
              const sql = `UPDATE image_popup SET title="${titles}", url="${images}", content="${contents}", expiry_date="${expiry_dates}" WHERE id=${image_id}`
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

Router.post('/deleteimagePop', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
            const instHash = req.body.inst_hash;
              const image_id = req.body.id;
              console.log(image_id);
              const sql = `UPDATE image_popup SET  inst_hash="del+${instHash}" WHERE id=${image_id}`;
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