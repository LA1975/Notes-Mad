DROP TABLE if EXISTS users;
DROP TABLE if EXISTS notes;

CREATE TABLE users (
    user_name VARCHAR(20) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100) NOT NULL,
	date_of_birth date,
	email VARCHAR(100),
	"password" VARCHAR(100), 
	is_admin CHAR(1),
	authToken varchar(100),
	PRIMARY KEY (user_name)
);
INSERT INTO users(user_name, first_name, last_name, date_of_birth, email, "password", is_admin) VALUES
	('testUser99', 'Peter','Waititi','1986/06/02', 'adminuser@test.com', 'Password1!', 'Y'),
	('Yogi-bear', 'Taika','Jackson','1975/05/07', 'yogi-bear@yosimite.com', 'Password2!', NULL);
	
CREATE TABLE notes(
	note_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	text VARCHAR (2000),
	date_created date,
	due_date date,
	label VARCHAR (20),
	user_name VARCHAR(20) NOT NULL,
	FOREIGN KEY(user_name) REFERENCES users(user_name) ON DELETE CASCADE
	);

INSERT INTO notes(note_id,text, date_created, due_date, label,user_name) VALUES
		(1, 'write sql script to initialise database', '2022/10/03','2022/10/4', 'post-it project', 'testUser99'),
		(2, 'insert data into database', '2022/10/3','2022/10/3', 'post-it notes project', 'Yogi-bear');
		(3, 'another note', '2022/10/3','2022/10/3', 'post-it notes project', 'Yogi-bear');
		(4, 'yet another note', '2022/10/3','2022/10/3', 'post-it notes project', 'Yogi-bear');
