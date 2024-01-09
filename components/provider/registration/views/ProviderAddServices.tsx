import Button from 'components/common/Button';
import Input from 'components/common/Input';
import Loader from 'components/common/Loader';
import Text from 'components/common/Text';
import TextButton from 'components/common/TextButton';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontFamily } from 'designToken/fontFamily';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal/dist/modal';
import ProviderAddServicesController from '../controllers/ProviderAddServicesController';

const ProviderAddServices = () => {
  const { t } = useTranslation();
  const {
    serviceNameRef,
    priceRef,
    descriptionRef,
    isLoading,
    services,
    service,
    onBlurServiceName,
    onChangeServiceName,
    onBlurPriceName,
    onChangePriceName,
    onBlurDescription,
    onChangeDescription,
    saveService,
    isModalVisible,
    toggleModal,
    serviceError,
    priceError,
    descriptionError,
    onApprove,
    onOpenModal,
  } = ProviderAddServicesController();
  const [expandedServices, setExpandedServices] = useState([]);

  const toggleDescription = (index: number) => {
    const updatedExpandedServices = [...expandedServices];
    updatedExpandedServices[index] = !updatedExpandedServices[index];
    setExpandedServices(updatedExpandedServices);
  };
  const getAllServices = () => {
    return services.map((item, index) => {
      const description = item?.description?.en || '';
      const showReadMore = description?.length > 100;
      let displayedDescription = description?.slice(0, 100);
      const isExpanded = expandedServices[index] || false;

      if (isExpanded) {
        displayedDescription = description;
      }

      return (
        <View key={index} style={[styles.serviceContainer, styles.elevation]}>
          <Text
            style={[
              { marginBottom: getHeight(14), fontFamily: fontFamily.medium },
            ]}
          >{`${item.name.en} $ ${item.price}`}</Text>
          <Text style={styles.textView}>{displayedDescription}</Text>
          {showReadMore && (
            <TextButton
              title={isExpanded ? 'Read Less' : 'Read More'}
              onPress={() => toggleDescription(index)}
              fontSize={getHeight(fontSize.textL)}
              containerStyle={{ paddingTop: getHeight(8) }}
              isActive
              style={{ fontFamily: fontFamily.medium }}
            />
          )}
        </View>
      );
    });
  };

  const getFooterView = () => (
    <View style={styles.footerContainer}>
      {services.length > 0 ? (
        <Button
          title={t('approve')}
          isPrimary
          onPress={onApprove}
          isSmall
          width={'40%'}
          style={styles.approve}
        />
      ) : (
        <TextButton
          title={t('skip')}
          style={styles.skip}
          containerStyle={{ width: '100%' }}
          onPress={onApprove}
        />
      )}
    </View>
  );

  const addServiceView = () => (
    <Modal
      isVisible={isModalVisible}
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
            defaultValue={serviceNameRef?.current?.value ?? ''}
            inputValue={serviceNameRef?.current?.value ?? ''}
            errorMessage={serviceError}
            returnKeyType={'next'}
            onSubmitEditing={() => priceRef?.current?.focus()}
            onClearInputText={() => serviceNameRef?.current?.clear()}
          />
          <Input
            placeholder={t('price')}
            inputStyle={styles.input}
            onBlur={onBlurPriceName}
            onChangeText={onChangePriceName}
            ref={priceRef}
            defaultValue={priceRef?.current?.value ?? ''}
            inputValue={priceRef?.current?.value ?? ''}
            errorMessage={priceError}
            keyboardType="numeric"
            returnKeyType={'next'}
            onSubmitEditing={() => descriptionRef?.current?.focus()}
            onClearInputText={() => priceRef.current.clear()}
          />
          <Input
            placeholder={t('description')}
            inputStyle={styles.description}
            onBlur={onBlurDescription}
            onChangeText={onChangeDescription}
            ref={descriptionRef}
            defaultValue={descriptionRef?.current?.value ?? ''}
            inputValue={descriptionRef?.current?.value ?? ''}
            errorMessage={descriptionError}
            onClearInputText={() => descriptionRef.current.clear()}
            numberOfLines={5}
            multiline
            returnKeyType="done"
            blurOnSubmit
          />
          <Button
            title={t('save')}
            isPrimary
            isSmall
            width={getWidth(70)}
            style={{
              alignSelf: 'center',
              marginVertical: getHeight(dimens.sideMargin + dimens.marginS),
            }}
            onPress={saveService}
            fontSized={getHeight(15)}
            height={getHeight(40)}
          />
          <TextButton
            style={styles.skip}
            fontSize={getHeight(fontSize.textXl)}
            title={t('cancel')}
            onPress={toggleModal}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );

  return (
    <>
      {isLoading && <Loader />}
      <View style={styles.inputContainer}>
        <ScrollView contentContainerStyle={{ paddingBottom: getHeight(20) }}>
          {services && services?.length > 0 ? (
            getAllServices()
          ) : (
            <View style={styles.textContainer}>
              <Text style={styles.text} title={t('provide_another_service')} />
            </View>
          )}
          <TouchableOpacity
            onPress={onOpenModal}
            style={styles.container}
            activeOpacity={1}
          >
            <Image
              source={require('../../../../assets/icon/add.png')}
              style={styles.addicon}
            />
            <Text style={styles.textAdd} title={t('add_another_service')} />
          </TouchableOpacity>
        </ScrollView>
      </View>
      {getFooterView()}
      {addServiceView()}
    </>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: colors.modal,
    padding: getHeight(dimens.marginM + dimens.borderBold),
    marginHorizontal: getHeight(dimens.paddingL),
    marginTop: getHeight(dimens.sideMargin),
    marginBottom: getHeight(dimens.marginL),
  },
  text: {
    textAlign: 'center',
    fontSize: getHeight(fontSize.textXl),
  },
  addService: {
    textAlign: 'center',
    fontSize: getHeight(fontSize.textXl),
    marginBottom: getHeight(dimens.marginM),
  },
  textView: {
    fontSize: getHeight(fontSize.textL),
  },
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
    fontSize: getHeight(fontSize.textXl),
  },
  modalContent: {
    backgroundColor: colors.offWhite,
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
    height: getHeight(dimens.imageM + dimens.paddingL + 10),
    alignItems: 'flex-start',
    paddingTop: getHeight(dimens.marginS),
    justifyContent: 'center',
  },
  serviceContainer: {
    backgroundColor: colors.white,
    margin: getHeight(dimens.marginM),
    padding: getHeight(dimens.sideMargin),
    borderRadius: 5,
    marginTop: getHeight(dimens.marginS),
  },
  elevation: {
    elevation: getWidth(dimens.paddingS),
    shadowColor: colors.black,
  },
  inputContainer: {
    flex: 0.85,
  },
  footerContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    flex: 0.1,
  },
  approve: {
    alignSelf: 'flex-end',
    width: '100%',
  },
  skip: {
    alignSelf: 'center',
  },
});

export default ProviderAddServices;
