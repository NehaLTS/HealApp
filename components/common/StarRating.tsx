import { getHeight, getWidth } from 'libs/StyleHelper';
import React, { useRef, useState } from 'react';
import {
  I18nManager,
  Image,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';

const filledStar = require('assets/icon/star.png');
const unfilledStar = require('assets/icon/ratingStar.png');

const StarRating = ({
  getRating,
}: {
  getRating: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [rating, setRating] = useState(0);

  const handlePanResponderMove = (_: any, gestureState: { moveX: number }) => {
    const numberOfStars = 5;
    let ratingValue = Math.floor(gestureState.moveX / 50);

    if (I18nManager.isRTL) {
      ratingValue = numberOfStars - ratingValue;
    }

    ratingValue = Math.max(0, Math.min(numberOfStars, ratingValue));

    setRating(ratingValue);
    getRating(ratingValue);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: handlePanResponderMove,
    }),
  ).current;

  const stars = [];
  for (let i = 5; i >= 1; i--) {
    stars.push(
      <Image
        key={i}
        style={styles.star}
        source={i <= rating ? filledStar : unfilledStar}
      />,
    );
  }

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {I18nManager.isRTL ? stars.reverse() : stars}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  star: {
    width: getHeight(34),
    height: getHeight(34),
    marginHorizontal: getWidth(5),
    resizeMode: 'center',
  },
});

export default StarRating;
