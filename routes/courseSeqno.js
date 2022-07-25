import express from 'express';
const Router = express.Router();
import pool from '../config/config.js';
import config from '../config.js';
import query from '../utils/query.js';
import { isAuth } from '../utils/authsup.js';

Router.post('/updatesqcourse', async (req, res) => {
    pool.getConnection(async (err, conn) => {

        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
        }
        else {
            var flags = 0;
            var course_id = req.body.course_id;
            var sequence = req.body.course_sequence;

            for(var i=0; i < course_id.length; i++){
                var sql = `UPDATE web_course SET course_sequence=${sequence[i]} WHERE course_id = ${course_id[i]}`;
                console.log(sql);
                 var result = await query(sql, conn);
                 if(i==course_id.length-1){
                    flags=1;
                 }
                 if (result){
                 console.log("success");
             } else {
                console.log("fail");
     
             }
             if(flags==1){
                res.send({result:"Success"});
             } 

            }

        }
    })
})

export default Router;












