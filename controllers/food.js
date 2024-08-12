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
router.get('/new', async (req , res) => {
    res.render('foods/new')
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
    res.redirect('/foods');
    } catch (error) {
        console.error('Error adding new food item:', err);
    res.redirect('/');
    }
})
// Create End


// Show	‘/users/:userId/foods/:itemId’	GET
// Edit	‘/users/:userId/foods/:itemId/edit’	GET

router.get('/:itemId/edit', async (req, res) => {
    try {
      // Ensure the user is authenticated
      if (!req.session || !req.session.user) {
        return res.redirect('/login');
      }
  
      const user = req.session.user;
      const itemId = req.params.itemId;
      const userFromDb = await User.findById(user._id).exec();
  
      if (!userFromDb) {
        return res.redirect('/login');
      }
      const foodItem = userFromDb.pantry.id(itemId);
  
      if (!foodItem) {
        return res.redirect('/foods');
      }

      res.locals.foodItem = foodItem;

      res.render('foods/edit');
    } catch (err) {
      console.error('Error fetching food item for editing:', err);
      res.redirect('/');
    }
  });

// Edit End
// Update	‘/users/:userId/foods/:itemId’	PUT
// Delete 
router.delete('/:itemId', async (req, res) => {
    try {
        if (!req.session || !req.session.user) {
            return res.redirect('/login');
        }
        const user = req.session.user;
        const itemId = req.params.itemId;
        const userFromDb = await User.findById(user._id).exec();
    
        if (!userFromDb) {
          return res.redirect('/login'); 
        }
        userFromDb.pantry.id(itemId).remove();
        await userFromDb.save();
        res.redirect('/foods');
    } catch (error) {
        console.error('Error deleting food item:', err);
    res.redirect('/');
    }
})
// Delete End


module.exports = router;
