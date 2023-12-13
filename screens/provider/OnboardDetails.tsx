import { useNavigation } from '@react-navigation/native';
import Stepper from 'common/Stepper';
import Header from 'components/common/Header';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { getWidth } from 'libs/StyleHelper';
import React, { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import ProviderDetail from 'components/provider/registration/views/ProviderDetail';
import ProviderAddress from 'components/provider/registration/views/ProviderAddress';
import ProviderPayment from 'components/provider/registration/views/ProviderPayment';
import ProviderServices from 'components/provider/registration/views/ProviderServices';
import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import ProviderAddServices from 'components/provider/registration/views/ProviderAddServices';

const OnboardDetails = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header title={t('registration')} />,
    });
  }, [navigation]);

  const { currentStep, providerProfile } = UseProviderUserContext();
  return (
    <View style={styles.container}>
      <Stepper
        currentStep={currentStep}
        totalStep={[
          'details',
          'address',
          'payment',
          providerProfile?.provider?.name?.en === 'Doctor' ||
          providerProfile?.provider?.name?.en === 'Nurse'
            ? 'services'
            : 'addServices',
        ]}
      />
      {currentStep === 'details' && <ProviderDetail />}
      {currentStep === 'address' && <ProviderAddress />}
      {currentStep === 'payment' && <ProviderPayment />}
      {currentStep === 'services' && <ProviderServices />}
      {currentStep === 'addServices' && <ProviderAddServices />}
    </View>
  );
};

export default OnboardDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: getWidth(dimens.marginM),
  },
});
