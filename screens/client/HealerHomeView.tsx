import { useNavigation, useRoute } from '@react-navigation/native';
import Loader from 'components/common/Loader';
import Text from 'components/common/Text';
import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { AuthServicesClient } from 'libs/authsevices/AuthServicesClient';
import { getProviderImage } from 'libs/utility/Utils';
import NavigationRoutes from 'navigator/NavigationRoutes';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import arrowBack from '../../assets/icon/arrowBack.png';

const HealerHomeView = () => {
  const route = useRoute<any>();
  const { t } = useTranslation();
  const [isSelected, setIsSelected] = useState<number>(-1);
  const navigation = useNavigation<any>();
  const { healerServices } = AuthServicesClient();
  const { token } = UseClientUserContext();
  const [healerServicesData, setHealerServicesData] = useState<any>([]);
  const [showLoader, setShowLoader] = useState<boolean>(true);
  useEffect(() => {
    healerServices(token)
      .then((res) => {
        console.log('healerServices', res);
        setHealerServicesData(res);
        setShowLoader(false);
      })
      .catch((error) => {
        console.log('hearlerError', error);
      });
  }, []);
  console.log('healerServicesData', healerServicesData);
  const headerLeft = () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image source={arrowBack} style={styles.arrowBack} />
    </TouchableOpacity>
  );
  const headerTitle = () => (
    <TouchableOpacity>
      <Image
        source={getProviderImage(
          route?.params?.supplier?.name,
          route?.params?.supplier?.provider_type_id,
        )}
        style={styles.physio}
      />
    </TouchableOpacity>
  );
  const headerRight = () => (
    <Text title={route?.params?.supplier.name} style={styles.physioText} />
  );
  return (
    <>
      <View style={styles.headerContainer}>
        {headerLeft()}
        {headerTitle()}
        {headerRight()}
      </View>
      <View style={styles.container}>
        <Text title={t('healer_title')} style={styles.heading} />
        <ScrollView style={{ width: '100%' }}>
          {showLoader ? (
            <Loader />
          ) : (
            <>
              {healerServicesData?.map((card: any, index: number) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.cardContainer,
                    {
                      backgroundColor:
                        index === isSelected ? colors.secondary : colors.white,
                    },
                  ]}
                  onPress={() => {
                    setIsSelected(index);
                    navigation.navigate(NavigationRoutes.OrderDetails, {
                      supplier: route?.params?.supplier,
                      selectedHealerServices: card,
                    });
                  }}
                >
                  <Text title={card.specialty} style={styles.text} />
                </TouchableOpacity>
              ))}
            </>
          )}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: getHeight(20),
    backgroundColor: colors.white,
  },
  cardContainer: {
    backgroundColor: colors.offWhite,
    borderRadius: getHeight(dimens.marginS),
    padding: getHeight(dimens.marginM),
    marginBottom: getHeight(dimens.marginM),
    shadowColor: colors.black,
    elevation: getWidth(11),
    position: 'relative',
    marginHorizontal: getWidth(20),
  },
  text: {
    fontSize: getHeight(fontSize.textM),
  },
  downArrow: {
    width: getWidth(12),
    height: getHeight(dimens.marginS),
    position: 'absolute',
    right: getHeight(dimens.marginM),
    bottom: getHeight(29),
    resizeMode: 'contain',
  },
  heading: {
    textAlign: 'center',
    fontSize: getHeight(fontSize.textXl),
    marginBottom: getHeight(30),
    marginTop: getHeight(10),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: getWidth(dimens.marginM),
    paddingVertical: getHeight(8),
    gap: 10,
  },
  arrowBack: {
    width: getWidth(20),
    height: getHeight(20),
    resizeMode: 'contain',
    transform: [{ rotate: '180deg' }],
  },
  physio: {
    width: getWidth(50),
    height: getHeight(50),
    resizeMode: 'contain',
  },
  physioText: {
    fontSize: getHeight(fontSize.textXl),
    color: colors.black,
  },
  containerStyle: {
    paddingBottom: getHeight(dimens.marginM),
  },
});

export default HealerHomeView;
