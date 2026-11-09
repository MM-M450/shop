CREATE DATABASE IF NOT EXISTS shop_db CHARACTER SET utf8mb4;
USE shop_db;

DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  stock INT NOT NULL DEFAULT 0,
  category_id INT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

INSERT INTO categories (name) VALUES ('Компьютеры'), ('Аксессуары');

INSERT INTO products (title, price, stock, category_id) VALUES
('Ноутбук 15"', 85000, 10, 1),
('Монитор 27"', 28000, 5, 1),
('Клавиатура', 6500, 20, 2),
('Мышь беспроводная', 2500, 30, 2);

DROP USER IF EXISTS 'shop_app'@'localhost';
CREATE USER 'shop_app'@'localhost' IDENTIFIED BY 'ShopApp#2024';
GRANT SELECT, INSERT, UPDATE, DELETE ON shop_db.* TO 'shop_app'@'localhost';
SELECT p.id, p.title, p.price, c.name AS category
FROM products p
JOIN categories c ON c.id = p.category_id;

SELECT *
FROM products
WHERE price > 5000
ORDER BY price DESC;

SELECT category, COUNT(*) AS count_items 
FROM products 
GROUP BY category;

UPDATE products 
SET price = 90000 
WHERE id = 1;

SELECT * 
FROM products 
WHERE id = 1;

INSERT INTO products (title, price, category, stock) 
VALUES ('Коврик для мыши', 1500, 'Аксессуары', 50);

SELECT * 
FROM products;
