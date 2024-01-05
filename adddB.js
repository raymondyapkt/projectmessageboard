

'use strict';
const express = require('express');
const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database('messageboard.db'); // Db


// `created_on` `bumped_on` `reported` `delete_password`, `replies` (array).
db.run(`CREATE TABLE IF NOT EXISTS messageboard (
       _id INTEGER PRIMARY KEY
      ,board TEXT   
      ,text TEXT   
      ,delete_password 
      ,created_on  
      ,bumped_on  
      ,reported 
      ,replies 

      )`); 



db.close();  // Close the database connection





/*
You can send a POST request to `/api/threads/{board}`
 with form data including `text` and `delete_password`. 
 The saved database record will have at least the fields 
 `_id`, 
 `text`, 
 `created_on`(date & time), 
 `bumped_on`(date & time, starts same as `created_on`), 
 `reported` (boolean), 
 `delete_password`, & 
 `replies` (array).


let sql = "SELECT ip,stock,like FROM liketable " 
+" WHERE ip IS '"+ipv4 
+"' AND stock IS '"+ stockU +"' ;" ;

db.all(sql, [], (err, rows) => {

if ( rows.length === 0 && like == 'true') {  // Insert data
  let insertQuery = `INSERT INTO liketable(ip,stock,like) VALUES (?,?,?)`;
      db.run(insertQuery, [ipv4,stockU,like], function (err) {
        if (err) {console.error(err.message);} 
        else {console.log(`Inserted data with id ${this.lastID}; `);}
      });
      }
});


db.run(`CREATE TABLE IF NOT EXISTS messageboard (
       id INTEGER PRIMARY KEY
      ,text TEXT   
      ,created_on DATETIME  
      ,bumped_on DATETIME  
      ,reported BOOLEAN
      ,delete_password TEXT
      ,replies TEXT

      )`); 

/*/