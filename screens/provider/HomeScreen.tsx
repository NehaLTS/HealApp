import Button from 'components/common/Button';
import { RNHeader } from 'components/common/Header';
import RNModal from 'components/common/Modal';
import ToggleButton from 'components/common/SwitchButton';
import Text from 'components/common/Text';
import TextButton from 'components/common/TextButton';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontFamily } from 'designToken/fontFamily';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import avatar from 'assets/icon/avatar.png';
import logo from 'assets/icon/healLogo.png';
import SelectImage from 'components/common/SelectImage';

const HomeScreen = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isCancelOrder, setIsCancelOrder] = useState(false);
  const [isAddDocument, setIsAddDocument] = useState(false);
  const [licensePicture, setLicensePicture] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);

  const getImageUrl = (url: string) => setLicensePicture(url);
  const onPressUpload = () => setIsAvailable(false);

  const handleAddDocument = () => {
    setIsAddDocument(true);
  };

  const getNewOrderView = () => (
    <RNModal
      // isVisible={isAvailable}
      style={styles.modal}
      backdropOpacity={1}
      backdropColor={colors.transparent}
      onBackdropPress={() => setIsAvailable(false)}
    >
      <View style={styles.modalView}>
        <Text style={styles.details} title={'Chest pain'} />
        <Text
          style={styles.details}
          title={`Ordered: ${' voltaren shot, clacksen shot'}`}
        />
        <Text
          style={{ ...styles.details, fontSize: getWidth(fontSize.textL) }}
          title={`${'Ilana Vexler'}    ${'2'} km, ${'~ 30'} min`}
        />
        <TextButton
          title="See more details"
          fontSize={getWidth(fontSize.textXl)}
          style={styles.seeMoreButton}
        />
        <View style={styles.footerContainer}>
          <Button
            title="Take an order"
            style={styles.takeOrderButton}
            isSmall
            width={getWidth(150)}
            height={getWidth(36)}
            fontSized={getWidth(fontSize.textL)}
            background={colors.white}
          />
          <TextButton
            title="Cancel an order"
            fontSize={getWidth(fontSize.textL)}
            style={styles.cancelOrderButton}
            onPress={() => setIsCancelOrder(true)}
          />
        </View>
      </View>
    </RNModal>
  );

  const getCancelOrderView = () => (
    <RNModal
      isVisible={isCancelOrder}
      style={styles.cancelModal}
      backdropOpacity={0.4}
      animationIn={'zoomInUp'}
    >
      <View style={styles.cancelOrderView}>
        <Text
          style={styles.cancelOrderText}
          title={'You want to cancel\nthis order?'}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Yes"
            style={styles.takeOrderButton}
            isSmall
            width={getWidth(80)}
            height={getWidth(36)}
            fontSized={getWidth(fontSize.textL)}
            onPress={() => setIsCancelOrder(false)}
          />
          <Button
            title="No"
            style={styles.takeOrderButton}
            isSmall
            width={getWidth(80)}
            height={getWidth(36)}
            fontSized={getWidth(fontSize.textL)}
          />
        </View>
      </View>
    </RNModal>
  );

  const getMissingDocsView = () => (
    <RNModal
      isVisible={isAvailable}
      style={styles.addDocsModal}
      backdropOpacity={0.4}
      animationIn={'zoomInUp'}
    >
      <View
        style={{ ...styles.addDocsView, flex: isAddDocument ? 0.45 : 0.37 }}
      >
        {isAddDocument ? (
          <>
            <Text style={styles.addDocument} title={'Adding documents'} />
            <Text title={'Upload license photo'} />
            <TouchableOpacity
              activeOpacity={licensePicture ? 1 : 0.5}
              onPress={() => setIsShowModal(true)}
            >
              <Image
                source={
                  licensePicture
                    ? { uri: licensePicture }
                    : require('assets/icon/licencesIcon.png')
                }
                style={styles.selectedImage}
              />
            </TouchableOpacity>
            <SelectImage
              isShowModal={isShowModal}
              closeModal={setIsShowModal}
              imageUri={getImageUrl}
            />
          </>
        ) : (
          <>
            <Text
              style={styles.addDocsText}
              title={
                'You still cannot\nreceive patients since some\ndocuments are missing:\n\n(list of what is missing)'
              }
            />
          </>
        )}
        <Button
          title={isAddDocument ? 'Upload' : 'Add missing documents'}
          style={styles.takeOrderButton}
          isSmall
          isPrimary
          height={getWidth(36)}
          fontSized={getWidth(fontSize.textL - dimens.borderThin)}
          onPress={isAddDocument ? onPressUpload : handleAddDocument}
        />
      </View>
    </RNModal>
  );

  const headerLeft = () => (
    <TouchableOpacity>
      <Image source={logo} style={styles.logo} />
    </TouchableOpacity>
  );

  const headerRight = () => (
    <TouchableHighlight underlayColor="transparent">
      <Image source={avatar} style={styles.avatar} />
    </TouchableHighlight>
  );

  const DetailCard = (title: string, subTitle: string) => (
    <View style={styles.detailCardContainer}>
      <Text style={styles.title} title={title} />
      <Text title={subTitle} />
    </View>
  );

  return (
    <>
      {RNHeader(() => null, headerLeft, headerRight)}
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text
            title={'Not\navailable'}
            style={[styles.notAvailable, !isAvailable && styles.isAvailable]}
          />
          <ToggleButton onChange={setIsAvailable} />
          <Text
            title={'Available'}
            style={[styles.available, isAvailable && styles.isAvailable]}
          />
        </View>
        <Text
          style={styles.switchToggleText}
          title={
            isAvailable
              ? "Now you're available\nto receive orders"
              : 'Switch toggle to available\nto start to receive orders'
          }
        />
        <View style={styles.cardContainer}>
          {DetailCard('2', 'Clients today')}
          {DetailCard('25 min', 'Average arrival time')}
          {DetailCard('560 ₪', 'My balance')}
          {getNewOrderView()}
          {getCancelOrderView()}
          {getMissingDocsView()}
        </View>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: getWidth(dimens.marginM),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 0.2,
  },
  notAvailable: {
    textAlign: 'center',
    minWidth: '25%',
  },
  modal: {
    justifyContent: 'flex-end',
    padding: 0,
    margin: 0,
  },
  addDocsModal: {
    justifyContent: 'center',
  },
  cancelModal: {
    justifyContent: 'flex-end',
    flex: 0.9,
  },
  modalView: {
    minHeight: '46%',
    backgroundColor: colors.primary,
    borderTopLeftRadius: getHeight(dimens.marginL),
    borderTopEndRadius: getHeight(dimens.marginL),
    paddingHorizontal: getWidth(dimens.marginM),
    paddingTop: getWidth(dimens.paddingL),
  },
  details: {
    color: colors.white,
    marginBottom: getHeight(dimens.paddingS + dimens.borderBold),
    fontSize: getWidth(fontSize.textXl),
  },
  takeOrderButton: {
    backgroundColor: colors.white,
    width: getWidth(150),
    height: getWidth(36),
    alignSelf: 'center',
    paddingHorizontal: getWidth(dimens.marginM),
  },
  seeMoreButton: {
    color: colors.white,
    fontFamily: fontFamily.medium,
    marginTop: getHeight(dimens.marginS),
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginVertical: getHeight(dimens.paddingL),
    gap: getHeight(dimens.marginM),
  },
  cancelOrderView: {
    backgroundColor: colors.white,
    alignItems: 'center',
    gap: getHeight(dimens.marginL),
    padding: getHeight(dimens.marginL),
    borderRightColor: colors.offWhite,
    borderRadius: getHeight(dimens.marginS),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  available: {
    minWidth: '25%',
  },
  isAvailable: {
    color: colors.secondary,
    fontFamily: fontFamily.semiBold,
  },
  cancelOrderText: {
    fontSize: getWidth(fontSize.heading),
    textAlign: 'center',
    color: colors.primary,
    fontFamily: fontFamily.medium,
  },
  cancelOrderButton: {
    color: colors.white,
    alignSelf: 'center',
  },
  logo: {
    width: getWidth(dimens.imageS),
    height: getHeight(40),
    resizeMode: 'contain',
  },
  avatar: {
    height: getHeight(45),
    width: getWidth(45),
    resizeMode: 'contain',
  },
  switchToggleText: {
    textAlign: 'center',
    flex: 0.12,
  },
  detailCardContainer: {
    width: '100%',
    padding: getWidth(dimens.marginL),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: getHeight(dimens.marginS),
    backgroundColor: colors.offWhite,
  },
  title: {
    fontSize: getWidth(fontSize.headingL),
    color: colors.primary,
  },
  cardContainer: {
    flex: 0.68,
    gap: getHeight(dimens.marginM + dimens.paddingXs),
  },
  addDocsView: {
    backgroundColor: colors.lightGrey,
    alignItems: 'center',
    justifyContent: 'center',
    gap: getHeight(dimens.marginL),
    borderRadius: getHeight(dimens.marginS),
  },
  addDocsText: {
    color: colors.primary,
    textAlign: 'center',
    fontFamily: fontFamily.medium,
  },
  selectedImage: {
    height: getHeight(dimens.imageM / 2),
    width: getHeight(dimens.imageM / 2),
    resizeMode: 'center',
    borderRadius: getHeight(dimens.paddingS),
  },
  addDocument: {
    fontSize: getWidth(fontSize.heading - 2),
  },
});
