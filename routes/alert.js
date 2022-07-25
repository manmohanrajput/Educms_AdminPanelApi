import express from 'express';
const Router = express.Router();
import pool from '../config/config.js';
import config from '../config.js';
import  query from '../utils/query.js';
import {isAuth} from '../utils/authsup.js';
import { defaultMaxListeners } from 'events';
//GET METHOD
Router.post('/alert', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const instHash = req.body.inst_hash;
              const sql = `SELECT * from web_alert WHERE inst_hash="${instHash}" AND status=1 `;
              const result = await query(sql, conn);
              if(result){
                  res.send(result);
              }
              else{
                  res.send({result:"no such institute exist"});
              }
          }
    })
})

//POST METHOD
Router.post('/addalert', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
            const alert_id = req.body.alert_id;
              const instHash = req.body.inst_hash;
              const alerts = req.body.alert;
              const links = req.body.link;
              const sql = `INSERT INTO web_alert (alert_id,inst_hash, alert, link)
              VALUES ('${alert_id}','${instHash}' , '${alerts}', '${links}')`;
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

//POST METHOD
Router.post('/updatealert', isAuth, async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const alert_id = req.body.alert_id;
              const instHash = req.body.inst_hash;
              const alerts= req.body.alert;
              const links= req.body.link;
              const sql = `UPDATE web_alert SET alert="${alerts}",inst_hash="${instHash}", link="${links}" WHERE alert_id=${alert_id}`
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

//DEL METHOD
Router.post('/delalert', isAuth, async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const alert_id = req.body.alert_id;
              console.log(alert_id);
              const sql = `UPDATE web_alert SET status = 0  WHERE alert_id=${alert_id}`;
              const result = await query(sql, conn);
              
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