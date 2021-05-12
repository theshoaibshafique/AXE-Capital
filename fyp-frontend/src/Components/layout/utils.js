export const app = {
  colorOne: "#3774ff",
  colorTwo: "#3774ff",
  colorThree: "#F7F7FE",
  colorFour: "#191919",
  padding: 30,
  radius: 50,
  tileRadius: 20,
};

export const css = {
  btn: {
    borderRadius: 40,
    textTransform: "none",
    padding: "8px 30px",
    "&:hover": {},
    fontWeight: 600,
    fontSize: 16,
  },
  btn2: {
    backgroundImage: "linear-gradient(90deg,#5F75D8,#8F78ED)",
    borderRadius: 40,
    textTransform: "none",
    padding: "8px 40px",
    color: "#fff",
    "&:hover": {},
    fontSize: 20,
  },
  justify: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
export const emailValidator = (email) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return "Email cannot be empty.";
  if (!re.test(email)) return "Ooops! We need a valid email address.";

  return "";
};

export const passwordValidator = (password) => {
  if (!password || password.length <= 0) return "Password cannot be empty.";

  return "";
};

export const nameValidator = (name) => {
  if (!name || name.length <= 0) return "Name cannot be empty.";

  return "";
};
