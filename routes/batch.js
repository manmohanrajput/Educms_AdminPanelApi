import express from 'express';
const Router = express.Router();
import pool from '../config/config.js';
import jsdom from "jsdom";
const { JSDOM } = jsdom;
import config from '../config.js';
import query from '../utils/query.js';
import { isAuth } from '../utils/authsup.js';

Router.post('/batch', isAuth, async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
        }
        else {
            const instHash = req.body.inst_hash;
            const sql = `SELECT * from web_batch_management WHERE inst_hash="${instHash}" AND status = 1`;
            const result = await query(sql, conn);
            if (result.length > 0) {
                res.send(result);
            }
            else {
                res.send({ result: "No result found" });
            }
            //   poolconnection.releaseConnection(conn);
        }
    })
})


Router.post('/addbatch', isAuth, async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
        }
        else {

            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = yyyy + '-' + mm + '-.' + dd;
            global.document = new JSDOM(today).window.document;

            const instHash = req.body.inst_hash;
            const batch_names = req.body.batch_name;
            const batch_times = req.body.batch_time;
            const batch_subjects = req.body.batch_subject;
            const batch_date = req.body.batch_date;
            const sql = `INSERT INTO web_batch_management (inst_hash, batch_date, batch_name, batch_time, batch_subject)
              VALUES ('${instHash}' ,  '${batch_date}','${batch_names}', '${batch_times}', '${batch_subjects}')`;
            const result = await query(sql, conn);
            if (result) {
                res.send({ result: 'Added' });
            }
            else {
                res.send({ result: "Something went wrong" });
            }
            //   poolconnection.releaseConnection(conn);
        }
    })
})

Router.post('/updatebatch', isAuth, async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
        }
        else {

            const batch_id = req.body.batch_id;
            const batch_names = req.body.batch_name;
            const batch_times = req.body.batch_time;
            const batch_subjects = req.body.batch_subject;
            const batch_date = req.body.batch_date;
            const sql = `UPDATE web_batch_management SET batch_name="${batch_names}", batch_time="${batch_times}", batch_subject="${batch_subjects}", batch_date="${batch_date}" WHERE batch_id=${batch_id}`
            const result = await query(sql, conn);
            if (result) {
                res.send({ result: "Successfully updated" });
            }
            else {
                res.send({ result: "Something went wrong" });
            }
            //   poolconnection.releaseConnection(conn);
        }
    })
})

Router.post('/delbatch', isAuth, async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
        }
        else {
            const batch_id = req.body.batch_id;
            console.log(batch_id);
            const sql = `Update web_batch_management SET status = 0 WHERE batch_id=${batch_id}`;
            const result = await query(sql, conn);

            if (result) {
                res.send({ result: "successfully deleted" });
            }
            else {
                res.send({ result: "Something went wrong" });
            }
            // poolconnection.releaseConnection(conn);
        }
    })
})




export default Router;