CREATE TABLE `answers` (
  `answer_id` int NOT NULL,
  `answer` varchar(50) NOT NULL,
  `question_id` int NOT NULL,
  `right_answer` tinyint(1) DEFAULT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `conversations`
--
CREATE TABLE `conversations` (
  `conversation_id` int NOT NULL,
  `first_user` int DEFAULT NULL,
  `second_user` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `conversations`
--

INSERT INTO `conversations` (`conversation_id`, `first_user`, `second_user`) VALUES
(1, 44, 52),
(2, 44, 43),
(3, 33, 2),
(4, 33, 5);

-- --------------------------------------------------------

--
-- Table structure for table `course`
--
CREATE TABLE `course` (
  `course_code` varchar(7) NOT NULL,
  `course_name` varchar(50) NOT NULL,
  `weekly_hours` int NOT NULL,
  `group_number` int NOT NULL,
  `max_students` int NOT NULL,
  `course_description` mediumtext,
  `post_owner_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`course_code`, `course_name`, `weekly_hours`, `group_number`, `max_students`, `course_description`, `post_owner_id`) VALUES
('123', 'Networks', 3, 20, 250, NULL, 1),
('CS88', 'NN', 4, 39, 250, NULL, 2),
('CSE4', 'artificialIntelligenceAI', 3, 40, 241, NULL, 3);

-- --------------------------------------------------------

--
-- Table structure for table `deliver`
--
CREATE TABLE `deliver` (
  `delivers_id` int NOT NULL,
  `deliverable_id` int DEFAULT NULL,
  `student_id` int DEFAULT NULL,
  `file_type` varchar(6) DEFAULT NULL,
  `file_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `deliverable`
--
CREATE TABLE `deliverable` (
  `deliverable_id` int NOT NULL,
  `deliverable_name` varchar(50) NOT NULL,
  `deadline` datetime NOT NULL,
  `description` text,
  `course_deliverables` varchar(5) NOT NULL,
  `students_number` int NOT NULL,
  `mark` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `deliverable`
--

INSERT INTO `deliverable` (`deliverable_id`, `deliverable_name`, `deadline`, `description`, `course_deliverables`, `students_number`, `mark`) VALUES
(1, 'MAnet', '2021-01-01 00:00:00', 'nothing', '123', 290, 15),
(2, 'Dijkstra', '2020-05-01 00:00:00', 'niqwfe', '123', 29, 20);

-- --------------------------------------------------------

--
-- Table structure for table `deliverables_results`
--
CREATE TABLE `deliverables_results` (
  `deliverable_id` int NOT NULL,
  `user_id` int NOT NULL,
  `mark` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `deliverables_results`
--

INSERT INTO `deliverables_results` (`deliverable_id`, `user_id`, `mark`) VALUES
(1, 33, 9),
(2, 33, 4);

-- --------------------------------------------------------

--
-- Table structure for table `events`
--
CREATE TABLE `events` (
  `event_id` int NOT NULL,
  `event_name` varchar(50) NOT NULL,
  `event_date` datetime NOT NULL,
  `course_code` varchar(50) NOT NULL,
  `event_type` varchar(50) NOT NULL,
  `event_duration` int NOT NULL,
  `event_description` mediumtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`event_id`, `event_name`, `event_date`, `course_code`, `event_type`, `event_duration`, `event_description`) VALUES
(1, 'exam networks', '2021-01-01 00:00:00', '123', 'exam', 3, NULL),
(3, 'final NN', '2021-05-01 00:00:00', 'CS88', 'exam', 3, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `exams`
--
CREATE TABLE `exams` (
  `exam_id` int NOT NULL,
  `actual_mark` float DEFAULT NULL,
  `event_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `exams`
--

INSERT INTO `exams` (`exam_id`, `actual_mark`, `event_id`) VALUES
(1, 90, 1),
(5, 85, 3);

-- --------------------------------------------------------

--
-- Table structure for table `finish`
--
CREATE TABLE `finish` (
  `course_code` varchar(10) NOT NULL,
  `student_id` int NOT NULL,
  `total_mark_in_the_course` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `finish`
--

INSERT INTO `finish` (`course_code`, `student_id`, `total_mark_in_the_course`) VALUES
('123', 33, 1500),
('CS88', 33, 1500),
('CSE4', 44, 1350);

-- --------------------------------------------------------

--
-- Table structure for table `group_deliverable_relation`
--

CREATE TABLE `group_deliverable_relation` (
  `group_id` int NOT NULL,
  `deliverable_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `group_project`
--

CREATE TABLE `group_project` (
  `group_id` int NOT NULL,
  `group_name` varchar(50) DEFAULT NULL,
  `group_description` mediumtext,
  `post_owner_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `group_project`
--

INSERT INTO `group_project` (`group_id`, `group_name`, `group_description`, `post_owner_id`) VALUES
(1, 'TeamGrad', 'David we Zezo', 4),
(2, 'Chicken Dinner', NULL, 5);

-- --------------------------------------------------------

--
-- Table structure for table `learns`
--

CREATE TABLE `learns` (
  `student_id` int NOT NULL,
  `course_code` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `learns`
--

INSERT INTO `learns` (`student_id`, `course_code`) VALUES
(44, 'CS88');

-- --------------------------------------------------------

--
-- Table structure for table `material`
--

CREATE TABLE `material` (
  `material_id` int NOT NULL,
  `material_type` varchar(50) NOT NULL,
  `material_name` varchar(50) DEFAULT NULL,
  `course_material` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `material`
--

INSERT INTO `material` (`material_id`, `material_type`, `material_name`, `course_material`) VALUES
(1, '.png', 'Screenshot_20210327_180947', 'CS88'),
(2, '.png', 'Screenshot_20210327_180947', 'CS88'),
(3, '.png', 'Screenshot_20210327_180947', 'CS88'),
(4, '.png', 'Screenshot_20210327_180947', 'CS88'),
(5, '.png', 'Screenshot_20200317_223147', 'CS88'),
(6, '.jpeg', '1610321429147', 'CS88'),
(7, '.pdf', 'Technical Writing', 'CS88');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `message_id` int NOT NULL,
  `conversation_id` int DEFAULT NULL,
  `text` text,
  `sent_time` datetime DEFAULT NULL,
  `sender_id` int DEFAULT NULL,
  `receiver_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`message_id`, `conversation_id`, `text`, `sent_time`, `sender_id`, `receiver_id`) VALUES
(12, 1, 'dasd', '2021-04-12 00:30:21', 44, 52),
(13, 1, 'Hi there', '2021-04-12 00:30:26', 44, 52),
(14, 1, 'hello', '2021-04-12 22:20:15', 52, 44),
(15, 1, 'hi', '2021-04-12 22:26:40', 52, 44),
(16, 1, 'hi', '2021-04-12 22:30:57', 52, 44),
(17, 1, 'what\'s up', '2021-04-12 22:31:17', 52, 44),
(18, 1, 'hi', '2021-04-12 22:31:30', 44, 52),
(19, 1, 'david', '2021-04-12 22:31:35', 44, 52),
(20, 1, 'Adham', '2021-04-12 22:31:55', 44, 52),
(21, 1, '1234', '2021-04-12 22:32:04', 52, 44),
(22, 1, 'david', '2021-04-12 22:32:46', 52, 44),
(23, 1, 'dj', '2021-04-12 22:32:50', 44, 52),
(24, 2, 'asdlas', '2021-04-12 22:33:03', 44, 43),
(25, 2, 'sadasdas', '2021-04-12 22:33:24', 44, 43),
(26, 1, 'dav', '2021-04-12 22:37:41', 52, 44),
(27, 2, 'sadasd', '2021-04-12 22:37:54', 44, 43),
(28, 1, 'hello', '2021-04-12 22:38:00', 52, 44),
(29, 1, 'Hello', '2021-04-12 22:48:04', 44, 52),
(30, 1, 'What\'s Up', '2021-04-12 22:48:47', 44, 52),
(31, 1, 'hello', '2021-04-12 22:49:17', 52, 44),
(32, 1, 'What\'s Up???!', '2021-04-12 22:49:32', 44, 52),
(33, 1, 'sdfsfsdf', '2021-04-12 22:50:56', 44, 52),
(34, 1, 'asdbaskj', '2021-04-12 22:53:40', 44, 52),
(35, 3, 'Hi', '2021-06-02 22:05:04', 33, 2),
(36, 4, 'Hello', '2021-06-02 22:05:16', 33, 5),
(37, 3, 'bye', '2021-06-02 22:05:21', 33, 2);

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `post_id` int NOT NULL,
  `post_writer` int DEFAULT NULL,
  `post_owner` int DEFAULT NULL,
  `post_text` mediumtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`post_id`, `post_writer`, `post_owner`, `post_text`) VALUES
(1, 2, 4, '1sst post'),
(2, 33, 4, '2nd post'),
(3, 44, 4, 'test post'),
(4, 44, 4, 'Hey-O'),
(5, 44, 4, 'David'),
(6, 44, 4, 'DJ Man\n'),
(7, 44, 2, 'Hiiiii'),
(8, 44, 2, 'Hey-O'),
(9, 44, 2, 'What\'s Up???'),
(10, 44, NULL, 'David'),
(11, 44, 2, 'Hey-oooooo'),
(12, 44, 2, 'What is going on'),
(13, 44, 2, 'Sonic'),
(14, 44, 4, 'Sonic'),
(15, 44, 4, 'Spider'),
(16, 44, 4, 'Mega'),
(17, 44, 4, 'Man'),
(18, 44, 4, 'Ben 10\n'),
(19, 44, 4, 'Zezoooooooooo'),
(20, 44, 1, 'Why I am here');

-- --------------------------------------------------------

--
-- Table structure for table `post_commenter`
--

CREATE TABLE `post_commenter` (
  `comment_id` int NOT NULL,
  `commenter_id` int DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  `comment_text` mediumtext,
  `created_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `post_commenter`
--

INSERT INTO `post_commenter` (`comment_id`, `commenter_id`, `post_id`, `comment_text`, `created_date`) VALUES
(1, 44, 1, 'dAVID', '2021-04-08 18:56:50'),
(2, 44, 1, 'David', '2021-04-08 18:57:02');

-- --------------------------------------------------------

--
-- Table structure for table `post_liker`
--

CREATE TABLE `post_liker` (
  `liker_id` int NOT NULL,
  `post_id` int NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `post_liker`
--

INSERT INTO `post_liker` (`liker_id`, `post_id`) VALUES
(5, 1),
(33, 1),
(43, 1),
(5, 2),
(44, 2),
(44, 3),
(44, 15);

-- --------------------------------------------------------

--
-- Table structure for table `post_owner`
--

CREATE TABLE `post_owner` (
  `owner_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `post_owner`
--

INSERT INTO `post_owner` (`owner_id`) VALUES
(1),
(2),
(3),
(4),
(5);

-- --------------------------------------------------------

--
-- Table structure for table `Prerequiste`
--

CREATE TABLE `Prerequiste` (
  `course_code` varchar(5) NOT NULL,
  `pre_course_id` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `professor`
--

CREATE TABLE `professor` (
  `user_id` int NOT NULL,
  `scientific_degree` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `professor`
--

INSERT INTO `professor` (`user_id`, `scientific_degree`) VALUES
(5, 'PHD doctorate'),
(52, ''),
(53, '');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `question_id` int NOT NULL,
  `question` varchar(50) NOT NULL,
  `mark` int DEFAULT NULL,
  `exam_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `student_id` int NOT NULL,
  `exam_id` int NOT NULL,
  `mark` float NOT NULL,
  `out_of_mark` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `results`
--

INSERT INTO `results` (`student_id`, `exam_id`, `mark`, `out_of_mark`) VALUES
(33, 1, 65, 90),
(33, 5, 70, 85);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `user_id` int NOT NULL,
  `student_year` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`user_id`, `student_year`) VALUES
(33, 4),
(43, 4),
(44, 3),
(54, 1),
(56, 1);

-- --------------------------------------------------------

--
-- Table structure for table `student_answers`
--

CREATE TABLE `student_answers` (
  `student_answer_id` int NOT NULL,
  `student_question_id` int DEFAULT NULL,
  `student_answer` varchar(50) NOT NULL,
  `correct_answer` tinyint(1) DEFAULT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `student_group_relation`
--

CREATE TABLE `student_group_relation` (
  `group_id` int NOT NULL,
  `student_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `student_group_relation`
--

INSERT INTO `student_group_relation` (`group_id`, `student_id`) VALUES
(1, 44);

-- --------------------------------------------------------

--
-- Table structure for table `student_questions`
--

CREATE TABLE `student_questions` (
  `student_id` int DEFAULT NULL,
  `question_id` int DEFAULT NULL,
  `student_question_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `teaches`
--

CREATE TABLE `teaches` (
  `professor_id` int NOT NULL,
  `course_code` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `teaches`
--

INSERT INTO `teaches` (`professor_id`, `course_code`) VALUES
(5, '123'),
(5, 'CS88'),
(52, 'CS88'),
(5, 'CSE4');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `national_id` varchar(50) NOT NULL,
  `birthday` date NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `picture` varchar(255) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `name`, `email`, `national_id`, `birthday`, `password`, `picture`) VALUES
(2, 'Adham Nour', 'Adhoom@eng.asu.edu.eg', 'oig39inn', '1999-02-02', NULL, ''),
(5, 'Ashraf Salem', 'Ashroof@eng.com', '3759uewfbi', '1960-01-01', NULL, ''),
(33, 'Hema Shoukry', 'hema@mam.com', 'zijwoewj', '1990-01-01', 'komg', ''),
(43, 'Ziad Tarek', 'ziadtht@yahoo.com', 'poe932y', '1950-01-01', 'pbkdf2:sha256:150000$oNidVhs0$fff38c1560d4cb688290161aa42e83c6751194b14af5d924a897d486b87867e5', ''),
(44, 'd', 'd', 'd', '1998-07-24', 'pbkdf2:sha256:150000$W2K7kzzQ$da49b04c24eeb38dfc18331ff11d6bffd9be2033a2d775d6637fa6af750ad7cd', ''),
(45, 'evevw', 'ever', 'tg4t4', '1999-01-01', 'pbkdf2:sha256:150000$82XOuxa3$7a79237615a505044d45ba1bb6c8e843eb7a54537fb04ab8abb7ee553a370fbc', ''),
(47, 'd', 'dd', 'dd', '1999-01-01', 'pbkdf2:sha256:150000$ZgcLoTJh$185f4d5512f1c5a4a254cfc59ff255c71b8ad7554afd355c25422bd4e4f1212e', ''),
(52, 'David John', 'd@d.dd', '12121212121212', '2021-04-02', 'pbkdf2:sha256:150000$dKX3qmJF$7ac8b7cebb0b73a4c39a97d070e5d6059e98e3c260457bb2255d851eb8072d2c', ''),
(53, 'D', 'D@D.dj', '14141141414114', '2021-04-03', 'pbkdf2:sha256:150000$C3raZb82$46878b45714eaa16eb78fafccec804404e9980c2794e4fe4344b738f10e28f95', ''),
(54, 'david', 'djman', '1236985478563', '1998-05-14', 'pbkdf2:sha256:150000$0VTbny1v$c21671b63a1f106fbb28f2c962c2dd7b765a8eece9414695df647000ecf2296f', ''),
(56, 'david', 'djman', '1836985478563', '1998-05-14', 'pbkdf2:sha256:150000$pJh9Auay$e2bf77b26acd59e69c1c90544ab61f4b11bc1b065b05b34041d8ed0648c2671a', ''),
(57, 'david', 'djman2', '2836985478563', '1998-05-14', 'pbkdf2:sha256:150000$BE0iL5J1$46b2cd791de56dc5d7b5dffa7d20ea7678eb0a6377b346a3d5ec4bec69b6d089', 'https://www.denofgeek.com/wp-content/uploads/2021/01/Demon-Slayer-Kimetsu-No-Yaiba-Season-1-Tanjiro-Attack-Collage.jpg?resize=768%2C432'),
(71, 'david', 'djman2', '2888885478563', '1998-05-14', 'pbkdf2:sha256:150000$m6aOk4lF$d0c6e5dbbededad99971a1b93f3ffd88b050fb24057222d964ca908e600a081f', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`answer_id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `conversations`
--
ALTER TABLE `conversations`
  ADD PRIMARY KEY (`conversation_id`),
  ADD KEY `first_user` (`first_user`),
  ADD KEY `second_user` (`second_user`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`course_code`),
  ADD UNIQUE KEY `group_number` (`group_number`),
  ADD KEY `post_owner_idx` (`post_owner_id`);

--
-- Indexes for table `deliver`
--
ALTER TABLE `deliver`
  ADD PRIMARY KEY (`delivers_id`),
  ADD KEY `deliverable_id` (`deliverable_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `deliverable`
--
ALTER TABLE `deliverable`
  ADD PRIMARY KEY (`deliverable_id`),
  ADD KEY `course_deliverables` (`course_deliverables`);

--
-- Indexes for table `deliverables_results`
--
ALTER TABLE `deliverables_results`
  ADD PRIMARY KEY (`deliverable_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`event_id`),
  ADD KEY `course_code` (`course_code`);

--
-- Indexes for table `exams`
--
ALTER TABLE `exams`
  ADD PRIMARY KEY (`exam_id`),
  ADD UNIQUE KEY `event_id` (`event_id`);

--
-- Indexes for table `finish`
--
ALTER TABLE `finish`
  ADD PRIMARY KEY (`course_code`,`student_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `group_deliverable_relation`
--
ALTER TABLE `group_deliverable_relation`
  ADD PRIMARY KEY (`group_id`,`deliverable_id`),
  ADD KEY `deliverable_id` (`deliverable_id`);

--
-- Indexes for table `group_project`
--
ALTER TABLE `group_project`
  ADD PRIMARY KEY (`group_id`),
  ADD KEY `post_owner_idx` (`post_owner_id`);

--
-- Indexes for table `learns`
--
ALTER TABLE `learns`
  ADD PRIMARY KEY (`student_id`,`course_code`),
  ADD KEY `course_code` (`course_code`);

--
-- Indexes for table `material`
--
ALTER TABLE `material`
  ADD PRIMARY KEY (`material_id`),
  ADD KEY `course_material` (`course_material`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `conversation_id` (`conversation_id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `post_writer` (`post_writer`),
  ADD KEY `post_owner` (`post_owner`);

--
-- Indexes for table `post_commenter`
--
ALTER TABLE `post_commenter`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `commenter_id` (`commenter_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `post_liker`
--
ALTER TABLE `post_liker`
  ADD PRIMARY KEY (`liker_id`,`post_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `post_owner`
--
ALTER TABLE `post_owner`
  ADD PRIMARY KEY (`owner_id`);

--
-- Indexes for table `Prerequiste`
--
ALTER TABLE `Prerequiste`
  ADD PRIMARY KEY (`course_code`,`pre_course_id`),
  ADD KEY `pre_course_id` (`pre_course_id`);

--
-- Indexes for table `professor`
--
ALTER TABLE `professor`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`question_id`),
  ADD UNIQUE KEY `question` (`question`,`exam_id`),
  ADD KEY `exam_id` (`exam_id`);

--
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`student_id`,`exam_id`),
  ADD KEY `exam_id` (`exam_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `student_answers`
--
ALTER TABLE `student_answers`
  ADD PRIMARY KEY (`student_answer_id`),
  ADD KEY `student_question_id` (`student_question_id`);

--
-- Indexes for table `student_group_relation`
--
ALTER TABLE `student_group_relation`
  ADD PRIMARY KEY (`group_id`,`student_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `student_questions`
--
ALTER TABLE `student_questions`
  ADD PRIMARY KEY (`student_question_id`),
  ADD UNIQUE KEY `student_id` (`student_id`,`question_id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `teaches`
--
ALTER TABLE `teaches`
  ADD PRIMARY KEY (`professor_id`,`course_code`),
  ADD KEY `course_code` (`course_code`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `national_id` (`national_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `answer_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `conversations`
--
ALTER TABLE `conversations`
  MODIFY `conversation_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `deliver`
--
ALTER TABLE `deliver`
  MODIFY `delivers_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `deliverable`
--
ALTER TABLE `deliverable`
  MODIFY `deliverable_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `event_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `exams`
--
ALTER TABLE `exams`
  MODIFY `exam_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `group_project`
--
ALTER TABLE `group_project`
  MODIFY `group_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `material`
--
ALTER TABLE `material`
  MODIFY `material_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `post_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `post_commenter`
--
ALTER TABLE `post_commenter`
  MODIFY `comment_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `post_owner`
--
ALTER TABLE `post_owner`
  MODIFY `owner_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `question_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `student_answers`
--
ALTER TABLE `student_answers`
  MODIFY `student_answer_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `student_questions`
--
ALTER TABLE `student_questions`
  MODIFY `student_question_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `conversations`
--
ALTER TABLE `conversations`
  ADD CONSTRAINT `conversations_ibfk_1` FOREIGN KEY (`first_user`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `conversations_ibfk_2` FOREIGN KEY (`second_user`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `post_owner` FOREIGN KEY (`post_owner_id`) REFERENCES `post_owner` (`owner_id`);

--
-- Constraints for table `deliver`
--
ALTER TABLE `deliver`
  ADD CONSTRAINT `deliver_ibfk_1` FOREIGN KEY (`deliverable_id`) REFERENCES `deliverable` (`deliverable_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `deliver_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `student` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `deliverable`
--
ALTER TABLE `deliverable`
  ADD CONSTRAINT `deliverable_ibfk_1` FOREIGN KEY (`course_deliverables`) REFERENCES `course` (`course_code`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `deliverables_results`
--
ALTER TABLE `deliverables_results`
  ADD CONSTRAINT `deliverables_results_ibfk_1` FOREIGN KEY (`deliverable_id`) REFERENCES `deliverable` (`deliverable_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `deliverables_results_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `student` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`course_code`) REFERENCES `course` (`course_code`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `exams`
--
ALTER TABLE `exams`
  ADD CONSTRAINT `exams_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `finish`
--
ALTER TABLE `finish`
  ADD CONSTRAINT `finish_ibfk_1` FOREIGN KEY (`course_code`) REFERENCES `course` (`course_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `finish_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `student` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `group_deliverable_relation`
--
ALTER TABLE `group_deliverable_relation`
  ADD CONSTRAINT `group_deliverable_relation_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `group_project` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `group_deliverable_relation_ibfk_2` FOREIGN KEY (`deliverable_id`) REFERENCES `deliverable` (`deliverable_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `group_project`
--
ALTER TABLE `group_project`
  ADD CONSTRAINT `post_owner_id` FOREIGN KEY (`post_owner_id`) REFERENCES `post_owner` (`owner_id`);

--
-- Constraints for table `learns`
--
ALTER TABLE `learns`
  ADD CONSTRAINT `learns_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `learns_ibfk_2` FOREIGN KEY (`course_code`) REFERENCES `course` (`course_code`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `material`
--
ALTER TABLE `material`
  ADD CONSTRAINT `material_ibfk_1` FOREIGN KEY (`course_material`) REFERENCES `course` (`course_code`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`conversation_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_3` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`post_writer`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `post_ibfk_2` FOREIGN KEY (`post_owner`) REFERENCES `post_owner` (`owner_id`) ON UPDATE CASCADE;

--
-- Constraints for table `post_commenter`
--
ALTER TABLE `post_commenter`
  ADD CONSTRAINT `post_commenter_ibfk_1` FOREIGN KEY (`commenter_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `post_commenter_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `post_liker`
--
ALTER TABLE `post_liker`
  ADD CONSTRAINT `post_liker_ibfk_1` FOREIGN KEY (`liker_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `post_liker_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Prerequiste`
--
ALTER TABLE `Prerequiste`
  ADD CONSTRAINT `Prerequiste_ibfk_1` FOREIGN KEY (`course_code`) REFERENCES `course` (`course_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Prerequiste_ibfk_2` FOREIGN KEY (`pre_course_id`) REFERENCES `course` (`course_code`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `professor`
--
ALTER TABLE `professor`
  ADD CONSTRAINT `professor_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`exam_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `results`
--
ALTER TABLE `results`
  ADD CONSTRAINT `results_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `results_ibfk_2` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`exam_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_answers`
--
ALTER TABLE `student_answers`
  ADD CONSTRAINT `student_answers_ibfk_1` FOREIGN KEY (`student_question_id`) REFERENCES `student_questions` (`student_question_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_group_relation`
--
ALTER TABLE `student_group_relation`
  ADD CONSTRAINT `student_group_relation_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `group_project` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_group_relation_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `student` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_questions`
--
ALTER TABLE `student_questions`
  ADD CONSTRAINT `student_questions_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_questions_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teaches`
--
ALTER TABLE `teaches`
  ADD CONSTRAINT `teaches_ibfk_1` FOREIGN KEY (`professor_id`) REFERENCES `professor` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teaches_ibfk_2` FOREIGN KEY (`course_code`) REFERENCES `course` (`course_code`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
