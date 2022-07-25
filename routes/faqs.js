import express from 'express';
const Router = express.Router();
import pool from '../config/config.js';
import config from '../config.js';
import  query from '../utils/query.js';
import {isAuth} from '../utils/authsup.js';


Router.post('/faqs', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const instHash = req.body.inst_hash;
              const sql = `SELECT * from faq WHERE inst_hash="${instHash}" AND status =1`;
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


Router.post('/addfaqs', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const instHash = req.body.inst_hash;
              const categories = req.body.category;
              const sequence_nos = req.body.sequence_no;
              const questions = req.body.question;
              const answers = req.body.answer;
              const helpfuls = req.body.helpful;
              const sql = `INSERT INTO faq (inst_hash, category, sequence_no, question, answer, helpful)
              VALUES ('${instHash}' , '${categories}', '${sequence_nos}', '${questions}', '${answers}', '${helpfuls}')`;
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

Router.post('/updatefaqs', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
            const faq_id = req.body.id;
            const categories = req.body.category;
            const sequence_nos = req.body.sequence_no;
            const questions = req.body.question;
            const answers = req.body.answer;
            const helpfuls = req.body.helpful;
              const sql = `UPDATE faq SET category="${categories}", sequence_no="${sequence_nos}", question="${questions}", answer="${answers}", helpful="${helpfuls}" WHERE id=${faq_id}`
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

Router.post('/delfaqs', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const faq_id = req.body.id;
              console.log(faq_id);
              const sql = `UPDATE faq SET status = 0 WHERE id=${faq_id}`;
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