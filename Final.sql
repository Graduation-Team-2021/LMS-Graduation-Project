USE `lms`;

INSERT INTO `user` (`user_id`,`name`,`email`,`national_id`,`birthday`,`password`,`picture`) VALUES (2,'Adham Nour','Adhoom@eng.asu.edu.eg','oig39inn','1999-02-02',NULL,NULL),(5,'Ashraf Salem','Ashroof@eng.com','3759uewfbi','1960-01-01',NULL,NULL),(33,'Hema Shoukry','hema@mam.com','zijwoewj','1990-01-01','komg',NULL),(43,'Ziad Tarek','ziadtht@yahoo.com','poe932y','1950-01-01','pbkdf2:sha256:150000$oNidVhs0$fff38c1560d4cb688290161aa42e83c6751194b14af5d924a897d486b87867e5',NULL),(44,'d','d','d','1998-07-24','pbkdf2:sha256:150000$6Jw6Sv6A$fca74764bfb559053a6310535ce30363fcc2ba81845410ef8b531a7cff2f2915','/static/users/44/16832167_873696792770817_3027909437846294765_n.jpg'),(45,'evevw','ever','tg4t4','1999-01-01','pbkdf2:sha256:150000$82XOuxa3$7a79237615a505044d45ba1bb6c8e843eb7a54537fb04ab8abb7ee553a370fbc',NULL),(47,'d','dd','dd','1999-01-01','pbkdf2:sha256:150000$ZgcLoTJh$185f4d5512f1c5a4a254cfc59ff255c71b8ad7554afd355c25422bd4e4f1212e','/static/users/47/IMG_20200808_075759.jpg'),(52,'David John','d@d.dd','12121212121212','2021-04-02','pbkdf2:sha256:150000$dKX3qmJF$7ac8b7cebb0b73a4c39a97d070e5d6059e98e3c260457bb2255d851eb8072d2c','/static/users/52/16711929_867692286704601_2742838126081827260_n.jpg'),(53,'D','D@D.dj','14141141414114','2021-04-03','pbkdf2:sha256:150000$C3raZb82$46878b45714eaa16eb78fafccec804404e9980c2794e4fe4344b738f10e28f95',NULL),(54,'D','DD@DD.DD','11111111111111','2021-04-01','pbkdf2:sha256:150000$nrEsdaME$1f21536dd9f6fc3f2c03a2fdc5fde82be3d1bdc1af640222c08bc18cf752efde',NULL),(56,'D','DD@DD.DD','11111111111112','2021-04-01','pbkdf2:sha256:150000$uXOGapSi$d45fbe90619775a36ae6814cff6ee191ac3d6fe5def18b5e6cd9b9b4851c4c22',NULL),(57,'david','djman2','2888895478563','1998-05-14','pbkdf2:sha256:150000$Ah1rv4ch$2a1e4cd4f6982cc541eb948b37f11ad11d431222fa6ba7e22e085493c23301df',NULL);

INSERT INTO `post_owner` (`owner_id`) VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(11),(12),(13),(14),(15),(16),(17),(18),(19),(20),(21),(22),(23),(24),(25),(26),(27),(28),(29),(30),(31),(32),(33),(34),(35),(36),(37),(38),(39),(40),(41),(42),(43),(44),(45),(46),(47),(48),(49),(50),(51),(52),(53),(54),(55),(56),(57),(58),(59);

INSERT INTO `course` (`course_code`,`course_name`,`weekly_hours`,`max_students`,`course_description`,`post_owner_id`,`group_number`) VALUES ('1','1',1,1,'1',58,1),('123','Networks',3,250,NULL,1,0),('CS88','NN',4,250,NULL,2,0),('CSE4','artificialIntelligenceAI',3,241,NULL,3,0),('CSE418','Multimedia Systems',3,4,'Hello Course',7,0),('Cse512','Database',7,44,'Database Managament Systems',8,0),('d','d',2,2,'d',6,0);

INSERT INTO `professor` (`user_id`,`scientific_degree`) VALUES (5,'PHD doctorate'),(52,''),(53,''),(56,'DR');

INSERT INTO `group_project` (`group_id`,`group_name`,`group_description`,`post_owner_id`) VALUES (1,'TeamGrad','David we Zezo',4),(2,'Chicken Dinner',NULL,5),(5,'D','D',10),(30,'1 - Section 1','This is the Group for Section 1 of the 1 Course',59);

INSERT INTO `exams` (`exam_id`,`course_id`,`exam_duration`,`exam_marks`) VALUES (13,'CS88','40 Minutes',3);

INSERT INTO `answers` (`answer_id`,`answer`,`question_id`,`right_answer`) VALUES (1,'David',3,1),(2,'DJ',3,1),(3,'Sonic',3,0),(4,'True',4,1),(5,'False',4,0);

INSERT INTO `conversations` (`conversation_id`,`first_user`,`second_user`) VALUES (1,44,52),(2,44,43),(3,52,43);

INSERT INTO `deliverable` (`deliverable_id`,`deliverable_name`,`deadline`,`description`,`course_deliverables`,`students_number`,`mark`) VALUES (1,'MAnet','2021-01-01 00:00:00','nothing','CS88',290,15),(2,'Dijkstra','2020-05-01 00:00:00','niqwfe','123',29,20);

INSERT INTO `deliverables_results` (`deliverable_id`,`user_id`,`mark`) VALUES (1,33,9),(2,33,4);

INSERT INTO `events` (`event_id`,`event_name`,`event_date`,`course_code`,`event_type`,`event_duration`,`event_description`) VALUES (1,'exam networks','2021-01-01 00:00:00','123','exam',3,NULL),(3,'final NN','2021-05-01 00:00:00','CS88','exam',3,NULL);

INSERT INTO `finish` (`course_code`,`student_id`,`total_mark_in_the_course`) VALUES ('123',33,1500),('CS88',33,1500),('CSE4',44,1350);

INSERT INTO `group_course_relation` (`course_id`,`group_id`) VALUES ('1',30);

INSERT INTO `learns` (`student_id`,`course_code`,`mid_term_mark`,`final_exam_mark`) VALUES (33,'CS88',50,50),(43,'CS88',50,50),(44,'CS88',50,50);

INSERT INTO `material` (`material_id`,`material_type`,`material_name`,`course_material`) VALUES (1,'.png','Screenshot_20210327_180947','CS88'),(2,'.png','Screenshot_20210327_180947','CS88'),(3,'.png','Screenshot_20210327_180947','CS88'),(4,'.png','Screenshot_20210327_180947','CS88'),(5,'.png','Screenshot_20200317_223147','CS88'),(6,'.jpeg','1610321429147','CS88'),(7,'.pdf','Technical Writing','123');

INSERT INTO `messages` (`message_id`,`conversation_id`,`text`,`sent_time`,`sender_id`,`receiver_id`) VALUES (12,1,'dasd','2021-04-12 00:30:21',44,52),(13,1,'Hi there','2021-04-12 00:30:26',44,52),(14,1,'hello','2021-04-12 22:20:15',52,44),(15,1,'hi','2021-04-12 22:26:40',52,44),(16,1,'hi','2021-04-12 22:30:57',52,44),(17,1,'what\'s up','2021-04-12 22:31:17',52,44),(18,1,'hi','2021-04-12 22:31:30',44,52),(19,1,'david','2021-04-12 22:31:35',44,52),(20,1,'Adham','2021-04-12 22:31:55',44,52),(21,1,'1234','2021-04-12 22:32:04',52,44),(22,1,'david','2021-04-12 22:32:46',52,44),(23,1,'dj','2021-04-12 22:32:50',44,52),(24,2,'asdlas','2021-04-12 22:33:03',44,43),(25,2,'sadasdas','2021-04-12 22:33:24',44,43),(26,1,'dav','2021-04-12 22:37:41',52,44),(27,2,'sadasd','2021-04-12 22:37:54',44,43),(28,1,'hello','2021-04-12 22:38:00',52,44),(29,1,'Hello','2021-04-12 22:48:04',44,52),(30,1,'What\'s Up','2021-04-12 22:48:47',44,52),(31,1,'hello','2021-04-12 22:49:17',52,44),(32,1,'What\'s Up???!','2021-04-12 22:49:32',44,52),(33,1,'sdfsfsdf','2021-04-12 22:50:56',44,52),(34,1,'asdbaskj','2021-04-12 22:53:40',44,52),(35,1,'Hi','2021-04-15 11:08:51',44,52),(36,1,'how are you','2021-04-15 11:09:02',52,44),(37,1,'Ramadan Karem','2021-04-15 11:09:34',44,52),(38,3,'How are you','2021-04-15 11:10:24',52,43),(39,1,'hii','2021-04-15 11:27:36',44,52),(40,1,'Heloo','2021-04-15 11:31:02',44,52),(41,1,'Hiii','2021-04-15 11:34:54',44,52),(42,1,'What\'s up','2021-04-15 11:35:18',44,52),(43,1,'Helo world','2021-04-15 11:38:09',44,52);

INSERT INTO `post` (`post_id`,`post_writer`,`post_owner`,`post_text`) VALUES (1,2,4,'1sst post'),(2,33,4,'2nd post'),(3,44,4,'test post'),(4,44,4,'Hey-O'),(5,44,4,'David'),(6,44,4,'DJ Man\n'),(7,44,2,'Hiiiii'),(8,44,2,'Hey-O'),(9,44,2,'What\'s Up???'),(10,44,NULL,'David'),(11,44,2,'Hey-oooooo'),(12,44,2,'What is going on'),(13,44,2,'Sonic'),(14,44,4,'Sonic'),(15,44,4,'Spider'),(16,44,4,'Mega'),(17,44,4,'Man'),(18,44,4,'Ben 10\n'),(19,44,4,'Zezoooooooooo'),(20,44,1,'New Post');

INSERT INTO `post_commenter` (`comment_id`,`commenter_id`,`post_id`,`comment_text`,`created_date`) VALUES (1,44,1,'dAVID','2021-04-08 18:56:50'),(2,44,1,'David','2021-04-08 18:57:02'),(3,44,20,'dasda','2021-04-15 11:11:57');

INSERT INTO `post_liker` (`liker_id`,`post_id`,`created_date`) VALUES (5,1,'2021-04-03 13:25:17'),(5,2,'2021-04-03 13:25:17'),(33,1,'2021-04-03 13:25:17'),(43,1,'2021-04-03 13:25:17'),(44,2,'2021-04-08 18:31:33'),(44,3,'2021-04-08 18:34:15'),(44,15,'2021-04-10 01:09:29'),(44,20,'2021-04-15 11:11:59');

INSERT INTO `questions` (`question_id`,`question`,`mark`,`exam_id`) VALUES (3,'name',2,13),(4,'Done',1,13);

INSERT INTO `student` (`user_id`,`student_year`) VALUES (33,4),(43,4),(44,3);

INSERT INTO `student_group_relation` (`group_id`,`student_id`) VALUES (1,44);

INSERT INTO `teaches` (`professor_id`,`course_code`) VALUES (5,'1'),(52,'1'),(5,'123'),(5,'CS88'),(52,'CS88'),(5,'CSE4');

