import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});
//Template for all Functions
export const f1 = async () => {
  let users;
  users = (await instance.get("/users")).data.users;
  return users;
};

export const signup = async (Data) => {
  //TODO: use request result
  await instance.post("/sign_up", Data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const login = async (Data) => {
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

export const getCurrentCourses = async (Token, id, role) => {
  const res = await instance.get(`/my_courses/${id}/${role}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return res.data;
};

export const getCurrentGroups = async (Token, id, role) => {
  const res = await instance.get(`/${role}/${id}/groups`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return res.data;
};
export const getCourses = async (Token) => {
  const res = await instance.get(`/courses`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return res.data;
};
export const getRecentPosts = async (Token, id) => {
  const res = await instance.get(`/${id}/first_10_posts`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  console.log(res.data);
  return res.data;
};

export const getRecentEvent = async (Token, id, role) => {
  const res = await instance.get(`/${role}/${id}/recent_events`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  console.log(res.data);
  return res.data;
};

export const getFinishedCourses = async (Token, id, role) => {
  const res = await instance.get(`/${role}/${id}/finishedCourses`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return res.data;
};

export const getAllPosts = async (Token, owner) => {
  const res = await instance.get(`/posts/by_owner_id/${owner}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return res.data;
};

export const uploadPost = async (Token, writer, owner, post) => {
  const res = await instance.post(
    `/posts/add_post`,
    {
      "post_writer": writer,
      "post_owner": owner,
      "post_text": post,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return res.data;
};
