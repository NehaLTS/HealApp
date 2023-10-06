import { useNavigation } from "@react-navigation/native";
import { useApiContext } from "contexts/useApiContext";
import { Alert } from "react-native";
import BasicInformation from "../views/BasicInformation";

const RegistrationViewController = () => {
  const { onAuthSignUp } = useApiContext()
  const navigation = useNavigation()
  //TODO: add useRef pending
  // const [email, setEmail] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  const onPressSignUp = async (email: string, password: string) => {
    const res = await onAuthSignUp?.(email, password);
    if (res?.isSuccessful) {
      Alert.alert('User Already Exist.', "Please try SignIn")
    }
    else
      navigation.navigate('BasicInfo')
  }
  return { onPressSignUp };
};

export default RegistrationViewController;
