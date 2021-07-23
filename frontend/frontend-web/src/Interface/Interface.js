import axios from "axios";
import msngrskt from "../sockets/msngrskts";

export const getCancelToken = () => {
  return axios.CancelToken.source();
};

const azure = "http://lmsproj.centralus.cloudapp.azure.com:5000";

const local = "http://localhost:5000";

export const url = local;
const instance = axios.create({
  baseURL: url,
  //"http://localhost:5000",
});

//Template for all Functions
export const f1 = async () => {
  let users;
  users = (await instance.get("/users")).data.users;
  return users;
};

export const SignUp = async (Data) => {
  //TODO: use request result
  let res = await instance.post("/sign_up", Data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
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
  const res = await instance.get(`/my_courses`, {
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

export const getCurrentGroups = async (Token, cancel) => {
  const res = await instance.get(`/my_groups`, {
    cancelToken: cancel.token,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Token,
    },
  });
  if (res.data["status_code"] !== 200) {
    //TODO: Better Check
    return null;
  }
  return res.data["groups"];
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
export const getRecentPosts = async (Token, cancel) => {
  const res = await instance.get(`/first_10_posts`, {
    cancelToken: cancel.token,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Token,
    },
  });

  if (res.data["status_code"] !== 200) {
    //TODO: Better Check
    return null;
  }
  return res.data["posts"];
};

export const getRecentUserPosts = async (Token) => {
  const res = await instance.get("/my_posts", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Token,
    },
  });
  if (res.data["status_code"] !== 200) {
    //TODO: Better Check
    return null;
  }
  return res.data["posts"];
};

export const getRecentEvent = async (Token, id) => {
  const res = await instance.get(`/student/${id}/recent_events`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Token,
    },
  });
  if (res.data["status_code"] !== 200 && res.data["status_code"] !== 202) {
    //TODO: Better Check
    return null;
  }
  return res.data;
};

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
  return res.data["posts"];
};

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

  if (res.data["status_code"] !== 200) {
    //TODO: Better Check
    return null;
  }
  return res.data["post_id"];
};

export const getCourseByID = async (Token, CourseID) => {
  const res = await instance.get(`/courses/${CourseID}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Token,
    },
  });
  if (res.data["status_code"] !== 200) {
    //TODO: Better Check
    return null;
  }
  return res.data["course"];
};

export const uploadFile = async (Token, file, CourseID) => {
  let data = new FormData();
  data.append("file", file);
  const res = await instance.post(
    `/courses/${CourseID}/materials/upload`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + Token,
      },
    }
  );
  /* if(res.data['status_code']===200) return true
  else return false */
};

export const Like = async (Token, userID, postID) => {
  const res = await instance.post(`/like/${userID}/${postID}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Token,
    },
  });
};

export const UnLike = async (Token, userID, postID) => {
  const res = await instance.delete(`/like/${userID}/${postID}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Token,
    },
  });
};

export const Comment = async (Token, userID, postID, text) => {
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
  return res.data["conversations"];
};

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

export const getAllMessages = async (Token, otherID) => {
  const res = await instance.get(`/users/messages/${otherID}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Token,
    },
  });
  if (res.data["status_code"] !== 200) {
    return null;
  }
  res.data["messages"].reverse();
  return res.data["messages"];
};

export const sendMessage = async (Token, otherID, Data) => {
  msngrskt.emit("private message", { content: Data, to: otherID });
  const res = await instance.post(`/users/messages/${otherID}`, Data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Token,
    },
  });
};

export const getCourseStudents = async (id) => {
  const res = await instance.get(`/course/${id}/students`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
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
};

export const AddCourse = async (Data) => {
  const res = await instance.post("/courses", Data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data["status_code"] === 200;
};

export const AddGroup = async (Data, Token) => {
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
  return res.data["names"];
};

export const getDeliv = async (id, Token) => {
  var res;
  if (id) {
    res = await instance.get(`/courses/${id}/deliverable`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Token,
      },
    });
    return res.data.deliverables;
  } else {
    res = await instance.get(`/deliverables`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Token,
      },
    });
    return res.data["courses_deliverables"];
  }
};

export const getDelivByID = async (id, Token, gid) => {
  if (!gid) {
    const res = await instance.get(`/students/${Token}/deliverables/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.data;
  } else {
    const res = await instance.get(`/students/${gid}/deliverables/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.data;
  }
  /*return res.data["names"]; */
};

export const getDelivGroup = async (id) => {
  //TODO: get groups of deliverable
  const res = await instance.get(`/deliverable_groups/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data.groups;
};

export const SubmitGroup = async (id, data) => {
  //TODO: get groups of deliverable
  const res = await instance.post(`/deliverable_groups/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data.groups;
};

export const SubmitDelivByID = async (Token, data, data2) => {
  //TODO: Integrate the Deliverables backend
  console.log(data);
  var res = await instance.post(`/my_deliverables`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Token,
    },
  });
  const delivs = res.data["delivers_id"];
  console.log(delivs);
  for (let index = 0; index < delivs.length; index++) {
    let file = new FormData();
    file.append("file", data2[index]);
    res = await instance.post(
      `/my_deliverables/${delivs[index]}/upload`,
      file,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + Token,
        },
      }
    );
    return res.data;
  }
  /*return res.data["names"];*/
};

export const getQuizzes = async (id, Token) => {
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
  return res.data.exam;
};

export const getPDFs = async (id) => {
  //TODO: Integrate the PDFs backend
  const res = await instance.get(`/courses/${id}/materials/pdf`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  var materials = res.data["materials"];
  return materials;
};

export const getOnePDF = async (id) => {
  //TODO: Integrate the PDFs backend
  const res = await instance.get(`/materials/${id}/uri`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  var materials = res.data["url"];
  return materials;
};

export const getVideos = async (id) => {
  //TODO: Integrate the PDFs backend
  const res = await instance.get(`/courses/${id}/materials/videos`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  var materials = res.data["materials"];
  return materials;
};

export const getOneVideo = async (id) => {
  //TODO: Integrate the PDFs backend
  const res = await instance.get(`/materials/${id}/uri`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  var materials = res.data["url"];
  return materials;
};

export const AddNewDeliv = async (Data) => {
  //TODO: Integrate the Deliverables backend
  const res = await instance.post(`/deliverables`, Data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const updatePic = async (id, Pic) => {
  let data = new FormData();
  data.append("pic", Pic);
  const res = await instance.post(`/users/${id}/pic`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (res.status === 200) {
    return res.data;
  }
  return null;
};

export const getUser = async (id) => {
  const res = await instance.get(`/users/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
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

export const searchUsers = async (text) => {
  const res = await instance.get(`/users/search/${text}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data.data;
};
export const searchCourses = async (text, id) => {
  const res = await instance.get(`/courses/search/${text}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + id,
    },
  });
  return res.data.data;
};
export const searchGroups = async (text, id) => {
  const res = await instance.get(`/groups/search/${text}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + id,
    },
  });
  return res.data.data;
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
  if (res.data["status_code"] === 200) {
    return true;
  } else {
    return false;
  }
};

export const SubmitQuiz = async (Data) => {
  const res = await instance.post(`/submit_exam`, Data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.data["status_code"] === 200) {
    return true;
  } else {
    return false;
  }
};

export const getGradeSoFar = async (id) => {
  const res = await instance.get(`/student/${id}/finishedCourses`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data["courses"];
};

export const getDoctors = async () => {
  const res = await instance.get(`/professors`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const getStatus = async (id, Token) => {
  const res = await instance.get(`/course/${id}/status`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Token,
    },
  });
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
  if (res.data.status_code === 200) {
    return true;
  } else {
    return false;
  }
};

export const ExcelSignUp = async (Pic) => {
  let data = new FormData();
  data.append("file", Pic);
  const res = await instance.post(`/sign_up/excel`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
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
  if (res.data["status_code"] !== 200) {
    //TODO: Better Check
    return null;
  }
  return res.data["message"];
};

export const UpdateCourse = async (data) => {
  const res = await instance.put(`/courses/${data.course_code}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.data["status_code"] !== 200) {
    //TODO: Better Check
    return null;
  }
  return res.data["message"];
};

export const getStudentDeliver = async (id, Token) => {
  const res = await instance.get(`/students_deliverables/${id}`);
  return res.data.map((val) => ({
    group_name: val.name,
    status: "Delivered",
    mark: val.mark,
    id: id,
    user_id: val.user_id,
    notgraded: val.mark === null,
  }));
};

export const getSDbyID = async (id, Token, gid) => {
  const res = await instance.get(`/students/${gid}/deliverables/${id}`);
};

export const downloadD = async (did) => {
  const res = await instance.post(
    `/my_deliverables/${did}/download`,
    {},
    { responseType: "blob" }
  );
  return res.data;
};

export const SubmitDgrade = async (did, sid, mark) => {
  const res = await instance.post(
    `/students/${sid}/deliverable/${did}/results`,
    { mark: mark },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};

export const deleteFile = async (id) => {
  const res = await instance.delete(`/my_deliverables/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.data["status_code"] !== 200) {
    return null;
  }
  return res.data;
};

export const UpdateDelivByID = async (Token, data, data2) => {
  //TODO: Integrate the Deliverables backend
  var res = await instance.put(`/my_deliverables/${Token}`, {data:data}, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Token,
    },
  });
  if (res.data['status_code']===200) {
    let file = new FormData();
    file.append("file", data2);
    res = await instance.post(`/my_deliverables/${Token}/upload`, file, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + Token,
      },
    });
    return res.data;
  } else {
    return null;
  }
  /*return res.data["names"];*/
};
