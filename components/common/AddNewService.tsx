import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import { setLocalData } from 'libs/datastorage/useLocalStorage';
import { ProviderServices } from 'libs/types/UserType';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import Button from './Button';
import Input from './Input';
import Modal from './Modal';
import Text from './Text';
import TextButton from './TextButton';
import Loader from './Loader';

const AddNewService = ({
  isVisible,
  newService,
  setIsVisible,
}: {
  isVisible: boolean;
  newService: (i: ProviderServices[]) => void;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { t } = useTranslation();
  const { providerProfile, userId, setProviderServices, token } =
    UseProviderUserContext();
  const serviceNameRef = React.useRef<any>('');
  const priceRef = React.useRef<any>('');
  const descriptionRef = React.useRef<any>('');
  const { onCreateProviderServices, onGetUserAllServices } =
    AuthServicesProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState<ProviderServices[]>([]);
  const [service, setService] = useState<ProviderServices>();
  const [serviceError, setServiceError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const onBlurServiceName = () => validateServiceName();
  const onChangeServiceName = (value: string) =>
    (serviceNameRef.current.value = value);
  const onBlurPriceName = () => validatePrice();
  const onChangePriceName = (value: string) => (priceRef.current.value = value);
  const onBlurDescription = () => validateDescription();
  const onChangeDescription = (value: string) =>
    (descriptionRef.current.value = value);

  const validateServiceName = () => {
    if (!serviceNameRef.current.value) {
      setServiceError(t('service_required'));
    } else setServiceError('');
  };
  const validatePrice = () => {
    if (!priceRef.current.value) {
      setPriceError(t('price_required'));
    } else setPriceError('');
  };
  const validateDescription = () => {
    if (!descriptionRef.current.value) {
      setDescriptionError(t('description_required'));
    } else setDescriptionError('');
  };

  const getUserAllServices = async () => {
    setIsLoading(true);
    let response = await onGetUserAllServices({ provider_id: userId }, token);
    console.log('resp is ', response);
    if (response) {
      setServices(response);
      setProviderServices(response);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getUserAllServices();
  }, []);

  const saveService = async () => {
    if (
      serviceNameRef.current.value &&
      descriptionRef.current.value &&
      priceRef.current.value
    ) {
      let data = {
        name: { en: serviceNameRef.current.value, hi: '', he: '' },
        description: { en: descriptionRef.current.value, hi: '', he: '' },
        price: priceRef.current.value,
        id: -1,
      };

      setService({ ...(service as ProviderServices), ...data });
      setServices([...services, data]);
      newService([...services, data]);

      setIsLoading(true);
      let response = await onCreateProviderServices(
        {
          name: serviceNameRef.current.value,
          description: descriptionRef.current.value,
          price: priceRef.current.value,
          provider_id: userId,
          specialty_id: providerProfile?.speciality?.id,
        },
        token,
      );

      console.log('response add service is ', response);
      setLocalData('PROVIDERSERVICES', services);
      setIsLoading(false);
      setIsVisible(false);
    } else {
      Alert.alert(t('fill_all_details'));
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.8}
      backdropColor={colors.white}
    >
      <KeyboardAvoidingView
        keyboardVerticalOffset={-50}
        behavior={'padding'}
        style={styles.inputContainer}
      >
        <View style={styles.modalContent}>
          <Text style={styles.addService}>{t('add_service')}</Text>
          <Input
            placeholder={t('name_of_service')}
            onBlur={onBlurServiceName}
            onChangeText={onChangeServiceName}
            ref={serviceNameRef}
            defaultValue={service?.name?.en}
            inputValue={service?.name?.en ?? ''}
            errorMessage={serviceError}
            returnKeyType={'next'}
            onSubmitEditing={() => priceRef.current.focus()}
            onClearInputText={() => serviceNameRef.current.clear()}
          />
          <Input
            placeholder={t('price')}
            inputStyle={styles.input}
            onBlur={onBlurPriceName}
            onChangeText={onChangePriceName}
            ref={priceRef}
            defaultValue={service?.price?.toString() ?? ''}
            inputValue={service?.price?.toString() ?? ''}
            errorMessage={priceError}
            keyboardType="numeric"
            returnKeyType={'next'}
            onSubmitEditing={() => descriptionRef.current.focus()}
            onClearInputText={() => priceRef.current.clear()}
          />
          <Input
            placeholder={t('description')}
            inputStyle={styles.description}
            onBlur={onBlurDescription}
            onChangeText={onChangeDescription}
            ref={descriptionRef}
            multiline
            defaultValue={service?.description?.en}
            inputValue={service?.description?.en ?? ''}
            errorMessage={descriptionError}
            onClearInputText={() => descriptionRef.current.clear()}
            multiline
            numberOfLines={10}
            returnKeyType="done"
          />
          <Button
            title={t('save')}
            isPrimary
            isSmall
            width={getWidth(80)}
            style={{
              alignSelf: 'center',
              marginVertical: getHeight(dimens.sideMargin + dimens.marginS),
            }}
            onPress={saveService}
            fontSized={getWidth(15)}
            height={getHeight(45)}
          />
          <TextButton
            style={styles.skip}
            fontSize={getWidth(fontSize.textXl)}
            title={t('cancel')}
            onPress={() => setIsVisible(false)}
          />
        </View>
      </KeyboardAvoidingView>
      {isLoading && <Loader />}
    </Modal>
  );
};

export default AddNewService;

const styles = StyleSheet.create({
  container: {
    flex: 0.27,
    flexDirection: 'row',
    alignItems: 'center',
    gap: getHeight(dimens.marginM),
    marginHorizontal: getHeight(dimens.paddingL),
  },
  addicon: {
    height: getHeight(dimens.imageS + 8),
    width: getWidth(dimens.imageS),
    resizeMode: 'contain',
  },
  textAdd: {
    fontSize: getWidth(fontSize.textXl),
  },
  modalContent: {
    backgroundColor: colors.modal,
    borderRadius: getWidth(dimens.marginS),
    marginBottom: getHeight(dimens.imageS + dimens.imageXs),
    paddingTop: getHeight(dimens.sideMargin),
    paddingBottom: getHeight(dimens.paddingL),
  },
  input: {
    marginTop: getHeight(dimens.sideMargin + dimens.marginS),
  },
  description: {
    marginTop: getHeight(dimens.sideMargin + dimens.marginS),
    height: getHeight(dimens.imageM + dimens.paddingL + dimens.marginS),
    alignItems: 'flex-start',
    justifyContent: 'center',
    padddingTop: getHeight(dimens.marginS),
  },
  serviceContainer: {
    backgroundColor: colors.white,
    margin: getHeight(dimens.marginM),
    padding: getHeight(dimens.sideMargin),
    borderRadius: 5,
    marginTop: getHeight(dimens.marginS),
  },
  elevation: {
    elevation: getHeight(dimens.paddingS),
    shadowColor: colors.black,
  },
  inputContainer: {
    flex: 0.79,
  },
  addService: {
    textAlign: 'center',
    fontSize: getWidth(fontSize.textXl),
    marginBottom: getHeight(dimens.marginM),
  },
  skip: {
    alignSelf: 'center',
  },
});
