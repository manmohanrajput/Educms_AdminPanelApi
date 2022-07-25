import express from 'express';
const Router = express.Router();
import pool from '../config/config.js';
import config from '../config.js';
import  query from '../utils/query.js';
import {isAuth} from '../utils/authsup.js';
import { defaultMaxListeners } from 'events';

//web_domain
Router.post('/domain',async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              var instHash = req.body.inst_hash;
              var sql = `SELECT domain_name from web_domain_details WHERE inst_hash="${instHash}"`;
              var result = await query(sql, conn);
              if(result.length>0){
                  res.send(result);
              }
              else{
                  res.send({result:"no such domain exists"});
              }
            //   poolconnection.releaseConnection(conn);
          }
    })
})

export default Router;