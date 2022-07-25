import express from 'express';
const Router = express.Router();
import pool from '../config/config.js';
import config from '../config.js';
import query from '../utils/query.js';
import { isAuth } from '../utils/authsup.js';

//post METHOD
Router.post('/basicQuestion', isAuth, async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
        }
        else {
            const instHash = req.body.inst_hash;
            const sql = `SELECT * from web_basic_question WHERE inst_hash="${instHash}"`;
            const result = await query(sql, conn);
            if (result) {
                res.send(result);
            }
            else {
                res.send({ result: "Something went wrong" });
            }
        }
    })
})

//POST METHOD
Router.post('/addbasicquestion', isAuth, async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
        }
        else {
            const instHash = req.body.inst_hash;
            const quesHash = req.body.ques_hash;
            const ques = req.body.question;
            const c_ans = req.body.correct_opt;
            const Category = req.body.ques_category;
            const Opt1 = req.body.opt_1;
            const option_1 = `<p>${Opt1}</p>`
            const Opt2 = req.body.opt_2;
            const option_2 = `<p>${Opt2}</p>`
            const Opt3 = req.body.opt_3;
            const option_3 = `<p>${Opt3}</p>`
            const Opt4 = req.body.opt_4;
            const option_4 = `<p>${Opt4}</p>`
            const sql = `INSERT INTO web_basic_question (inst_hash, ques_hash, question, correct_opt, ques_category, opt_1, opt_2, opt_3, opt_4)
              VALUES ('${instHash}' , '${quesHash}', '${ques}', '${c_ans}','${Category}', '${option_1}', '${option_2}', '${option_3}', '${option_4}')`;
            const result = await query(sql, conn);
            if (result) {
                res.send({ result: "success" });
            }
            else {
                res.send({ result: "Something went wrong" });
            }
            // poolconnection.releaseConnection(conn);
        }
    })
})

//POST METHOD
Router.post('/updatebasicquestion', isAuth, async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
        }
        else {
            const basic_question_id = req.body.id;
            const quesHash = req.body.ques_hash;
            const ques = req.body.question;
            const c_ans = req.body.correct_opt;
            const Category = req.body.ques_category;
            const Opt1 = req.body.opt_1;
            const option_1 = `<p>${Opt1}</p>`
            const Opt2 = req.body.opt_2;
            const option_2 = `<p>${Opt2}</p>`
            const Opt3 = req.body.opt_3;
            const option_3 = `<p>${Opt3}</p>`
            const Opt4 = req.body.opt_4;
            const option_4 = `<p>${Opt4}</p>`
            const sql = `UPDATE web_basic_question SET ques_hash="${quesHash}",question="${ques}",correct_opt="${c_ans}",ques_category="${Category}",opt_1="${option_1}",opt_2="${option_2}",opt_3="${option_3}",opt_4="${option_4}" WHERE id=${basic_question_id}`;

            const result = await query(sql, conn);
            if (result) {
                res.send({ result: "Updated" });
            }
            else {
                res.send({ result: "Something went wrong" });
            }
            // poolconnection.releaseConnection(conn);
        }
    })
})

//Delete

Router.post('/delbasicqsn', isAuth, async (req, res) => {
    pool.getConnection(async (err, conn) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
        }
        else {
            const ID = req.body.id;
            const instHash = req.body.inst_hash;
            console.log(ID);
            const sql = `UPDATE web_basic_question SET inst_hash="del+${instHash}" WHERE id=${ID}`; //const sql = "DELETE FROM web_basic_question WHERE id=${ID}";
            const result = await query(sql, conn);
            if (result) {
                res.send("successfully deleted");
            }
            else {
                res.send({ result: "Something went wrong" });
            }
            // poolconnection.releaseConnection(conn);
        }
    })
})
export default Router;