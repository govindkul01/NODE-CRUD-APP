CREATE DATABASE IF NOT EXISTS emp_system;

USE emp_system;

CREATE TABLE employee (
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   fname VARCHAR(45) DEFAULT NULL,
   age INT DEFAULT NULL,
   country VARCHAR(45) DEFAULT NULL,
   position VARCHAR(45) DEFAULT NULL,
   wage INT DEFAULT NULL
);

DELIMITER //
CREATE PROCEDURE create_and_return(IN fname VARCHAR(45), IN age INT, 
                                    IN country VARCHAR(45), IN position VARCHAR(45), IN wage INT)
BEGIN
  INSERT INTO employee (fname, age, country, position, wage) VALUES (fname, age, country, position, wage);
  
  SET @EMP_ID = LAST_INSERT_ID();

  SELECT * FROM employee WHERE id=@EMP_ID;
END //
DELIMITER ;
