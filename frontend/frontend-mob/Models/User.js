export const setNewUser = (user) => {
  let data = {
    name: user.UserName,
    email: user.Email,
    national_id: user.NationalID,
    birthday: user.Birthday,
    password: user.Password,
    role: user.Role
  };
  return data
};

export const setUser=(user)=>{
  let data = {
    Name: user.name,
    Email: user.email,
    NationalID: user.national_id,
    Birthday: user.birthday,
    ID: user.user_id,
    photo: user.photo
  };
  return data
}