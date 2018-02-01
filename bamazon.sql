DROP DATABASE IF EXISTS bamazonDB;

CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ('Bose SoundLink Bluetooth Speaker', 'Electronics', 350, 3);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ('Powerbeats3 Wireless Earphones', 'Electronics', 130, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ('Canon EOS Rebel SL1 Digital SLR', 'Electronics', 900, 8);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ('Artemis', 'Books', 16, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ('Atlas Shrugged', 'Books', 10, 55);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ('Circulon Teakettle', 'Household', 32, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ('J.A. Henckels Classic Chef Knife', 'Household', 44, 45);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ('Nike Running Shorts', 'Clothing', 28, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ('Under Armour Tank Top', 'Clothing', 17, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ('Cat Tree Activity Tower', 'Pets', 85, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ('SmartyKat Organic Catnip', 'Pets', 5, 40);

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  overhead_cost DECIMAL(10,2) NOT NULL,
  total_sales DECIMAL(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY(department_id)
);

INSERT INTO departments( department_name, overhead_cost)
VALUES('Electronics', 200);
INSERT INTO departments( department_name, overhead_cost)
VALUES('Books', 200);
INSERT INTO departments( department_name, overhead_cost)
VALUES('Household', 200);
INSERT INTO departments( department_name, overhead_cost)
VALUES('Clothing', 200);
INSERT INTO departments( department_name, overhead_cost)
VALUES('Pets', 200);

