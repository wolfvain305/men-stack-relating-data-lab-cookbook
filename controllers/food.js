
const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

/*
Action	Route	HTTP Verb
Index	‘/users/:userId/foods’	GET
New	‘/users/:userId/foods/new’	GET
Create	‘/users/:userId/foods’	POST
Show	‘/users/:userId/foods/:itemId’	GET
Edit	‘/users/:userId/foods/:itemId/edit’	GET
Update	‘/users/:userId/foods/:itemId’	PUT
Delete	‘/users/:userId/foods/:itemId’	DELETE
*/


module.exports = router;
