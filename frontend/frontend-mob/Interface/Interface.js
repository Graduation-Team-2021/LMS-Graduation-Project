import axios from "axios";
import msngrskt from "../sockets/msngrskts";
export const azure = "http://lmsproj.centralus.cloudapp.azure.com:5000";

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

  console.log('[Interface:35]',res.data);
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

export const getCurrentGroups = async (Token, id, role) => {
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
export const getRecentPosts = async (Token) => {
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
  return res.data["posts"];
};

export const getRecentUserPosts = async (Token) => {
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
};

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
    console.log(res.data)
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

  if (res["status"] !== 200) {
    //TODO: Better Check
    return null;
  }
  return res.data["course"];
};

export const uploadFile = async (Token, file, CourseID) => {
  console.log(file);
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
};

  export const materialUri = async (material_id) => {
    const res = await instance.get(`/materials/${material_id}/uri`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data['url']
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
  console.log(res);
  if (res.data["status_code"] !== 200) {
    return null;
  }
  res.data["messages"].reverse();
  return res.data["messages"];
};

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

export const AddCourse = async (Data) => {
  console.log(Data);
  const res = await instance.post("/courses", Data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data["status_code"] === 200;
};

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

export const getAllCourseDeliverables = async (id) => {
  if (id) {
    console.log(`Getting Deliverables of Course ${id}`);
    const res = await instance.get(`/courses/${id}/deliverables`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data['deliverables']
  }
  else{
    console.log(`Getting Deliverables of All Courses`);
  }
};

export const postNewDeliverable = async (Data) => {
  const res = await instance.post(`/deliverables`, Data, {
    headers: {
      "Content-Type": "application/json"
    },
  });
  return res.data["status_code"] === 200;
};

export const getPDFs = async (course_code) => {
  const res = await instance.get(`/courses/${course_code}/materials/pdf`, {
    headers: {
      "Content-Type": "application/json"
    },
  });
  if (res.data["status_code"] !== 200) {
    //TODO: Better Check
    return null;
  }
  return res.data["materials"];
};

export const getVideos = async (course_code) => {
  const res = await instance.get(`/courses/${course_code}/materials/videos`, {
    headers: {
      "Content-Type": "application/json"
    },
  });
  if (res.data["status_code"] !== 200) {
    //TODO: Better Check
    return null;
  }
  return res.data["materials"];
};


export const AddNewDeliv = async (Data) => {
  //TODO: Integrate the PDFs backend
    /* const res = await instance.get(`/course/${id}/students`, {
      headers: {
        "Content-Type": "application/json",
      },
    }); */
    console.log(Data)
  /* console.log(res);
  return res.data["names"]; */
};
