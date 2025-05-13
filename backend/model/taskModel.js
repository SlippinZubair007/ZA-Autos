const { sql, poolPromise } = require('../config/db');


const Task = {
  async getAllCars() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Cars');
    return result.recordset;
  },
  async getAllBrands() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM CarBrand');
    return result.recordset;
  },
  
  async getAllFeatures() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM CarFeatures');
    return result.recordset;
  },
  async getAllUsers() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM CarUsers');
    return result.recordset;
  },
  async getAllInquiries() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Inquiries');
    return result.recordset;
  },
  async getAllReviews() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Reviews');
    return result.recordset;
  },
  async getAllHistory() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM SearchHistory');
    return result.recordset;
  },
  async getAllTransaction() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Transactions');
    return result.recordset;
  },
  async getAllPreferences() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM UserPreferences');
    return result.recordset;
  },
  async getAllWishlist() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Wishlist');
    return result.recordset;
  },
  async getAllWorkers() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Workers');
    return result.recordset;
  },



  async RegisterUser(user_fname, user_lname, email, contact_info, dob, address, cnic, password_hash) {
    try {
      const pool = await poolPromise;
      await pool.request()
        .input('user_fname', sql.VarChar, user_fname)
        .input('user_lname', sql.VarChar, user_lname)
        .input('email', sql.VarChar, email)
        .input('contact_info', sql.VarChar, contact_info)
        .input('dob', sql.Date, dob)
        .input('address', sql.VarChar, address)
        .input('cnic', sql.VarChar, cnic)
        .input('password_hash', sql.VarChar, password_hash)
        .execute('RegisterUser');  
      
      return { success: true, message: 'User registered successfully' };
    }
    catch(error) {
      console.error("Error executing stored procedure:", error);
      throw error; 
    }
  }, 
  async createCar({ model, price, brand_id, year, image, mileage, fuel_type, transmission, color,body_type }) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('model', sql.VarChar, model)
      .input('price', sql.Decimal(18, 2), price)
      .input('brand_id', sql.Int, brand_id)
      .input('year', sql.Int, year)
      .input('image', sql.VarChar, image)
      .input('mileage', sql.Int, mileage)
      .input('fuel_type', sql.VarChar, fuel_type)    
      .input('transmission', sql.VarChar, transmission)
      .input('color', sql.VarChar, color)
      .input('body_type', sql.VarChar, body_type)
      .execute('createCar');
    return { id: result.recordset[0].car_id };
  },
  
    async validateUserLogin(email, password_hash) {
    try{
    const pool = await poolPromise;
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .input('password_hash', sql.VarChar, password_hash)
      .execute('ValidateUserLogin'); 
      return result.recordset; 
  }
  catch (error) {
    console.error("Error executing stored procedure:", error);
    throw error; 
  }
},
  async UpdateUserProfile(user_id, contact_Info, address)  {
  try{
  const pool = await poolPromise;
  const result = await pool.request()
    .input('user_id', sql.Int, user_id)
    .input('contact_info', sql.VarChar, contact_Info)
    .input('address', sql.VarChar, address)
    .execute('UpdateUserProfile'); 
    return {success: true, message: 'User profile updated successfully'}; 
  }
  catch (error) {
    console.error("Error executing stored procedure:", error);
    throw error; 
  }
},

  async LogSearch(user_id, search_query)  {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('user_id', sql.Int, user_id)
    .input('search_query', sql.Text, search_query)
    .execute('LogSearch');
    return {success: true, message: 'Search logged successfully'}; 
},
  async SubmitReview(user_id, car_id, rating, review_text) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('user_id', sql.Int, user_id)
    .input('car_id', sql.Int, car_id)
    .input('rating', sql.Int, rating)
    .input('review_text', sql.Text, review_text)
    .execute('SubmitReview');
     return {success: true, message: 'Review submitted successfully'};
},
  async  ValidateReview(user_id, car_id, rating, review_text) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('user_id', sql.Int, user_id)
    .input('car_id', sql.Int, car_id)
    .input('rating', sql.Int, rating)
    .input('review_text', sql.Text, review_text)
    .execute('ValidateReview');
    if (result.rowsAffected[0] > 0) {
      return { success: true, message: 'Review validated successfully' };
    }
    else {
      return { success: false, message: 'Review validation failed' };
    }
},
  async RespondToInquiry(inquiry_id, response) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('inquiry_id', sql.Int, inquiry_id)
    .input('response', sql.Text, response)
    .execute('RespondToInquiry');
    if (result.rowsAffected[0] > 0) {
      return { success: true, message: 'Inquiry responded successfully' };
    }
    else {
      return { success: false, message: 'Inquiry response failed' };
    }
},
async GetFilteredCars(brand_name, min_price, max_price, fuel_type, transmission,year) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('brand_name', sql.VarChar, brand_name)
    .input('min_price', sql.Decimal(18, 2), min_price)
    .input('max_price', sql.Decimal(18, 2), max_price)
    .input('fuel_type', sql.VarChar, fuel_type)
    .input('transmission', sql.VarChar, transmission)
    .input('year', sql.Int, year)
    .execute('GetFilteredCars'); 
    if (result.rowsAffected[0] > 0) {
        console.log('Filtered cars retrieved successfully')
       return result.recordset; 
    }
    else {
      return { success: false, message: 'No cars found matching the criteria' };
    }
},
async ManageWishlist(user_id, car_id, action)  {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('user_id', sql.Int, user_id)
    .input('car_id', sql.Int, car_id)
    .input('action', sql.VarChar, action)
    .execute('ManageWishlist');
     if (result.rowsAffected[0] > 0) {
      return { success: true, message: 'Wishlist updated successfully' };
}
    else {
      return { success: false, message: 'Wishlist update failed' };
    }
},
 async  ProcessTransaction(user_id, car_id, total_amount, payment_method)  {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('user_id', sql.Int, user_id)
    .input('car_id', sql.Int, car_id)
    .input('total_amount', sql.Decimal(18, 2), total_amount)
    .input('payment_method', sql.VarChar, payment_method)
    .execute('ProcessTransaction');
     if (result.rowsAffected[0] > 0) {
      return { success: true, message: 'Transaction processed successfully' };  
}
  
      else {
        return { success: false, message: 'Transaction processing failed' };
      }
  },

   async AvailableCars()  {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query('SELECT * FROM AvailableCars');
      return result.recordset;
    } catch (err) {
      throw new Error('Error fetching available cars: ' + err.message);
    }
  },
    async  TopRatedCars()  {  
    try {
      const pool = await poolPromise;
      const result = await pool.request().query('SELECT * FROM TopRatedCars');
      return result.recordset;
    } catch (err) {
      throw new Error('Error fetching top-rated cars: ' + err.message);
    }
  }, 

    async UserWishlist() {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .query('SELECT * FROM UserWishlist');
      return result.recordset;
    } catch (err) {
      throw new Error('Error fetching user wishlist: ' + err.message);
    }
  },

  async DeleteUserAccount(email,password_hash){
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('email', sql.VarChar, email)
        .input('password_hash', sql.VarChar, password_hash)
        .execute('DeleteUserAccount');
      return { success: true, message: 'User account deleted successfully' };
    } catch (err) {
      throw new Error('Error deleting user account: ' + err.message);
    }
  },

async GetCarReviews(car_id) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('car_id', sql.Int, car_id)
      .execute('GetCarReviews');
    return result.recordset;
  } catch (err) {
    throw new Error('Error fetching car reviews: ' + err.message);
  }
},

async GetUserWishlist(user_id) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('user_id', sql.Int, user_id)
      .execute('GetUserWishlist');
    return result.recordset;
  } catch (err) {
    throw new Error('Error fetching user reviews: ' + err.message);
  }
},
async addToWishlist(user_id, car_id) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('user_id', sql.Int, user_id)
      .input('car_id', sql.Int, car_id)
      .execute('AddToWishlist');
    return { success: true, message: 'Car added to wishlist successfully' };
  } catch (err) {
    throw new Error('Error adding to wishlist: ' + err.message);
  }
  },
  async UpdateUserProfile(user_id,user_fname,user_lname,email,password_hash,address,contact_info) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('user_id', sql.Int, user_id)
        .input('user_fname', sql.VarChar, user_fname)
        .input('user_lname', sql.VarChar, user_lname)
        .input('email', sql.VarChar, email)
        .input('password_hash', sql.VarChar, password_hash)
        .input('address', sql.VarChar, address)
        .input('contact_info', sql.VarChar, contact_info)
        .execute('UpdateUserProfile');
      return { success: true, message: 'User profile updated successfully' };
    } catch (err) {
      throw new Error('Error updating user profile: ' + err.message);
    }
  },

 async GetUserProfile(user_id) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('user_id', sql.Int, user_id)
      .execute('GetUserProfile');
    return result.recordset[0]; 
  } catch (err) {
    throw new Error('Error fetching user profile: ' + err.message);
  }
},

async GetFilteredCarsAdvanced(brand_id, model,min_price,max_price,fuel_type,transmission,min_mileage,max_mileage,body_type,color,year) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('brand_id', sql.Int, brand_id)
      .input('model', sql.VarChar, model)
      .input('min_price', sql.Decimal(18, 2), min_price)
      .input('max_price', sql.Decimal(18, 2), max_price)
      .input('fuel_type', sql.VarChar, fuel_type)
      .input('transmission', sql.VarChar, transmission)
      .input('min_mileage', sql.Int, min_mileage)
      .input('max_mileage', sql.Int, max_mileage)
      .input('body_type', sql.VarChar, body_type)
      .input('color', sql.VarChar, color)
      .input('year', sql.Int, year)
      .execute('GetFilteredCarsAdvanced');
    return result.recordset;
  } catch (err) {
    throw new Error('Error filtering cars: ' + err.message);
  }
}
};

module.exports = Task;
