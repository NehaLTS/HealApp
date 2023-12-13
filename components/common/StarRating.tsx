import { getHeight, getWidth } from 'libs/StyleHelper';
import React, { useRef, useState } from 'react';
import { Image, PanResponder, StyleSheet, View } from 'react-native';

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
    const ratingValue = Math.floor(gestureState.moveX / 50);

    if (ratingValue > 0 && ratingValue <= numberOfStars) {
      setRating(ratingValue);
      getRating(ratingValue);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: handlePanResponderMove,
    }),
  ).current;

  const stars = [];
  for (let i = 1; i <= 5; i++) {
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
      {stars}
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
    width: getWidth(34),
    height: getHeight(34),
    marginHorizontal: getWidth(5),
  },
});

export default StarRating;
