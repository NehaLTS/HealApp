import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { SetStateAction, useEffect, useState } from 'react';
import { colors } from 'designToken/colors';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { dimens } from 'designToken/dimens';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import { UseUserContextProvider } from 'contexts/useUserContextProvider';
import { t } from 'i18next';
import Text from 'components/common/Text';

const ProviderServices = () => {
  const { onGetProviderService } = AuthServicesProvider();
  const { userDataProvider } = UseUserContextProvider();
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPrescriptionSelected, setIsPrescriptionSelected] = useState(false);
  const [isSigninSelected, setIsSigninSelected] = useState(true);

  const loginRegisterToggle = (val: number) => setIsSigninSelected(val === 1);

  const getProviderServices = async () => {
    setIsLoading(true);
    let response = await onGetProviderService({
      provider_id: '2',
      specialty_id: '1',
    });

    if (response && response.services) {
      setServices(response.services);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getProviderServices();
  }, []);
  const onCheckedPress = (index: number) => {
    //TODO: Can Refactor this
    let data = [...services];
    if (data[index] && data[index].isChecked) {
      data[index].isChecked = false;
    } else {
      data[index].isChecked = true;
    }

    setServices(data);
  };

  const onPrescriptionSelected = (isSelected: boolean) => {
    setIsPrescriptionSelected(isSelected);
  };

  return (
    <>
      <Text style={styles.text} title={t('Authority to add a prescription')} />
      <View style={styles.container}>
        <Text style={styles.text} title={t('Yes')} />
        <TouchableOpacity onPress={() => onPrescriptionSelected(true)}>
          <Image
            source={
              isPrescriptionSelected
                ? require('../../../../assets/icon/spectorOn.png')
                : require('../../../../assets/icon/selecter.png')
            }
            style={[
              !isPrescriptionSelected
                ? styles.select
                : {
                    height: dimens.marginL + 6,
                    width: dimens.marginL + 6,
                    resizeMode: 'cover',
                    borderRadius: getHeight(dimens.paddingS),
                  },
            ]}
          />
        </TouchableOpacity>
        <Text style={styles.textServices} title={t('No')} />
        <TouchableOpacity onPress={() => onPrescriptionSelected(false)}>
          <Image
            source={
              !isPrescriptionSelected
                ? require('../../../../assets/icon/spectorOn.png')
                : require('../../../../assets/icon/selecter.png')
            }
            style={[
              isPrescriptionSelected
                ? styles.select
                : {
                    height: dimens.marginL + 6,
                    width: dimens.marginL + 6,
                    resizeMode: 'cover',
                    borderRadius: getHeight(dimens.paddingS),
                  },
            ]}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.textS} title={t('Services you provide')} />
      <View style={styles.servicesContainer}>
        {services.length > 0 ? (
          <ScrollView
            contentContainerStyle={{ paddingBottom: getHeight(dimens.marginM) }}
            style={{ height: '100%' }}
          >
            {services.map((item, index) => (
              <View key={index} style={styles.serviceRow}>
                <Text style={styles.serviceText} title={item.name.en} />
                <View style={styles.serviceRight}>
                  <Text style={styles.serviceText} title={'$ ' + item.price} />

                  <TouchableOpacity onPress={() => onCheckedPress(index)}>
                    {!item.isChecked ? (
                      <View style={styles.checkbox} />
                    ) : (
                      <View
                        style={[
                          styles.checkbox,
                          { alignItems: 'center', justifyContent: 'center' },
                        ]}
                      >
                        <Image
                          source={require('assets/icon/check.png')}
                          style={{ width: getWidth(16), height: getHeight(10) }}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.textServices} title={t('No Services')} />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    marginTop: getHeight(dimens.sideMargin),
    alignItems: 'center',
  },
  text: {
    fontSize: fontSize.textM,
  },
  textNo: {
    fontSize: fontSize.textM,
    marginLeft: 16,
  },
  select: {
    height: dimens.marginL + 2,
    width: dimens.marginL + 2,
    resizeMode: 'cover',
    borderRadius: getHeight(dimens.paddingS),
  },
  textS: {
    fontSize: getWidth(fontSize.textXl),
    marginBottom: getHeight(dimens.sideMargin),
    marginTop: getHeight(dimens.imageS),
  },
  serviceText: {
    fontSize: getWidth(fontSize.textM),
  },
  servicesContainer: {
    borderWidth: getWidth(dimens.borderBold),
    borderRadius: getWidth(dimens.marginS),
    borderColor: colors.primary,
    height: '70%',
    justifyContent: 'center',
    //  alignItems:"center"
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: getHeight(dimens.marginS),
    paddingTop: getHeight(dimens.paddingL - 2),
  },
  serviceRight: {
    flexDirection: 'row',
    gap: getHeight(dimens.sideMargin - 2),
    alignItems: 'center',
  },
  checkbox: {
    width: getWidth(dimens.marginL - 3),
    height: getHeight(dimens.marginL - 3),
    borderWidth: getHeight(dimens.borderThin),
    borderColor: colors.black,
  },
  textServices: {
    fontSize: getWidth(fontSize.textXl),
    textAlign: 'center',
  },
});

export default ProviderServices;
