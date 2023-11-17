import { useNavigation } from '@react-navigation/native';
import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import NavigationRoutes from 'navigator/NavigationRoutes';
import React from 'react';
import { useState } from 'react';
import useToast from 'components/common/useToast';
import { emailPattern, passwordPattern } from 'libs/utility/Utils';
import { setLocalData ,getLocalData} from 'libs/datastorage/useLocalStorage';
import { useTranslation } from 'react-i18next';

const RegistrationViewController = () => {
  const navigation = useNavigation();
  const { OnProviderCreateSignUp } = AuthServicesProvider();
  const { setToken, setUserId } = UseProviderUserContext();
  const { showToast, renderToast } = useToast();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const emailRef = React.useRef<any>('');
  const passwordRef = React.useRef<any>('');
  const deviceToken= getLocalData('USER')?.deviceToken
  const { t } = useTranslation();

  const onChangeEmail = (value: string) => {
    emailRef.current.value = value;
    validateEmail();
  };
  const onBlurEmail = () => {
    validateEmail();
  };

  const onChangePassword = (value: string) => {
    passwordRef.current.value = value;
    validatePassword();
  };
  const onBlurPassword = () => {
    validatePassword();
  };

  const isValidPassword = (password: string) => passwordPattern.test(password);

  const validateEmail = () => {
    if (!emailRef.current.value) setEmailError(t('email_required'));
    else if (!emailPattern.test(emailRef.current.value))
      setEmailError(t('invalid_email'));
    else setEmailError('');
  };

  const validatePassword = () => {
    if (!passwordRef.current.value) {
      setPasswordError(t('Provider_required'));
    } else if (passwordRef.current.value.length < 5) {
      setPasswordError(t('must_be_8_characters'));
    } else if (!isValidPassword(passwordRef.current.value)) {
      setPasswordError(t(`password_must_have_special_character`));
    } else {
      setPasswordError('');
    }
  };
  const handleSignUp = () => {
    if (!emailError && !passwordError)
      onPressSignUpProvider(
        emailRef.current.value,
        passwordRef.current.value,
        deviceToken,
      );

    //  navigation.reset({
    //         index: 0,
    //         routes: [{ name: NavigationRoutes.ProviderOnboardDetails }],
    //       });
  };

  const onPressSignUpProvider = async (
    email: string,
    password: string,
    device_token: string,
  ) => {
    setIsLoading(true);
    if (email !== undefined && password != undefined) {
      const res = await OnProviderCreateSignUp({
        email,
        password,
        device_token,
      });

      console.log('response is ', res);

      //TODO change res.proivder_id to res.id
      if (res && res.token && res.id) {
        setToken(res.token);

        //SINCE ID IS NOT COMING WE WILL SET THIS AS OPTION
        // setUserId(res.id);

        setUserId(res.id);
      }

      setLocalData('USER', {
        token: res?.token,
        userId: res?.id,
        isClient: false,
      });
      setLocalData('USERPROFILE', {
        email: email,
      });

      if (res?.isSuccessful) {
        setTimeout(() => {
          //TODO: need to check this as it's a workaround for iOS
          navigation.reset({
            index: 0,
            routes: [{ name: NavigationRoutes.ProviderOnboardDetails }],
          });
        }, 200);
      } else {
        showToast(t('user_exist'), t('try_signin'), 'error');
      }
      setIsLoading(false);
    } else {
      setIsLoading(false);
      showToast('', t('email_or_password'), 'warning');
    }
  };
  return {
    handleSignUp,
    isLoading,
    renderToast,
    onChangeEmail,
    onBlurEmail,
    onBlurPassword,
    onChangePassword,
    emailError,
    emailRef,
    passwordError,
    passwordRef,
  };
};
export default RegistrationViewController;