import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("LMS.db");

export function CreateTable() {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS course(course_code TEXT PRIMARY KEY NOT NULL, course_name TEXT , weekly_hours INTEGER , group_number INTEGER UNIQUE , max_students INTEGER , course_description TEXT , post_owner_id INTEGER ,FOREIGN KEY (post_owner_id) REFERENCES post_owner(owner_id) ON UPDATE CASCADE ON DELETE SET NULL );",
      [],
      (_, res) => {
        console.log("[creating is done with the result]", res);
      },
      (_, err) => {
        console.log("[failed there is an error]", err);
      }
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS deliverables_results(deliverable_id INTEGER  , user_ID INTEGER , mark INTEGER , PRIMARY KEY(deliverable_id,user_id), FOREIGN KEY (deliverable_id) REFERENCES deliverable(deliverable_id) ON UPDATE CASCADE ON DELETE CASCADE , FOREIGN KEY (user_id) REFERENCES student(user_id) ON UPDATE CASCADE ON DELETE CASCADE );",
      [],
      (_, res) => {
        console.log("[creating is done with the result]", res);
      },
      (_, err) => {
        console.log("[failed there is an error]", err);
      }
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS deliverables(deliverable_id INTEGER  , deliverable_name TEXT NOT NULL, student_number INTEGER NOT NULL ,description TEXT, mark INTEGER NOT NULL, deadline TEXT NOT NULL , course_deliverables TEXT NOT NULL , PRIMARY KEY(deliverable_id), FOREIGN KEY (course_deliverables) REFERENCES course(course_code) ON UPDATE CASCADE ON DELETE CASCADE );",
      [],
      (_, res) => {
        console.log("[creating is done with the result]", res);
      },
      (_, err) => {
        console.log("[failed there is an error]", err);
      }
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS events(event_id INTEGER  , event_name TEXT NOT NULL,event_description TEXT,  event_date TEXT NOT NULL , course_code TEXT NOT NULL , event_duration INTEGER NOT NULL , event_type TEXT NOT NULL , PRIMARY KEY(event_id), FOREIGN KEY (course_code) REFERENCES course(course_code) ON UPDATE CASCADE ON DELETE CASCADE );",
      [],
      (_, res) => {
        console.log("[creating is done with the result]", res);
      },
      (_, err) => {
        console.log("[failed there is an error]", err);
      }
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS group_project(group_id INTEGER , group_name TEXT , group_description TEXT, post_owner_id INTEGER, PRIMARY KEY(group_id), FOREIGN KEY (post_owner_id) REFERENCES post_owner(owner_id) ON UPDATE CASCADE ON DELETE SET NULL );",
      [],
      (_, res) => {
        console.log("[creating is done with the result]", res);
      },
      (_, err) => {
        console.log("[failed there is an error]", err);
      }
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS materials(material_id INTEGER , material_name TEXT , material_type TEXT NOT NULL, course_material TEXT NOT NULL, PRIMARY KEY(material_id), FOREIGN KEY (course_material) REFERENCES course(course_code) ON UPDATE CASCADE ON DELETE CASCADE );",
      [],
      (_, res) => {
        console.log("[creating is done with the result]", res);
      },
      (_, err) => {
        console.log("[failed there is an error]", err);
      }
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS post_owner(owner_id INTEGER PRIMARY KEY);",
      [],
      (_, res) => {
        console.log("[creating is done with the result]", res);
      },
      (_, err) => {
        console.log("[failed there is an error]", err);
      }
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS post(post_id INTEGER PRIMARY KEY , post_writer INTEGER ,post_owner INTEGER , post_text TEXT ,FOREIGN KEY (post_writer) REFERENCES user(user_id) ON UPDATE CASCADE , FOREIGN KEY (post_owner) REFERENCES post_owner(owner_id) ON UPDATE CASCADE  );",
      [],
      (_, res) => {
        console.log("[creating is done with the result]", res);
      },
      (_, err) => {
        console.log("[failed there is an error]", err);
      }
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS conversations(conversation_id INTEGER PRIMARY KEY , first_user INTEGER ,second_user INTEGER ,FOREIGN KEY (first_user) REFERENCES user(user_id) ON UPDATE CASCADE ON DELETE CASCADE , FOREIGN KEY (second_user) REFERENCES user(user_id) ON UPDATE CASCADE ON DELETE CASCADE );",
      [],
      (_, res) => {
        console.log("[creating is done with the result]", res);
      },
      (_, err) => {
        console.log("[failed there is an error]", err);
      }
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS messages(massage_id INTEGER PRIMARY KEY , conversation_id INTEGER ,sender_id INTEGER , receiver_id INTEGER, sent_time TEXT, text TEXT ,FOREIGN KEY (conversation_id) REFERENCES conversations(conversation_id) ON UPDATE CASCADE ON DELETE CASCADE , FOREIGN KEY (sender_id) REFERENCES user(user_id) ON UPDATE CASCADE ON DELETE CASCADE , FOREIGN KEY (receiver_id) REFERENCES user(user_id) ON UPDATE CASCADE ON DELETE CASCADE );",
      [],
      (_, res) => {
        console.log("[creating is done with the result]", res);
      },
      (_, err) => {
        console.log("[failed there is an error]", err);
      }
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS deliver(delivers_id INTEGER PRIMARY KEY , deliverable_id INTEGER ,student_id INTEGER , file_type TEXT, file_name TEXT,FOREIGN KEY (deliverable_id) REFERENCES deliverable(deliverable_id) ON UPDATE CASCADE ON DELETE CASCADE , FOREIGN KEY (student_id) REFERENCES user(user_id) ON UPDATE CASCADE ON DELETE CASCADE );",
      [],
      (_, res) => {
        console.log("[creating is done with the result]", res);
      },
      (_, err) => {
        console.log("[failed there is an error]", err);
      }
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS finish(course_code TEXT  , total_mark_in_the_cousre REAL ,student_id INTEGER ,PRIMARY KEY (course_code , student_id),FOREIGN KEY (course_code) REFERENCES course(course_code) ON UPDATE CASCADE ON DELETE CASCADE , FOREIGN KEY (student_id) REFERENCES user(user_id) ON UPDATE CASCADE ON DELETE CASCADE );",
      [],
      (_, res) => {
        console.log("[creating is done with the result]", res);
      },
      (_, err) => {
        console.log("[failed there is an error]", err);
      }
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS group_deliverable_relation(group_id INTEGER   ,deliverable_id INTEGER ,PRIMARY KEY (group_id,deliverable_id),FOREIGN KEY (group_id) REFERENCES group_project(group_id) ON UPDATE CASCADE ON DELETE CASCADE , FOREIGN KEY (deliverable_id) REFERENCES deliverable(deliverable_id) ON UPDATE CASCADE ON DELETE CASCADE );",
      [],
      (_, res) => {
        console.log("[creating is done with the result]", res);
      },
      (_, err) => {
        console.log("[failed there is an error]", err);
      }
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Prerequiste(course_code TEXT PRIMARY KEY ,pre_course_code TEXT,FOREIGN KEY (course_code) REFERENCES course(course_code) ON UPDATE CASCADE ON DELETE CASCADE , FOREIGN KEY (pre_course_code) REFERENCES course(course_code) ON UPDATE CASCADE ON DELETE CASCADE );",
      [],
      (_, res) => {
        console.log("[creating is done with the result]", res);
      },
      (_, err) => {
        console.log("[failed there is an error]", err);
      }
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS learns(student_id INTEGER  ,course_code TEXT ,mid_term_mark REAL ,final_exam_mark REAL ,PRIMARY KEY (student_id,course_code)  ,FOREIGN KEY (course_code) REFERENCES course(course_code) ON UPDATE CASCADE ON DELETE CASCADE , FOREIGN KEY (student_id) REFERENCES student(user_id) ON UPDATE CASCADE ON DELETE CASCADE );",
      [],
      (_, res) => {
        console.log("[creating is done with the result]", res);
      },
      (_, err) => {
        console.log("[failed there is an error]", err);
      }
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS post_commenter(comment_id INTEGER PRIMARY KEY ,comment_text TEXT ,commenter_id INTEGER ,post_id INTEGER , created_date TEXT ,FOREIGN KEY (commenter_id) REFERENCES user(user_id) ON UPDATE CASCADE  , FOREIGN KEY (post_id) REFERENCES post(post_id) ON UPDATE CASCADE ON DELETE CASCADE );",
      [],
      (_, res) => {
        console.log("[creating is done with the result]", res);
      },
      (_, err) => {
        console.log("[failed there is an error]", err);
      }
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS post_liker(liker_id INTEGER  ,created_date TEXT ,post_id INTEGER  ,PRIMARY KEY (liker_id,post_id)  ,FOREIGN KEY (liker_id) REFERENCES user(user_id) ON UPDATE CASCADE  , FOREIGN KEY (post_id) REFERENCES post(post_id) ON UPDATE CASCADE ON DELETE CASCADE );",
      [],
      (_, res) => {
        console.log("[creating is done with the result]", res);
      },
      (_, err) => {
        console.log("[failed there is an error]", err);
      }
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS student_group_relation(group_id INTEGER  ,student_id INTEGER  ,PRIMARY KEY (group_id,student_id)  ,FOREIGN KEY (group_id) REFERENCES group_project(group_id) ON UPDATE CASCADE ON DELETE CASCADE  , FOREIGN KEY (student_id) REFERENCES student(user_id) ON UPDATE CASCADE ON DELETE CASCADE );",
      [],
      (_, res) => {
        console.log("[creating is done with the result]", res);
      },
      (_, err) => {
        console.log("[failed there is an error]", err);
      }
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS teaches(professor_id INTEGER  ,course_code TEXT  ,PRIMARY KEY (professor_id,course_code)  ,FOREIGN KEY (professor_id) REFERENCES professor(user_id) ON UPDATE CASCADE ON DELETE CASCADE , FOREIGN KEY (course_code) REFERENCES course(course_code) ON UPDATE CASCADE ON DELETE CASCADE );",
      [],
      (_, res) => {
        console.log("[creating is done with the result]", res);
      },
      (_, err) => {
        console.log("[failed there is an error]", err);
      }
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS professor(user_id INTEGER PRIMARY KEY ,scientific_degree TEXT NOT NULL  ,FOREIGN KEY (user_id) REFERENCES user(user_id) ON UPDATE CASCADE ON DELETE CASCADE );",
      [],
      (_, res) => {
        console.log("[creating is done with the result]", res);
      },
      (_, err) => {
        console.log("[failed there is an error]", err);
      }
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS student(user_id INTEGER PRIMARY KEY NOT NULL,student_year INTEGER   ,FOREIGN KEY (user_id) REFERENCES user(user_id) ON UPDATE CASCADE ON DELETE CASCADE );",
      [],
      (_, res) => {
        console.log("[creating is done with the result]", res);
      },
      (_, err) => {
        console.log("[failed there is an error]", err);
      }
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS user(user_id INTEGER PRIMARY KEY ,name TEXT NOT NULL , email TEXT NOT NULL , birthday TEXT, password TEXT ,  picture TEXT );",
      [],
      (_, res) => {
        console.log("[creating is done with the result]", res);
      },
      (_, err) => {
        console.log("[failed there is an error]", err);
      }
    );
  });
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS message(massage_id INTEGER PRIMARY KEY ,sender_id INTEGER , receiver_id INTEGER, sent_time TEXT, text TEXT , FOREIGN KEY (sender_id) REFERENCES user(user_id) ON UPDATE CASCADE ON DELETE CASCADE , FOREIGN KEY (receiver_id) REFERENCES user(user_id) ON UPDATE CASCADE ON DELETE CASCADE );",
      [],
      (_, res) => {
        console.log("[creating is done with the result]", res);
      },
      (_, err) => {
        console.log("[failed there is an error]", err);
      }
    );
  });
}


// export function SQLSignIn(user_id, email, password, name, role) {
//   db.transaction((tx) => {
//     tx.executeSql(
//       `INSERT INTO user(user_id, email, password, name) VALUES (?,?,?,?);`,
//       [user_id, email, password, name],
//       (tx, res) => {
//         console.log("[insert is done with the result]", res);
//         if (role === "student") {
//           tx.executeSql(
//             `INSERT INTO student(user_id) VALUES (?);`,
//             [user_id],
//             (_, res) => {
//               console.log("[insert is done with the result]", res);
//             },
//             (_, err) => {
//               console.log("[failed there is an error]", err);
//             }
//           );
//         } else if (role == "professor") {
//           tx.executeSql(
//             `INSERT INTO professor(user_id) VALUES (?);`,
//             [user_id],
//             (_, res) => {
//               console.log("[insert is done with the result]", res);
//             },
//             (_, err) => {
//               console.log("[failed there is an error]", err);
//             }
//           );
//         }
//       },
//       (_, err) => {
//         console.log("[failed there is an error]", err);
//       }
//     );
//   });
// }

