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
