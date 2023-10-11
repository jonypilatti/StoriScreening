export const ValidateEmail = (email, errors, setErrors) => {
  console.log(email, "el email");
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (email.length === 0) {
    setErrors({ ...errors, email: null });
    return null;
  }
  if (!emailRegex.test(email)) {
    console.log("invalid email");
    setErrors({ ...errors, email: "Invalid email" });
    return "Invalid email address";
  }
  console.log("valid email");
  setErrors({ ...errors, email: null });
  return null;
};

function isValidName(name) {
  // Names can contain letters, spaces, and some special characters like hyphens or apostrophes
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ-' ]+$/;
  return nameRegex.test(name);
}

export function ValidateName(name, errors, setErrors) {
  if (name.length === 0) {
    setErrors({ ...errors, name: null });
    return null;
  }
  if (!isValidName(name)) {
    setErrors({ ...errors, name: "Invalid name" });
    return "Invalid name";
  }
  setErrors({ ...errors, name: null });
  return null;
}

export function ValidateLastName(lastName, errors, setErrors) {
  if (lastName.length === 0) {
    setErrors({ ...errors, lastName: null });
    return null;
  }
  if (!isValidName(lastName)) {
    setErrors({ ...errors, lastName: "Invalid last name" });
    return "Invalid last name";
  }
  setErrors({ ...errors, lastName: null });
  return null;
}
