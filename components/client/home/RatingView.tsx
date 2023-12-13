import Button from 'components/common/Button';
import Input from 'components/common/Input';
import StarRating from 'components/common/StarRating';
import Text from 'components/common/Text';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontFamily } from 'designToken/fontFamily';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

const RatingView = ({
  onPress,
  rating,
}: {
  onPress: () => void;
  rating: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <>
      <KeyboardAvoidingView behavior={'height'} keyboardVerticalOffset={20}>
        <ScrollView>
          <View style={styles.imagecontainer}>
            <Image
              source={require('../../../assets/icon/doctorIcon.png')}
              style={styles.doctorIcon}
            />
            <Image
              source={require('../../../assets/icon/star.png')}
              style={styles.star}
            />
            <Text style={styles.rating} title={'4.8'} />
          </View>
          <View style={styles.container}>
            <Text
              title={'Elena Miron, family doctor'}
              style={styles.familyDoctorText}
            />
            <Text
              title={'How do you rate our doctor?'}
              style={{ fontSize: getHeight(18) }}
            />
            <View style={styles.image}>
              <StarRating getRating={rating} />
            </View>
          </View>

          <Text
            title={'Something else you want to tell us?'}
            style={styles.tellText}
          />
          <Input
            inputPlaceholder={'What did you like about our services?'}
            inputStyle={styles.description}
            placeholderTextColor={colors.grey}
            style={styles.placeholder}
          />

          <Button
            title={'Next'}
            isPrimary
            isSmall
            width={'30%'}
            style={{ alignSelf: 'center', marginTop: '36%' }}
            onPress={onPress}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default RatingView;

const styles = StyleSheet.create({
  doctorIcon: {
    width: getWidth(dimens.imageM + dimens.marginL),
    height: getHeight(dimens.imageM + dimens.marginL),
    resizeMode: 'contain',
  },
  starIcon: {
    height: getHeight(dimens.marginL),
    width: getWidth(dimens.marginL),
  },
  container: {
    alignItems: 'center',
    gap: getHeight(8),
    marginTop: getHeight(dimens.marginL),
  },
  familyDoctorText: {
    fontSize: getHeight(20),
    fontFamily: fontFamily.medium,
  },
  image: {
    flexDirection: 'row',
    gap: getHeight(dimens.marginM),
    marginTop: getHeight(dimens.marginM),
    marginBottom: getHeight(dimens.imageXs),
  },
  description: {
    height: getHeight(90),
    backgroundColor: colors.white,
  },
  placeholder: {
    marginTop: getHeight(-60),
    paddingLeft: getWidth(dimens.marginS),
    fontFamily: fontFamily.regular,
    flex: 1,
    color: colors.black,
  },
  rating: {
    position: 'absolute',
    bottom: getHeight(-11),
    right: getWidth(dimens.imageS + dimens.imageS),
    fontSize: getHeight(fontSize.textM),
  },
  star: {
    position: 'absolute',
    bottom: getHeight(dimens.marginS),
    right: getWidth(dimens.imageS + dimens.imageS),
    width: getWidth(dimens.marginM),
    height: getHeight(dimens.marginM),
  },
  tellText: {
    textAlign: 'center',
    marginBottom: getHeight(dimens.marginS + 5),
    fontSize: getHeight(fontSize.textL),
  },
  buttonContainer: {
    marginTop: 70,
    backgroundColor: 'yellow',
  },
  imagecontainer: {
    alignItems: 'center',
    marginTop: getHeight(dimens.imageXs),
  },
});
