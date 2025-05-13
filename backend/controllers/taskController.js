const Task = require('../model/taskModel');

exports.getAllCars = async (req, res) => {
  try {
    const tasks = await Task.getAllCars();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getAllBrands = async (req, res) => {
  try {
    const tasks = await Task.getAllBrands();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllFeatures = async (req, res) => {
  try {
    const tasks = await Task.getAllFeatures();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const tasks = await Task.getAllUsers();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllInquiries = async (req, res) => {
  try {
    const tasks = await Task.getAllInquiries();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllCarReviews = async (req, res) => {
  try {
    const tasks = await Task.getAllCarReviews();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.getAllReviews = async (req, res) => {
  try {
    const tasks = await Task.getAllReviews();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllHistory = async (req, res) => {
  try {
    const tasks = await Task.getAllHistory();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllTransaction = async (req, res) => {
  try {
    const tasks = await Task.getAllTransaction();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllPreferences = async (req, res) => {
  try {
    const tasks = await Task.getAllPreferences();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllWishlist = async (req, res) => {
  try {
    const tasks = await Task.getAllWishlist();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllWorkers = async (req, res) => {
  try {
    const tasks = await Task.getAllWorkers();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.RegisterUser = async (req, res) => {
  console.log("RegisterUser controller called with data:", req.body);
  try {
    const { user_fname, user_lname, email, contact_info, dob, address, cnic, password_hash } = req.body;

    console.log("Parameters:", { user_fname, user_lname, email, contact_info, dob, address, cnic });
    
    const result = await Task.RegisterUser(user_fname, user_lname, email, contact_info, dob, address, cnic, password_hash);
    res.json(result);
  } catch (error) {
    console.error("Controller error in RegisterUser:", error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

exports.createCar = async (req, res) => {
  try {
    const { model, price, brand_id, year, image, mileage, fuel_type, transmission, color , body_type } = req.body;
    const result = await Task.createCar({model, price, brand_id, year, image, mileage, fuel_type, transmission, color , body_type});
    res.json(result);
  } catch (error) {
    console.error('Error in createCar controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.validateUserLogin = async (req, res) => {
  try {
    const { email, password_hash } = req.body;
    const result = await Task.validateUserLogin(email, password_hash);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.UpdateUserProfile = async (req, res) => {
  try {
    const { user_id, contact_info, address } = req.body;
    const result = await Task.UpdateUserProfile(user_id, contact_info, address);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.LogSearch=async(req, res) => {
  try {
    const { user_id, search_query } = req.body;
    const result = await Task.LogSearch(user_id, search_query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.SubmitReview=async(req, res) => {
  try {
    const { user_id, car_id, rating, review_text } = req.body;
    const result = await Task.SubmitReview(user_id, car_id,rating, review_text);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.ValidateReview=async(req, res) => { 
  try {
    const { user_id, car_id, rating, review_text } = req.body;
    const result = await Task.ValidateReview(user_id, car_id,rating, review_text);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.RespondToInquiry=async(req, res) => {
  try {
    const { inquiry_id, response } = req.body;
    const result = await Task.RespondToInquiry(inquiry_id, response);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.GetFilteredCars=async(req, res) => {
  try {
    const { brand_name, min_price, max_price, fuel_type,transmission,year } = req.body;
    const result = await Task.GetFilteredCars(brand_name, min_price, max_price, fuel_type,transmission,year);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

  exports.ManageWishlist=async(req, res) => { 
    try {
      const { user_id, car_id, action } = req.body;
      const result = await Task.ManageWishlist(user_id, car_id, action);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  exports.createCar = async (req, res) => {
    try {
      const { model, price, brand_id, year, image, mileage, fuel_type, transmission, color } = req.body;
  
      const result = await Task.createCar({
        model,
        price,
        brand_id,
        year,
        image,
        mileage,
        fuel_type,
        transmission,
        color
      });
  
      res.json(result);
    } catch (error) {
      console.error('Error in createCar controller:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  exports.ProcessTransaction=async(req, res) => { 
    try {
      const {user_id, car_id,total_amount, payment_method} = req.body;
      const result = await Task.ProcessTransaction(user_id, car_id,total_amount, payment_method);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  exports.AvailableCars = async (req, res) => {
    try {
      const cars = await Task.AvailableCars();
      res.status(200).json({ cars });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  exports.TopRatedCars= async (req, res) => {
    try {
      const cars = await Task.TopRatedCars();
      res.status(200).json({ cars });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  exports.UserWishlist= async (req, res) => {
    try {
      const result = await Task.UserWishlist();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  exports.DeleteUserAccount= async (req, res) => {
    try {
      const { email,password_hash } = req.body;
      const result = await Task.DeleteUserAccount(email,password_hash);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  exports.GetCarReviews= async (req, res) => {
    try {
      const { car_id } = req.body;
      const result = await Task.GetCarReviews(car_id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  exports.GetUserWishlist= async (req, res) => {
    try {
      const { user_id } = req.body;
      const result = await Task.GetUserWishlist(user_id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  exports.addToWishlist = async (req, res) => {
    try {
      const { user_id, car_id } = req.body;
      const result = await Task.addToWishlist(user_id, car_id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

exports.UpdateUserProfile = async (req, res) => {
  try {
    const { user_id,user_fname,user_lname,email,password_hash,address, contact_info } = req.body;
    const result = await Task.UpdateUserProfile(user_id,user_fname,user_lname,email,password_hash,address, contact_info);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.GetUserProfile = async (req, res) => {
  try {
    const { user_id } = req.body;
    const result = await Task.GetUserProfile(user_id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
} 

exports.GetFilteredCarsAdvanced=async (req, res) => {
  try {
    const { brand_id, model,min_price,max_price,fuel_type,transmission,min_mileage,max_mileage,body_type,color,year } = req.body;
    const result = await Task.GetFilteredCarsAdvanced(brand_id, model,min_price,max_price,fuel_type,transmission,min_mileage,max_mileage,body_type,color,year);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

 



