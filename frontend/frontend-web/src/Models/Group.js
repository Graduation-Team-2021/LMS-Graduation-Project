export const setGroup = (ele) => {
  let data = {
    Title: ele["group_name"],
    Desc: ele["group_description"],
    Post: ele["post_owner_id"],
  };
  return data;
};
