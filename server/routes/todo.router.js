const express = require("express");
const taskRouter = express.Router();

const pool = require("../module/pool");


// GET
taskRouter.get('/', (req, res) => {
    // SQL query
    let queryText = 'SELECT * FROM "tasks" ORDER BY "id";';
    // sending SQL query to database
    pool.query(queryText)
    // make that promise
    .then( result => {
        // send the results in an object
        res.send(result.rows);
    })
    .catch( error => {
        console.log('Error getting tasks', error);
        // Send back server error
        res.sendStatus(500);
    });
});
// END GET

// POST
taskRouter.post('/',  (req, res) => {
    let newTask = req.body;
    console.log(`Adding Task`, newTask);
  
    let queryText = `INSERT INTO "tasks" ("task")
                     VALUES ($1);`;
                     console.log([newTask.task])
    pool.query(queryText, [newTask.task])
      .then(result => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.log(`Error adding the Task :`, error);
        res.sendStatus(500);
      });
  });
//   END POST


module.exports = taskRouter;
