//require database, import data base connection from '../models/roomiesModels' page  //! ask josh later
// const db = require('../models/roomiesModels');
//create a roomiesController object to export multiple controller functions at once
const roomiesController = {};
//const pool = require('../models/roomiesModels')
import pool from '../models/roomiesModels.js';
//create async functions for createUser, createChore, assignChore, viewChore
//testing data

roomiesController.createUser = async (req, res, next) => {
  //validate data to make sure no missing data
  const { username, email } = req.body;
  console.log(
    ` this is the name and email info from query: [${username}, ${email}]`
  );
  if (!username || !email) {
    return res
      .status(400)
      .json({ error: 'Missing data in user form. Please try again.' });
  }

  //QUERY TIME
  // //use a try catch block to catch any querying errors + log specific errors
  try {
    //     console.log("Trying to query database to create user....")
    const result = await pool.query(
      `INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *`,
      [username, email]
    );
    console.log('this is result.rows', result.rows[0]);

    res.locals.newUser = result.rows[0];

    return next();
  } catch (err) {
    console.error('This is the error: ', err);
    return next({
      log: 'Error in createUser query in roomiesControllers',
      status: 400,
    });
  }
};

roomiesController.deleteUser = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'User ID is not defined.' });
  }

  const deleteQuery = 'DELETE FROM users WHERE id = $1 RETURNING *;';

  try {
    const result = await pool.query(deleteQuery, [id]);
    console.log('this is result.rows', result.rows[0]);

    res.locals.deletedUser = result.rows[0];
    next();
  } catch (err) {
    {
      console.error('This is the error:', err);
      return next({
        log: 'Error in roomiesController.deleteUser query.',
        status: 400,
        message: { err: 'An error occured.' },
      });
    }
  }
};

roomiesController.getUsers = async (req, res, next) => {
  const getUsersQuery = 'SELECT * FROM users';
  try {
    const result = await pool.query(getUsersQuery);
    res.locals.users = result.rows;
    // console.log("Row 1 is: ", result.rows[0]);
    // console.log("Row 2 is: ", result.rows[1]);
    // console.log ("All Results: ", res.locals.users);
    return next();
  } catch (err) {
    console.error('This is the error: ', err);
    next({
      log: 'Error in roomiesController.getUsers.',
      status: 400,
      message: 'An error occured.',
    });
  }
};

roomiesController.createChore = async (req, res, next) => {
  //check if chore already exists
  const { task_name, type } = req.body;

  if (!task_name || !type) {
    return res.status(400).json({ error: 'Missing task_name or type' });
  }
  const createChoreQuery =
    'INSERT INTO chores (task_name, type) VALUES ($1, $2) RETURNING *';
  try {
    console.log('we have entered the createChoremiddleWare');
    const result = await pool.query(createChoreQuery, [task_name, type]);
    res.locals.newChore = result.rows[0];

    console.log('This is res.locals.newChore: ', res.locals.newChore);
    return next();
  } catch (err) {
    console.log('woops we shoulnt be here');
    console.error('This is the error: ', err);
    next({
      log: 'An error occured in the roomiesController.createChore middleware.',
      status: 400,
      message: 'An error occured.',
    });
  }
};

roomiesController.assignChore = async (req, res, next) => {
  const { userId, choreId } = req.body; //! TB WITH JEREMY ABOUT CHORE ASSIGNMENT FUNCTION

  const assignChoreQuery =
    'UPDATE chores SET assigned_to = $1 WHERE id =  $2 RETURNING *';

  try {
    const result = await pool.query(assignChoreQuery, [userId, choreId]);
    //!check if the chore data is actually on rows[0]
    res.locals.assignedChore = result.rows[0];
    return next();
  } catch (err) {
    console.error('This is the error: ', err);
    next({
      log: 'Error in the roomiesController.assignChore middleware',
      status: 400,
      message: 'An error occured.',
    });
  }
};

roomiesController.deleteChore = async (req, res, next) => {
  //get chore id from request params
  const { id } = req.params;

  console.log(id);

  if (!id) {
    return res.status(400).json({ error: 'Chore ID is not defined.' });
  }

  const deleteChoreQuery = 'DELETE FROM chores WHERE id = $1 RETURNING *';

  try {
    const result = await pool.query(deleteChoreQuery, [id]);
    console.log('This is result.rows[0] ', result.rows[0]);

    res.locals.deletedChore = result.rows[0];
    return next();
  } catch (err) {
    console.error('This is the error: ', err);
    next({
      log: 'An error occured in deleteChore middleware in roomiesController.',
      status: 400,
      message: 'An error occured.',
    });
  }
};

roomiesController.getChores = async (req, res, next) => {
  const getChoresQuery = 'SELECT * FROM chores';
  try {
    const result = await pool.query(getChoresQuery);
    res.locals.chores = result.rows;
    return next();
  } catch (err) {
    return next({
      log: 'An error occured in the getChores middleware function',
      status: 400,
      message: 'An error occured.',
    });
  }
};

//! don't forget to export!!
export default roomiesController;
