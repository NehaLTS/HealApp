import Text from 'components/common/Text';
import React, { useEffect, useState } from 'react';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import downArrow from '../../assets/icon/downArrow.png';
import arrowBack from '../../assets/icon/arrowBack.png';
import physio from '../../assets/icon/physio.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import NavigationRoutes from 'navigator/NavigationRoutes';
import { getProviderImage } from 'libs/utility/Utils';
import { AuthServicesClient } from 'libs/authsevices/AuthServicesClient';
import { UseClientUserContext } from 'contexts/UseClientUserContext';
import Loader from 'components/common/Loader';

const HealerHomeView = () => {
  const route = useRoute<any>();
  const [isSelected, setIsSelected] = useState<number>(-1)
  const navigation = useNavigation();
  const { healerServices } = AuthServicesClient()
  const { token } = UseClientUserContext()
  const [healerServcesData, setHealerServicesData] = useState<any>([])
  const [showLoader, setShowLoader] = useState<boolean>(true)

  useEffect(() => {
    healerServices(token).then((res) => {
      console.log("healerServices", res)
      setHealerServicesData(res)
      setShowLoader(false)
    }

    ).catch((error) => {
      console.log("hearlerError", error)

    })
  }, [])



  const headerLeft = () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image source={arrowBack} style={styles.arrowBack} />
    </TouchableOpacity>
  );
  const headerTitle = () => (
    <TouchableOpacity>
      <Image source={getProviderImage(route?.params?.supplier?.name)} style={styles.physio} />
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
        <Text
          title={'What kind of treatment\nare you looking for?'}
          style={styles.heading}
        />
        <ScrollView style={{ width: '100%' }}>
          {showLoader ? <Loader />
            :
            <>
              {healerServcesData.map((card, index) => (
                <TouchableOpacity key={card.provider_type_id} style={[styles.cardContainer, { backgroundColor: index === isSelected ? colors.secondary : colors.white }]} onPress={() => {
                  setIsSelected(index)
                  console.log("Healercard", card)
                  navigation.navigate(NavigationRoutes.OrderDetails, {
                    supplier: route?.params?.supplier,
                    selectedHealerServices: card
                  });
                }}>
                  <Text title={card.specialty} style={styles.text} />
                  {/* <Image source={downArrow} style={styles.downArrow} /> */}
                </TouchableOpacity>
              ))}
            </>
          }
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
    padding: getHeight(20),
    backgroundColor: colors.white,
  },
  cardContainer: {
    backgroundColor: colors.offWhite,
    borderRadius: getHeight(dimens.marginS),
    padding: getHeight(dimens.marginM),
    marginBottom: getHeight(dimens.marginM),
    width: '100%',
    shadowColor: colors.black,
    elevation: getWidth(11),
    position: 'relative',
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
    width: getWidth(18),
    height: getHeight(18),
    resizeMode: 'contain',
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
