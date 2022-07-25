import express from 'express';
const Router = express.Router();
import pool from '../config/config.js';
import config from '../config.js';
import  query from '../utils/query.js';
import {isAuth} from '../utils/authsup.js';

Router.post('/achievement', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const instHash = req.body.inst_hash;
              const sql = `SELECT * from achievement WHERE inst_hash="${instHash}"`;
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


Router.post('/addachievement', isAuth, async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const instHash = req.body.inst_hash;
              const images = req.body.image;
              const names = req.body.name;
              const classes = req.body.class;
              const marks = req.body.marks;
              const ranks = req.body.rank;
              const sessions = req.body.session;
              const total_mark = req.body.total_marks;
              const sql = `INSERT INTO achievement (inst_hash, image, name, class, marks, rank, session, total_marks)
              VALUES ('${instHash}' , '${images}', '${names}', '${classes}', '${marks}', '${ranks}', '${sessions}', '${total_mark}')`;
              const result = await query(sql, conn);
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

//Update Achievement
Router.post('/updateachievement',isAuth, async(req,res) => {
    pool.getConnection(async (err,conn) => {
        if(err){
            console.log(err);
            res.status(500).send('Server Error');
        }
        else{
            const ID = req.body.id;
            const names = req.body.name;
            const classes = req.body.class;
            const marks = req.body.marks;
            const ranks = req.body.rank;
            const sessions = req.body.session;
            const total_mark = req.body.total_marks;
            const sql = `UPDATE achievement SET name="${names}", class="${classes}",marks="${marks}",rank="${ranks}",session="${sessions}", total_marks="${total_mark}" WHERE id=${ID}`;
            const result = await query(sql, conn);
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

//Delete
Router.post('/delachievement',isAuth,async(req,res)=>{
    pool.getConnection(async(err,conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          }
          else{
            const ID = req.body.id;
            const instHash = req.body.inst_hash;
            const sql = `UPDATE achievement SET inst_hash="del+${instHash}" WHERE id=${ID}`;
            const result = await query(sql, conn);
              if(result){
                  res.send({result:"successfully deleted"});
              }
              else{
                  res.send({result:"Something went wrong"});
              }
            //   poolconnection.releaseConnection(conn);
          }
    })
})

export default Router;