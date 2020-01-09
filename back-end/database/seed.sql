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
    profile_pic VARCHAR,
    active BOOLEAN 
); 

CREATE TABLE posts (
    id SERIAL PRIMARY KEY, 
    user_id INT REFERENCES users(id), 
    img VARCHAR, 
    caption VARCHAR, 
    location VARCHAR, 
    hashtag text[],
    time_post TEXT DEFAULT NOW()
);

CREATE TABLE likes (
    id SERIAL PRIMARY KEY, 
    liker_id INT REFERENCES users(id), 
    post_id INT REFERENCES posts(id)
);

-- create hashtag table 
-- CREATE TABLE hashtags (
--     id SERIAL PRIMARY KEY, 
--     tag VARCHAR(20) UNIQUE, 
--     post_id INT[] 
-- );

--- values for tables in db ---

INSERT INTO users (username, password, firstname, lastname, email, profile_pic, active) VALUES 
('test', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'Test', 'Me', 'test@test.com',
 'https://www.sackettwaconia.com/wp-content/uploads/default-profile.png', true),
('Suzette', '3a6ac96d379e50d05016e511fcee24a556e969c6e036216c175ca2fc551b03cf', 'Suzette', 'Islam', 'suzetteislam@pursuit.org', 
'https://scholartutorials.com//wp-content/uploads/2018/11/default-profile-picture-woman-3.jpg', true),
('Voniel', '510c9a42be49b865d25b2e9902fe840daec19eb5eab6e63bb055fdbb3f8075c2', 'Voniel', 'Brown', 'vonielbrown@pursuit.org',
 'https://www.ibts.org/wp-content/uploads/2017/08/iStock-476085198.jpg', true), 
('Jenesh', '55d6e5c44794f4ab970a89d3255e32c021be66159c2a908cb07ea52806a61a62', 'Jenesh', 'Napit', 'jeneshnapit@pursuit.org', 
'https://www.ibts.org/wp-content/uploads/2017/08/iStock-476085198.jpg', true),
('Briany', '1f7378adb8c1ee2ed469e0c499859fb603a4643f10c98feb10be7f07ea6b47f3', 'Briany', 'Taveras', 'brianytaveras@pursuit.org',
 'https://image.shutterstock.com/image-vector/profile-picture-illustration-woman-vector-260nw-438749650.jpg', true)
;

INSERT INTO posts(user_id, img, caption, location, hashtag) VALUES
(1, 'https://www.desktodirtbag.com/wp-content/uploads/2019/05/best-cartagena-beaches-playa-blanca-0003.jpeg', 'Bliss', 'Cartagena', ARRAY['this', 'is', 'a', 'hashtag']),
(2, 'https://www.maremmaguide.com/image-files/maremma_restaurants_500.jpg', 'AUTHENTIC', 'New York', ARRAY['is', 'a'] ),
(3, 'https://3tsll33cscvk11pae33oze51-wpengine.netdna-ssl.com/wp-content/uploads/2018/01/tokyo-street-food-takoyaki.png', 'Japanese street food', 'Japan', ARRAY['this','hashtag']),
(4, 'https://i.ytimg.com/vi/y8hXqoK8LuI/maxresdefault.jpg', 'Kats Deli', 'California', ARRAY['this', 'is'])
;

INSERT INTO likes (liker_id, post_id) VALUES
(1, 2),
(1, 3),
(1, 4),
(2, 4),
(4, 1),
(3, 2),
(3, 4),
(4, 2)
;

-- INSERT INTO hashtags (tag, post_id) VALUES 
-- ('#travel', ARRAY[1, 2, 3, 4]),
-- ('#food', ARRAY[2, 3, 4]),
-- ('#happiness', ARRAY[2, 4]),
-- ('#Bliss', ARRAY[1])
-- ;

-- SELECT * FROM posts WHERE id IN (1, 2, 3);
-- SELECT * FROM posts WHERE '#this' = ANY(hashtag);