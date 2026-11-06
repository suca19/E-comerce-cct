-- Runs automatically ONLY when the MySQL volume is empty (first start).
-- To re-run it: docker compose down -v && docker compose up -d   (deletes all data!)

CREATE DATABASE IF NOT EXISTS E_commerce_cct;
USE E_commerce_cct;

-- Order matters: a table with a FOREIGN KEY must be created AFTER the table it points to.
--   users, products  (no foreign keys)  →  orders (→ users)  →  order_items (→ orders, products)

-- ---------------------------------------------------------------
-- Users: one row per registered account
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  UserIDs      INT          NOT NULL AUTO_INCREMENT,
  Name         VARCHAR(255) NOT NULL,
  Email        VARCHAR(255) NOT NULL UNIQUE,       -- one account per email
  PasswordHash VARCHAR(255) NOT NULL,              -- bcrypt hash, NEVER the real password
  CreatedAt    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (UserIDs)
);

-- ---------------------------------------------------------------
-- Products: the catalogue
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
  ProductID   INT           NOT NULL AUTO_INCREMENT,
  Name        VARCHAR(255)  NOT NULL,
  Description TEXT          NOT NULL,
  Price       DECIMAL(10,2) NOT NULL,
  ImageUrl    VARCHAR(255)  NOT NULL,
  PRIMARY KEY (ProductID)
);

-- ---------------------------------------------------------------
-- Orders: one row per checkout (one user → many orders)
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
  OrderID   INT           NOT NULL AUTO_INCREMENT,
  UserID    INT           NOT NULL,
  Total     DECIMAL(10,2) NOT NULL,
  CreatedAt TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (OrderID),
  FOREIGN KEY (UserID) REFERENCES users(UserIDs)
);

-- ---------------------------------------------------------------
-- Order items: the products inside each order (one order → many items)
-- Price is copied here at checkout time, so old orders keep the price
-- the customer actually paid, even if the product price changes later.
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS order_items (
  OrderItemID INT           NOT NULL AUTO_INCREMENT,
  OrderID     INT           NOT NULL,
  ProductID   INT           NOT NULL,
  Quantity    INT           NOT NULL,
  Price       DECIMAL(10,2) NOT NULL,              -- price per unit at time of purchase
  PRIMARY KEY (OrderItemID),
  FOREIGN KEY (OrderID)   REFERENCES orders(OrderID),
  FOREIGN KEY (ProductID) REFERENCES products(ProductID)
);

-- ---------------------------------------------------------------
-- Starting products (theme: tech accessories; change them if you like)
-- ---------------------------------------------------------------
INSERT INTO products (Name, Description, Price, ImageUrl) VALUES
  ('Wireless Headphones',   'Over-ear Bluetooth headphones with noise cancellation and 30-hour battery life.', 89.99, 'images/headphones.jpg'),
  ('Mechanical Keyboard',   'Compact 75% keyboard with hot-swappable switches and RGB backlight.',             74.50, 'images/keyboard.jpg'),
  ('Wireless Mouse',        'Ergonomic silent-click mouse with adjustable DPI and USB-C charging.',            29.99, 'images/mouse.jpg'),
  ('USB-C Hub',             '7-in-1 hub with HDMI 4K, SD card reader, 3 USB-A ports and 100W power delivery.', 39.95, 'images/usb-hub.jpg'),
  ('Laptop Stand',          'Adjustable aluminium stand that raises your screen to eye level.',                34.00, 'images/laptop-stand.jpg'),
  ('Portable Charger',      '20,000 mAh power bank with fast charging for phones and tablets.',                45.00, 'images/power-bank.jpg'),
  ('HD Webcam',             '1080p webcam with built-in microphone and privacy cover.',                        54.99, 'images/webcam.jpg'),
  ('Desk Mat',              'Large water-resistant desk mat with stitched edges, 90 x 40 cm.',                 19.99, 'images/desk-mat.jpg');
