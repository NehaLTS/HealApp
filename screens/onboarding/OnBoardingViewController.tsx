import { useEffect, useRef, useState } from "react";

const OnBoardingViewController = () => {
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (swiperRef.current) {
        const nextIndex = (currentIndex + 1) % 3;
        swiperRef?.current?.scrollBy?.(nextIndex - currentIndex, true);
        setCurrentIndex(nextIndex);
      }
    }, 3000); // 3 seconds
    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  return { swiperRef };
};

export default OnBoardingViewController;
