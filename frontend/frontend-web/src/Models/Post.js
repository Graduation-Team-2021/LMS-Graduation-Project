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

export const setNewPost = (data, Title, userID, Name) => {
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
