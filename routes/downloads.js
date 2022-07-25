import express from 'express';
const Router = express.Router();
import pool from '../config/config.js';
import config from '../config.js';
import  query from '../utils/query.js';
import {isAuth} from '../utils/authsup.js';

Router.post('/downloads', isAuth, async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              var instHash = req.body.inst_hash;
              var sql = `SELECT * from web_downloads WHERE inst_hash="${instHash}"`;
              var result = await query(sql, conn);
              if(result){
                  res.send(result);
              }
              else{
                  res.send("Something went wrong");
              }
            //   poolconnection.releaseConnection(conn);
          }
    })
})



export default Router;