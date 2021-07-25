import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
const azure = "http://lmsproj.centralus.cloudapp.azure.com:5000";

const db = SQLite.openDatabase("LMS.db");

export function CreateTable() {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS course(course_code TEXT PRIMARY KEY NOT NULL, course_name TEXT , weekly_hours INTEGER , group_number INTEGER UNIQUE , max_students INTEGER , course_description TEXT , post_owner_id INTEGER, course_pic TEXT , final_mark INTERGER , mid_mark INTERGER ,FOREIGN KEY (post_owner_id) REFERENCES post_owner(owner_id) ON UPDATE CASCADE ON DELETE SET NULL );",
      [],
      (_, res) => {},
      (_, err) => {}
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS deliverables_results(deliverable_id INTEGER  , user_ID INTEGER , mark INTEGER , PRIMARY KEY(deliverable_id,user_id), FOREIGN KEY (deliverable_id) REFERENCES deliverable(deliverable_id) ON UPDATE CASCADE ON DELETE CASCADE , FOREIGN KEY (user_id) REFERENCES student(user_id) ON UPDATE CASCADE ON DELETE CASCADE );",
      [],
      (_, res) => {},
      (_, err) => {}
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS deliverables(deliverable_id INTEGER  , deliverable_name TEXT NOT NULL, student_number INTEGER NOT NULL ,description TEXT, mark INTEGER NOT NULL, deadline TEXT NOT NULL , course_deliverables TEXT NOT NULL , PRIMARY KEY(deliverable_id), FOREIGN KEY (course_deliverables) REFERENCES course(course_code) ON UPDATE CASCADE ON DELETE CASCADE );",
      [],
      (_, res) => {},
      (_, err) => {}
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS events(event_id INTEGER  , event_name TEXT NOT NULL,event_description TEXT,  event_date TEXT NOT NULL , course_code TEXT NOT NULL , event_duration INTEGER NOT NULL , event_type TEXT NOT NULL , PRIMARY KEY(event_id), FOREIGN KEY (course_code) REFERENCES course(course_code) ON UPDATE CASCADE ON DELETE CASCADE );",
      [],
      (_, res) => {},
      (_, err) => {}
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS group_project(group_id INTEGER , group_name TEXT , group_description TEXT, post_owner_id INTEGER,group_pic TEXT, PRIMARY KEY(group_id), FOREIGN KEY (post_owner_id) REFERENCES post_owner(owner_id) ON UPDATE CASCADE ON DELETE SET NULL );",
      [],
      (_, res) => {},
      (_, err) => {}
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS materials(material_id INTEGER , material_name TEXT , material_type TEXT NOT NULL, course_material TEXT NOT NULL,local_uri TEXT, course_pic TEXT , PRIMARY KEY(material_id), FOREIGN KEY (course_material) REFERENCES course(course_code) ON UPDATE CASCADE ON DELETE CASCADE );",
      [],
      (_, res) => {},
      (_, err) => {}
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS post_owner(owner_id INTEGER PRIMARY KEY);",
      [],
      (_, res) => {},
      (_, err) => {}
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS post(post_id INTEGER PRIMARY KEY , post_writer INTEGER ,post_owner INTEGER , post_text TEXT ,FOREIGN KEY (post_writer) REFERENCES user(user_id) ON UPDATE CASCADE , FOREIGN KEY (post_owner) REFERENCES post_owner(owner_id) ON UPDATE CASCADE  );",
      [],
      (_, res) => {},
      (_, err) => {}
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS conversations(conversation_id INTEGER PRIMARY KEY , first_user INTEGER ,second_user INTEGER ,FOREIGN KEY (first_user) REFERENCES user(user_id) ON UPDATE CASCADE ON DELETE CASCADE , FOREIGN KEY (second_user) REFERENCES user(user_id) ON UPDATE CASCADE ON DELETE CASCADE );",
      [],
      (_, res) => {},
      (_, err) => {}
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS messages(massage_id INTEGER PRIMARY KEY , conversation_id INTEGER ,sender_id INTEGER , receiver_id INTEGER, sent_time TEXT, text TEXT ,FOREIGN KEY (conversation_id) REFERENCES conversations(conversation_id) ON UPDATE CASCADE ON DELETE CASCADE , FOREIGN KEY (sender_id) REFERENCES user(user_id) ON UPDATE CASCADE ON DELETE CASCADE , FOREIGN KEY (receiver_id) REFERENCES user(user_id) ON UPDATE CASCADE ON DELETE CASCADE );",
      [],
      (_, res) => {},
      (_, err) => {}
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS deliver(delivers_id INTEGER PRIMARY KEY , deliverable_id INTEGER ,student_id INTEGER , file_type TEXT, file_name TEXT,FOREIGN KEY (deliverable_id) REFERENCES deliverable(deliverable_id) ON UPDATE CASCADE ON DELETE CASCADE , FOREIGN KEY (student_id) REFERENCES user(user_id) ON UPDATE CASCADE ON DELETE CASCADE );",
      [],
      (_, res) => {},
      (_, err) => {}
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS finish(course_code TEXT  , total_mark_in_the_cousre REAL ,student_id INTEGER ,PRIMARY KEY (course_code , student_id),FOREIGN KEY (course_code) REFERENCES course(course_code) ON UPDATE CASCADE ON DELETE CASCADE , FOREIGN KEY (student_id) REFERENCES user(user_id) ON UPDATE CASCADE ON DELETE CASCADE );",
      [],
      (_, res) => {},
      (_, err) => {}
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS group_deliverable_relation(group_id INTEGER   ,deliverable_id INTEGER ,PRIMARY KEY (group_id,deliverable_id),FOREIGN KEY (group_id) REFERENCES group_project(group_id) ON UPDATE CASCADE ON DELETE CASCADE , FOREIGN KEY (deliverable_id) REFERENCES deliverable(deliverable_id) ON UPDATE CASCADE ON DELETE CASCADE );",
      [],
      (_, res) => {},
      (_, err) => {}
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Prerequiste(course_code TEXT PRIMARY KEY ,pre_course_code TEXT,FOREIGN KEY (course_code) REFERENCES course(course_code) ON UPDATE CASCADE ON DELETE CASCADE , FOREIGN KEY (pre_course_code) REFERENCES course(course_code) ON UPDATE CASCADE ON DELETE CASCADE );",
      [],
      (_, res) => {},
      (_, err) => {}
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS learns(student_id INTEGER  ,course_code TEXT ,mid_term_mark REAL ,final_exam_mark REAL ,PRIMARY KEY (student_id,course_code)  ,FOREIGN KEY (course_code) REFERENCES course(course_code) ON UPDATE CASCADE ON DELETE CASCADE , FOREIGN KEY (student_id) REFERENCES student(user_id) ON UPDATE CASCADE ON DELETE CASCADE );",
      [],
      (_, res) => {},
      (_, err) => {}
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS post_commenter(comment_id INTEGER PRIMARY KEY  ,comment_text TEXT ,commenter_id INTEGER ,post_id INTEGER , created_date TEXT ,FOREIGN KEY (commenter_id) REFERENCES user(user_id) ON UPDATE CASCADE  , FOREIGN KEY (post_id) REFERENCES post(post_id) ON UPDATE CASCADE ON DELETE CASCADE );",
      [],
      (_, res) => {},
      (_, err) => {}
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS post_liker(liker_id INTEGER  ,created_date TEXT ,post_id INTEGER  ,PRIMARY KEY (liker_id,post_id)  ,FOREIGN KEY (liker_id) REFERENCES user(user_id) ON UPDATE CASCADE  , FOREIGN KEY (post_id) REFERENCES post(post_id) ON UPDATE CASCADE ON DELETE CASCADE );",
      [],
      (_, res) => {},
      (_, err) => {}
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS student_group_relation(group_id INTEGER  ,student_id INTEGER  ,PRIMARY KEY (group_id,student_id)  ,FOREIGN KEY (group_id) REFERENCES group_project(group_id) ON UPDATE CASCADE ON DELETE CASCADE  , FOREIGN KEY (student_id) REFERENCES student(user_id) ON UPDATE CASCADE ON DELETE CASCADE );",
      [],
      (_, res) => {},
      (_, err) => {}
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS teaches(professor_id INTEGER  ,course_code TEXT  ,PRIMARY KEY (professor_id,course_code)  ,FOREIGN KEY (professor_id) REFERENCES professor(user_id) ON UPDATE CASCADE ON DELETE CASCADE , FOREIGN KEY (course_code) REFERENCES course(course_code) ON UPDATE CASCADE ON DELETE CASCADE );"
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS professor(user_id INTEGER PRIMARY KEY ,scientific_degree TEXT   ,FOREIGN KEY (user_id) REFERENCES user(user_id) ON UPDATE CASCADE ON DELETE CASCADE );"
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS student(user_id INTEGER PRIMARY KEY NOT NULL,student_year INTEGER   ,FOREIGN KEY (user_id) REFERENCES user(user_id) ON UPDATE CASCADE ON DELETE CASCADE );"
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS user(user_id INTEGER PRIMARY KEY ,name TEXT NOT NULL , email TEXT  , birthday TEXT, password TEXT ,  picture TEXT );"
    );
  });
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS message(massage_id INTEGER PRIMARY KEY ,sender_id INTEGER , receiver_id INTEGER, sent_time TEXT, text TEXT , FOREIGN KEY (sender_id) REFERENCES user(user_id) ON UPDATE CASCADE ON DELETE CASCADE , FOREIGN KEY (receiver_id) REFERENCES user(user_id) ON UPDATE CASCADE ON DELETE CASCADE );"
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS group_course_relation(group_id INTEGER  , course_id TEXT, PRIMARY KEY(group_id,course_id), FOREIGN KEY (group_id) REFERENCES group_project(group_id) ON UPDATE CASCADE ON DELETE CASCADE , FOREIGN KEY (course_id) REFERENCES course(course_code) ON UPDATE CASCADE ON DELETE CASCADE );"
    );
  });
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS answers(answer_id INTEGER  , answer TEXT NOT NULL ,question_id INTEGER NOT NULL , right_answer INTEGER , PRIMARY KEY(answer_id), FOREIGN KEY (question_id) REFERENCES questions(question_id) ON UPDATE CASCADE ON DELETE CASCADE );"
    );
  });
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS exams(exam_id INTEGER  , course_id TEXT NOT NULL ,exam_marks INTEGER  , exam_duration TEXT , PRIMARY KEY(exam_id), FOREIGN KEY (course_id) REFERENCES course(course_code) ON UPDATE CASCADE ON DELETE CASCADE );"
    );
  });
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS questions(question_id INTEGER  , question TEXT NOT NULL ,mark INTEGER  ,exam_id INTEGER NOT NULL , PRIMARY KEY(question_id) , UNIQUE(question,exam_id), FOREIGN KEY (exam_id) REFERENCES exams(exam_id) ON UPDATE CASCADE ON DELETE CASCADE );"
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS results(student_id INTEGER  , out_of_mark REAL NOT NULL ,mark REAL NOT NULL  ,exam_id INTEGER NOT NULL , PRIMARY KEY(student_id,exam_id) , FOREIGN KEY (student_id) REFERENCES student(user_id) ON UPDATE CASCADE ON DELETE CASCADE , FOREIGN KEY (exam_id) REFERENCES exams(exam_id) ON UPDATE CASCADE ON DELETE CASCADE);"
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS student_answers(student_answer_id INTEGER  , student_question_id INTEGER  ,student_answer TEXT NOT NULL  ,correct_answer INTEGER  , PRIMARY KEY(student_answer_id) , FOREIGN KEY (student_question_id) REFERENCES student_questions(student_question_id) ON UPDATE CASCADE ON DELETE CASCADE );"
    );
  });

  db.transaction((tx) => {
    tx.executeSql();
  });
}

export function SQLGetCurrentCourse(user_id, role) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      if (role === "student") {
        tx.executeSql(
          "SELECT * FROM course, learns, teaches, user WHERE course.course_code=learns.course_code AND learns.student_id=? AND teaches.course_code=course.course_code AND teaches.professor_id=user.user_id; ",
          [user_id],
          (_, res) => {
            //TODO: GET Professors as ARRAY
            let result = [];
            for (let index = 0; index < res.rows.length; index++) {
              result.push(res.rows.item(index));
            }
            resolve(result);
          },
          (_, err) => {
            reject(err);
          }
        );
      } else {
        tx.executeSql(
          "SELECT * FROM course, teaches, user WHERE course.course_code=teaches.course_code AND teaches.professor_id=? AND teaches.professor_id=user.user_id; ",
          [user_id],
          (_, res) => {
            //TODO: GET Professors as ARRAY
            let result = [];
            for (let index = 0; index < res.rows.length; index++) {
              result.push(res.rows.item(index));
            }
            resolve(result);
          },
          (_, err) => {
            reject(err);
          }
        );
      }
    });
  });
}

//call SQL

export function SQLInsertCurrentCourse(courses, user_id, role) {
  db.transaction((tx) => {
    courses.forEach((element) => {
      tx.executeSql(
        "INSERT OR REPLACE INTO course(course_code,course_name,post_owner_id,course_description) VALUES (?,?,?,?);",
        [
          element.course_code,
          element.course_name,
          element.post_owner_id,
          element.course_description,
        ],
        (tx, res) => {},
        (tx, err) => {}
      );
      element.professors.forEach((prof) => {
        tx.executeSql(
          "INSERT OR REPLACE INTO professor(user_id) VALUES (?) ; ",
          [prof.user_id],
          (_, res) => {},
          (_, err) => {}
        );
        tx.executeSql(
          "INSERT OR REPLACE INTO user(user_id,name) VALUES (?,?) ; ",
          [prof.user_id, prof.name]
        );
        tx.executeSql(
          "INSERT OR REPLACE INTO teaches(course_code,professor_id) VALUES (?,?);",
          [element.course_code, prof.user_id]
        );
      });
      if (role === "student") {
        tx.executeSql(
          "INSERT OR REPLACE INTO learns(course_code,student_id) VALUES (?,?);",
          [element.course_code, user_id]
        );
      }
    });
  });
}

export function SQLGetCurrentGroups(user_id, role) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      if (role === "student") {
        tx.executeSql(
          "SELECT * FROM group_project , student_group_relation WHERE group_project.group_id=student_group_relation.group_id AND student_group_relation.student_id = ?;",
          [user_id],
          (_, res) => {
            let result = [];
            for (let index = 0; index < res.rows.length; index++) {
              result.push(res.rows.item(index));
            }
            resolve(result);
          },
          (_, err) => reject(err)
        );
      } else {
        tx.executeSql(
          "SELECT * FROM group_project , group_course_relation, teaches WHERE group_project.group_id=group_course_relation.group_id AND group_course_relation.course_id = teaches.course_code AND teaches.professor_id = ?;",
          [user_id],
          (_, res) => {
            let result = [];
            for (let index = 0; index < res.rows.length; index++) {
              result.push(res.rows.item(index));
            }
            resolve(result);
          },
          (_, err) => reject(err)
        );
      }
    });
  });
}

export function SQLInsertCurrentGroups(user_id, role, groups) {
  return new Promise((resolve, reject) => {
    groups.forEach((value) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT OR REPLACE INTO group_project(group_id,group_name, group_description, post_owner_id) VALUES (?,?,?,?)",
          [
            value.group_id,
            value.group_name,
            value.group_description,
            value.post_owner_id,
          ],
          (tx2, res) => {
            if (role === "student") {
              tx2.executeSql(
                "INSERT OR REPLACE INTO student_group_relation (group_id, student_id) VALUES (?,?);",
                [value.group_id, user_id],
                (_, res) => {
                  resolve(res);
                },
                (_, err) => reject(err)
              );
            } else {
              tx2.executeSql(
                "INSERT OR REPLACE INTO group_course_relation (group_id, course_id) VALUES (?,?);",
                [value.group_id, value.course_id],
                (_, res) => {
                  resolve(res);
                },
                (_, err) => reject(err)
              );
            }
          },
          (_, err) => {}
        );
      });
    });
  });
}

export function SQLGetPdfs(course_code) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM materials , course WHERE materials.course_material = course.course_code AND course.course_code = ? ;",
        [course_code],
        (_, res) => {
          let result = [];
          for (let index = 0; index < res.rows.length; index++) {
            result.push(res.rows.item(index));
          }
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
}

export function SQLInsertPdfs(pdf) {
  db.transaction((tx) => {
    tx.executeSql("INSERT OR REPLACE INTO materials VALUES(?,?,?,?,?)", [
      pdf.material_id,
      pdf.material_name,
      pdf.material_type,
      pdf.course_material,
      pdf.local_uri,
    ]);
  });
}

export function SQLGetVideos(course_code) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM materials , course WHERE materials.course_material = course.course_code AND course.course_code = ? ;",
        [course_code],
        (_, res) => {
          let result = [];
          for (let index = 0; index < res.rows.length; index++) {
            result.push(res.rows.item(index));
          }
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
}

export function SQLGetUser(user_id) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM user WHERE user.user_id = ? ;",
        [user_id],
        (_, res) => {
          let result = [];
          for (let index = 0; index < res.rows.length; index++) {
            result.push(res.rows.item(index));
          }
          resolve(result[0]);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
}

export function SQLInsertUser(user) {
  db.transaction((tx) => {
    tx.executeSql("INSERT OR REPLACE INTO user VALUES(?,?,?,?,?,?)", [
      user.user_id,
      user.name,
      user.email,
      user.birthday,
      user.password,
      user.picture,
    ]);
  });
}
export function SQLGetRecentPosts(user_id, role) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      if (role === "student") {
        tx.executeSql(
          "SELECT * FROM course, learns, post_owner, post, post_liker, post_commenter WHERE post_commenter.post_id = post.post_id AND post_liker.post_id = post.post_id AND post.post_owner = post_owner.owner_id AND post_owner.owner_id = course.post_owner_id AND course.course_code = learns.course_code AND learns.student_id = ?;",
          [user_id],
          (tx2, res) => {
            const result = [];
            for (let index = 0; index < res.rows.length; index++) {
              result.push(res.rows.item(index));
            }
            tx2.executeSql(
              "SELECT * FROM group_project, student_group_relation, post_owner, post, post_liker, post_commenter WHERE post_commenter.post_id = post.post_id AND post_liker.post_id = post.post_id AND post.post_owner = post_owner.owner_id AND post_owner.owner_id = group_project.post_owner_id AND group_project.group_id=student_group_relation.group_id AND student_group_relation.student_id = ?;",
              [user_id],
              (_, res2) => {
                for (let index = 0; index < res2.rows.length; index++) {
                  result.push(res2.rows.item(index));
                }
                resolve(result);
              },
              (_, err) => reject(err)
            );
          },
          (_, err) => reject(err)
        );
      } else {
        tx.executeSql(
          "SELECT * FROM course, teaches, post_owner, post, post_liker, post_commenter WHERE post_commenter.post_id = post.post_id AND post_liker.post_id = post.post_id AND post.post_owner = post_owner.owner_id AND post_owner.owner_id = course.post_owner_id AND course.course_code=teaches.course_code AND teaches.professor_id = ?;",
          [user_id],
          (tx2, res) => {
            const result = [];
            for (let index = 0; index < res.rows.length; index++) {
              result.push(res.rows.item(index));
            }
            tx2.executeSql(
              "SELECT * FROM group_project, group_course_relation, course, post_owner, post, post_liker, post_commenter, teaches WHERE post_commenter.post_id = post.post_id AND post_liker.post_id = post.post_id AND post.post_owner = post_owner.owner_id AND post_owner.owner_id = group_project.post_owner_id AND group_project.group_id=group_course_relation.group_id AND group_course_relation.course_id = course.course_id AND course.course_code=teaches.course_code AND teaches.professor_id = ?;",
              [user_id],
              (_, res2) => {
                for (let index = 0; index < res.rows.length; index++) {
                  result.push(res2.rows.item(index));
                }
                resolve(result);
              },
              (_, err) => reject(err)
            );
          },
          (_, err) => reject(err)
        );
      }
    });
  });
}

export function SQLGetRecentUserPosts(user_id, role) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      if (role === "student") {
        tx.executeSql(
          "SELECT * FROM course, learns, post_owner, post, post_liker, post_commenter WHERE post_commenter.post_id = post.post_id AND post_liker.post_id = post.post_id AND post.post_owner = post_owner.owner_id AND post_owner.owner_id = course.post_owner_id AND course.course_code = learns.course_code AND post.post_writer = ?;",
          [user_id],
          (tx2, res) => {
            const result = [];
            for (let index = 0; index < res.rows.length; index++) {
              result.push(res.rows.item(index));
            }
            tx2.executeSql(
              "SELECT * FROM group_project, student_group_relation, post_owner, post, post_liker, post_commenter WHERE post_commenter.post_id = post.post_id AND post_liker.post_id = post.post_id AND post.post_owner = post_owner.owner_id AND post_owner.owner_id = group_project.post_owner_id AND group_project.group_id=student_group_relation.group_id AND post.post_writer = ?;",
              [user_id],
              (_, res2) => {
                for (let index = 0; index < res2.rows.length; index++) {
                  result.push(res2.rows.item(index));
                }
                resolve(result);
              },
              (_, err) => reject(err)
            );
          },
          (_, err) => reject(err)
        );
      } else {
        tx.executeSql(
          "SELECT * FROM course, teaches, post_owner, post, post_liker, post_commenter WHERE post_commenter.post_id = post.post_id AND post_liker.post_id = post.post_id AND post.post_owner = post_owner.owner_id AND post_owner.owner_id = course.post_owner_id AND course.course_code=teaches.course_code AND post.post_writer = ?;",
          [user_id],
          (tx2, res) => {
            const result = [];
            for (let index = 0; index < res.rows.length; index++) {
              result.push(res.rows.item(index));
            }
            tx2.executeSql(
              "SELECT * FROM group_project, group_course_relation, course, post_owner, post, post_liker, post_commenter, teaches WHERE post_commenter.post_id = post.post_id AND post_liker.post_id = post.post_id AND post.post_owner = post_owner.owner_id AND post_owner.owner_id = group_project.post_owner_id AND group_project.group_id=group_course_relation.group_id AND group_course_relation.course_id = course.course_id AND course.course_code=teaches.course_code AND post.post_writer = ?;",
              [user_id],
              (_, res2) => {
                for (let index = 0; index < res.rows.length; index++) {
                  result.push(res2.rows.item(index));
                }
                resolve(result);
              },
              (_, err) => reject(err)
            );
          },
          (_, err) => reject(err)
        );
      }
    });
  });
}

export function SQLInsertRecentPosts(posts) {
  return new Promise((resolve, reject) => {
    posts.forEach((value) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT OR REPLACE INTO post_owner(owner_id) VALUES (?)",
          [value.post_owner],
          (tx1, res) => {
            tx1.executeSql(
              "INSERT OR REPLACE INTO user(user_id, name) VALUES (?,?)",
              [value.post_writer, value.name],
              (tx2, res) => {
                tx2.executeSql(
                  "INSERT OR REPLACE INTO post(post_owner, post_id, post_text, post_writer) VALUES (?, ?, ?, ?)",
                  [
                    value.post_owner,
                    value.post_id,
                    value.post_text,
                    value.post_writer,
                  ],
                  (tx3, res) => {
                    value.likes.forEach((v2) => {
                      tx3.executeSql(
                        "INSERT OR REPLACE INTO user(user_id, name) VALUES (?,?)",
                        [v2.liker_id, v2.liker_name],
                        (tx4, res) => {
                          tx4.executeSql(
                            "INSERT OR REPLACE INTO post_liker(liker_id, post_id) VALUES (?,?)",
                            [v2.liker_id, value.post_id],
                            (_, res) => {},
                            (_, err) => {}
                          );
                        },
                        (_, err) => {}
                      );
                    });
                    value.comments.forEach((v2) => {
                      tx3.executeSql(
                        "INSERT OR REPLACE INTO user(user_id, name) VALUES (?,?)",
                        [v2.commenter_id, v2.commenter_name],
                        (tx4, res) => {
                          tx4.executeSql(
                            "INSERT OR REPLACE INTO post_commenter(comment_id, post_id, commenter_id, comment_text) VALUES (?,?,?,?)",
                            [
                              v2.comment_id,
                              value.post_id,
                              v2.commenter_id,
                              v2.comment_text,
                            ],
                            (_, res) => {},
                            (_, err) => {}
                          );
                        },
                        (_, err) => {}
                      );
                    });
                  },
                  (_, err) => {}
                );
              },
              (_, err) => {}
            );
          },
          (_, err) => {}
        );
      });
    });
  });
}
export function SQLInertVideos(video) {
  db.transaction((tx) => {
    tx.executeSql("INSERT OR REPLACE INTO materials() VALUES(?,?,?,?)", [
      video.material_id,
      video.material_name,
      video.material_type,
      video.course_material,
    ]);
  });
}

export function SQLGetAllMessages(user_id1, user_id2) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM messages , user , conversations  WHERE messages.sender_id = ? AND messages.receiver_id = ? AND conversations.conversation_id = messages.conversation_id AND messages.sender_id = user.user_id   ;",
        [user_id1, user_id2],
        (_, res) => {
          let result = [];
          for (let index = 0; index < res.rows.length; index++) {
            result.push(res.rows.item(index));
          }
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
}

export function SQLInsertMessages(message) {
  db.transaction((tx) => {
    tx.executeSql("INSERT OR REPLACE INTO messages VALUES(?,?,?,?,?,?)", [
      message.massage_id,
      message.conversation_id,
      message.sender_id,
      message.receiver_id,
      message.sent_time,
      message.text,
    ]);
  });
}

export function SQLGetCourseById(user_id, course_id) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      if (role === "student") {
        tx.executeSql(
          "SELECT * FROM course, learns, teaches, user WHERE course.course_code=learns.course_code AND learns.student_id=? AND course.course_code = ? AND teaches.course_code=course.course_code AND teaches.professor_id=user.user_id; ",
          [user_id, course_id]
        );
      }
    });
  });
}

export function SQLInsertCourse(course) {
  db.transaction((tx) => {
    tx.executeSql("INSERT OR REPLACE INTO course VALUES(?,?,?,?,?,?,?);", [
      course.course_code,
      course.course_name,
      course.weekly_hours,
      course.group_number,
      course.max_student,
      course.course_description,
      course.post_owner_id,
    ]);
  });
}

export function SQLGetAllPosts(user_id, owner) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM post_commenter , post_liker , post WHERE post_liker.liker_id = ? AND post.owner_id = ? AND post.post_id = post_liker.post_id AND post.post_id = post_commenter.post_id  ;",
        [user_id, owner],
        (_, res) => {
          let result = [];
          for (let index = 0; index < res.rows.length; index++) {
            result.push(res.rows.item(index));
          }
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
}

export function SQLInsertPosts(posts) {
  db.transaction((tx) => {
    posts.forEach((post) => {
      tx.executeSql("INSERT OR REPLACE INTO post VALUES(?,?,?,?)", [
        post.post_id,
        post.post_writer,
        post.post_owner,
        post.post_text,
      ]);
    });
  });
}

export function SQLGetConversation(user_id) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM  conversations , user , messages  WHERE ((conversations.first_user = ? AND conversations.second_user = user.user_id) OR (conversations.second_user = ? AND conversations.first_user = user.user_id)) AND conversation.conversation_id = messages.conversation_id;",
        [user_id],
        (tx2, res) => {
          let result = [];
          for (let index = 0; index < res.rows.length; index++) {
            result.push(res.rows.item(index));
          }
          resolve(result);
        }
      ),
        (_, err) => {
          reject(err);
        };
    });
  });
}
export function SQLGetFinishedCourses(user_id) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT course.course_code,finish.total_mark_in_the_cousre as course_mark,course.course_name FROM course,finish WHERE course.course_code=finish.course_code AND finish.student_id=?;",
        [user_id],
        (_, res) => {
          const result = [];
          for (let index = 0; index < res.rows.length; index++) {
            result.push(res.rows.item(index));
          }
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
}

export function SQLInsertFinishedCourses(finishedCourses, user_id) {
  db.transaction((tx) => {
    finishedCourses.forEach((element) => {
      tx.executeSql(
        "INSERT OR REPLACE INTO course(course_code,course_name) VALUES (?,?)",
        [element.course_code, element.course_name]
      );
      tx.executeSql(
        "INSERT OR REPLACE INTO finish (course_code,total_mark_in_the_cousre,student_id) VALUES (?,?,?)",
        [element.course_code, element.course_mark, user_id]
      );
    });
  });
}

export function SQLInsertIntoEvent(event) {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT OR REPLACE INTO events(event_id,event_name,event_date,course_code,event_type,event_duration,event_description) VALUES (?,?,?,?,?,?,?) ",
      [
        event.event_id,
        event.event_name,
        event.event_date,
        event.course_code,
        event.event_type,
        event.event_duration,
        event.event_description,
      ]
    );
  });
}

export function SQLGetEvent(student_id) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM events , course , learns  WHERE events.course_code = course.course_code AND learns.student_id = ? AND learns.course_code = course.course_code ",
        [student_id], //FIXME: add order by
        (_, res) => {
          resolve(res.rows.item(0));
        }
      );
    });
  });
}

export function SQLGetQuizzes(delv_id, user_id) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM deliverables , course , learns  WHERE learns.course_code = course.course_code AND learns.student_id = ? AND deliverables.deliverable_id = ? AND deliverable_id.course_deliverables = course.course_code ; ",
        [delv_id, user_id],
        (_, res) => {
          const result = [];
          for (let index = 0; index < res.rows.length; index++) {
            result.push(res.rows.item(index));
          }
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
}

export function SQLInsertQuiz(quiz) {
  db.transaction((tx) =>
    tx.executeSql("INSERT INTO deliverables VALUES (?,?,?,?,?,?,?) ;", [
      quiz.deliverable_id,
      quiz.deliverable_name,
      quiz.student_number,
      quiz.description,
      quiz.mark,
      quiz.deadline,
      quiz.course_deliverables,
    ])
  );
}

export function SQLGetQuizById(delv_id, user_id) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM deliverables , course , learns  WHERE learns.course_code = course.course_code AND learns.student_id = ? AND deliverables.deliverable_id = ? AND deliverable_id.course_deliverables = course.course_code ; ",
        [delv_id, user_id],
        (_, res) => {
          const result = [];
          for (let index = 0; index < res.rows.length; index++) {
            result.push(res.rows.item(index));
          }
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
}

export function SQLAddQuiz(quiz) {
  db.transaction((tx) =>
    tx.executeSql("INSERT INTO deliverables VALUES (?,?,?,?,?,?,?) ;", [
      quiz.deliverable_id,
      quiz.deliverable_name,
      quiz.student_number,
      quiz.description,
      quiz.mark,
      quiz.deadline,
      quiz.course_deliverables,
    ])
  );
}

export function SQLGetOnePdf(material_id) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM materials , course WHERE materials.course_material = course.course_code AND materials.material_id = ? ;",
        [material_id],
        (_, res) => {
          let result = [];
          for (let index = 0; index < res.rows.length; index++) {
            result.push(res.rows.item(index));
          }
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
}

export function SQLGetOneVideo(material_id) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM materials , course WHERE materials.course_material = course.course_code AND materials.material_id = ? ;",
        [material_id],
        (_, res) => {
          let result = [];
          for (let index = 0; index < res.rows.length; index++) {
            result.push(res.rows.item(index));
          }
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
}

export function SQLUpdatePic(user_id, pic) {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO user(picture) VALUES (?) WHERE user.user_id = ? ; ",
      [pic, user_id]
    );
  });
}

export function SQLChangePassword(user_id, password) {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO user(password) VALUES (?) WHERE user.user_id = ? ; ",
      [password, user_id]
    );
  });
}

export function SQLGetDoctors() {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM professor ;",
        [],
        (_, res) => {
          let result = [];
          for (let index = 0; index < res.rows.length; index++) {
            result.push(res.rows.item(index));
          }
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
}

export function SQLGetGroup() {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM group_project;",
        [],
        (_, res) => {
          let result = [];
          for (let index = 0; index < res.rows.length; index++) {
            result.push(res.rows.item(index));
          }
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
}

export function SQLGetDegree(prof_id) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM professor WHERE professor.user_id = ?;",
        [prof_id],
        (_, res) => {
          let result = [];
          for (let index = 0; index < res.rows.length; index++) {
            result.push(res.rows.item(index));
          }
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
}

export function SQLGetYear(stud_id) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM student WHERE student.user_id = ?;",
        [stud_id],
        (_, res) => {
          let result = [];
          for (let index = 0; index < res.rows.length; index++) {
            result.push(res.rows.item(index));
          }
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
}

export function SQLGetTeachedCourse(course_id) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM teaches , course WHERE  teaches.course_code = ? AND course.course_code = teaches.course_code ;",
        [course_id],
        (_, res) => {
          let result = [];
          for (let index = 0; index < res.rows.length; index++) {
            result.push(res.rows.item(index));
          }
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
}

// exculsign up

export function SQLogout() {

  db.transaction((tx) => {
    tx.executeSql(
      "SELECT name FROM sqlite_master WHERE type ='table'",
      [],
      (tx, res) => {
        for (let index = 0; index < res.rows.length; index++) {
          tx.executeSql(
            `DELETE FROM ${res.rows.item(index).name}`,
            [],
            (_, res) => {
              console.log(res);
            },
            (_, err) => {
              console.log(err);
            }
          );
        }
      },
      (_, err) => {
        console.log(err);
      }
    );
  });
}
