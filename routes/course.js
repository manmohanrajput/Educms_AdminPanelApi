import express from 'express';
const Router = express.Router();
import pool from '../config/config.js';
import config from '../config.js';
import query from '../utils/query.js';
import { isAuth } from '../utils/authsup.js';

//GET
Router.post('/course', isAuth, async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
        }
        else {
            var instHash = req.body.inst_hash;
            var sql = `SELECT * from web_course WHERE inst_hash="${instHash}"`;
            var result = await query(sql, conn);
            if (result) {
                res.send({ result });
            }
            else {
                res.send({ result: "Something went wrong" });
            }
            //   poolconnection.releaseConnection(conn);
        }
    })
})

Router.post('/seqnum', async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
        }
        else {
            const instHash = req.body.inst_hash;

            var sql2 = `SELECT MAX(course_sequence) AS courseSequence FROM web_course WHERE inst_hash="${instHash}"`;
            var result1 = await query(sql2, conn);
            console.log(result1[0]);
            if (result1) {
                res.send({ result: result1[0].courseSequence });
            }
            else {
                res.send({ result: "Something went wrong" });
            }
            poolconnection.releaseConnection(conn);
        }
    })
})
//POST
Router.post('/addcourse', isAuth, async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
        }
        else {
            const instHash = req.body.inst_hash;
            const name = req.body.course_name;
            const course_details = req.body.course_detail;
            const courseKeyBenefitv = req.body.course_key_benefits;
            const courseEligibility = req.body.course_eligibility;
            const courseOverview = req.body.course_overview;
            const courseImageUrl = req.body.course_image;
            const topCourse = req.body.is_top_course;
            const course_slug = req.body.course_slug;
            var sql2 = `SELECT MAX(course_sequence) FROM web_course WHERE inst_hash="${instHash}"`;
            var result1 = await query(sql2, conn);
            var sql = `INSERT INTO web_course (inst_hash, course_name, course_detail, course_key_benefits, course_eligibility, course_overview,course_image,is_top_course,course_slug)
            VALUES ('${instHash}','${name}','${course_details}','${courseKeyBenefitv}','${courseEligibility}','${courseOverview}','${courseImageUrl}','${topCourse}','${course_slug}')`;
            // console.log(sql)
            var result = await query(sql, conn);
            if (result) {
                res.send({ result: "success" });
            }
            else {
                res.send({ result: "Something went wrong" });
            }
            //   poolconnection.releaseConnection(conn);
        }
    })
})
//POST
Router.post('/updatecourse', async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
        }
        else {
            var course_id = req.body.course_id;
            const instHash = req.body.inst_hash;
            var name = req.body.course_name;
            const course_details = req.body.course_detail;
            const courseKeyBenefitv = req.body.course_key_benefits;
            const courseEligibility = req.body.course_eligibility;
            const courseOverview = req.body.course_overview;
            const courseImageUrl = req.body.course_image;
            const topCourse = req.body.is_top_course;
            const course_slug = req.body.course_slug;
            

            var sql = `UPDATE web_course SET course_name="${name}",course_detail="${course_details}",course_key_benefits="${courseKeyBenefitv}",course_eligibility="${courseEligibility}",course_overview="${courseOverview}",course_image="${courseImageUrl}",is_top_course="${topCourse}",course_slug="${course_slug}" WHERE course_id=${course_id}`;
            var result = await query(sql, conn);
            if (result) {
                res.send({ result: "success" });
            }
            else {
                res.send({ result: "Something went wrong" });
            }
            //   poolconnection.releaseConnection(conn);
        }
    })
})
//POST
Router.post('/deletecourse', isAuth, async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
        }
        else {
            var course_id = req.body.course_id;
            const instHash = req.body.inst_hash;
            // var sql = `UPDATE web_course SET status = 0 WHERE course_id=${course_id}`;
            const sql = `UPDATE web_course SET inst_hash="del+${instHash}" WHERE course_id=${course_id}`;
            var result = await query(sql, conn);

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