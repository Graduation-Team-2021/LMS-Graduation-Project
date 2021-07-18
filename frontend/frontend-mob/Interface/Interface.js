import axios from "axios";
import msngrskt from "../sockets/msngrskts";
export const azure = "http://lmsproj.centralus.cloudapp.azure.com:5000"; //NEVER CHANGE THIS CONSTANT
export const path = "http://192.168.1.68:5000";
import * as localStorage from "./sqllite";
import jwt from "jwt-decode";
import NetInfo from "@react-native-community/netinfo";
import jwtDecode from "jwt-decode";
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
    return res.data["posts"];
  }
  const result = localStorage.SQLGetRecentUserPosts(
    David.id,
    David.permissions
  ); //FIXME: need to be likend to the ProfileScreen
  return result;
};
//store in the local storage
export const getRecentEvent = async (Token, id) => {
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
  return res.data["event"];
};
//store in the local storage
export const getFinishedCourses = async (Token, id, role) => {
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
  return res.data["courses"];
};
//store in the local storage
export const getAllPosts = async (Token, owner) => {
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
  console.log("[getAllPosts]====================================");
  console.log(res.data["posts"]);
  console.log("[getAllPosts]====================================");
  return res.data["posts"];
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
  return res.data["course"];
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
  const res = await instance.get(`/materials/${material_id}/uri`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data["url"];
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
  console.log(res.data["conversations"]);
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
  const res = await instance.get(`/courses/search/${text}/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data.data;
};
//store in the local storage (Future Work)
export const searchGroups = async (text) => {
  const res = await instance.get(`/groups/search/${text}`, {
    headers: {
      "Content-Type": "application/json",
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

//change password
//get quizes  => should be stored in the local storage
//add quizes
//submit quizes // store in the local storage
//get grades // store in the local storage
//getDoctors
//get status
//BE_Enroll
//BE_G_Enroll
