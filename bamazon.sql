DROP DATABASE products_db;
CREATE DATABASE products_db;

/* this is how i connect to a database*/
USE products_db;

CREATE TABLE products_db
(
    item_id INT NOT NULL
    AUTO_INCREMENT,
    product_name VARCHAR
    (255), 
    department_name VARCHAR
    (255),
    price FLOAT,
    stock_quantity INT,
    PRIMARY KEY
    (item_id) /* if you don't do line 11, you get an error */
);

    INSERT INTO products_db
        (product_name, department_name, price, stock_quantity)
    VALUES
        ('Thing 1', 'group A', 1.50, 0),
        ('Thing 2', 'group A', 2.22, 10),
        ('Thing 3', 'group A', 3.33, 20),
        ('Item 1', 'group B', 4.50, 30),
        ('Item 2', 'group B', 5.55, 40),
        ('Whatchamajig 1', 'group C', 6.74, 50),
        ('Whatchamajig 2', 'group C', 7.00, 60),
        ('Whatchamajig 3', 'group C', 8.64, 70),
        ('Whatchamajig 4', 'group C', 9.24, 80),
        ('Stuff 1', 'group D', 10.78, 90);

    SHOW TABLES;

    /*    DESCRIBE products_db;
*/
    /*    SHOW products_db;
*/

    SELECT *
    FROM products_db;

    /*SELECT *
    FROM department_name;

    SELECT *
    FROM price;
*/