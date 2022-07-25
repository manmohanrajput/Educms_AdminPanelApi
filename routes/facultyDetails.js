import express from 'express';
const Router = express.Router();
import pool from '../config/config.js';
import config from '../config.js';
import  query from '../utils/query.js';
import {isAuth} from '../utils/authsup.js';

Router.post('/facultyDetails', isAuth, async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');  
          } 
          else{
              const instHash = req.body.inst_hash;
              const sql = `SELECT * from web_faculty WHERE inst_hash="${instHash}"`;
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
Router.post('/addfacultyDetails', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
            const instHash = req.body.inst_hash;
              const name = req.body.faculty_name;
              const detail = req.body.faculty_detail;
              const url = req.body.faculty_image;
              const dept = req.body.faculty_dept
              const sql = `INSERT INTO web_faculty (inst_hash, faculty_name, faculty_detail,faculty_image,faculty_dept)
              VALUES ('${instHash}','${name}' , '${detail}','${url}','${dept}')`;
              console.log(sql)
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
Router.post('/updatefacultyDetails', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const faculty_id = req.body.faculty_id;
              const name = req.body.faculty_name;
              const detail = req.body.faculty_detail;
              const url = req.body.faculty_image;
              const dept = req.body.faculty_dept;
              const sql = `UPDATE web_faculty SET faculty_name="${name}", faculty_detail="${detail}",faculty_image="${url}",faculty_dept="${dept}"  WHERE faculty_id=${faculty_id}`;
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
Router.post('/deletefacultyDetails', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const faculty_id = req.body.faculty_id;
              const instHash = req.body.inst_hash;
              console.log(faculty_id);
              const sql = `UPDATE web_faculty SET inst_hash="del+${instHash}"  WHERE faculty_id=${faculty_id}`;
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