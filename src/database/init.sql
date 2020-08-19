BEGIN;

DROP TABLE IF EXISTS users, posts;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    location VARCHAR(255)
);

CREATE TABLE posts
(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    text_content TEXT NOT NULL
);

INSERT INTO users (username, location) VALUES
    ('Zi_You_in_Hell', 'In Hell'),
    ('jhart5', 'A dark basement'),
    ('Ephivecent', 'Nowhere'),
    ('Khadija', 'The Matrix')
;


INSERT INTO posts (user_id, text_content) VALUES
    (2, 'Testing; one, two.'),
    (4, 'I love marmalade so much. It is the best.'),
    (2, 'Bill Gates is responsible for coronavirus.'),
    (1, 'Nailed it!!!')
;

COMMIT;