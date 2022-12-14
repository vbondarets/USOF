CREATE database USOFBackend;
CREATE USER 'vbondarets' IDENTIFIED BY 'securepass';
GRANT ALL PRIVILEGES ON USOFBackend.* TO 'vbondarets';

use USOFBackend;

CREATE TABLE IF NOT EXISTS user(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fullName VARCHAR(52) NOT NULL UNIQUE,
    login VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(36) NOT NULL UNIQUE,
    password VARCHAR(72) NOT NULL,
    role VARCHAR(16) DEFAULT 'USER',
    profileImg VARCHAR(72) NOT NULL,
    rating INT DEFAULT 0
);
CREATE TABLE IF NOT EXISTS post(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    author_id INT NOT NULl,
    title TINYTEXT NOT NULL,
    publishDate DATETIME NOT NULL,
    status TINYINT DEFAULT 1,
    content MEDIUMTEXT NOT NULL,
    category_id INT NOT NULL
);
CREATE TABLE IF NOT EXISTS category(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title TINYTEXT NOT NULl,
    description TINYTEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS comment(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    postId INT NOT NULL,
    authorId INT NOT NULL,
    publishDate DATETIME NOT NULL,
    content MEDIUMTEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS like(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    authorId INT NOT NULL,
    publishDate DATETIME NOT NULL,
    postId INT DEFAULT 0,
    commentId INT DEFAULT 0,
    type TINYINT DEFAULT 1
);
