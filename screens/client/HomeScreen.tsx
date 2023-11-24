import { useNavigation } from '@react-navigation/native';
import arrowBack from 'assets/icon/arrowBack.png';
import avatar from 'assets/icon/avatar.png';
import logo from 'assets/icon/healLogo.png';
import location from 'assets/icon/location.png';
import noSearchResult from 'assets/icon/searchFallback.png';
import Button from 'components/common/Button';
import CardView from 'components/common/CardView';
import { RNHeader } from 'components/common/Header';
import SearchBox from 'components/common/SearchBox';
import Text from 'components/common/Text';
import TextButton from 'components/common/TextButton';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import NavigationRoutes from 'navigator/NavigationRoutes';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  I18nManager,
  Image,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import HomeViewController from './HomeViewController';
import ProviderArrivalInfo from 'components/common/ProviderArrivalInfo';
import { getLocalData, setLocalData } from 'libs/datastorage/useLocalStorage';
import { UseClientUserContext } from 'contexts/UseClientUserContext';
import useUpdateEffect from 'libs/UseUpdateEffect';

const HomeScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const localData= getLocalData('ORDER')
  const minuteRef= useRef<NodeJS.Timeout | undefined>()
  const{providerStatus, remainingTime, setProviderStatus}= UseClientUserContext()
  const [timeToArrive, setTimeToArrive]= useState(remainingTime?.minutes)
  const [seconds, setSeconds]= useState(remainingTime?.seconds)
  const timeOutRef = useRef<NodeJS.Timeout | undefined>()
  // const [isVisible, setIsVisible] = useState<boolean>(false); TODO: To open add address modal

  const {
    providerList,
    bannerAds,
    isTouchStart,
    onPressBack,
    onTouchStart,
    onBlur,
    onChange,
    searchSpecialist,
    onPressBanner,
    providersList,
    onSearchDone,
    isDataNotFound,
    onSearch,
    userProfile,
  } = HomeViewController();
 
 
  const headerTitle = () => (
    <View style={styles.headerTitleContainer}>
      <View style={styles.headerTitle}>
        <Image source={location} style={styles.location} />
        <Text
          numberOfLines={1}
          style={styles.text}
          title={t('current_location')}
        />
      </View>
      <TextButton
        isActive
        title={t('change')}
        fontSize={getWidth(fontSize.textM)}
        style={{ marginBottom: dimens.paddingS }}
        // onPress={() => setIsVisible(true)}  TODO: Open add address modal
      />
    </View>
  );
  const headerLeft = () => (
    <TouchableOpacity
      onPress={onPressBack}
      disabled={searchSpecialist?.length === 0}
      style={{ padding: getWidth(16), paddingLeft: 0 }}
    >
      <Image
        source={searchSpecialist?.length !== 0 ? arrowBack : logo}
        style={searchSpecialist?.length !== 0 ? styles.arrowBack : styles.logo}
      />
    </TouchableOpacity>
  );

  const headerRight = () => (
    <TouchableHighlight underlayColor="transparent" onPress={onSearch}>
      <Image source={avatar} style={styles.avatar} />
    </TouchableHighlight>
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
  const getProviderSearchList = () => {
    return providersList?.map((item: any, index: number) => (
      <CardView key={index} item={item} index={index} isSearch />
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
  useUpdateEffect(()=>{
    setTimeToArrive(remainingTime?.minutes)
    setSeconds(remainingTime?.seconds)
 },[remainingTime])

  useEffect(()=>{
    
    minuteRef.current= setInterval(() => {
        console.log('timeLeft.current',timeToArrive)
        if(timeToArrive>0){
        const leftTime= timeToArrive-1;
        // timeLeft.current= leftTime;
        setTimeToArrive(leftTime)
        }
        },60000);
  return ()=>{
     clearInterval(minuteRef.current)
 }
},[timeToArrive])

useUpdateEffect(()=>{
  if( timeToArrive<0){
   
  clearInterval(minuteRef.current)
  }
},[timeToArrive])

useEffect(()=>{
  timeOutRef.current = setInterval(() => {
      console.log('timeLeft.seconds',seconds)
      if(seconds>0){  
      const leftSeconds= seconds-1;
      setSeconds(leftSeconds)}
      else if(timeToArrive>0){ setSeconds(60)} 
      },1000);
      return ()=>{clearInterval(timeOutRef.current)}  
},[seconds])

useUpdateEffect(()=>{
if(seconds===0&& timeToArrive<0){
  setProviderStatus('arrived')
  setLocalData('ORDER', { providerDetail:''})
clearInterval(timeOutRef.current)
}
},[seconds])

  return (
    <>
      {RNHeader(headerTitle, headerLeft, headerRight, searchSpecialist?.length)}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {isTouchStart && searchSpecialist?.length === 0 && (
          <TouchableOpacity onPress={onPressBanner}>
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
          onSubmitEditing={onSearchDone}
        />
        {searchSpecialist?.length === 0
          ? getProviderList()
          : isDataNotFound
          ? getProviderSearchList()
          : noSearchedView()}
      </ScrollView>
      {/* TODO: Address modal use it later
       {isVisible && (     
        <AddAddress
          address={() => {}}
          isVisible={isVisible}
          onClose={() => setIsVisible(false)}
          defaultValue={''}
        />
      )} */}
{console.log('providerData1111', localData, providerStatus)}
      {localData?.providerDetail&&
      <View style={{ marginVertical:getHeight(20), alignItems:'center', backgroundColor:'transparent'}}><ProviderArrivalInfo time={timeToArrive?.toString()} status={providerStatus}  doctorName= {`${localData?.providerDetail.firstname}${' '}${localData?.providerDetail.name}`}onPress={()=>{  
        navigation.navigate(NavigationRoutes.SearchDoctor,{providerData:localData?.providerDetail, orderId:localData?.orderId, remaining:{minutes:timeToArrive, seconds:seconds}})
      }}/></View>}
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
  },
  headerTitleContainer: {
    alignItems: 'center',
    paddingTop: getHeight(dimens.marginS + 5),
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
    fontSize: fontSize.textM,
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
});
