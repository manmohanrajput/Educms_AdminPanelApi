// const express  = require('express');
// const bodyParser =  require('body-parser');
// const cors = require('cors');
// const Router = express.Router();


// const pool = require('../config/config');
// // const { application } = require('express');

// // Router.use(cors);

// // Router.use(bodyParser.urlencoded({extended:true}));

// Router.post('/signin',(req,res)=>{

//     const sentEmail = req.body.email
//     const sentPassword = req.body.password
//     pool.getConnection((err, connection) => {
//         if(err) throw err
//         // connection.query('SELECT * from web_video', (err, rows) => {
//             connection.release() // return the connection to pool

//         //     if (!err) {
//         //         const result=rows
//                 res.send('Hello guys');
//         //     } else {
//         //         res.status(400).send(err)
//         //         console.log(err)
//         //     }
//         //     // console.log('The data from beer table are: \n', rows)
//         // })
//         // console.log('Hello World');
//     })
// })

// module.exports = Router;