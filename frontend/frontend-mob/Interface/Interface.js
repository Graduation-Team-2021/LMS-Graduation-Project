import axios from "axios";
import msngrskt from "../sockets/msngrskts";
export const azure = "http://lmsproj.centralus.cloudapp.azure.com:5000"; //NEVER CHANGE THIS CONSTANT
export const path = "http://192.168.1.68:5000";
import * as localStorage from "./sqllite";
import jwt from "jwt-decode";
import * as FileSystem from "expo-file-system";
import NetInfo from "@react-native-community/netinfo";
import jwtDecode from "jwt-decode";
import sha256 from "crypto-js/sha512";

const instance = axios.create({
  baseURL: azure,
});
//Template for all Functions
export const f1 = async () => {
  let users;
  users = (await instance.get("/users")).data.users;
  return users;
};

export const SignUp = async (Data) => {
  //TODO: use request result
  console.log(Data["birthday"]);
  let res = await instance.post("/sign_up", Data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.data["status_code"] !== 200) {
    return null;
  }
  return 1;
};

export const Login = async (Data) => {
  const res = await instance.post("/login", Data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.data["status_code"] === 200) {
    return { Token: res.data["token"], name: res.data["name"] };
  } else {
    return null;
  }
};

export const getCurrentCourses = async (Token) => {
  let David = jwtDecode(Token);
  if ((await NetInfo.fetch()).isConnected) {
    const res = await instance.get(`/my_courses`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Token,
      },
    });
    if (res.data["status_code"] !== 200) {
      //TODO: Better Check
      //TODO: Signout
      return null;
    }
    localStorage.SQLInsertCurrentCourse(
      res.data["courses"],
      David.id,
      David.permissions
    );
    return res.data["courses"];
  }
  result = await localStorage.SQLGetCurrentCourse(David.id, David.permissions);
  return result;
};

export const getCurrentGroups = async (Token) => {
  let David = jwtDecode(Token);
  if ((await NetInfo.fetch()).isConnected) {
    const res = await instance.get(`/my_groups`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Token,
      },
    });

    if (res.data["status_code"] !== 200) {
      //TODO: Better Check
      return null;
    }
    localStorage.SQLInsertCurrentGroups(
      David.id,
      David.permissions,
      res.data.groups
    );
    return res.data["groups"];
  }
  // todo: Add Local Get Groups

  let result = await localStorage.SQLGetCurrentGroups(
    David.id,
    David.permissions
  );

  return result;
};
export const getCourses = async (Token) => {
  const res = await instance.get(`/courses`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Token,
    },
  });
  if (res.data["status_code"] !== 200) {
    //TODO: Better Check
    return null;
  }
  return res.data["courses"];
};

export const getRecentPosts = async (Token) => {
  let David = jwtDecode(Token);

  if ((await NetInfo.fetch()).isConnected) {
    const res = await instance.get(`/first_10_posts`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Token,
      },
    });
    if (res.data["status_code"] !== 200) {
      //TODO: Better Check
      return null;
    }
    localStorage.SQLInsertRecentPosts(res.data["posts"]);
    return res.data["posts"];
  }
  const result = await localStorage.SQLGetRecentPosts(
    David.id,
    David.permissions
  );

  return result;
};
//store in the local storage
export const getRecentUserPosts = async (Token) => {
  let David = jwtDecode(Token);
  if ((await NetInfo.fetch()).isConnected) {
    const res = await instance.get("/my_posts", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Token,
      },
    });
    console.log(res);
    if (res.data["status_code"] !== 200) {
      //TODO: Better Check
      return null;
    }
    localStorage.SQLInsertRecentPosts(res.data["posts"]);
    return res.data["posts"];
  }
  const result = await localStorage.SQLGetRecentUserPosts(
    David.id,
    David.permissions
  );

  return result;
};
//store in the local storage
export const getRecentEvent = async (Token, id) => {
  if ((await NetInfo.fetch()).isConnected) {
    const res = await instance.get(`/student/${id}/recent_events`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Token,
      },
    });
    if (res.data["status_code"] !== 200) {
      //TODO: Better Check
      return null;
    }
    localStorage.SQLInsertIntoEvent(res.data["event"]);
    return res.data["event"];
  }
  let result = await localStorage.SQLGetEvent(id);
  return result;
};
//store in the local storage
export const getFinishedCourses = async (Token, id, role) => {
  if ((await NetInfo.fetch()).isConnected) {
    const res = await instance.get(`/${role}/${id}/finishedCourses`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Token,
      },
    });
    if (res.data["status_code"] !== 200) {
      //TODO: Better Check
      return null;
    }
    localStorage.SQLInsertFinishedCourses(res.data["courses"], id);
    return res.data["courses"];
  }
  let result = await localStorage.SQLGetFinishedCourses(id);
  return result;
};
//store in the local storage
export const getAllPosts = async (Token, owner) => {
  let David = jwtDecode(Token);
  if ((await NetInfo.fetch()).isConnected) {
    const res = await instance.get(`/posts/by_owner_id/${owner}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Token,
      },
    });
    if (res.data["status_code"] !== 200) {
      //TODO: Better Check
      return null;
    }
    localStorage.SQLInsertPosts(res.data["posts"]);
    return res.data["posts"];
  }
  let result = await localStorage.SQLGetAllPosts(David.id, owner);
  return result;
};
//store in the local storage (Future Work)
export const uploadPost = async (Token, writer, owner, post) => {
  const res = await instance.post(
    `/posts/add_post`,
    {
      post_writer: writer,
      post_owner: owner,
      post_text: post,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Token,
      },
    }
  );
  console.log(res.data);
  if (res.data["status_code"] !== 200) {
    //TODO: Better Check
    return null;
  }
  return res.data["post_id"];
};
//store and load in the local storage   DONE
export const getCourseByID = async (Token, CourseID) => {
  let David = jwtDecode(Token);
  if ((await NetInfo.fetch()).isConnected) {
    const res = await instance.get(`/courses/${CourseID}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Token,
      },
    });

    if (res["status"] !== 200) {
      //TODO: Better Check
      return null;
    }
    console.log("[KAK]====================================");
    console.log(res.data["course"]);
    console.log("[KAK]====================================");
    localStorage.SQLInsertCourse(res.data["course"]);
    return res.data["course"];
  }
  const result = await localStorage.SQLGetCourseById(David.id, CourseID);
  return result;
};
//store in the local storage (Future work)
export const uploadFile = async (
  Token,
  file,
  CourseID,
  setUploadPercentage
) => {
  console.log(file);
  let data = new FormData();
  data.append("file", file);
  const res = await instance.post(
    `/courses/${CourseID}/materials/upload`,
    data,
    {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        setUploadPercentage(percent / 100);
      },
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + Token,
      },
    }
  );
};
//store in the local storage(Future work)
export const materialUri = async (material_id) => {
  if ((await NetInfo.fetch()).isConnected) {
    const res = await instance.get(`/materials/${material_id}/uri`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const kak = res.data["url"].split("/");
    const downloadResumable = FileSystem.createDownloadResumable(
      azure + res.data["url"], //azur/static/deepweb
      FileSystem.documentDirectory +
        sha256(res.data["url"]).toString() +
        "." +
        kak[6].split(".")[1] //filesystemdur/static/deepweb
    );
    downloadResumable.downloadAsync().then((result) => {
      localStorage.SQLInsertPdfs({
        material_id: material_id,
        course_material: kak[3],
        material_name: kak[6].split(".")[0],
        material_type: "." + kak[6].split(".")[1],
        local_uri: res.data["url"],
      });
    });
    return azure + res.data["url"];
  } else {
    const res = (await localStorage.SQLGetOnePdf(material_id))[0];
    return (
      FileSystem.documentDirectory + sha256(res.local_uri) + res.material_type
    );
  }
};
//store in the local storage (Future work)
export const Like = async (Token, userID, postID) => {
  const res = await instance.post(`/like/${userID}/${postID}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Token,
    },
  });
};
//store in the local storage (Future Work)
export const UnLike = async (Token, userID, postID) => {
  const res = await instance.delete(`/like/${userID}/${postID}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Token,
    },
  });
};
//store in the local storage (Future work)
export const Comment = async (Token, userID, postID, text) => {
  console.log(text);
  const res = await instance.post(
    `/comments/${userID}/${postID}`,
    { comment_text: text },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Token,
      },
    }
  );
};
//store in the local storage
export const getAllConversations = async (Token) => {
  const res = await instance.get("/users/messages", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Token,
    },
  });
  if (res.data["status_code"] !== 200) {
    return null;
  }
  console.log("[Michel]", res.data["conversations"]);
  return res.data["conversations"];
};
//store in the local storage(Future)
export const getAllUsers = async (Token) => {
  const res = await instance.get("/users", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Token,
    },
  });
  if (res.data["status_code"] !== 200) {
    return null;
  }
  return res.data["users"];
};
//store in the local storage  DONE
export const getAllMessages = async (Token, otherID) => {
  const res = await instance.get(`/users/messages/${otherID}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Token,
    },
  });
  console.log(res);
  if (res.data["status_code"] !== 200) {
    return null;
  }
  res.data["messages"].reverse();
  return res.data["messages"];
};
//store in the local storage (Future)
export const sendMessage = async (Token, otherID, Data) => {
  const res = await instance.post(`/users/messages/${otherID}`, Data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Token,
    },
  });
  msngrskt.emit("private message", { content: Data, to: otherID });
};

export const getCourseStudents = async (id) => {
  const res = await instance.get(`/course/${id}/students`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(res);
  return res.data["names"];
};
export const setCourseStudent = async (id, Data) => {
  const res = await instance.put(
    `/course/${id}/students`,
    { Data: Data },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(res);
};
//store in the local storage (Future)
export const AddCourse = async (Data) => {
  console.log(Data);
  const res = await instance.post("/courses", Data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data["status_code"] === 200;
};
//store in the local storage (Future)
export const AddGroup = async (Data, Token) => {
  console.log(Data);
  const res = await instance.post("/project-groups", Data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data["status_code"] === 200;
};

export const getStudentsByCourse = async (id) => {
  const res = await instance.get(`/course/${id}/students`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(res);
  return res.data["names"];
};

export const getAllDeliveredFilesByStudent = async (
  deliverable_id,
  student_id
) => {
  const res = await instance.get(
    `/students/${student_id}/deliverables/${deliverable_id}`,
    null,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};
export const getAllDeliverablesByDeliverableId = async (deliverable_id) => {
  const res = await instance.get(
    `/students_deliverables/${deliverable_id}`,
    null,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};

export const getAllCourseDeliverables = async (id, Token) => {
  instance.defaults.headers.common["Authorization"] = `Bearer ${Token}`;
  const res = await instance.get(`/courses/${id}/deliverable`, null, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data["deliverables"];
};

export const deleteDeliverable = async (deliverable_id) => {
  const res = await instance.delete(`deliverables/${deliverable_id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const studentsSubmissions = async (user_id, deliverable_id) => {
  const res = await instance.get(
    `/students/${user_id}/deliverables/${deliverable_id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};

export const uploadDeliverable = async (
  Token,
  file,
  delivers_id,
  setUploadPercentage
) => {
  let data = new FormData();
  data.append("file", file);
  const res = await instance.post(
    `/my_deliverables/${delivers_id}/upload`,
    data,
    {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        setUploadPercentage(percent / 100);
      },
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + Token,
      },
    }
  );
};

export const postNewDeliverable = async (Data) => {
  const res = await instance.post(`/deliverables`, Data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data["status_code"] === 200;
};

export const getDeliversRelation = async (deliverable_id, Token) => {
  const res = await instance.post(
    `/my_deliverables`,
    { deliverable_id: deliverable_id },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Token,
      },
    }
  );
  if (res.data["status_code"] !== 200) {
    //TODO: Better Check
    return null;
  }
  return res.data["delivers_id"];
};

export const getAllStudentsDeliverables = async (Token) => {
  const res = await instance.get("/deliverables", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Token,
    },
  });
  return res.data["courses_deliverables"];
};
//store in the local storage (Future Work)
export const deleteMaterial = async (material_id) => {
  const res = await instance.delete(`/materials/${material_id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
//store in the local storage     DONE
export const getPDFs = async (course_code) => {
  const res = await instance.get(`/courses/${course_code}/materials/pdf`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.data["status_code"] !== 200) {
    //TODO: Better Check
    return null;
  }
  return res.data["materials"];
};
//store in the local storage    DONE
export const getVideos = async (course_code) => {
  const res = await instance.get(`/courses/${course_code}/materials/videos`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.data["status_code"] !== 200) {
    //TODO: Better Check
    return null;
  }
  return res.data["materials"];
};
//store in the local storage(Future work)
export const searchUsers = async (text) => {
  const res = await instance.get(`/users/search/${text}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data.data;
};
//store in the local storage (Future Work)
export const searchCourses = async (text, id) => {
  const res = await instance.get(`/courses/search/${text}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + id,
    },
  });
  return res.data.data;
};
//store in the local storage (Future Work)
export const searchGroups = async (text, id) => {
  const res = await instance.get(`/groups/search/${text}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + id,
    },
  });

  return res.data.data;
};
//store in the local storage  DONE
export const getUser = async (id) => {
  const res = await instance.get(`/users/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};
export const getGradeSoFar = async (id) => {
  const res = await instance.get(`/student/${id}/finishedCourses`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data["courses"];
};

// new kkkkkk

export const getQuizzes = async (id, Token) => {
  //TODO: Integrate the Quizzes backend

  const res = await instance.get(`/exams_by_course/${id}/${Token}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = res.data;
  return result;
};

export const getQuizByID = async (id, Token) => {
  const res = await instance.get(`/exams/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Token,
    },
  });
  console.log(`Getting Quizzes of All Courses`);
  return res.data.exam;
};

export const AddQuiz = async (Data) => {
  const res = await instance.post(
    `/Courses/${Data.course_id}/exams`,
    { data: Data },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(res.data);
  if (res.data["status_code"] === 200) {
    return true;
  } else {
    return false;
  }
};
// ADHaM
export const SubmitQuiz = async (Data) => {
  const res = await instance.post(`/submit_exam`, Data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(res.data);
  if (res.data["status_code"] === 200) {
    return true;
  } else {
    return false;
  }
};

export const getOnePDF = async (id) => {
  //TODO: Integrate the PDFs backend
  const res = await instance.get(`/materials/${id}/uri`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(`Getting PDF of id: ${id}`);
  var materials = res.data["url"];
  return materials;
};

export const getOneVideo = async (id) => {
  //TODO: Integrate the PDFs backend
  const res = await instance.get(`/materials/${id}/uri`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(`Getting Video of id: ${id}`);
  var materials = res.data["url"];
  return materials;
};

export const updatePic = async (id, Pic) => {
  let data = new FormData();
  data.append("pic", Pic);
  const res = await instance.post(`/users/${id}/pic`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(res);
  if (res.status === 200) {
    return res.data;
  }
  return null;
};

export const changePassword = async (id, pass) => {
  const res = await instance.post(
    `/reset/password`,
    { user_id: id, password: pass },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};

export const getDoctors = async () => {
  const res = await instance.get(`/professors`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data['professors'];
};

export const getStatus = async (id, Token) => {
  const res = await instance.get(`/course/${id}/status`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Token,
    },
  });
  console.log(res.data);
  return res.data.status;
};

export const BE_Enroll = async (id, Token, cid) => {
  const res = await instance.post(
    `/student/${id}/courses`,
    { course_code: cid },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Token,
      },
    }
  );
  console.log(res.data);
  if (res.data.status_code === 200) {
    return true;
  } else {
    return false;
  }
};

export const BE_G_Enroll = async (cid, Token) => {
  const res = await instance.post(
    `group/${cid}/students`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Token,
      },
    }
  );
  console.log(res.data);
  if (res.data.status_code === 200) {
    return true;
  } else {
    return false;
  }
};
// adham
export const ExcelSignUp = async (Pic) => {
  let data = new FormData();
  data.append("file", Pic);
  const res = await instance.post(`/sign_up/excel`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(res);
  return res.data;
};

export const getGroups = async () => {
  const res = await instance.get(`/project-groups`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.data["status_code"] !== 200) {
    //TODO: Better Check
    return null;
  }
  return res.data["project_groups"];
};

export const getDegree = async (id) => {
  const res = await instance.get(`/professors/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.data["status_code"] !== 200) {
    //TODO: Better Check
    return null;
  }
  return res.data["professor"];
};

export const getYear = async (id) => {
  const res = await instance.get(`/students/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.data["status_code"] !== 200) {
    //TODO: Better Check
    return null;
  }
  return res.data["Student"];
};

export const getTeachedCourses = async (id) => {
  const res = await instance.get(`/professor/${id}/courses`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.data["status_code"] !== 200) {
    //TODO: Better Check
    return null;
  }
  return res.data["courses"];
};

export const AddNewEvent = async (data) => {
  const res = await instance.post(`/courses/${data.course_code}/events`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(res.data);
  if (res.data["status_code"] !== 200) {
    //TODO: Better Check
    return null;
  }
  return res.data["message"];
};

//change password
//get quizes  => should be stored in the local storage
//add quizes
//submit quizes // store in the local storage(future work)
//get grades // store in the local storage
//getDoctors
//get status
//BE_Enroll
//BE_G_Enroll
