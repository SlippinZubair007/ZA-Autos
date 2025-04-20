CREATE DATABASE ZAMotors
use ZAMotors
-- Users Table
CREATE TABLE CarUsers (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    user_fname VARCHAR(255) NOT NULL,
    user_lname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    contact_info VARCHAR(12),
    dob DATE,
    address VARCHAR(255),
    cnic VARCHAR(15) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

-- Car Brands Table
CREATE TABLE CarBrand (
    brand_id INT IDENTITY(1,1) PRIMARY KEY,
    brand_name VARCHAR(255) NOT NULL UNIQUE,
    country VARCHAR(100),
    established_year INT,
    created_at DATETIME DEFAULT GETDATE()
);

-- Cars Table
CREATE TABLE Cars (
    car_id INT IDENTITY(1,1) PRIMARY KEY,
    brand_id INT FOREIGN KEY REFERENCES CarBrand(brand_id) ON DELETE CASCADE,
    model VARCHAR(255) NOT NULL,
    year INT CHECK (year >= 1886),
    price DECIMAL(18,2) NOT NULL CHECK (price>=0),
    mileage INT,
    fuel_type VARCHAR(50),
    transmission VARCHAR(50),
    body_type VARCHAR(50),
    color VARCHAR(50),
    available VARCHAR(1) DEFAULT 1,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

-- Car Features Table
CREATE TABLE CarFeatures (
    feature_id INT IDENTITY(1,1) PRIMARY KEY,
    car_id INT FOREIGN KEY REFERENCES Cars(car_id) ON DELETE CASCADE,
    feature_name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT GETDATE()
);

-- Reviews Table
CREATE TABLE Reviews (
    review_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT FOREIGN KEY REFERENCES CarUsers(user_id) ON DELETE CASCADE,
    car_id INT FOREIGN KEY REFERENCES Cars(car_id) ON DELETE CASCADE,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT,
    created_at DATETIME DEFAULT GETDATE()
);

-- Inquiries Table
CREATE TABLE Inquiries (
    inquiry_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT FOREIGN KEY REFERENCES CarUsers(user_id) ON DELETE CASCADE,
    car_id INT FOREIGN KEY REFERENCES Cars(car_id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    response TEXT,
    status VARCHAR(50) DEFAULT 'Pending',
    created_at DATETIME DEFAULT GETDATE()
);

-- Transactions Table
CREATE TABLE Transactions (
    transaction_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT FOREIGN KEY REFERENCES CarUsers(user_id) ON DELETE CASCADE,
    car_id INT FOREIGN KEY REFERENCES Cars(car_id) ON DELETE CASCADE,
    total_amount DECIMAL(18,2) NOT NULL ,
    payment_method VARCHAR(50) NOT NULL,
    transaction_date DATETIME DEFAULT GETDATE(),
    status VARCHAR(50) DEFAULT 'Pending'
);

-- User Preferences Table
CREATE TABLE UserPreferences (
    preference_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT FOREIGN KEY REFERENCES CarUsers(user_id) ON DELETE CASCADE,
    preferred_brand VARCHAR(255),
    preferred_model VARCHAR(255),
    preferred_fuel_type VARCHAR(50),
    preferred_body_type VARCHAR(50),
    budget_range DECIMAL(18,2)
);

-- Workers Table
CREATE TABLE Workers (
    worker_id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100) NOT NULL,
    contact_info VARCHAR(12),
    email VARCHAR(255) UNIQUE NOT NULL,
    salary DECIMAL(18,2) CHECK (salary>=0),
    hired_date DATE,
    created_at DATETIME DEFAULT GETDATE()
);

-- Search History Table
CREATE TABLE SearchHistory (
    search_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT FOREIGN KEY REFERENCES CarUsers(user_id) ON DELETE CASCADE,
    search_query TEXT NOT NULL,
    searched_at DATETIME DEFAULT GETDATE()
);

-- Wishlist Table
CREATE TABLE Wishlist (
    wishlist_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT FOREIGN KEY REFERENCES CarUsers(user_id) ON DELETE CASCADE,
    car_id INT FOREIGN KEY REFERENCES Cars(car_id) ON DELETE CASCADE,
    added_at DATETIME DEFAULT GETDATE()
);

INSERT INTO CarUsers (user_fname, user_lname, email, contact_info, dob, address, cnic, password_hash, created_at, updated_at) VALUES ('John', 'Doe', 'john.doe@example.com', '1234567890', '1985-06-15', '123 Main St, City, Country', '12345-6789012-3', 'hashedpassword123', GETDATE(), GETDATE());
INSERT INTO CarUsers (user_fname, user_lname, email, contact_info, dob, address, cnic, password_hash, created_at, updated_at) VALUES('Jane', 'Smith', 'jane.smith@example.com', '0987654321', '1990-11-20', '456 Elm St, City, Country', '98765-4321098-7', 'hashedpassword456', GETDATE(), GETDATE());

INSERT INTO CarBrand ( brand_name, country, established_year, created_at) VALUES ( 'Toyota', 'Japan', 1937, GETDATE());
INSERT INTO CarBrand ( brand_name, country, established_year, created_at) VALUES ( 'Ford', 'USA', 1903, GETDATE());



INSERT INTO Cars (brand_id, model, year, price, mileage, fuel_type, transmission, body_type, color, available, created_at, updated_at)
VALUES (1, 'Porsche', 2020, 20000.00, 15000, 'Petrol', 'Automatic', 'Sports', 'Black', '1', GETDATE(), GETDATE());
INSERT INTO Cars ( brand_id,model, year, price, mileage, fuel_type, transmission, body_type, color, available, created_at, updated_at)
VALUES ( 2,'Mclaren', 2021, 35000.00, 5000, 'Petrol', 'Manual', 'Sports', 'Black', '1', GETDATE(), GETDATE());

INSERT INTO CarFeatures ( car_id,feature_name, description, created_at) VALUES ( 1,'Sunroof', 'Electric sunroof with tilt and slide function.', GETDATE());
INSERT INTO CarFeatures ( car_id,feature_name, description, created_at) VALUES (2,'Leather Seats', 'Premium leather upholstery for extra comfort.', GETDATE());

INSERT INTO Reviews ( user_id,car_id,rating, review_text, created_at) VALUES ( 1, 1, 5, 'Excellent car! Comfortable and fuel-efficient.', GETDATE());
INSERT INTO Reviews (  user_id,car_id,rating, review_text, created_at) VALUES ( 2, 2, 4, 'Great performance but a bit expensive.', GETDATE());

INSERT INTO Inquiries ( user_id, car_id, message, response, status, created_at) VALUES ( 1, 1, 'Is there any ongoing discount on this model?', '', 'Pending', GETDATE());
INSERT INTO Inquiries ( user_id, car_id, message, response, status, created_at) VALUES ( 2, 2, 'Can I schedule a test drive?', '', 'Pending', GETDATE());

INSERT INTO Transactions (user_id,car_id, total_amount, payment_method, transaction_date, status) VALUES ( 1, 1, 20000.00, 'Credit Card', GETDATE(), 'Completed');
INSERT INTO Transactions ( user_id, car_id, total_amount, payment_method, transaction_date, status) VALUES ( 2, 2, 35000.00, 'Debit Card', GETDATE(), 'Pending');

INSERT INTO UserPreferences ( user_id, preferred_brand, preferred_model, preferred_fuel_type, preferred_body_type, budget_range) 
VALUES ( 1, 'Toyota', 'Corolla', 'Petrol', 'Sedan', 25000.00);
INSERT INTO UserPreferences ( user_id, preferred_brand, preferred_model, preferred_fuel_type, preferred_body_type, budget_range) 
VALUES ( 2, 'Ford', 'Mustang', 'Petrol', 'Coupe', 40000.00);

INSERT INTO Workers ( name, role, contact_info, email, salary, hired_date, created_at) 
VALUES ( 'Alice Johnson', 'Sales Manager', '3216549870', 'alice.johnson@example.com', 60000.00, '2022-04-10', GETDATE());
INSERT INTO Workers ( name, role, contact_info, email, salary, hired_date, created_at) 
VALUES ( 'Bob Brown', 'Mechanic', '9876543210', 'bob.brown@example.com', 45000.00, '2021-08-23', GETDATE());

INSERT INTO SearchHistory ( user_id, search_query, searched_at) 
VALUES ( 1, 'Toyota Corolla 2020', GETDATE());
INSERT INTO SearchHistory (user_id, search_query, searched_at) 
VALUES ( 2, 'Ford Mustang 2021', GETDATE());

INSERT INTO Wishlist ( user_id, car_id, added_at) 
VALUES ( 1, 1, GETDATE());
INSERT INTO Wishlist ( user_id, car_id, added_at) 
VALUES ( 2, 2, GETDATE());


DROP TABLE CarUsers
DROP TABLE CarBrand 
DROP TABLE Cars 
DROP TABLE CarFeatures 
DROP TABLE Reviews
DROP TABLE Inquiries 
DROP TABLE Transactions
DROP TABLE UserPreferences
DROP TABLE Workers
DROP TABLE SearchHistory
DROP TABLE Wishlist
--DROP DATABASE ZAMotors

SELECT * FROM CarUsers
SELECT * FROM CarBrand
SELECT * FROM Cars
SELECT * FROM CarFeatures
SELECT * FROM Reviews 
SELECT * FROM Inquiries 
SELECT * FROM Transactions
SELECT * FROM UserPreferences
SELECT * FROM Workers
SELECT * FROM SearchHistory
SELECT * FROM Wishlist



----------------------------------------------HEHE?-----------------NOT HEHE!----------------------------------------------------
--user registration aka signup
CREATE PROCEDURE RegisterUser
    @user_fname VARCHAR(255),
    @user_lname VARCHAR(255),
    @email VARCHAR(255),
    @contact_info VARCHAR(12),
    @dob DATE,
    @address VARCHAR(255),
    @cnic VARCHAR(15),
    @password_hash VARCHAR(255)
AS
BEGIN
    IF EXISTS (SELECT 1 FROM CarUsers WHERE email = @email OR cnic = @cnic)
    BEGIN
        PRINT 'Error: User already exists with this email or CNIC.';
        RETURN;
    END

    INSERT INTO CarUsers (user_fname, user_lname, email, contact_info, dob, address, cnic, password_hash, created_at, updated_at)
    VALUES (@user_fname, @user_lname, @email, @contact_info, @dob, @address, @cnic, @password_hash, GETDATE(), GETDATE());

    PRINT 'User registered successfully';
END;

EXEC RegisterUser 'Zubair','Khan','detroitzubairkhan@gmail.com','03044767165','2004-07-14','Iqbal Town','3520201010','ZAuto1'
EXEC  RegisterUser 'Amna','Rehan','amnarehan@gmail.com','03475875868','2004-12-27','Model Town','3520201011','ZAuto2'

SELECT * FROM CarUsers

--login validation
CREATE PROCEDURE ValidateUserLogin
    @email VARCHAR(255),
    @password_hash VARCHAR(255)
AS
BEGIN
    IF EXISTS (SELECT 1 FROM CarUsers WHERE email = @email AND password_hash = @password_hash)
	    BEGIN 
        SELECT 'Login Successful' AS Message;
		END
    ELSE
	     BEGIN
        SELECT 'Invalid Credentials' AS Message;
		END 
END;
DROP PROCEDURE ValidateUserLogin
EXEC ValidateUserLogin 'amnarehan@gmail.com', 'ZAuto2';
EXEC ValidateUserLogin 'amnarehan@gmail.com', 'ZAuto0';


--search history
CREATE PROCEDURE LogSearch
    @user_id INT,
    @search_query TEXT
AS
BEGIN
    INSERT INTO SearchHistory (user_id, search_query, searched_at)
    VALUES (@user_id, @search_query, GETDATE());
END;
DROP PROCEDURE LogSearch
EXEC LogSearch 1,'Porshe 911 GT3'
EXEC LogSearch 2,'Mclaren 765LT'
SELECT * FROM SearchHistory 

--review submission procedure
CREATE PROCEDURE SubmitReview
    @user_id INT,
    @car_id INT,
    @rating INT,
    @review_text TEXT
AS
BEGIN
    INSERT INTO Reviews (user_id,car_id, rating, review_text, created_at)
    VALUES (@user_id, @car_id, @rating, @review_text, GETDATE());
END;
DROP PROCEDURE SubmitReview
EXEC SubmitReview 2,2,'5','Very demure'
EXEC SubmitReview 1,1,'4','Mclaren better fr'
SELECT * FROM Reviews



--inquires handling(submit & respond)
CREATE PROCEDURE ValidateReview
    @user_id INT,
    @car_id INT,
    @rating INT,
    @review_text TEXT
AS
BEGIN
    IF EXISTS (SELECT 1 FROM Reviews WHERE (user_id = @user_id AND car_id = @car_id))
    BEGIN
        PRINT 'Error: You have already reviewed this car.';
        RETURN;
    END

    INSERT INTO Reviews (user_id, car_id, rating, review_text, created_at)
    VALUES (@user_id, @car_id, @rating, @review_text, GETDATE());
END;
SELECT * FROM Reviews
TRUNCATE Table Reviews
EXEC ValidateReview 2,2,'5','More Demure'


CREATE PROCEDURE RespondToInquiry
    @inquiry_id INT,
    @response TEXT
AS
BEGIN
    UPDATE Inquiries
    SET response = @response, status = 'Responded'
    WHERE inquiry_id = @inquiry_id;
END;
SELECT * FROM Inquiries
EXEC RespondToInquiry 1,'No discounts currently.'
EXEC RespondToInquiry 2,'Yes'

--car filtering
CREATE PROCEDURE GetFilteredCars
    @brand_name VARCHAR(255) = NULL,
    @min_price DECIMAL(18,2) = NULL,
    @max_price DECIMAL(18,2) = NULL,
    @fuel_type VARCHAR(50) = NULL,
    @transmission VARCHAR(50) = NULL,
	@year INT =NULL
AS
BEGIN
    SELECT c.car_id, cb.brand_name, c.model, c.year, c.price, c.fuel_type, c.transmission
    FROM Cars c
    JOIN CarBrand cb ON c.brand_id = cb.brand_id
    WHERE (@brand_name IS NULL OR cb.brand_name = @brand_name)
    AND (@min_price IS NULL OR c.price >= @min_price)
    AND (@max_price IS NULL OR c.price <= @max_price)
    AND (@fuel_type IS NULL OR c.fuel_type = @fuel_type)
    AND (@transmission IS NULL OR c.transmission = @transmission)
	AND (@year IS NULL OR c.year =@year);
END;

EXEC GetFilteredCars 'Toyota'
DROP PROCEDURE GetFilteredCars

--wishlist;-;
CREATE PROCEDURE ManageWishlist
    @user_id INT,
    @car_id INT,
    @action VARCHAR(10) -- 'ADD' or 'REMOVE'
AS
BEGIN
    IF @action = 'ADD'
    BEGIN
        IF EXISTS (SELECT 1 FROM Wishlist WHERE user_id = @user_id AND car_id = @car_id)
        BEGIN
            PRINT 'Car is already in the wishlist.';
            RETURN;
        END

        INSERT INTO Wishlist (user_id, car_id, added_at)
        VALUES (@user_id, @car_id, GETDATE());
    END
    ELSE IF @action = 'REMOVE'
    BEGIN
        DELETE FROM Wishlist WHERE user_id = @user_id AND car_id = @car_id;
    END;
END;
EXEC ManageWishList 1,1,'ADD'
EXEC ManageWishlist 2,2 , 'REMOVE'

--update user profile
CREATE PROCEDURE UpdateUserProfile
    @user_id INT,
    @contact_info VARCHAR(12),
    @address VARCHAR(255)
AS
BEGIN
    UPDATE CarUsers
    SET contact_info = @contact_info, address = @address, updated_at = GETDATE()
    WHERE user_id = @user_id;
END;
EXEC UpdateUserProfile 2,'0304477165','Iqbal Town'
--transaction process
CREATE PROCEDURE ProcessTransaction
    @user_id INT,
    @car_id INT,
    @total_amount DECIMAL(18,2),
    @payment_method VARCHAR(50)
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Cars WHERE car_id = @car_id AND available = '1')
    BEGIN
        PRINT 'Error: This car is no longer available.';
        RETURN;
    END

    INSERT INTO Transactions (user_id, car_id, total_amount, payment_method, transaction_date, status)
    VALUES (@user_id, @car_id, @total_amount, @payment_method, GETDATE(), 'Completed');

    UPDATE Cars
    SET available = '0' 
    WHERE car_id = @car_id;
END;
EXEC ProcessTransaction 1,1,200000,'Card'

	--available cars
	CREATE VIEW AvailableCars AS
	SELECT c.car_id, cb.brand_name, c.model, c.year, c.price, c.fuel_type, c.transmission
	FROM Cars c
	JOIN CarBrand cb ON c.brand_id = cb.brand_id
	WHERE c.available = '1';
	
	SELECT * FROM AvailableCars

--top rated cars
CREATE VIEW TopRatedCars AS
SELECT c.car_id, cb.brand_name, c.model, c.year, AVG(r.rating) AS average_rating
FROM Cars c
JOIN CarBrand cb ON c.brand_id = cb.brand_id
JOIN Reviews r ON c.car_id = r.car_id
GROUP BY c.car_id, cb.brand_name, c.model, c.year
HAVING AVG(r.rating) >= 4;

SELECT * FROM TopRatedCars

--view for user wishlist
CREATE VIEW UserWishlist AS
SELECT w.user_id, u.user_fname, u.user_lname, c.car_id, cb.brand_name, c.model, c.price
FROM Wishlist w
JOIN CarUsers u ON w.user_id = u.user_id
JOIN Cars c ON w.car_id = c.car_id
JOIN CarBrand cb ON c.brand_id = cb.brand_id;
SELECT * FROM UserWishlist

--cars within a range
SELECT car_id, brand_id, model, year, price
FROM Cars
WHERE price BETWEEN 15000 AND 30000;


--cars of a specified brand
SELECT c.car_id, cb.brand_name, c.model, c.year, c.price
FROM Cars c
JOIN CarBrand cb ON c.brand_id = cb.brand_id
WHERE cb.brand_name = 'Toyota';

--gets users wishlist
SELECT w.wishlist_id, u.user_fname, u.user_lname, c.model, c.price
FROM Wishlist w
JOIN CarUsers u ON w.user_id = u.user_id
JOIN Cars c ON w.car_id = c.car_id
WHERE u.user_id = 1;

--retrieve transactions of a specifieduser
SELECT t.transaction_id, u.user_fname, u.user_lname, c.model, t.total_amount, t.payment_method, t.transaction_date, t.status
FROM Transactions t
JOIN CarUsers u ON t.user_id = u.user_id
JOIN Cars c ON t.car_id = c.car_id
WHERE u.user_id = 1;

--retrieve reviews and ratings of a car
SELECT car_id, AVG(rating) AS average_rating, COUNT(*) AS total_reviews
FROM Reviews
WHERE car_id = 1
GROUP BY car_id;

--retrieve workers and their roles
SELECT worker_id, name, role, salary
FROM Workers;

DELETE FROM CarUsers
WHERE user_id=3


CREATE PROCEDURE DeleteUserAccount
    @email NVARCHAR(255),
    @password_hash NVARCHAR(255)
AS
BEGIN
    -- Check if the user exists and if the password matches
    IF EXISTS (SELECT 1 FROM CarUsers WHERE email = @email AND password_hash = @password_hash)
    BEGIN
        -- Delete the user account
        DELETE FROM CarUsers WHERE email = @email;

        PRINT 'Account successfully deleted.';
    END
    ELSE
    BEGIN
        PRINT 'Incorrect email or password.';
    END
END;


