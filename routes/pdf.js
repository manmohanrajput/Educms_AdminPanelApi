import express from 'express';
const Router = express.Router();
import pool from '../config/config.js';
import config from '../config.js';
import  query from '../utils/query.js';
import {isAuth} from '../utils/authsup.js';
// const { link } = require('fs');
//GET
Router.post('/pdf', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          }
          else{
              const instHash = req.body.inst_hash;
              const sql = `SELECT * from web_downloads WHERE inst_hash="${instHash}" `;
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
//POST
Router.post('/addpdf',async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          }
          else{
            const instHash = req.body.inst_hash;
              const Name = req.body.name;
              const PDF_link = req.body.pdf_link;
              const pdfSubTitle = req.body.pdfsubtitle;
              const sql = `INSERT INTO web_downloads (inst_hash, title, sub_title, pdf_name)
              VALUES ('${instHash}', '${Name}', '${pdfSubTitle}', '${PDF_link}')`;
              console.log(sql)
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
Router.post('/updatepdf', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          }
          else{
              const ID = req.body.id;
              const Name = req.body.name;
              const PDF_link = req.body.pdf_link;
              const pdf_subtitle = req.body.pdfsubtitle;
              const sql = `UPDATE web_downloads SET title="${Name}", pdf_name="${PDF_link}" , sub_title="${pdf_subtitle}"  WHERE pdf_id=${ID}`;
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
Router.post('/delpdf', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          }
          else{
              const ID = req.body.id;
              const instHash = req.body.inst_hash;
              console.log(ID);
              const sql = `UPDATE web_downloads SET inst_hash="del+${instHash}" WHERE pdf_id=${ID}`;
              const result = await query(sql, conn);
              if(result){
                  res.send("successfully deleted");
              }
              else{
                  res.send({result:"Something went wrong"});
              }
            
          }
    })
})
export default Router;