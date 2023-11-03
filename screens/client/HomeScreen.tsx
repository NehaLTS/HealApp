import { useNavigation } from '@react-navigation/native';
import arrowBack from 'assets/icon/arrowBack.png';
import avatar from 'assets/icon/avatar.png';
import logo from 'assets/icon/healLogo.png';
import location from 'assets/icon/location.png';
import noSearchResult from 'assets/icon/searchFallback.png';
import Button from 'components/common/Button';
import CardView from 'components/common/CardView';
import SearchBox from 'components/common/SearchBox';
import Text from 'components/common/Text';
import TextButton from 'components/common/TextButton';
import { dimens } from 'designToken/dimens';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import NavigationRoutes from 'navigator/NavigationRoutes';
import React, { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  Easing,
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import HomeViewController from './HomeViewController';
import { colors } from 'designToken/colors';
import RNModal from 'components/common/Modal';
import Input from 'components/common/Input';
import OrderDetails from './OrderDetails';

const HomeScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const {
    providerList,
    bannerAds,
    isTouchStart,
    onPressBack,
    onTouchStart,
    onBlur,
    onChange,
    onChangeSearch,
    onPressBanner,
    providersList,
    onSearchDone,
    isDataNotFound,
    onSearch,
    user,
  } = HomeViewController();
  console.log('user', user);
  // const isDataNotFound = searchRef?.length > 0 ? true : false;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitle: () => (
        <View style={styles.headerTitleContainer}>
          <View style={styles.headerTitle}>
            <Image source={location} style={styles.location} />
            <Text
              numberOfLines={2}
              style={styles.text}
              title={user?.address ?? ''}
            />
          </View>
          <TextButton
            isActive
            title="Change"
            fontSize={getWidth(fontSize.textM)}
            onPress={() => setIsVisible(true)}
          />
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={onPressBack}>
          <Image
            source={
              !isTouchStart || onChangeSearch?.length > 0 ? arrowBack : logo
            }
            style={
              !isTouchStart || onChangeSearch?.length > 0
                ? styles.arrowBack
                : styles.logo
            }
          />
        </TouchableOpacity>
      ),
      headerStyle: styles.header,
      headerRight: () => (
        <TouchableHighlight underlayColor="transparent" onPress={onSearch}>
          <Image source={avatar} style={styles.avatar} />
        </TouchableHighlight>
      ),
    });
  }, [navigation, isTouchStart]);
  const addAddressView = () => {
    return (
      <RNModal
        style={styles.modal}
        backdropOpacity={1}
        backdropColor={colors.white}
        isVisible={isVisible}
      >
        <View style={styles.addressView}>
          <Input
            placeholder={t('address')}
            type={'fullStreetAddress'}
            inputStyle={[{ minWidth: '82%' }]}
            onSubmitEditing={() => {
              setIsVisible(false);
            }}
            autoFocus
            inputValue={''}
          />
          <TextButton
            containerStyle={{ width: '18%', alignItems: 'flex-end' }}
            title="Close"
            fontSize={fontSize.textL}
            onPress={() => setIsVisible(false)}
          />
        </View>
      </RNModal>
    );
  };
  const getProviderList = () => {
    // Pass on Press of card and array of data as props*/

    return (
      <>
        <Text
          style={styles.searchHeading}
          title={'Which specialist do you need?'}
        />
        {providerList.map((item: any, index: number) => (
          <Animated.View
            key={index}
            entering={FadeInUp.duration(200).easing(Easing.ease)}
            exiting={FadeInDown.duration(10).easing(Easing.ease)}
          >
            <CardView
              item={item}
              index={index}
              onPress={() =>
                navigation.navigate(NavigationRoutes.OrderDetails, {
                  supplier: item,
                })
              }
            />
          </Animated.View>
        ))}
      </>
    );
  };
  const getProviderSearchList = () => {
    // Pass on Press of card and array of data as props*/
    return providersList?.map(
      (item: any, index: number) => console.log('item', item),
      // <Animated.View
      //   key={index}
      //   entering={FadeInUp.duration(200).easing(Easing.ease)}
      //   exiting={FadeInDown.duration(10).easing(Easing.ease)}>
      //   <CardView item={item} index={index} isSearch />
      // </Animated.View>
    );
  };
  const noSearchedView = () => {
    return (
      <View style={styles.imageContainer}>
        <Text title={'No search results'} style={styles.noSearchText} />
        <Image source={noSearchResult} style={styles.searching} />
        <Button
          title={'Back to search'}
          isPrimary
          isSmall
          width={'70%'}
          onPress={onPressBack}
        />
      </View>
    );
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Banner Advertisement */}
        {isTouchStart && onChangeSearch?.length === 0 && (
          <TouchableOpacity onPress={onPressBanner}>
            <Image
              style={styles.banner}
              // source={require("assets/icon/google.png")}
              source={{ uri: bannerAds?.[0]?.imageurl || '' }}
            />
          </TouchableOpacity>
        )}
        <SearchBox
          isTouchStart={isTouchStart && onChangeSearch?.length === 0}
          placeholder="What treatment do you need?"
          onTouchStart={onTouchStart}
          onBlur={onBlur}
          onChangeText={onChange}
          defaultValue={onChangeSearch}
          onSubmitEditing={onSearchDone}
        />
        {onChangeSearch?.length === 0
          ? getProviderList()
          : isDataNotFound
          ? getProviderSearchList()
          : noSearchedView()}
      </ScrollView>
      {isVisible && addAddressView()}
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
    resizeMode: 'center',
    marginTop: getHeight(dimens.marginS),
  },
  searchHeading: {
    alignSelf: 'center',
    fontSize: getHeight(fontSize.textXl),
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: dimens.paddingS,
  },
  headerTitleContainer: {
    alignItems: 'center',
    paddingTop: getHeight(dimens.marginL),
  },
  noSearchText: {
    textAlign: 'center',
    fontSize: getHeight(fontSize.headingL),
    marginVertical: getHeight(dimens.imageXs),
  },
  searching: {
    width: getWidth(176),
    height: getHeight(332),
    resizeMode: 'center',
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
