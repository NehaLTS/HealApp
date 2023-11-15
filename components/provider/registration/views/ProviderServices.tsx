import Button from 'components/common/Button';
import {Loader} from 'components/common/Loader';
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
    onCheckedPress,
    onPrescriptionSelected,
  } = ProviderServicesController();

  const getFooterView = () => (
    <View style={styles.footerContainer}>
      <Button title={t('back')} isSmall width={'30%'} onPress={onPressBack} />
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
        {services.length > 0 ? (
          <ScrollView
            contentContainerStyle={styles.containerStyle}
            style={{ height: '100%' }}
          >
            {services.map((item, index) => (
              <View key={index} style={styles.serviceRow}>
                <Text style={styles.serviceText} title={item.name.en} />
                <View style={styles.serviceRight}>
                  <Text style={styles.serviceText} title={'$ ' + item.price} />
                  <TouchableOpacity onPress={() => onCheckedPress(index)}>
                    {!item.isSelected ? (
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
                          style={styles.checkIcon}
                        />
                      </View>
                    )}
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
      <Text style={styles.textServices} title={t('no')} />
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
        <Text style={styles.text} title={t('authority')} />
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
    fontSize: getWidth(fontSize.textM),
    textAlign: 'left',
  },
  select: {
    height: getHeight(dimens.marginL + dimens.borderBold),
    width: getWidth(dimens.marginL + dimens.borderBold),
    resizeMode: 'cover',
    borderRadius: getHeight(dimens.paddingS),
  },
  textS: {
    fontSize: getWidth(fontSize.textXl),
    marginBottom: getHeight(dimens.sideMargin),
    marginTop: getHeight(dimens.imageS),
    textAlign: 'left',
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
    width: getWidth(dimens.marginL - 3),
    height: getHeight(dimens.marginL - 3),
    borderWidth: getHeight(dimens.borderThin),
    borderColor: colors.black,
  },
  textServices: {
    fontSize: getWidth(fontSize.textXl),
    textAlign: 'center',
  },
  inputContainer: {
    flex: 0.79,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    flex: 0.1,
    justifyContent: 'space-between',
  },
  outerCircle: {
    width: getWidth(dimens.marginL),
    height: getWidth(dimens.marginL),
    borderRadius: getWidth(dimens.imageS),
    borderColor: colors.black,
    borderWidth: getWidth(dimens.borderBold),
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: getWidth(dimens.sideMargin),
    height: getWidth(dimens.sideMargin),
    minWidth: getWidth(dimens.sideMargin),
    minHeight: getWidth(dimens.sideMargin),
    borderRadius: getWidth(dimens.marginS),
    borderColor: colors.black,
    borderWidth: getWidth(dimens.borderBold),
    alignSelf: 'center',
  },
  containerStyle: {
    paddingBottom: getHeight(dimens.marginM),
  },
  checkIcon: {
    width: getWidth(dimens.marginS + dimens.paddingXs),
    height: getHeight(dimens.marginS),
  },
});

export default ProviderServices;