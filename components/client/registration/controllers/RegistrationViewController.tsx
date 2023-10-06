import { useApiContext } from "contexts/useApiContext";
import BasicInformationController from "./BasicInformationController";

const RegistrationViewController = () => {
  const { onAuthSignUp } = useApiContext()
  //TODO: add useRef pending
  // const [email, setEmail] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  const onPressSignUp = async (email: string, password: string) => {
    const res = await onAuthSignUp?.(email, password);
    console.log('resdsts', res)
    BasicInformationController
  }
  return { onPressSignUp };
};

export default RegistrationViewController;
