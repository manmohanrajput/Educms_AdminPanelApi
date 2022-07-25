import express from 'express';
const Router = express.Router();
import pool from '../config/config.js';
import config from '../config.js';
import  query from '../utils/query.js';
import {isAuth} from '../utils/authsup.js';
//GET
Router.post('/slider', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          }
          else{
              var instHash = req.body.inst_hash;
            //   var sql = `SELECT * from web_slider WHERE inst_hash="${instHash}" AND status = 1`;
              var sql = `SELECT * from web_slider WHERE inst_hash="${instHash}"`;

              var sql1 = `SELECT slider_order_no from web_slider WHERE inst_hash="${instHash}" AND status = 1`;
              var result = await query(sql, conn);
              var result1 = await query(sql1, conn);
              const arr = [];
              for (let index = 0; index < result1.length; index++) {
                  arr.push(result1[index].slider_order_no);
              }
              if(result){
                  console.log(arr);
                  res.send({response:result, orderNo:arr});
              }
              else{
                res.send({result:"Something went wrong"});
              }
          }
    })
})
//POST
Router.post('/addslider', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          }
          else{
            const instHash = req.body.inst_hash;
              const title = req.body.slider_title;
              const text = req.body.slider_text;
              const order_no = req.body.slider_order_no;
            const sliderImage = req.body.slider_image;
              const sql = `INSERT INTO web_slider (inst_hash, slider_title, slider_image, slider_text, slider_order_no)
              VALUES ('${instHash}','${title}' , '${sliderImage}', '${text}', '${order_no}')`;
              console.log(sql)
              var result = await query(sql, conn);
              if(result){
                  res.send({result:"success"});
              }
              else{
                  res.send({result:"Something went wrong"});
              }
            //   poolconnection.releaseConnection(conn);
          }
    })
})
// POST METHOD
Router.post('/updateslider', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          }
          else{
              const slider_id = req.body.slider_id;
              const title = req.body.slider_title;
              const text = req.body.slider_text;
              const order_no = req.body.slider_order_no;
              const sliderImage = req.body.slider_image;
              var sql = `UPDATE web_slider SET slider_title="${title}",slider_text="${text}",slider_order_no="${order_no}",slider_image="${sliderImage}" WHERE slider_id=${slider_id}`;
              var result = await query(sql, conn);
              if(result){
                  res.send({result:"success"});
              }
              else{
                  res.send({result:"Something went wrong"});
              }
            //   poolconnection.releaseConnection(conn);
          }
    })
})
//POST
Router.post('/delslider', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          }
          else{
              var slider_id = req.body.slider_id;
              var instHash = req.body.inst_hash;
            //   console.log(slider_id);
            //   var sql = `UPDATE web_slider SET status = 0 WHERE slider_id=${slider_id}`;
              var sql = `UPDATE web_slider SET  inst_hash="del+${instHash}" WHERE slider_id=${slider_id}`;

              var result = await query(sql, conn);
              if(result){
                  res.send({result:"Deleted"});
              }
              else{
                  res.send({result:"Something went wrong"});
              }
            //   poolconnection.releaseConnection(conn);
          }
    })
})
export default Router;