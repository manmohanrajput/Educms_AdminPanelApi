import express from 'express';
const Router = express.Router();
import pool from '../config/config.js';
import config from '../config.js';
import  query from '../utils/query.js';
import {isAuth} from '../utils/authsup.js';

//GET
Router.post('/package',async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const id = req.body.course_id;
              const sql = `SELECT * from web_course_package WHERE course_id=${id}`;
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
Router.post('/addpackage',async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const id = req.body.course_id;
              const date = req.body.course_start_date;
              const duration = req.body.course_duration;
              const price = req.body.course_price

              const sql = `INSERT INTO web_course_package (course_id, course_start_date,course_duration,course_price)
              VALUES (${id} , '${date}','${duration}','${price}')`;
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

//Add and Update packages...........

//POST METHOD
Router.post('/addupdatepackage',async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
            const id = req.body.course_id;
            const date = req.body.course_start_date;
            const duration = req.body.course_duration;
            const price = req.body.course_price
            var sql = `SELECT * from web_course_package WHERE course_id=${id}`;
            var result = await query(sql, conn);
            console.log(result.length);
            if (result.length==0) {
                const sql = `INSERT INTO web_course_package (course_id, course_start_date,course_duration, course_price)
                VALUES (${id} , '${date}', '${duration}', '${price}')`;
                var result = await query(sql, conn);
                res.send({ result: "Insert successfully" });
            } else {            
            var sql = `UPDATE web_course_package SET course_start_date="${date}", course_duration="${duration}",course_price="${price}" WHERE course_id=${id}`;
            var result = await query(sql, conn);
            res.send({ result: "update successfully" });  
            }
          }
    })
})



//POST METHOD
Router.post('/deletepackage',async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const id = req.body.course_id;
            const sql = `DELETE FROM web_course_package WHERE course_id=${id}`;
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