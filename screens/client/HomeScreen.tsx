import { useNavigation } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import arrowBack from 'assets/icon/arrowBack.png';
import avatar from 'assets/icon/avatar.png';
import logo from 'assets/icon/healLogo.png';
import location from 'assets/icon/location.png';
import noSearchResult from 'assets/icon/searchFallback.png';
import AddAddress from 'components/common/AddAddress';
import Button from 'components/common/Button';
import CardView from 'components/common/CardView';
import ProviderArrivalInfo from 'components/common/ProviderArrivalInfo';
import SearchBox from 'components/common/SearchBox';
import Text from 'components/common/Text';
import TextButton from 'components/common/TextButton';
import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import useUpdateEffect from 'libs/UseUpdateEffect';
import { getLocalData, setLocalData } from 'libs/datastorage/useLocalStorage';
import NavigationRoutes from 'navigator/NavigationRoutes';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  I18nManager,
  Image,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import HomeViewController from './HomeViewController';
import { DotLoader } from 'components/common/Loader';

const HomeScreen = () => {
  const { t } = useTranslation();
  const {
    providerList,
    bannerAds,
    isTouchStart,
    onPressBack,
    onTouchStart,
    onBlur,
    onChange,
    handleKeyPress,
    searchSpecialist,
    onPressBanner,
    providersList,
    onSearchDone,
    isDataNotFound,
    onSearch,
    userProfile,
    searchedList,
    searchProviderList,
    isVisible,
    setIsVisible,

    remainingTime,
    setProviderStatus,
    currentLocationOfUser,
    setCurrentLocationOfUser,
    setSearchProviderList,
    setProvidersList,
  } = HomeViewController();
  const navigation = useNavigation<any>();
  const localData = getLocalData('ORDER');
  const [seconds, setSeconds] = useState(remainingTime?.seconds);
  const timeOutRef = useRef<NodeJS.Timeout | undefined>();
  const minuteRef = useRef<NodeJS.Timeout | undefined>();
  const [timeToArrive, setTimeToArrive] = useState(remainingTime?.minutes);
  const [currentAddress, setCurrentAddress] = useState<string>('');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useUpdateEffect(() => {
    setCurrentAddress(currentLocationOfUser?.address ?? '');
  }, [currentLocationOfUser]);

  const headerTitle = () => (
    <View style={styles.headerTitleContainer}>
      <View style={styles.headerTitle}>
        <Image source={location} style={styles.location} />
        {currentAddress?.length ? (
          <Text numberOfLines={1} style={styles.text} title={currentAddress} />
        ) : (
          <DotLoader />
        )}
      </View>
      <TextButton
        isActive
        title={t('change')}
        fontSize={getWidth(fontSize.textM)}
        style={{ marginBottom: dimens.paddingS }}
        onPress={() => setIsVisible(true)}
      />
      {isVisible && (
        <AddAddress
          address={(data) => {
            setCurrentAddress(data);
            // setCurrentLocationOfUser({
            //   ...currentLocationOfUser,
            //   address: data,
            // });
          }}
          isVisible={isVisible}
          onClose={() => setIsVisible(false)}
          defaultValue={currentAddress ?? ''}
        />
      )}
    </View>
  );
  const headerLeft = () => (
    <TouchableOpacity
      onPress={onPressBack}
      disabled={searchSpecialist?.length === 0}
    >
      <Image
        source={searchSpecialist?.length !== 0 ? arrowBack : logo}
        style={searchSpecialist?.length !== 0 ? styles.arrowBack : styles.logo}
      />
    </TouchableOpacity>
  );

  const headerRight = () => (
    <>
      <TouchableHighlight underlayColor="transparent" onPress={onSearch}>
        <Image source={avatar} style={styles.avatar} />
        {dropdownVisible && (
          <View style={styles.dropdown}>
            <TextButton title={'Logout'} onPress={onSearch} />
          </View>
        )}
      </TouchableHighlight>
    </>
  );

  const getProviderList = () => {
    return (
      <>
        <Text style={styles.searchHeading} title={t('specialist')} />
        {providerList?.map((item: any, index: number) => (
          <CardView key={index} item={item} index={index} />
        ))}
      </>
    );
  };
  const getSearchList = () =>
    searchedList?.map((item: any, index: number) => (
      <TextButton
        key={index}
        fontSize={getWidth(fontSize.textL)}
        containerStyle={{
          marginVertical: getHeight(dimens.paddingXs + 2),
          width: 'auto',
        }}
        title={`\u25CF ${item?.name?.en}`}
        onPress={() => {
          setSearchProviderList(item);
          onSearchDone(item?.name?.en);
        }}
      />
    ));

  const transformedData = providersList?.map?.((entry) => ({
    name: entry?.provider_name?.en,
    provider_type_id: entry?.provider_type_id,
    speciality_name: entry?.speciality_name,
  }));
  const getProviderSearchList = () => {
    return transformedData?.map((itemData: any, index: number) => (
      <CardView item={itemData} index={index} key={index} isSearch />
    ));
  };
  const noSearchedView = () => {
    return (
      <View style={styles.imageContainer}>
        <Text title={t('results')} style={styles.noSearchText} />
        <Image source={noSearchResult} style={styles.searching} />
        <Button
          title={t('back_search')}
          isPrimary
          isSmall
          width={'70%'}
          onPress={onPressBack}
        />
      </View>
    );
  };
  // useUpdateEffect(() => {
  //   setTimeToArrive(remainingTime?.minutes);
  //   setSeconds(remainingTime?.seconds);
  // }, [remainingTime]);

  // useEffect(() => {
  //   minuteRef.current = setInterval(() => {
  //     console.log('timeLeft.current', timeToArrive);
  //     if (timeToArrive > 0) {
  //       const leftTime = timeToArrive - 1;
  //       // timeLeft.current= leftTime;
  //       setTimeToArrive(leftTime);
  //     }
  //   }, 60000);
  //   return () => {
  //     clearInterval(minuteRef.current);
  //   };
  // }, [timeToArrive]);

  // useUpdateEffect(() => {
  //   if (timeToArrive < 0) {
  //     clearInterval(minuteRef.current);
  //   }
  // }, [timeToArrive]);

  // useEffect(() => {
  //   timeOutRef.current = setInterval(() => {
  //     // console.log('timeLeft.seconds', seconds);
  //     if (seconds > 0) {
  //       const leftSeconds = seconds - 1;
  //       setSeconds(leftSeconds);
  //     } else if (timeToArrive > 0) {
  //       setSeconds(60);
  //     }
  //   }, 1000);
  //   return () => {
  //     clearInterval(timeOutRef.current);
  //   };
  // }, [seconds]);

  useUpdateEffect(() => {
    if (seconds === 0 && timeToArrive < 0) {
      setProviderStatus('arrived');
      setLocalData('ORDER', { providerDetail: '' });
      clearInterval(timeOutRef.current);
    }
  }, [seconds]);
  console.log('isDataNotFound', isDataNotFound);
  return (
    <>
      <View style={styles.headerContainer}>
        {headerLeft()}
        {headerTitle()}
        {headerRight()}
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 20 }}
        keyboardShouldPersistTaps="always"
      >
        {isTouchStart && searchSpecialist?.length === 0 && (
          <TouchableOpacity
            style={{ marginHorizontal: getWidth(dimens.marginM) }}
            onPress={onPressBanner}
          >
            <Image
              style={styles.banner}
              source={{ uri: bannerAds?.[0]?.imageurl || '' }}
            />
          </TouchableOpacity>
        )}
        <SearchBox
          isTouchStart={isTouchStart && searchSpecialist?.length === 0}
          placeholder={t('what_treatment')}
          onTouchStart={onTouchStart}
          onBlur={onBlur}
          onChangeText={onChange}
          defaultValue={searchSpecialist}
          inputMode={'search'}
          onKeyPress={handleKeyPress}
        />
        {searchSpecialist?.length === 0 ? (
          getProviderList()
        ) : isDataNotFound ? (
          <View style={{ paddingHorizontal: getWidth(dimens.marginM) }}>
            {providersList.length === 0 && transformedData?.length === 0
              ? getSearchList()
              : getProviderSearchList()}
          </View>
        ) : (
          noSearchedView()
        )}
      </ScrollView>
      {localData?.providerDetail && (
        <View
          style={{
            marginVertical: getHeight(20),
            alignItems: 'center',
            backgroundColor: 'transparent',
            marginHorizontal: getWidth(dimens.marginM),
          }}
        >
          <ProviderArrivalInfo
            status={localData.orderStatus}
            doctorName={`${localData?.providerDetail.firstname}${' '}${
              localData?.providerDetail.name
            }`}
            onPress={() => {
              navigation.navigate(NavigationRoutes.SearchDoctor, {
                providerData: localData?.providerDetail,
                orderId: localData?.orderId,
                remaining: { minutes: timeToArrive, seconds: seconds },
              });
            }}
          />
        </View>
      )}
    </>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  banner: {
    width: '100%',
    backgroundColor: colors.lightGrey,
    height: getHeight(dimens.imageM),
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    marginTop: getHeight(dimens.marginS),
  },
  searchHeading: {
    alignSelf: 'center',
    fontSize: getWidth(fontSize.textXl),
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
  header: {
    backgroundColor: colors.white,
  },
  location: {
    width: getWidth(dimens.sideMargin),
    height: getHeight(dimens.marginM),
    resizeMode: 'center',
  },
  headerTitle: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    gap: dimens.paddingS,
    minWidth: '100%',
  },
  headerTitleContainer: {
    alignItems: 'center',
    width: '60%',
  },
  noSearchText: {
    textAlign: 'center',
    fontSize: getHeight(fontSize.headingL),
    marginVertical: getHeight(dimens.imageXs),
  },
  searching: {
    width: getWidth(176),
    height: getHeight(332),
    resizeMode: 'contain',
    marginTop: getHeight(dimens.marginS),
  },
  imageContainer: {
    alignItems: 'center',
    gap: getHeight(dimens.marginL),
  },
  arrowBack: {
    width: getWidth(dimens.paddingS + dimens.borderBold),
    height: getHeight(dimens.marginM + dimens.borderBold),
    resizeMode: 'center',
  },
  text: {
    fontSize: getHeight(fontSize.textM),
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  addressView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getHeight(dimens.paddingS),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingHorizontal: getWidth(dimens.marginM),
    paddingVertical: getHeight(8),
  },
  dropdown: {
    position: 'absolute',
    top: 70,
    right: 10,
    backgroundColor: colors.offWhite,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 10,
  },
});
