import Button from 'components/common/Button';
import RNModal from 'components/common/Modal';
import ToggleButton from 'components/common/SwitchButton';
import Text from 'components/common/Text';
import TextButton from 'components/common/TextButton';
import { UseUserContextProvider } from 'contexts/useUserContextProvider';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontFamily } from 'designToken/fontFamily';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, DeviceEventEmitter, StyleSheet, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const HomeScreen = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isCancelOrder, setIsCancelOrder] = useState(false);
  const { OrderRequst, UpdateProviderLocation } = AuthServicesProvider();
  const { userDataProvider } = UseUserContextProvider();
  const IsNotification= useRef<boolean>(false)
  const [acceptOrder, setAcceptOrder] =useState<boolean>()
let clientId = ''
 
  useEffect(() => {
  
  
    DeviceEventEmitter.addListener('DoctorNotification',(event)=>{
      clientId= event.clientId 
      IsNotification.current= true
      Alert.alert("evnetAccepted")
    
    })
    

    const interval = setInterval(() => {
      console.log("update")
   if(acceptOrder){
      Geolocation.watchPosition(
        //  124
        (position) => {
           // const { latitude, longitude } = position.coords;
           UpdateProviderLocation({provider_id:'3',
           latitude:position.coords.latitude.toString(),
           longitude:position.coords.longitude.toString()}).then((res)=>{
            Alert.alert("ResPonseOFProvider", JSON.stringify(res))
           })
         
         },
       );
        }
    },100000);
  
    return () => {
      clearInterval(interval);
      DeviceEventEmitter.removeAllListeners('DoctorNotification')
    }
  }, [])

  const getNewOrderView = () => (
    <RNModal
      isVisible={isAvailable}
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
            onPress={()=>{
              setAcceptOrder(true)
              OrderRequst({ status:"accept",
              provider_id:'3',
              order_id: '1',
              latitude:"30.37775529243538",
              longitude:"76.77481109532673"}).then((res)=>{console.log("ordereAccepted", res)})
            }}
          />
          <TextButton
            title="Cancel an order"
            fontSize={getWidth(fontSize.textL)}
            style={{ color: colors.white, alignSelf: 'center' }}
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
          style={{
            fontSize: getWidth(fontSize.heading),
            textAlign: 'center',
            color: colors.primary,
            fontFamily: fontFamily.medium,
          }}
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

  return (
    <>
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
      {/* {IsNotification.current&&getNewOrderView()} */}
      {getNewOrderView()}
      {getCancelOrderView()}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
});
