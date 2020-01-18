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
    profile_pic VARCHAR DEFAULT NULL,
    active BOOLEAN DEFAULT TRUE
); 

CREATE TABLE posts (
    id SERIAL PRIMARY KEY, 
    user_id INT REFERENCES users(id), 
    img VARCHAR, 
    caption VARCHAR, 
    location VARCHAR,
    coords JSON NOT NULL, 
    hashtag text[],
    time_post TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE likes (
    id SERIAL PRIMARY KEY, 
    liker_id INT REFERENCES users(id), 
    post_id INT REFERENCES posts(id) ON DELETE CASCADE 
);

-- create hashtag table 
CREATE TABLE hashtags (
    id SERIAL PRIMARY KEY, 
    tag VARCHAR(20) UNIQUE, 
    post_id INT[] 
);

--- values for tables in db ---

INSERT INTO users (username, password, firstname, lastname, email, profile_pic) VALUES 
    ('test', '$2b$10$k/9Qbd21k69Pd4Vj2yT04utnV3SSKbBr7JYYxB3HAb8jUYDFknCEe', 'Test', 'Me', 'test@test.com',
    'https://www.sackettwaconia.com/wp-content/uploads/default-profile.png'),
    ('Suzette', '$2b$10$eH/UGAgZWkc3J837iiGS.e8Oktl6Dyo2rsKQa3awxzKtMeU3o9OzC', 'Suzette', 'Islam', 'suzetteislam@pursuit.org', 
    'https://scholartutorials.com//wp-content/uploads/2018/11/default-profile-picture-woman-3.jpg'),
    ('Voniel', '$2b$10$vf.AbCrbunEvGSZxPyis2.kT3vkrdoAZ9nLXruKq1c8Z6/Max6uey', 'Voniel', 'Brown', 'vonielbrown@pursuit.org',
    'https://www.ibts.org/wp-content/uploads/2017/08/iStock-476085198.jpg'), 
    ('Jenesh', '$2b$10$CF6ooTI0rMfoxTC.fYX0vOfaMydFp5242i3rwHvW3QamgHfzU5TQu', 'Jenesh', 'Napit', 'jeneshnapit@pursuit.org', 
    'https://www.ibts.org/wp-content/uploads/2017/08/iStock-476085198.jpg'),
    ('Briany', '$2b$10$n7XYeGer/8S7XtKEXh.0kuaEVJNlJ6ULMwIJK917zW/GRAKm.bRie', 'Briany', 'Taveras', 'brianytaveras@pursuit.org',
    'https://image.shutterstock.com/image-vector/profile-picture-illustration-woman-vector-260nw-438749650.jpg')
;

INSERT INTO posts(user_id, img, caption, location, hashtag,coords) VALUES
    (1, 'https://www.desktodirtbag.com/wp-content/uploads/2019/05/best-cartagena-beaches-playa-blanca-0003.jpeg', 'Bliss', 'Cartagena', ARRAY['this', 'is', 'a', 'hashtag'],'{"latitude":40.7484405,"longitude":-73.98566439999999}'),
    (2, 'https://www.maremmaguide.com/image-files/maremma_restaurants_500.jpg', 'AUTHENTIC', 'New York', ARRAY['is', 'a'],'{"latitude":40.7484405,"longitude":-73.98566439999999}' ),
    (3, 'https://3tsll33cscvk11pae33oze51-wpengine.netdna-ssl.com/wp-content/uploads/2018/01/tokyo-street-food-takoyaki.png', 'Japanese street food', 'Japan', ARRAY['this','hashtag'],'{"latitude":40.7484405,"longitude":-73.98566439999999}'),
    (4, 'https://i.ytimg.com/vi/y8hXqoK8LuI/maxresdefault.jpg', 'Kats Deli', 'California', ARRAY['this', 'is'],'{"latitude":40.7484405,"longitude":-73.98566439999999}')
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

INSERT INTO hashtags (tag, post_id) VALUES 
    ('travel', ARRAY[ 1, 2, 3, 4]),
    ('food', ARRAY[2, 3, 4]),
    ('happiness', ARRAY[2, 4]),
    ('Bliss', ARRAY[1])
;



-- INSERT INTO hashtags (tag, post_id)
-- VALUES ('travel', ARRAY[9])
-- ON CONFLICT (tag)
-- DO UPDATE SET post_id =
-- (SELECT post_id FROM hashtags WHERE tag = 'travel') || 9;

-- INSERT INTO hashtags (tag, post_id)
-- VALUES ('goodness', ARRAY[9])
-- ON CONFLICT (tag)
-- DO UPDATE SET post_id =
-- (SELECT post_id FROM hashtags WHERE tag = 'goodness') || 9;


-- SELECT * FROM posts WHERE id IN (1, 2, 3);
-- SELECT * FROM posts WHERE '#this' = ANY(hashtag);