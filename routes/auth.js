import express from 'express';
const Router = express.Router();
import mysql from 'mysql';
import poolconnection from '../config/config.js';
import config from '../config.js';
import  query from '../utils/query.js';

const poolconnection2 = mysql.createPool({
  connectionLimit :10,
  host: '162.214.80.49',
  user: 'qjzcohmy_vasudha',
  password: 'NO*2mJ=fEx2I',
  database :'qjzcohmy_educms',
  waitForConnections :true,
  queueLimit :0
});

function parseJwt (token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};



  Router.get('/institueDetials', async(req,res)=>{
    poolconnection2.getConnection(async (err, conn) => {
      if (err) {
          console.log(err);
          res.status(500).send('Server Error');
        } 
        else{
          const token = req.headers.authorization;
          const payadDecode= parseJwt(token);
          const ids = payadDecode.id;
          const instHash = req.body.inst_hash;
          console.log(ids);
            const sql = `SELECT * from institute_details where id = "${ids}"`;
            const result = await query(sql, conn);
            if(result){
                res.send(result);
            }
            else{
                res.send({result:"Something went wrong"});
            }
            // poolconnection.releaseConnection(conn);
        }
  })
});


Router.post('/addauth',async (req, res) => {
  poolconnection2.getConnection(async (err, conn) => {
      if (err) {
          console.log(err);
          res.status(500).send('Server Error');
        } 
        else{
          const id = req.body.id;
            const instHash = req.body.inst_hash;
            const name = req.body.name;
            const description= req.body.description;
            const zip_code= req.body.zip_code;
            const address= req.body.address;
            
            const sql = `INSERT INTO institute_details (id,inst_hash,name,description,zip_code,address)
            VALUES ('${id}','${instHash}','${name}','${description}','${zip_code}','${address}')`;
            const result = await query(sql, conn);
            if(result){
                res.send({result:"success"});
            }
            else{
                res.send({result:"Something went wrong"});
            }
            // poolconnection.releaseConnection(conn);
        }
  })
})
export default Router;