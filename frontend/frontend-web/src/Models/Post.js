export const setLocationPost = (data, Title, userID) => {
  let Liked = false;
  for (let index = 0; index < data["likes"].length; index++) {
    if (data["likes"][index]["liker_id"] === userID) {
      Liked = true;
      break;
    }
  }
  let Post = {
    Name: data["name"],
    Location: Title,
    Title: `Post by ${data["name"]}`,
    Desc: data["post_text"],
    PostId: data["post_id"],
    Likes: data["likes"],
    isLiked: Liked,
    Comments: data["comments"],
  };
  return Post;
};

export const setNewPost = (data, Title, Name) => {
  let Post = {
    Name: Name,
    Location: Title,
    Title: `Post by ${Name}`,
    Desc: data,
    PostId: null,
    Likes: [],
    isLiked: false,
    Comments: [],
  };
  return Post;
};

export const setFullPost = (ele, ID) => {
  let Liked = false;
  for (const id in ele["likes"]) {
    if (ele['likes'][id]['liker_id'] === ID) {
      Liked = true;
      break;
    }
  }
  let data = {
    Name: ele["name"],
    Location: ele["owner_name"],
    Title: `Post by ${ele["name"]}, in ${ele["owner_name"]}`,
    Desc: ele["post_text"],
    PostId: ele["post_id"],
    Likes: ele["likes"],
    isLiked: Liked,
    Comments: ele["comments"],
  };
  return data
};

export const setFullUserPost = (ele, ID, Name) => {
  let Liked = false;
  for (var id in ele["likes"]) {
    if (ele['likes'][id]['liker_id'] === ID) {
      Liked = true;
      break;
    }
  }
  let data = {
    Name: Name,
    Location: ele["owner_name"],
    Title: `Post by ${Name}, in ${ele["owner_name"]}`,
    Desc: ele["post_text"],
    PostId: ele["post_id"],
    Likes: ele["likes"],
    isLiked: Liked,
    Comments: ele["comments"],
  };
  return data
};
