import { useNavigation } from "@react-navigation/native";
import { useApiContext } from "contexts/useApiContext";
import BasicInformationController from "./BasicInformationController";

const RegistrationViewController = () => {
  const { onAuthSignUp } = useApiContext()
  const navigation = useNavigation()
  //TODO: add useRef pending
  // const [email, setEmail] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  const onPressSignUp = async (email: string, password: string) => {
    const res = await onAuthSignUp?.(email, password);
    console.log('resdsts', res)
    navigation.navigate('BasicInfo')
  }
  return { onPressSignUp };
};

export default RegistrationViewController;
