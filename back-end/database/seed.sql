DROP DATABASE IF EXISTS wanderfull_db;

CREATE DATABASE wanderfull_db;

\c wanderfull_db

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) UNIQUE,
    password VARCHAR(100),
    firstname VARCHAR, 
    lastname VARCHAR, 
    email VARCHAR UNIQUE,
    profile_pic VARCHAR
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
('test', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'Test', 'Me', 'test@test.com'),
('Suzette', '3a6ac96d379e50d05016e511fcee24a556e969c6e036216c175ca2fc551b03cf', 'Suzette', 'Islam', 'suzetteislam@pursuit.org'),
('Voniel', '510c9a42be49b865d25b2e9902fe840daec19eb5eab6e63bb055fdbb3f8075c2', 'Voniel', 'Brown', 'vonielbrown@pursuit.org'), 
('Jenesh', '55d6e5c44794f4ab970a89d3255e32c021be66159c2a908cb07ea52806a61a62', 'Jenesh', 'Napit', 'jeneshnapit@pursuit.org'),
('Briany', '1f7378adb8c1ee2ed469e0c499859fb603a4643f10c98feb10be7f07ea6b47f3', 'Briany', 'Taveras', 'brianytaveras@pursuit.org')
;

INSERT INTO posts(user_id, img, caption, hashtag) values
(1, 'https://www.desktodirtbag.com/wp-content/uploads/2019/05/best-cartagena-beaches-playa-blanca-0003.jpeg', 'Bliss', '#cartagena #travelbug'),
(2, 'https://www.maremmaguide.com/image-files/maremma_restaurants_500.jpg', 'AUTHENTIC', '#italy'),
(3, 'https://3tsll33cscvk11pae33oze51-wpengine.netdna-ssl.com/wp-content/uploads/2018/01/tokyo-street-food-takoyaki.png', 'Japanese street food', '#japan'),
(4, 'https://i.ytimg.com/vi/y8hXqoK8LuI/maxresdefault.jpg', 'Kats Deli', '#LES #NewYork')
;

INSERT INTO likes (liker_id, photo_id) values
(1, 2),
(1, 3),
(1, 4),
(2, 4),
(4, 1),
(3, 2),
(3, 4),
(4, 2)
;