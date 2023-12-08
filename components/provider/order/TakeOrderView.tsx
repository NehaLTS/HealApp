import mobile from 'assets/icon/mobile.png';
import waze from 'assets/icon/waze.png';
import RNModal from 'components/common/Modal';
import { AnimatedText } from 'components/common/Text';
import TextButton from 'components/common/TextButton';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontFamily } from 'designToken/fontFamily';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, StyleSheet, View } from 'react-native';
import Animated, {
  FadeInLeft,
  FadeInUp,
  ZoomIn,
} from 'react-native-reanimated';

const TakeOrderView = ({
  order,
  onPressSeeMore,
  onPressCancelOrder,
  isModalVisible,
}: {
  order: any;
  onPressSeeMore: () => void;
  onPressCancelOrder: () => void;
  isModalVisible: boolean;
}) => {
  const { t } = useTranslation();
  const [seconds, setSeconds] = React.useState(300);
  const CountdownTimer = () => {
    React.useEffect(() => {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
      }, 1000);

      return () => clearInterval(interval);
    }, [seconds]);

    const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60);
      const remainingSeconds = time % 60;
      return `${minutes}:${
        remainingSeconds < 10 ? '0' : ''
      }${remainingSeconds}`;
    };

    return (
      <AnimatedText style={styles.timerText} title={formatTime(seconds)} />
    );
  };
  return (
    <RNModal
      coverScreen
      isVisible={isModalVisible}
      style={styles.modal}
      backdropOpacity={0.5}
      backdropColor={colors.transparent}
    >
      <Animated.View
        style={{
          ...styles.modalView,
          height: getHeight(652),
        }}
      >
        <AnimatedText
          style={{
            ...styles.details,
            fontSize: getHeight(fontSize.heading),
            textAlign: 'center',
            marginBottom: 0,
          }}
          title={'Order accepted'}
          entering={FadeInUp.duration(400).delay(400)}
        />
        <AnimatedText
          style={{ ...styles.smallText, marginBottom: getHeight(10) }}
          title={'*Client has 5 minutes to cancel an order for free'}
          entering={ZoomIn.duration(400).delay(300)}
          numberOfLines={1}
        />

        {order &&
          order?.eventData?.symptoms?.length > 0 &&
          JSON?.parse(order?.eventData?.symptoms)?.map?.(
            (item: any, index: number) => (
              <AnimatedText
                key={index}
                style={{ ...styles.details, marginTop: getHeight(20) }}
                title={item?.name}
                entering={FadeInLeft.duration(400).delay(500)}
              />
            ),
          )}
        {order?.eventData?.services && (
          <>
            <AnimatedText
              style={{
                ...styles.details,
                borderBottomWidth: getWidth(0.5),
                borderColor: colors.offWhite,
                paddingBottom: getHeight(16),
                fontSize: getHeight(fontSize.textXl - 1),
              }}
              title={`Ordered: `}
              entering={FadeInLeft.duration(400).delay(600)}
            >
              {JSON.parse?.(order?.eventData?.services)?.map?.(
                (service: any, index: number) => (
                  <AnimatedText
                    key={index}
                    style={styles.details}
                    title={
                      JSON.parse?.(order?.eventData?.services)?.length > 1
                        ? `${
                            index !==
                            JSON.parse?.(order?.eventData?.services)?.length - 1
                              ? ` ${service?.service_name}, `
                              : ` ${service?.service_name}`
                          }`
                        : service?.service_name
                    }
                    entering={FadeInLeft.duration(400).delay(700)}
                  />
                ),
              )}
            </AnimatedText>
          </>
        )}
        <AnimatedText
          style={styles.otherDetails}
          title={`${order?.eventData?.firstname}  ${
            order?.eventData?.lastname
          }    ${
            order?.eventData?.distance !== 'undefined'
              ? order?.eventData?.time
              : 0
          } km, ~${
            order?.eventData?.time !== 'undefined' ? order?.eventData?.time : 0
          } min`}
          entering={FadeInLeft.duration(400).delay(600)}
        />
        <AnimatedText
          style={{
            ...styles.otherDetails,
            borderBottomWidth: getWidth(0.5),
            borderColor: colors.offWhite,
            paddingBottom: getHeight(16),
          }}
          title={order?.eventData?.address}
          entering={FadeInLeft.duration(400).delay(800)}
        />
        <View
          style={{
            flexDirection: 'row',
            gap: getHeight(14),
            marginBottom: getHeight(dimens.marginM),
            alignItems: 'center',
          }}
        >
          <TextButton
            title={'See on Waze '}
            fontSize={getHeight(fontSize.textXl)}
            style={{
              ...styles.seeOnWaze,
            }}
            entering={FadeInLeft.duration(400).delay(1000)}
          />
          <Animated.Image
            source={waze}
            style={{
              width: getWidth(18),
              height: getHeight(20),
              resizeMode: 'center',
            }}
            entering={FadeInLeft.duration(400).delay(1180)}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: getHeight(14),
            marginBottom: getHeight(dimens.marginL),
            alignItems: 'center',
          }}
        >
          <TextButton
            title={'Call the client'}
            onPress={() => {
              Linking.openURL(`tel:${order?.eventData?.phone_number}`);
            }}
            fontSize={getHeight(fontSize.textXl)}
            style={styles.seeOnWaze}
            entering={FadeInLeft.duration(400).delay(1100)}
          />
          <Animated.Image
            source={mobile}
            style={{
              width: getWidth(18),
              height: getHeight(20),
              resizeMode: 'center',
            }}
            entering={FadeInLeft.duration(400).delay(1180)}
          />
        </View>

        {/* {seconds > 0 && ( */}
        <View
          style={{
            ...styles.footerContainer,
            gap: getHeight(10),
            bottom: 0,
          }}
        >
          <View style={styles.timerContainer}>
            <CountdownTimer />
          </View>
          <AnimatedText
            style={styles.smallText}
            title={t('you_have_5_minutes')}
            entering={ZoomIn.duration(400).delay(400)}
            numberOfLines={1}
          />
          <TextButton
            title={t('cancel_order')}
            fontSize={getHeight(fontSize.textL)}
            style={styles.cancelOrderButton}
            onPress={onPressCancelOrder}
          />
        </View>
        {/* )} */}
      </Animated.View>
    </RNModal>
  );
};

export default TakeOrderView;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    padding: 0,
    margin: 0,
    flex: 1,
  },
  modalView: {
    minHeight: '46%',
    backgroundColor: colors.primary,
    borderTopLeftRadius: getHeight(dimens.marginL),
    borderTopEndRadius: getHeight(dimens.marginL),
    paddingHorizontal: getHeight(dimens.marginM),
    paddingTop: getWidth(dimens.paddingL),
  },
  details: {
    color: colors.white,
    marginBottom: getHeight(dimens.paddingS),
    fontSize: getHeight(fontSize.textXl),
  },
  smallText: {
    color: colors.white,
    fontSize: getHeight(fontSize.textM),
    alignSelf: 'center',
  },
  otherDetails: {
    color: colors.white,
    marginBottom: getHeight(dimens.paddingS),
    fontSize: getHeight(fontSize.textL),
    paddingLeft: getWidth(3),
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
  seeOnWaze: {
    color: colors.white,
  },
  footerContainer: {
    position: 'absolute',
    alignSelf: 'center',
    marginVertical: getHeight(dimens.paddingL),
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
    textAlign: 'center',
  },
  isAvailable: {
    color: colors.secondary,
    fontFamily: fontFamily.semiBold,
    minWidth: '25%',
    textAlign: 'center',
    fontSize: getHeight(fontSize.textXl),
  },
  cancelOrderText: {
    fontSize: getHeight(fontSize.heading),
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
  timerContainer: {
    borderWidth: getHeight(1),
    borderColor: colors.offWhite,
    borderRadius: getHeight(50),
    height: getHeight(70),
    width: getHeight(70),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: getHeight(10),
  },
  timerText: {
    color: colors.white,
  },
});