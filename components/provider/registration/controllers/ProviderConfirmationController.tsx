import { useNavigation } from '@react-navigation/native';
import NavigationRoutes from 'navigator/NavigationRoutes';

const ProviderConfirmationController=()=>{
    const navigation = useNavigation();
    const onPressNext=()=>{
    
    navigation.reset({
      index: 0,
      routes: [{ name: NavigationRoutes.ProviderHome }],
    });
    }
return {
    onPressNext
}
}

export default ProviderConfirmationController