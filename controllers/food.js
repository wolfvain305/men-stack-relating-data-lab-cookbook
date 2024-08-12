const express = require('express');
const router = express.Router();
const User = require('../models/user')

// Index 

router.get('/', async (req, res) => {
    try {
           if (!req.session || !req.session.user) {
        return res.redirect('/login'); 
      }
  
      const user = req.session.user;
      
          const userFromDb = await User.findById(user._id).exec();
  
      if (!userFromDb) {
              return res.redirect('/login'); 
      }
  
      res.locals.pantry = userFromDb.pantry;
  
      // Render the index view
      res.render('foods/index');
    } catch (err) {
      console.error('Error fetching pantry items:', err);
      res.redirect('/'); // Redirect to homepage on error
    }
  });

// Index End

// New
router.get('/new', async (req,res) => {
    res.render('foods/new.ejs')
})
// New End

// Create
router.post('/add', async (req, res) => {
    try {
        if (!req.session || !req.session.user) {
            return res.redirect('/login')
          }
    const user = req.session.user
    const newFood = req.body
    const userFromDb = await User.findById(user._id);

    if (!userFromDb) {
      return res.redirect('/login'); 
    }
    userFromDb.pantry.push(newFood);
    await userFromDb.save();
    } catch (error) {
        
    }
})
// Create End


// Show	‘/users/:userId/foods/:itemId’	GET
// Edit	‘/users/:userId/foods/:itemId/edit’	GET
// Update	‘/users/:userId/foods/:itemId’	PUT
// Delete	‘/users/:userId/foods/:itemId’	DELETE
router.delete
// 


module.exports = router;
