export const userSignUpFormControl = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Please enter your user name",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Please enter your email",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Please enter your password",
    type: "password",
  },
];

export const userSignInFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Please enter your email",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Please enter your password",
    type: "password",
  },
];

export const initialSignUpFormData = {
  userName: "",
  email: "",
  password: "",
};

export const initialSignInFormData = {
  email: "",
  password: "",
};