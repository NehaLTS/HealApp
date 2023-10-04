import { useState, useEffect, useRef } from 'react';


const slides = [
  { text: 'Welcome to Heal', numbers: '1' },
  { text: 'Welcome to Heal', numbers: '2' },
  { text: 'Welcome to Heal', numbers: '3' },
];

const OnBoardingController = () => {
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (swiperRef.current) {
        const nextIndex = (currentIndex + 1) % slides.length;
        swiperRef.current.scrollBy(nextIndex - currentIndex, true);
        setCurrentIndex(nextIndex);
      }
    }, 3000); // 3 seconds

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  return {
    swiperRef,

   
  };
}

export default OnBoardingController;
