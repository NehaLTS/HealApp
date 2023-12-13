import Text from 'components/common/Text';
import React from 'react';
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
} from 'react-native';
import downArrow from '../../assets/icon/downArrow.png';
import arrowBack from '../../assets/icon/arrowBack.png';
import physio from '../../assets/icon/physio.png';
import { useNavigation } from '@react-navigation/native';

const HealerHomeView = (item: any) => {
  const cardData = [
    {
      id: 1,
      title: 'Shiatsu ',
    },
    {
      id: 2,
      title: 'Shiatsu ',
    },
    {
      id: 3,
      title: 'Shiatsu ',
    },
    {
      id: 4,
      title: 'Shiatsu ',
    },
    {
      id: 5,
      title: 'Shiatsu ',
    },
    {
      id: 6,
      title: 'Shiatsu ',
    },
    {
      id: 7,
      title: 'Shiatsu ',
    },
  ];
  const navigation = useNavigation();

  const headerLeft = () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image source={arrowBack} style={styles.arrowBack} />
    </TouchableOpacity>
  );
  const headerTitle = () => (
    <TouchableOpacity>
      <Image source={physio} style={styles.physio} />
    </TouchableOpacity>
  );
  const headerRight = () => (
    <Text title={item?.name} style={styles.physioText} />
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
          {cardData.map((card) => (
            <View key={card.id} style={styles.cardContainer}>
              <Text title={card.title} style={styles.text} />
              <Image source={downArrow} style={styles.downArrow} />
            </View>
          ))}
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
