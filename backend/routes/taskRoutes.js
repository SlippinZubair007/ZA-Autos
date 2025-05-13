const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { body, validationResult } = require('express-validator');

router.get('/Car', taskController.getAllCars);
router.get('/CarBrands', taskController.getAllBrands);
router.get('/CarFeatures', taskController.getAllFeatures);
router.get('/CarUsers', taskController.getAllUsers);
router.get('/CarInquiries', taskController.getAllInquiries);
router.get('/CarReviews', taskController.getAllReviews);
router.get('/CarHistory', taskController.getAllHistory);
router.get('/Transactions', taskController.getAllTransaction);
router.get('/UserPreferences', taskController.getAllPreferences);
router.get('/Wishlist', taskController.getAllWishlist);
router.get('/Workers', taskController.getAllWorkers);
router.get('/getAvailableCars', taskController.AvailableCars);
router.get('/TopRated', taskController.TopRatedCars);
router.get('/UserWishlist', taskController.UserWishlist);


  router.post('/add',
    [
      body('model').notEmpty().withMessage('Model is required'),
      body('price').isNumeric().withMessage('Price must be a number'),
      body('brand_id').isInt().withMessage('Brand ID must be an integer'),
      body('year').isInt({ min: 1886 }).withMessage('Year must be a valid number after 1886'),
      body('image').notEmpty().withMessage('Image URL is required'),
      body('color').notEmpty().withMessage('Color is required'),
      body('fuel_type').notEmpty().withMessage('Fuel type is required'),
      body('mileage').isNumeric().withMessage('Mileage must be a number'),
      body('transmission').notEmpty().withMessage('Transmission type is required'),
      body('body_type').notEmpty().withMessage('Body type is required'),
    ],
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("Validation Errors:", errors.array());
        return res.status(400).json({ errors: errors.array() });
      }
      console.log("Validation Passed, Data:", req.body);
      next();
    },
    taskController.createCar 
  );

router.post('/Register',
    [
      body('user_fname').notEmpty().withMessage('First Name is required'),
      body('user_lname').notEmpty().withMessage('Last Name is required'),
      body('email').isEmail().withMessage('Invalid email format'),
      body('contact_info').notEmpty().withMessage('Phone is required'),
      body('password_hash').isLength({ min: 8 }).withMessage('Password should be at least 8 characters'),
      body('dob').optional().isDate().withMessage('Invalid date format'),
      body('address').optional(),
      body('cnic').optional(),
    ],
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("Validation Errors:", errors.array());
        return res.status(400).json({ errors: errors.array() });
      }
      console.log("Validation Passed, Data:", req.body);
      next();
    },
    taskController.RegisterUser
  );

  
router.post('/Login',
  [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password_hash').isLength({ min: 6 }).withMessage('Password should be at least 6 characters'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation Errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("Validation Passed, Data:", req.body);
    next();
  },
  taskController.validateUserLogin
);

router.post('/Update',
  [
    body('user_id').notEmpty().withMessage('User ID is required'),
    body('contact_info').optional().isString().withMessage('Phone is required'),
    body('address').optional().isString().withMessage('Address is required'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation Errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("Validation Passed, Data:", req.body);
    next();
  },
  taskController.UpdateUserProfile
);

router.post('/Log',
  [
    body('user_id').notEmpty().withMessage('User ID is required'),
    body('search_query').notEmpty().withMessage('Search query is required'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation Errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("Validation Passed, Data:", req.body);
    next();
  },
  taskController.LogSearch
);  

router.post('/review',
  [
    body('user_id').notEmpty().withMessage('User ID is required'),
    body('car_id').notEmpty().withMessage('Car ID is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('review_text').optional().isString().withMessage('Review text must be a string'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation Errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("Validation Passed, Data:", req.body);
    next();
  },
  taskController.SubmitReview
)

router.post('/ValidateReview',
  [
    body('user_id').notEmpty().withMessage('User ID is required'),
    body('car_id').notEmpty().withMessage('Car ID is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('review_text').optional().isString().withMessage('Review text must be a string'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation Errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("Validation Passed, Data:", req.body);
    next();
  },
  taskController.ValidateReview
)   

router.post('/Inquiry',
  [
    body('inquiry_id').notEmpty().withMessage('Inquiry ID is required'),
    body('inquiry_text').optional().isString().withMessage('Inquiry text must be a string'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation Errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("Validation Passed, Data:", req.body);
    next();
  },
  taskController.RespondToInquiry
)

router.post('/GetFilteredCars',
  [
    body('brand_name').optional().isString().withMessage('Brand name must be a string'),
    body('min_price').optional().isNumeric().withMessage('Minimum price must be a number'),
    body('max_price').optional().isNumeric().withMessage('Maximum price must be a number'),
    body('fuel_type').optional().isString().withMessage('Fuel type must be a string'),
    body('transmission').optional().isString().withMessage('Transmission type must be a string'),
    body('year').optional().isInt().withMessage('Year must be an integer'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation Errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("Validation Passed, Data:", req.body);
    next();
  },
  taskController.GetFilteredCars
)

  router.post('/ManageWishlist',
    [
      body('user_id').notEmpty().withMessage('User ID is required'),
      body('car_id').notEmpty().withMessage('Car ID is required'),
      body('action').isIn(['add', 'remove']).withMessage('Action must be either "add" or "remove"'),
    ],
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("Validation Errors:", errors.array());
        return res.status(400).json({ errors: errors.array() });
      }
      console.log("Validation Passed, Data:", req.body);
      next();
    },
    taskController.ManageWishlist
  )

  router.post('/ProcessTransaction',
    [
      body('user_id').notEmpty().withMessage('User ID is required'),
      body('car_id').notEmpty().withMessage('Car ID is required'),
      body('payment_method').isIn(['card', 'cash']).withMessage('Transaction type must be either "buy" or "sell"'),
      body('total_amount').isNumeric().withMessage('Amount must be a number'),
    ],
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("Validation Errors:", errors.array());
        return res.status(400).json({ errors: errors.array() });
      }
      console.log("Validation Passed, Data:", req.body);
      next();
    },
    taskController.ProcessTransaction
  )

  router.post('/DeleteAccount',
    [
      body('password_hash').isLength({ min: 6 }).withMessage('Password should be at least 6 characters'),
      body('email').isEmail().withMessage('Invalid email format'),
    ],
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("Validation Errors:", errors.array());
        return res.status(400).json({ errors: errors.array() });
      }
      console.log("Validation Passed, Data:", req.body);
      next();
    },
    taskController.DeleteUserAccount
  )
  
router.post('/GetRating',
  [
    body('car_id').notEmpty().withMessage('Car ID is required'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation Errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("Validation Passed, Data:", req.body);
    next();
  },
  taskController.GetCarReviews
)

router.post('/GetUserWishlist',
  [
    body('user_id').notEmpty().withMessage('User ID is required'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation Errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("Validation Passed, Data:", req.body);
    next();
  },
  taskController.GetUserWishlist
)

router.post('/CreateWish',
  [
    body('user_id').notEmpty().withMessage('User ID is required'),
    body('car_id').notEmpty().withMessage('Car ID is required'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation Errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("Validation Passed, Data:", req.body);
    next();
  },
  taskController.addToWishlist
)

router.post('/UpdateProfile',
  [
    body('user_id').notEmpty().withMessage('User ID is required'),
   body('user_fname').notEmpty().withMessage('First Name is required'),
   body('user_lname').notEmpty().withMessage('Last Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('contact_info').notEmpty().withMessage('Phone is required'),
    body('password_hash').isLength({ min: 8 }).withMessage('Password should be at least 8 characters'),
    body('address').optional(),
    body('contact_info').optional(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation Errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("Validation Passed, Data:", req.body);
    next();
  },
  taskController.UpdateUserProfile
)

router.post('/GetUserProfile',
  [
    body('user_id').notEmpty().withMessage('User ID is required'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation Errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("Validation Passed, Data:", req.body);
    next();
  },
  taskController.GetUserProfile
)

router.post('/Filter',
  [
   body('brand_id').optional().isInt().withMessage('Brand ID must be an integer'),
   body('min_price').optional().isNumeric().withMessage('Minimum price must be a number'),
   body('max_price').optional().isNumeric().withMessage('Maximum price must be a number'), 
   body('fuel_type').optional().isString().withMessage('Fuel type must be a string'),
   body('transmission').optional().isString().withMessage('Transmission type must be a string'),
   body('min_mileage').optional().isNumeric().withMessage('Minimum mileage must be a number'),
   body('max_mileage').optional().isNumeric().withMessage('Maximum mileage must be a number'),
   body('body_type').optional().isString().withMessage('Body type must be a string'),
   body('color').optional().isString().withMessage('Color must be a string'),
   body('year').optional().isInt({ min: 1886 }).withMessage('Year must be a valid number after 1886'),
   body('model').optional().isString().withMessage('Model must be a string')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation Errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("Validation Passed, Data:", req.body);
    next();
  },
  taskController.GetFilteredCarsAdvanced
)

module.exports = router;

