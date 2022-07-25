import express from 'express';
const Router = express.Router();
import pool from '../config/config.js';
import config from '../config.js';
import  query from '../utils/query.js';
import {isAuth} from '../utils/authsup.js';

 Router.post('/corefeature',async (req, res) => {
     pool.getConnection(async (err, conn) => {
         if (err) {
             console.log(err);
             res.status(500).send('Server Error');
           } 
           else{
               const instHash = req.body.inst_hash;
               const sql = `SELECT * from web_institute_config WHERE inst_hash="${instHash}"`;
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



// Update iframe
Router.post('/updateiframe',async(req,res) => {
    pool.getConnection(async (err,conn) => {
        if(err){
            console.log(err);
            res.status(500).send('Server Error');
        }
        else{
            const instHash = req.body.inst_hash;
            const iframe = req.body.inst_map_iframe;

            var sql = `SELECT * from web_institute_config WHERE inst_hash="${instHash}"`;
            var result = await query(sql, conn);
            console.log(result.length);
            if (result.length==0) {
                const sql = `INSERT INTO web_institute_config (inst_hash,inst_map_iframe)
                VALUES ('${instHash}' , '${iframe}')`;
                var result = await query(sql, conn);
                res.send({ result: "Insert successfully" });
            } else {            
            var sql = `UPDATE web_institute_config SET inst_map_iframe="${iframe}" WHERE inst_hash="${instHash}"`;
            var result = await query(sql, conn);
            res.send({ result: "update successfully" });  
            }
        }
    })
})

//********************************************************************************************************/
Router.post('/addupcorefeature', async (req, res) => {
    pool.getConnection(async (err, conn) => {

        if (err) {
            console.log(err);
            res.status(500).send('Server Error');

        }
        else {

           
            const instHash = req.body.inst_hash;
            const corefeature1 = req.body.core_feature1_heading;
            const icon1 = req.body.core_feature1_icon;
            const details1 = req.body.core_feature1_detail;
            const corefeature2 = req.body.core_feature2_heading;
            const icon2 = req.body.core_feature2_icon;
            const details2 = req.body.core_feature2_detail;
            const corefeature3 = req.body.core_feature3_heading;
            const icon3 = req.body.core_feature3_icon;
            const details3 = req.body.core_feature3_detail;
            const corefeature4 = req.body.core_feature4_heading;
            const icon4 = req.body.core_feature4_icon;
            const details4 = req.body.core_feature4_detail;

            var sql = `SELECT * from web_institute_config WHERE inst_hash="${instHash}"`;
            var result = await query(sql, conn);
            console.log(result.length);
            if (result.length==0) {
                const sql = `INSERT INTO web_institute_config (inst_hash, core_feature1_heading, core_feature1_icon, core_feature1_detail, core_feature2_heading, core_feature2_icon, core_feature2_detail, core_feature3_heading, core_feature3_icon, core_feature3_detail, core_feature4_heading, core_feature4_icon, core_feature4_detail)
                VALUES ('${instHash}' , '${corefeature1}', '${icon1}', '${details1}','${corefeature2}', '${icon2}', '${details2}','${corefeature3}', '${icon3}', '${details3}','${corefeature4}', '${icon4}', '${details4}')`;
                var result = await query(sql, conn);
                res.send({ result: "Insert successfully" });
            } else {            
            var sql = `UPDATE web_institute_config SET core_feature1_heading="${corefeature1}", core_feature1_icon="${icon1}",core_feature1_detail="${details1}",core_feature2_heading="${corefeature2}", core_feature2_icon="${icon2}",core_feature2_detail="${details2}",core_feature3_heading="${corefeature3}", core_feature3_icon="${icon3}",core_feature3_detail="${details3}",core_feature4_heading="${corefeature4}", core_feature4_icon="${icon4}",core_feature4_detail="${details4}" WHERE inst_hash="${instHash}"`;
            var result = await query(sql, conn);
            res.send({ result: "update successfully" });  
            }
        }
    })
})
export default Router;