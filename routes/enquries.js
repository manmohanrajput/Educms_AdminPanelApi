import express from 'express';
const Router = express.Router();
import pool from '../config/config.js';
import config from '../config.js';
import  query from '../utils/query.js';
import {isAuth} from '../utils/authsup.js';
import nodemailer from 'nodemailer';
import mandrillTransport from 'nodemailer-mandrill-transport';

var smtpTransport = nodemailer.createTransport(mandrillTransport({
    auth: {
      apiKey : 'bAV03zWPNHiodhkVXNkhLQ'
    }
}));


Router.post('/enquries', isAuth, async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const instHash = req.body.inst_hash;
              const sql = `SELECT * from web_enquiry WHERE inst_hash="${instHash}"`;
              const result = await query(sql, conn);
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

//POST METHOD
Router.post('/mailSend', isAuth,async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
          } 
          else{
              const instHash =  req.body.inst_hash;
              const toEmail = req.body.toEmail;
              const subject = req.body.subject;
              const massage = req.body.massage;
              const name = req.body.name;
              let mailOptions={
                from : 'noreply@educationalemail.com',
                to : toEmail,
                subject : subject,
                html : "Hello,<br>"+massage+"<br> Thanks and Regards <br>"+ name
             };
             const sql = `UPDATE web_enquiry SET replied="yes" WHERE  inst_hash="${instHash}" `;
             const result = await query(sql, conn);
             smtpTransport.sendMail(mailOptions, function(error, response){
                if(error) {
                   throw new Error("Error in sending email");
                }
                res.send({Message: JSON.stringify(response)});
              });
              // poolconnection.releaseConnection(conn);
            }
    })
})


//Delete
export default Router;