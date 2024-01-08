import {
  I18nManager,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { dimens } from 'designToken/dimens';
import { fontSize } from 'designToken/fontSizes';
import { colors } from 'designToken/colors';
import NavigationRoutes from 'navigator/NavigationRoutes';
import { useNavigation } from '@react-navigation/native';
import Text from 'components/common/Text';
import arrowBack from 'assets/icon/arrowBack.png';
import TextButton from 'components/common/TextButton';
import {
  deleteLocalData,
  getLocalData,
  setLocalData,
} from 'libs/datastorage/useLocalStorage';
import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { ProviderProfile, ProviderServices } from 'libs/types/UserType';
import RNRestart from 'react-native-restart';
import { useTranslation } from 'react-i18next';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import SelectImage from 'components/common/SelectImage';
import uploadImage from 'libs/uploadImage';
import { getImagesPath, getTitle } from 'libs/utility/Utils';
import useToast from 'components/common/useToast';

const Profile = () => {
  const navigation = useNavigation<any>();
  const { setProviderProfile, userId, providerProfile, providerServices } =
    UseProviderUserContext();
  const { UpdateProviderProfile, GetProviderProfiles } = AuthServicesProvider();
  const { t, i18n } = useTranslation();
  const languageRef = React.useRef<any>(i18n.language);
  const [profileImage, setProfileImage] = React.useState();
  const [profilePicture, setProfilePicture] = React.useState(
    providerProfile?.profilePicture ?? '',
  );
  const [isVisible, setIsVisible] = React.useState(false);
  const { showToast, renderToast } = useToast();

  const headerLeft = () => (
    <TouchableOpacity
      style={styles.arrowBackButton}
      onPress={() => navigation.goBack()}
    >
      <Image source={arrowBack} style={styles.arrowBack} />
    </TouchableOpacity>
  );
  const headerTitle = () => <Text style={styles.title} title={t('personal_profile')} />;

  // React.useMemo(async () => {
  //   const res = await GetProviderProfiles('40');
  //   console.log('gurepreet', res);
  // }, []);
  const onLogoutButtonPress = () => {
    deleteLocalData();
    setProviderProfile({} as ProviderProfile);
    setLocalData('USER', {
      user: {
        language: languageRef.current,
      },
    });
    if (
      I18nManager.isRTL &&
      (languageRef.current === 'en' || languageRef.current === 'ru')
    ) {
      I18nManager.forceRTL(false);
      I18nManager.allowRTL(false);
    } else if (
      !I18nManager.isRTL &&
      (languageRef.current === 'he' || languageRef.current === 'ar')
    ) {
      I18nManager.forceRTL(true);
      I18nManager.allowRTL(true);
    }
    RNRestart.Restart();
  };
  const getImageUrl = (url: string) => {
    console.log('url111', url);
    setProfilePicture(url);
    updateProfile(url);
  };

  const updateProfile = async (url: string) => {
    const imagePaths = [
      {
        imagePath: url,
        type: 'profilePicture',
      },
    ];
    try {
      // const images = await uploadImage(imagePaths);
      await uploadImage(imagePaths)
        .then(async (images) => {
          console.log('images', images);
          if (images?.length > 0) {
            console.log('userId', userId);
            const res = await UpdateProviderProfile({
              provider_id: userId,
              profile_picture: getImagesPath(images, 'profilePicture') ?? '',
            });
            console.log('res', res);
            if (!res.message) {
              showToast(
                t('Uploaded successfully!'),
                t('Your profile picture is updated successfully.'),
                'su',
              );
              setLocalData('USERPROFILE', {
                profilePicture: getImagesPath(images, 'profilePicture') ?? '',
              } as ProviderProfile);

              setProviderProfile({
                ...providerProfile,
                profilePicture: getImagesPath(images, 'profilePicture') ?? '',
              });
            } else {
              showToast(
                t('Failed to upload!'),
                t('failed to upload your profile picture.'),
                'error',
              );
              setProfilePicture('');
            }
          }
        })
        .catch((error) => {
          console.error('Error uploading images:', error);
        });
    } catch (err) {
      showToast(
        t('Failed to upload!'),
        t('failed to upload your profile picture.'),
        'error',
      );
      setProfilePicture('');
      console.log(err);
    }
  };

  return (
    <>
      <View style={styles.headerContainer}>
        {headerLeft()}
        {headerTitle()}
      </View>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => setIsVisible(true)}>
            <Image
              source={
                profilePicture
                  ? { uri: profilePicture }
                  : require('assets/icon/addProfileIcon.png')
              }
              style={styles.avatarImage}
            />
          </TouchableOpacity>
          <Text title={`${providerProfile?.firstName} ${providerProfile?.lastName}`} style={styles.text} />
        </View>
        <View style={styles.divider}>
          <Text title={'Services you provide'} style={styles.servicesText} />
          {(providerServices as unknown as ProviderServices[])?.map(
            (service, index) => (
              <View key={index} style={styles.serviceItem}>
                <Text
                  title={getTitle(service?.name, i18n)}
                  style={styles.serviceName}
                />
                <Text
                  title={`${service?.service_price} NIS`}
                  style={styles.serviceName}
                />
              </View>
            ),
          )}

          <View style={styles.addImageContainer}>
            <Image
              source={require('assets/icon/addServicesBlack.png')}
              style={styles.addImage}
            />
            <Text title={'Add another service'} />
          </View>
        </View>
        <TouchableOpacity
          onPress={onLogoutButtonPress}
          style={styles.logoutImageContainer}
        >
          <Image
            source={require('assets/icon/logout.png')}
            style={styles.logoutImage}
          />
          <Text title={'Log Out'} />
        </TouchableOpacity>
      </View>
      <SelectImage
        isShowModal={isVisible}
        closeModal={setIsVisible}
        imageUri={getImageUrl}
      />
      {renderToast()}
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  arrowBack: {
    width: getWidth(dimens.paddingS + dimens.borderBold),
    height: getHeight(dimens.marginM + dimens.borderBold),
    resizeMode: 'center',
    transform: [{ rotate: I18nManager.isRTL ? '180deg' : '0deg' }],
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: getWidth(dimens.marginM),
    zIndex: 1,
    paddingVertical: getHeight(dimens.marginS),
    alignItems: 'center',
    gap: getWidth(dimens.marginM),
    paddingTop: getHeight(dimens.marginM),
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: getWidth(dimens.marginM),
  },
  avatarImage: {
    width: getHeight(dimens.imageM),
    height: getHeight(dimens.imageM),
    resizeMode: 'contain',
    borderRadius: getHeight(80),
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: getHeight(dimens.marginM),
    fontSize: getHeight(fontSize.textXl),
  },
  divider: {
    borderTopWidth: getHeight(dimens.borderThin),
    borderBottomWidth: getHeight(dimens.borderThin),
    borderColor: colors.disabled,
    marginTop: getHeight(dimens.imageXs),
    paddingVertical: getHeight(getHeight(dimens.marginM)),
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(dimens.marginM),
    paddingVertical: getHeight(dimens.paddingS),
  },
  serviceName: {
    fontSize: getHeight(fontSize.textM),
  },
  servicesText: {
    fontSize: getHeight(20),
    marginVertical: getHeight(10),
  },
  addImage: {
    width: getHeight(dimens.imageXs),
    height: getHeight(dimens.imageXs),
    resizeMode: 'contain',
  },
  addImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getHeight(dimens.imageXs),
    paddingVertical: getHeight(dimens.marginM),
  },
  logoutImage: {
    width: getHeight(dimens.marginL),
    height: getHeight(dimens.marginL),
    resizeMode: 'contain',
  },
  logoutImageContainer: {
    position: 'absolute',
    bottom: getHeight(20),
    left: getWidth(dimens.marginM),
    right: getWidth(dimens.marginM),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: getWidth(dimens.marginS),
  },
  logOutText: {
    fontSize: getHeight(fontSize.textL),
  },
  title: {
    fontSize: getHeight(fontSize.heading - dimens.borderBold),
    textAlign: 'center',
    width: '70%',
  },
  arrowBackButton: {
    paddingRight: getWidth(dimens.sideMargin),
    paddingVertical: getHeight(dimens.marginS / dimens.borderBold),
  },
});
