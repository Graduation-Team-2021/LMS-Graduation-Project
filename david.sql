/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE DATABASE /*!32312 IF NOT EXISTS*/ `lms` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `lms`;
DROP TABLE IF EXISTS `Prerequiste`;
CREATE TABLE `Prerequiste` (
  `course_code` varchar(5) NOT NULL,
  `pre_course_id` varchar(5) NOT NULL,
  PRIMARY KEY (`course_code`,`pre_course_id`),
  KEY `pre_course_id` (`pre_course_id`),
  CONSTRAINT `Prerequiste_ibfk_1` FOREIGN KEY (`course_code`) REFERENCES `course` (`course_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Prerequiste_ibfk_2` FOREIGN KEY (`pre_course_id`) REFERENCES `course` (`course_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `answers`;
CREATE TABLE `answers` (
  `answer_id` int NOT NULL AUTO_INCREMENT,
  `answer` varchar(50) NOT NULL,
  `question_id` int NOT NULL,
  `right_answer` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`answer_id`),
  KEY `question_id` (`question_id`),
  CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `answers_chk_1` CHECK ((`right_answer` in (0,1)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `course_code` varchar(7) NOT NULL,
  `course_name` varchar(50) NOT NULL,
  `weekly_hours` int NOT NULL,
  `group_number` int NOT NULL,
  `max_students` int NOT NULL,
  `course_description` mediumtext,
  `post_owner_id` int DEFAULT NULL,
  PRIMARY KEY (`course_code`),
  UNIQUE KEY `group_number` (`group_number`),
  KEY `post_owner_idx` (`post_owner_id`),
  CONSTRAINT `post_owner` FOREIGN KEY (`post_owner_id`) REFERENCES `post_owner` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `deliver`;
CREATE TABLE `deliver` (
  `delivers_id` int NOT NULL AUTO_INCREMENT,
  `deliverable_id` int DEFAULT NULL,
  `student_id` int DEFAULT NULL,
  `file_type` varchar(6) DEFAULT NULL,
  `file_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`delivers_id`),
  KEY `deliverable_id` (`deliverable_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `deliver_ibfk_1` FOREIGN KEY (`deliverable_id`) REFERENCES `deliverable` (`deliverable_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `deliver_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `student` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `deliverable`;
CREATE TABLE `deliverable` (
  `deliverable_id` int NOT NULL AUTO_INCREMENT,
  `deliverable_name` varchar(50) NOT NULL,
  `deadline` datetime NOT NULL,
  `description` text,
  `course_deliverables` varchar(5) NOT NULL,
  `students_number` int NOT NULL,
  `mark` int NOT NULL,
  PRIMARY KEY (`deliverable_id`),
  KEY `course_deliverables` (`course_deliverables`),
  CONSTRAINT `deliverable_ibfk_1` FOREIGN KEY (`course_deliverables`) REFERENCES `course` (`course_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `deliverables_results`;
CREATE TABLE `deliverables_results` (
  `deliverable_id` int NOT NULL,
  `user_id` int NOT NULL,
  `mark` int NOT NULL,
  PRIMARY KEY (`deliverable_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `deliverables_results_ibfk_1` FOREIGN KEY (`deliverable_id`) REFERENCES `deliverable` (`deliverable_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `deliverables_results_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `student` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `event_name` varchar(50) NOT NULL,
  `event_date` datetime NOT NULL,
  `course_code` varchar(50) NOT NULL,
  `event_type` varchar(50) NOT NULL,
  `event_duration` int NOT NULL,
  `event_description` mediumtext,
  PRIMARY KEY (`event_id`),
  KEY `course_code` (`course_code`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`course_code`) REFERENCES `course` (`course_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `exams`;
CREATE TABLE `exams` (
  `exam_id` int NOT NULL AUTO_INCREMENT,
  `actual_mark` float DEFAULT NULL,
  `event_id` int NOT NULL,
  PRIMARY KEY (`exam_id`),
  UNIQUE KEY `event_id` (`event_id`),
  CONSTRAINT `exams_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `finish`;
CREATE TABLE `finish` (
  `course_code` varchar(10) NOT NULL,
  `student_id` int NOT NULL,
  `total_mark_in_the_course` float DEFAULT NULL,
  PRIMARY KEY (`course_code`,`student_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `finish_ibfk_1` FOREIGN KEY (`course_code`) REFERENCES `course` (`course_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `finish_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `student` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `group_deliverable_relation`;
CREATE TABLE `group_deliverable_relation` (
  `group_id` int NOT NULL,
  `deliverable_id` int NOT NULL,
  PRIMARY KEY (`group_id`,`deliverable_id`),
  KEY `deliverable_id` (`deliverable_id`),
  CONSTRAINT `group_deliverable_relation_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `group_project` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_deliverable_relation_ibfk_2` FOREIGN KEY (`deliverable_id`) REFERENCES `deliverable` (`deliverable_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `group_project`;
CREATE TABLE `group_project` (
  `group_id` int NOT NULL AUTO_INCREMENT,
  `group_name` varchar(50) DEFAULT NULL,
  `group_description` mediumtext,
  `post_owner_id` int DEFAULT NULL,
  PRIMARY KEY (`group_id`),
  KEY `post_owner_idx` (`post_owner_id`),
  CONSTRAINT `post_owner_id` FOREIGN KEY (`post_owner_id`) REFERENCES `post_owner` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `learns`;
CREATE TABLE `learns` (
  `student_id` int NOT NULL,
  `course_code` varchar(5) NOT NULL,
  PRIMARY KEY (`student_id`,`course_code`),
  KEY `course_code` (`course_code`),
  CONSTRAINT `learns_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `learns_ibfk_2` FOREIGN KEY (`course_code`) REFERENCES `course` (`course_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `material`;
CREATE TABLE `material` (
  `material_id` int NOT NULL AUTO_INCREMENT,
  `material_type` varchar(50) NOT NULL,
  `material_name` varchar(50) DEFAULT NULL,
  `course_material` varchar(5) NOT NULL,
  PRIMARY KEY (`material_id`),
  KEY `course_material` (`course_material`),
  CONSTRAINT `material_ibfk_1` FOREIGN KEY (`course_material`) REFERENCES `course` (`course_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `sender_id` int DEFAULT NULL,
  `receiver_id` int DEFAULT NULL,
  `text` text,
  `sent_time` datetime DEFAULT NULL,
  PRIMARY KEY (`message_id`),
  KEY `sender_id` (`sender_id`),
  KEY `receiver_id` (`receiver_id`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `message_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `post_writer` int DEFAULT NULL,
  `post_owner` int DEFAULT NULL,
  `post_text` mediumtext,
  PRIMARY KEY (`post_id`),
  KEY `post_writer` (`post_writer`),
  KEY `post_owner` (`post_owner`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`post_writer`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE,
  CONSTRAINT `post_ibfk_2` FOREIGN KEY (`post_owner`) REFERENCES `post_owner` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `post_commenter`;
CREATE TABLE `post_commenter` (
  `commenter_id` int NOT NULL,
  `post_id` int NOT NULL,
  `comment_text` mediumtext,
  PRIMARY KEY (`commenter_id`,`post_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `post_commenter_ibfk_1` FOREIGN KEY (`commenter_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE,
  CONSTRAINT `post_commenter_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `post_liker`;
CREATE TABLE `post_liker` (
  `liker_id` int NOT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`liker_id`,`post_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `post_liker_ibfk_1` FOREIGN KEY (`liker_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE,
  CONSTRAINT `post_liker_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `post_owner`;
CREATE TABLE `post_owner` (
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `professor`;
CREATE TABLE `professor` (
  `user_id` int NOT NULL,
  `scientific_degree` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `professor_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `questions`;
CREATE TABLE `questions` (
  `question_id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(50) NOT NULL,
  `mark` int DEFAULT NULL,
  `exam_id` int NOT NULL,
  PRIMARY KEY (`question_id`),
  UNIQUE KEY `question` (`question`,`exam_id`),
  KEY `exam_id` (`exam_id`),
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`exam_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `results`;
CREATE TABLE `results` (
  `student_id` int NOT NULL,
  `exam_id` int NOT NULL,
  `mark` float NOT NULL,
  `out_of_mark` float NOT NULL,
  PRIMARY KEY (`student_id`,`exam_id`),
  KEY `exam_id` (`exam_id`),
  CONSTRAINT `results_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `results_ibfk_2` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`exam_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `user_id` int NOT NULL,
  `student_year` int NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `student_answers`;
CREATE TABLE `student_answers` (
  `student_answer_id` int NOT NULL AUTO_INCREMENT,
  `student_question_id` int DEFAULT NULL,
  `student_answer` varchar(50) NOT NULL,
  `correct_answer` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`student_answer_id`),
  KEY `student_question_id` (`student_question_id`),
  CONSTRAINT `student_answers_ibfk_1` FOREIGN KEY (`student_question_id`) REFERENCES `student_questions` (`student_question_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `student_answers_chk_1` CHECK ((`correct_answer` in (0,1)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `student_group_relation`;
CREATE TABLE `student_group_relation` (
  `group_id` int NOT NULL,
  `student_id` int NOT NULL,
  PRIMARY KEY (`group_id`,`student_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `student_group_relation_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `group_project` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `student_group_relation_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `student` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `student_questions`;
CREATE TABLE `student_questions` (
  `student_id` int DEFAULT NULL,
  `question_id` int DEFAULT NULL,
  `student_question_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`student_question_id`),
  UNIQUE KEY `student_id` (`student_id`,`question_id`),
  KEY `question_id` (`question_id`),
  CONSTRAINT `student_questions_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `student_questions_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `teaches`;
CREATE TABLE `teaches` (
  `professor_id` int NOT NULL,
  `course_code` varchar(5) NOT NULL,
  PRIMARY KEY (`professor_id`,`course_code`),
  KEY `course_code` (`course_code`),
  CONSTRAINT `teaches_ibfk_1` FOREIGN KEY (`professor_id`) REFERENCES `professor` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teaches_ibfk_2` FOREIGN KEY (`course_code`) REFERENCES `course` (`course_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `national_id` varchar(50) NOT NULL,
  `birthday` date NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `national_id` (`national_id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



INSERT INTO `course` (`course_code`,`course_name`,`weekly_hours`,`group_number`,`max_students`,`course_description`,`post_owner_id`) VALUES ('123','Networks',3,20,250,NULL,1),('CS88','NN',4,39,250,NULL,2),('CSE444','artificialIntelligenceAI',3,40,241,NULL,3);


INSERT INTO `deliverable` (`deliverable_id`,`deliverable_name`,`deadline`,`description`,`course_deliverables`,`students_number`,`mark`) VALUES (1,'MAnet','2021-01-01 00:00:00','nothing','123',290,15),(2,'Dijkstra','2020-05-01 00:00:00','niqwfe','123',29,20);

INSERT INTO `deliverables_results` (`deliverable_id`,`user_id`,`mark`) VALUES (1,33,9),(2,33,4);

INSERT INTO `events` (`event_id`,`event_name`,`event_date`,`course_code`,`event_type`,`event_duration`,`event_description`) VALUES (1,'exam networks','2021-01-01 00:00:00','123','exam',3,NULL),(3,'final NN','2021-05-01 00:00:00','CS88','exam',3,NULL);

INSERT INTO `exams` (`exam_id`,`actual_mark`,`event_id`) VALUES (1,90,1),(5,85,3);

INSERT INTO `finish` (`course_code`,`student_id`,`total_mark_in_the_course`) VALUES ('123',33,1500),('CS88',33,1500),('CSE444',44,1350);


INSERT INTO `group_project` (`group_id`,`group_name`,`group_description`,`post_owner_id`) VALUES (1,'TeamGrad','David we Zezo',4),(2,'Chicken Dinner',NULL,5);

INSERT INTO `learns` (`student_id`,`course_code`) VALUES (44,'CS88');

INSERT INTO `material` (`material_id`,`material_type`,`material_name`,`course_material`) VALUES (1,'.png','Screenshot_20210327_180947','CS88'),(2,'.png','Screenshot_20210327_180947','CS88'),(3,'.png','Screenshot_20210327_180947','CS88'),(4,'.png','Screenshot_20210327_180947','CS88'),(5,'.png','Screenshot_20200317_223147','CS88'),(6,'.jpeg','1610321429147','CS88'),(7,'.pdf','Technical Writing','CS88');


INSERT INTO `post` (`post_id`,`post_writer`,`post_owner`,`post_text`) VALUES (1,2,4,'1sst post'),(2,33,4,'2nd post'),(3,44,4,'test post'),(4,44,4,'Hey-O'),(5,44,4,'David'),(6,44,4,'DJ Man\n'),(7,44,2,'Hiiiii'),(8,44,2,'Hey-O'),(9,44,2,'What\'s Up???'),(10,44,NULL,'David');

INSERT INTO `post_commenter` (`commenter_id`,`post_id`,`comment_text`) VALUES (5,1,'1st comment'),(5,2,'2nd comment for 1st user'),(33,1,'an added comment through post method');

INSERT INTO `post_liker` (`liker_id`,`post_id`) VALUES (5,1),(33,1),(43,1),(5,2);

INSERT INTO `post_owner` (`id`) VALUES (1),(2),(3),(4),(5);

INSERT INTO `professor` (`user_id`,`scientific_degree`) VALUES (5,'PHD doctorate');


INSERT INTO `results` (`student_id`,`exam_id`,`mark`,`out_of_mark`) VALUES (33,1,65,90),(33,5,70,85);

INSERT INTO `student` (`user_id`,`student_year`) VALUES (33,4),(43,4),(44,3);


INSERT INTO `student_group_relation` (`group_id`,`student_id`) VALUES (1,44);


INSERT INTO `teaches` (`professor_id`,`course_code`) VALUES (5,'123'),(5,'CS88');

INSERT INTO `user` (`user_id`,`name`,`email`,`national_id`,`birthday`,`password`) VALUES (2,'Adham Nour','Adhoom@eng.asu.edu.eg','oig39inn','1999-02-02',NULL),(5,'Ashraf Salem','Ashroof@eng.com','3759uewfbi','1960-01-01',NULL),(33,'Hema Shoukry','hema@mam.com','zijwoewj','1990-01-01','komg'),(43,'Ziad Tarek','ziadtht@yahoo.com','poe932y','1950-01-01','pbkdf2:sha256:150000$oNidVhs0$fff38c1560d4cb688290161aa42e83c6751194b14af5d924a897d486b87867e5'),(44,'d','d','d','1998-07-24','pbkdf2:sha256:150000$6Jw6Sv6A$fca74764bfb559053a6310535ce30363fcc2ba81845410ef8b531a7cff2f2915'),(45,'evevw','ever','tg4t4','1999-01-01','pbkdf2:sha256:150000$82XOuxa3$7a79237615a505044d45ba1bb6c8e843eb7a54537fb04ab8abb7ee553a370fbc'),(47,'d','dd','dd','1999-01-01','pbkdf2:sha256:150000$ZgcLoTJh$185f4d5512f1c5a4a254cfc59ff255c71b8ad7554afd355c25422bd4e4f1212e');

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
