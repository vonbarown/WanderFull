DROP DATABASE IF EXISTS wanderfull_db;

CREATE DATABASE wanderfull_db;

\c wanderfull_db

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) UNIQUE,
    password VARCHAR(100),
    firstname VARCHAR, 
    lastname VARCHAR, 
    email VARCHAR UNIQUE
); 

CREATE TABLE posts (
    id SERIAL PRIMARY KEY, 
    user_id INT REFERENCES users(id), 
    img VARCHAR, 
    caption VARCHAR, 
    hashtag VARCHAR
);

CREATE TABLE likes (
    id SERIAL PRIMARY KEY, 
    liker_id INT REFERENCES users(id), 
    photo_id INT REFERENCES posts(id)
);

--- values for tables in db ---

INSERT INTO users (username, password, firstname, lastname, email) values
('test', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'Test', 'Me', 'test@test.com')
;

-- ('Suzette', 'Islam', 'suzetteislam@pursuit.org'),
-- ('Voniel', 'Brown', 'vonielbrown@pursuit.org'), 
-- ('Jenesh', 'Napit', 'jeneshnapit@pursuit.org'),
-- ('Briany', 'Taveras', 'brianytaveras@pursuit.org'),

-- INSERT INTO posts(user_id, img, caption, hashtag) values
-- (1, 'https://www.desktodirtbag.com/wp-content/uploads/2019/05/best-cartagena-beaches-playa-blanca-0003.jpeg', 'Bliss', '#cartagena #travelbug'),
-- (2, 'https://www.maremmaguide.com/image-files/maremma_restaurants_500.jpg', 'AUTHENTIC', '#italy'),
-- (3, 'https://3tsll33cscvk11pae33oze51-wpengine.netdna-ssl.com/wp-content/uploads/2018/01/tokyo-street-food-takoyaki.png', 'Japanese street food', '#japan'),
-- (4, 'https://i.ytimg.com/vi/y8hXqoK8LuI/maxresdefault.jpg', 'Kats Deli', '#LES #NewYork')
-- ;

-- INSERT INTO likes (liker_id, photo_id) values
-- (1, 2),
-- (1, 3),
-- (1, 4),
-- (2, 4),
-- (4, 1),
-- (3, 2),
-- (3, 4),
-- (4, 2)
-- ;