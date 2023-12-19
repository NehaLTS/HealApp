import Button from 'components/common/Button';
import Loader from 'components/common/Loader';
import Text from 'components/common/Text';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontSize } from 'designToken/fontSizes';
import { t } from 'i18next';
import { getHeight, getWidth } from 'libs/StyleHelper';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ProviderServicesController from '../controllers/ProviderServicesController';

const ProviderServices = () => {
  const {
    onPressBack,
    onPressNext,
    services,
    isLoading,
    isPrescriptionSelected,
    onSelectServices,
    onPrescriptionSelected,
    activeCheckbox,
  } = ProviderServicesController();

  const getFooterView = () => (
    <View style={styles.footerContainer}>
      {/* <Button title={t('back')} isSmall width={'30%'} onPress={onPressBack} /> */}
      <Button
        title={t('next')}
        isPrimary
        isSmall
        width={'30%'}
        onPress={onPressNext}
      />
    </View>
  );

  const getServicesView = () => (
    <>
      <Text style={styles.textS} title={t('services_you')} />
      <View style={styles.servicesContainer}>
        {services?.length > 0 ? (
          <ScrollView
            contentContainerStyle={styles.containerStyle}
            style={{ height: '100%' }}
          >
            {services.map((item, index) => (
              <View key={index} style={styles.serviceRow}>
                <Text style={styles.serviceText} title={item.name.en} />
                <View style={styles.serviceRight}>
                  <Text style={styles.serviceText} title={'$ ' + item.price} />
                  <TouchableOpacity
                    key={index}
                    onPress={() => onSelectServices(item)}
                  >
                    <View style={styles.checkbox}>
                      {activeCheckbox?.includes(Number(item?.heal_id)) && (
                        <Image
                          source={require('assets/icon/check.png')}
                          style={styles.checkIcon}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.textServices} title={t('no_services')} />
        )}
      </View>
    </>
  );

  const RadioButton = ({
    onPress,
    isChecked,
  }: {
    onPress: () => void;
    isChecked: boolean;
  }) => (
    <TouchableOpacity onPress={onPress}>
      {!isChecked ? (
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle} />
        </View>
      ) : (
        <View style={styles.outerCircle}>
          <View
            style={[
              styles.innerCircle,
              {
                backgroundColor: colors.secondary,
                borderColor: colors.secondary,
              },
            ]}
          />
        </View>
      )}
    </TouchableOpacity>
  );

  const addPrescriptionView = () => (
    <View style={styles.container}>
      <Text style={styles.text} title={t('yes')} />
      <RadioButton
        onPress={() => onPrescriptionSelected(true)}
        isChecked={isPrescriptionSelected}
      />
      <Text style={styles.textNo} title={t('no')} />
      <RadioButton
        onPress={() => onPrescriptionSelected(false)}
        isChecked={!isPrescriptionSelected}
      />
    </View>
  );

  return (
    <>
      {isLoading && <Loader />}
      <View style={styles.inputContainer}>
        <Text style={styles.textAuthority} title={t('authority')} />
        {addPrescriptionView()}
        {getServicesView()}
      </View>
      {getFooterView()}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: getHeight(dimens.marginS),
    marginTop: getHeight(dimens.sideMargin),
    alignItems: 'center',
  },
  text: {
    fontSize: getHeight(fontSize.textM),
    textAlign: 'left',
  },
  select: {
    height: getHeight(dimens.marginL + dimens.borderBold),
    width: getWidth(dimens.marginL + dimens.borderBold),
    resizeMode: 'cover',
    borderRadius: getHeight(dimens.paddingS),
  },
  textS: {
    fontSize: getHeight(fontSize.textXl),
    marginBottom: getHeight(dimens.sideMargin),
    marginTop: getHeight(dimens.imageXs),
    textAlign: 'left',
  },
  textAuthority: {
    fontSize: getHeight(fontSize.textXl),
  },
  serviceText: {
    fontSize: getHeight(fontSize.textM),
  },
  servicesContainer: {
    borderWidth: getWidth(dimens.borderBold),
    borderRadius: getHeight(5),
    borderColor: colors.primary,
    height: '65%',
    justifyContent: 'center',
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: getHeight(dimens.marginS),
    paddingTop: getHeight(dimens.paddingL - dimens.borderBold),
  },
  serviceRight: {
    flexDirection: 'row',
    gap: getHeight(dimens.sideMargin - dimens.borderBold),
    alignItems: 'center',
  },
  checkbox: {
    width: getHeight(dimens.marginL - 3),
    height: getHeight(dimens.marginL - 3),
    borderWidth: getHeight(dimens.borderThin),
    borderColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textServices: {
    fontSize: getHeight(fontSize.textM),
    textAlign: 'center',
  },
  textNo: {
    fontSize: getHeight(fontSize.textM),
    textAlign: 'center',
    marginLeft: getWidth(15),
  },
  inputContainer: {
    flex: 0.79,
  },
  footerContainer: {
    flexDirection: 'row',
    width: '100%',
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  outerCircle: {
    width: getHeight(dimens.marginL),
    height: getHeight(dimens.marginL),
    borderRadius: getHeight(dimens.imageS),
    borderColor: colors.black,
    borderWidth: getHeight(dimens.borderBold),
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: getHeight(dimens.sideMargin),
    height: getHeight(dimens.sideMargin),
    minWidth: getHeight(dimens.sideMargin),
    minHeight: getHeight(dimens.sideMargin),
    borderRadius: getHeight(dimens.marginS),
    borderColor: colors.black,
    borderWidth: getHeight(dimens.borderBold),
    alignSelf: 'center',
  },
  containerStyle: {
    paddingBottom: getHeight(dimens.marginM),
  },
  checkIcon: {
    width: getHeight(dimens.marginS + dimens.paddingXs),
    height: getHeight(dimens.marginS + 2),
    resizeMode: 'center',
  },
});

export default ProviderServices;
