import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";

const OnBoardingViewController = () => {
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();

  const onPressSkip =() => navigation.navigate("Intro")
  useEffect(() => {
    const interval = setInterval(() => {
      if (swiperRef.current) {
        const nextIndex = (currentIndex + 1) % 3;
        swiperRef?.current?.scrollBy?.(nextIndex - currentIndex, true);
        setCurrentIndex(nextIndex);
      }
    }, 5000); // 5 seconds
    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  return { swiperRef, onPressSkip };
};

export default OnBoardingViewController;
