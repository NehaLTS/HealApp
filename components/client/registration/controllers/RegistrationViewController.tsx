import { useState } from "react";

const RegistrationViewController = () => {
  //TODO: add useRef pending
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return { email, setEmail, password, setPassword };
};

export default RegistrationViewController;
