const UserType = {
  admin: "admin",
  user: "user",
  guest: "guest",
};
Object.freeze(UserType);
let user = UserType.guest;

function setUserType(type) {
  user = type;
}

export { UserType, user, setUserType };
