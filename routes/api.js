'use strict';

const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const sanitizeHtml = require('sanitize-html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = function (app) {
  
  app.route('/api/threads/:board')

  .post(function (req, res) {
    const board = req.body.board;
    const text = req.body.text; 
    const delete_password = req.body.delete_password;
    const date = new Date() // .toLocaleString('en-MY', { timeZone: 'Asia/Singapore' });
    console.log ( board , text , delete_password ,date)
    const db = new sqlite3.Database('messageboard.db');

    db.run(  `INSERT INTO messageboard 
      (board, text, delete_password, created_on, bumped_on, reported, replies)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [board, text, delete_password, date, date, false, []],
      function (err) {
        if (err) { console.error('Db err: ' + err);
                   return res.json({ err: 'Db err' });  }  
        return res.redirect('/b/' + board);
      }
    );
  })

		
  app.put('/api/threads/:board', (req, res) => {
    const board = req.params.board;
    const threadId = req.body.thread_id || req.body.report_id;
    const db = new sqlite3.Database('messageboard1.db');
    console.log ( board , threadId )
  
    if (!threadId) {return res.send('Thread ID is required');}
  
    const query = ` UPDATE messageboard SET reported = 1
                    WHERE board = ? AND id = ?`;
  
    db.run(query, [board, threadId], function (err) {
      if (err) { console.error('Database error: ' + err);
                 return res.json({ error: 'error' });}
  
      if (this.changes > 0) { return res.send('reported');} 
      else { return res.send('failure');}
    });

  });
  


  app.route('/api/replies/:board');

}; 



/*/

        db.run(
          `INSERT INTO messageboard (board, text, delete_password, created_on, bumped_on, reported, replies)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [board, text, delete_password, date, date, false, []],
          function (err) {
            if (err) { return res.json({ err: 'Db err' });
            }//   console.error('Db err: ' + err);  }

            return res.redirect('/b/' + board);
          }
        );




  .get(function (req, res) {
    var board = req.params.board;
    let limit = req.query.limit

    console.log ( board , limit) 
//    let limit = (req.query.limit !== undefined && req.query.limit !== '' ? parseInt(req.query.limit) : 10);

    db.all(
  `SELECT * FROM mbtbe
  WHERE board = ?
  ORDER BY bumped_on DESC
  LIMIT ?`,
  [board, limit],
  function (err, rows) {
    if (err) {console.error('Database error: ' + err);
      return res.json({ error: 'error' });}

    rows.forEach(function (row) {
      row.replycount = row.replies.length;

      if (row.replycount > 3) {
        row.replies = row.replies.slice(-3);
      }
    });

    return res.json(rows);
  }
);


/*/

 
 